#!/usr/bin/env python3
"""Report handheld shake for one or more clips.

Usage: shake_report.py <clip.mp4> [more.mp4 ...]

Shake here is the mean frame-to-frame CHANGE in global camera velocity (px per frame at 800px
wide), from the median optical-flow displacement of tracked features. Smooth pans and dolly moves
score near zero; handheld wobble scores high. Rough guide: under 0.3 looks tripod-steady,
0.3 to 1 reads as a steady hand, above 2 reads as shaky.
"""
import subprocess
import sys

import cv2
import numpy as np

W, H = 800, 450


def frames(path):
    cmd = ["ffmpeg", "-v", "error", "-i", path, "-vf",
           f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H}", "-f", "rawvideo", "-pix_fmt", "gray", "-"]
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE)
    out = []
    while True:
        b = p.stdout.read(W * H)
        if len(b) < W * H:
            break
        out.append(np.frombuffer(b, np.uint8).reshape(H, W))
    p.wait()
    return out


def motion(fr):
    m = []
    for a, b in zip(fr, fr[1:]):
        pts = cv2.goodFeaturesToTrack(a, 300, 0.01, 16)
        if pts is None or len(pts) < 10:
            m.append((0.0, 0.0))
            continue
        nxt, st, _ = cv2.calcOpticalFlowPyrLK(a, b, pts, None, winSize=(31, 31), maxLevel=4)
        ok = st.reshape(-1) == 1
        if ok.sum() < 8:
            m.append((0.0, 0.0))
            continue
        d = (nxt[ok] - pts[ok]).reshape(-1, 2)
        med = np.median(d, axis=0)
        m.append((float(med[0]), float(med[1])))
    return np.array(m)


for path in sys.argv[1:]:
    fr = frames(path)
    mo = motion(fr)
    jitter = np.abs(np.diff(mo, axis=0)).sum(axis=1)
    worst = float(np.percentile(jitter, 95)) if len(jitter) else 0.0
    print(f"{path.split('/')[-1]:16s} frames {len(fr):4d}  shake mean {jitter.mean():5.2f}  p95 {worst:5.2f}  px/frame at 800px")
