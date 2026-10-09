#!/usr/bin/env python3
"""Stabilize a handheld clip and write the Estate hero scene.

Usage: stabilize.py <in.mp4> <out.mp4> [--start S] [--seconds N] [--smooth FRAMES] [--zoom Z] [--crf N]

Estimates per-frame camera motion (translation plus rotation) with sparse optical flow,
smooths the camera path with a wide moving average so only the intended drift survives,
then warps every frame to follow the smoothed path and crops in slightly to hide the borders.
Prints the shake before and after as the RMS of frame-to-frame motion left over once the
smoothed path is removed.
"""
import argparse
import math
import subprocess
import sys

import cv2
import numpy as np

W, H = 1600, 900


def probe(path):
    out = subprocess.check_output(
        ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=r_frame_rate,width,height",
         "-of", "default=noprint_wrappers=1", path], text=True)
    kv = dict(line.split("=", 1) for line in out.strip().splitlines() if "=" in line)
    num, den = kv["r_frame_rate"].split("/")
    return float(num) / float(den), kv["r_frame_rate"], int(kv["width"]), int(kv["height"])


def read_frames(path, start, seconds, infps=None):
    """Decode with ffmpeg to 1600x900 (cover crop) raw BGR frames, optionally resampling the rate first."""
    vf = f"scale={W}:{H}:force_original_aspect_ratio=increase:flags=lanczos,crop={W}:{H}"
    if infps:
        vf = f"fps={infps}," + vf
    cmd = ["ffmpeg", "-v", "error", "-ss", str(start), "-t", str(seconds), "-i", path, "-vf", vf,
           "-f", "rawvideo", "-pix_fmt", "bgr24", "-"]
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE)
    size = W * H * 3
    frames = []
    while True:
        buf = p.stdout.read(size)
        if len(buf) < size:
            break
        frames.append(np.frombuffer(buf, np.uint8).reshape(H, W, 3))
    p.wait()
    return frames


def estimate_motion(frames):
    """Per-frame global camera translation (dx, dy, 0) as the median feature displacement.

    The median of many tracked points is robust to reflections, glass and moving objects, which
    made a full affine fit swing wildly on interior walkthroughs. Rotation is left alone: handheld
    roll is small and correcting it from a bad estimate looks worse than leaving it.
    """
    prev = cv2.cvtColor(frames[0], cv2.COLOR_BGR2GRAY)
    motion = []
    for f in frames[1:]:
        cur = cv2.cvtColor(f, cv2.COLOR_BGR2GRAY)
        pts = cv2.goodFeaturesToTrack(prev, maxCorners=600, qualityLevel=0.01, minDistance=20, blockSize=5)
        if pts is None or len(pts) < 12:
            motion.append((0.0, 0.0, 0.0))
            prev = cur
            continue
        nxt, st, _ = cv2.calcOpticalFlowPyrLK(prev, cur, pts, None, winSize=(31, 31), maxLevel=4)
        ok = st.reshape(-1) == 1
        if ok.sum() < 12:
            motion.append((0.0, 0.0, 0.0))
        else:
            d = (nxt[ok] - pts[ok]).reshape(-1, 2)
            med = np.median(d, axis=0)
            motion.append((float(med[0]), float(med[1]), 0.0))
        prev = cur
    return np.array(motion)


def smooth_path(path, radius):
    k = np.ones(2 * radius + 1) / (2 * radius + 1)
    out = np.zeros_like(path)
    for i in range(path.shape[1]):
        padded = np.pad(path[:, i], (radius, radius), mode="edge")
        out[:, i] = np.convolve(padded, k, mode="valid")
    return out


def rms_shake(motion, radius):
    """Shake = motion left after removing the smoothed camera path."""
    path = np.cumsum(motion, axis=0)
    resid = path - smooth_path(path, radius)
    d = np.diff(resid, axis=0)
    return math.sqrt(float(np.mean(d[:, 0] ** 2 + d[:, 1] ** 2)))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("dst")
    ap.add_argument("--start", type=float, default=0)
    ap.add_argument("--seconds", type=float, default=9)
    ap.add_argument("--smooth", type=int, default=36, help="moving average radius in frames")
    ap.add_argument("--zoom", type=float, default=1.07, help="crop-in to hide stabilized borders")
    ap.add_argument("--crf", type=int, default=24)
    ap.add_argument("--fps", type=str, default=None, help="resample to this rate (rational ok) before stabilizing; default keeps the source rate")
    args = ap.parse_args()

    fps, rate, _, _ = probe(args.src)
    if args.fps:
        rate = args.fps
        num, den = (args.fps.split("/") + ["1"])[:2]
        fps = float(num) / float(den)
    frames = read_frames(args.src, args.start, args.seconds, args.fps)
    if len(frames) < 3:
        sys.exit("no frames decoded")
    motion = estimate_motion(frames)
    path = np.cumsum(motion, axis=0)
    smooth = smooth_path(path, args.smooth)
    correction = smooth - path  # what to add to each frame's motion to land on the smooth path

    before = rms_shake(motion, args.smooth)

    out_fps = rate
    cmd = ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", out_fps, "-i", "-",
           "-an", "-c:v", "libx264", "-preset", "slow", "-crf", str(args.crf), "-movflags", "+faststart", "-pix_fmt", "yuv420p",
           "-r", out_fps, args.dst]
    enc = subprocess.Popen(cmd, stdin=subprocess.PIPE)

    z = args.zoom
    cx, cy = W / 2, H / 2
    zoom_m = np.array([[z, 0, cx - z * cx], [0, z, cy - z * cy]], dtype=np.float64)

    stabilized = []
    for i, f in enumerate(frames):
        if i == 0:
            dx, dy, da = 0.0, 0.0, 0.0
        else:
            dx, dy, da = correction[i - 1]
        c, s = math.cos(da), math.sin(da)
        # rotate about the centre, then translate
        m = np.array([[c, -s, (1 - c) * cx + s * cy + dx], [s, c, -s * cx + (1 - c) * cy + dy]], dtype=np.float64)
        # compose with the crop-in zoom: zoom_m * m
        m3 = np.vstack([m, [0, 0, 1]])
        z3 = np.vstack([zoom_m, [0, 0, 1]])
        full = (z3 @ m3)[:2]
        warped = cv2.warpAffine(f, full, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
        stabilized.append(warped)
        enc.stdin.write(warped.tobytes())
    enc.stdin.close()
    enc.wait()

    after = rms_shake(estimate_motion(stabilized), args.smooth)
    print(f"{args.dst.split('/')[-1]:14s} frames {len(frames):4d} @ {fps:.3f} fps  shake before {before:5.2f}px/frame  after {after:5.2f}px/frame")


if __name__ == "__main__":
    main()
