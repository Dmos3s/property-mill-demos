// Plays a sequence of short clips as one continuous "walkthrough": crossfades between clips,
// slow Ken Burns push on each, a segmented progress bar, and a caption per scene.
// Reduced motion: shows the poster images and advances them on a timer with a plain fade.
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

export type Scene = {
  src: string;
  poster: string;
  label: string; // "The approach"
  sub?: string; // "Monument, Colorado"
  /** seconds to show before moving on; defaults to the clip length (capped by maxSeconds) */
  seconds?: number;
};

type Props = {
  scenes: Scene[];
  className?: string;
  style?: CSSProperties;
  maxSeconds?: number;
  /** push-in scale over the scene, 1 = none */
  zoomTo?: number;
  /** render the progress bar and caption; pass false to draw your own with onScene */
  chrome?: boolean;
  onScene?: (index: number, scene: Scene) => void;
  captionClass?: string;
  barClass?: string;
  barActiveClass?: string;
};

export function VideoSequence({
  scenes,
  className,
  style,
  maxSeconds = 9,
  zoomTo = 1.08,
  chrome = true,
  onScene,
  captionClass = "",
  barClass = "bg-white/25",
  barActiveClass = "bg-white",
}: Props) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  // Push-in wrappers: animated imperatively so the <video> elements are never remounted
  // (a remount throws away the buffered clip and restarts decoding, which shows as a jump).
  const zoomRefs = useRef<(HTMLDivElement | null)[]>([]);
  const indexRef = useRef(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const raf = useRef<number | null>(null);
  const startedAt = useRef<number>(0);
  const durationRef = useRef<number>(maxSeconds);

  const scene = scenes[index];
  indexRef.current = index;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % scenes.length);
  }, [scenes.length]);

  useEffect(() => {
    onScene?.(index, scenes[index]);
  }, [index, onScene, scenes]);

  // Drive the active clip: play it from the start, preload the next, and schedule the switch.
  useEffect(() => {
    if (raf.current) window.cancelAnimationFrame(raf.current);

    const planned = scene.seconds ?? maxSeconds;
    durationRef.current = planned;
    startedAt.current = performance.now();

    // Slow push-in as a compositor-driven CSS animation (no per-frame JS, no sub-pixel jitter).
    // Restart it by removing and re-adding the animation; the outgoing scene keeps its last frame.
    const zoomEl = zoomRefs.current[index];
    if (zoomEl && !reduce && zoomTo !== 1) {
      zoomEl.style.animation = "none";
      void zoomEl.offsetWidth; // flush so the animation restarts from scale(1)
      zoomEl.style.setProperty("--pm-zoom-to", String(zoomTo));
      zoomEl.style.animation = `pm-kenburns ${planned + 1.6}s linear forwards`;
    }

    const tick = () => {
      const t = (performance.now() - startedAt.current) / 1000;
      setProgress(Math.min(1, t / durationRef.current));
      raf.current = window.requestAnimationFrame(tick);
    };
    raf.current = window.requestAnimationFrame(tick);

    if (!reduce) {
      const v = videoRefs.current[index];
      if (v) {
        // React sets the muted property but not the attribute; autoplay policies want both.
        v.muted = true;
        v.defaultMuted = true;
        v.setAttribute("muted", "");
        try {
          v.currentTime = 0;
        } catch {
          /* not loaded yet */
        }
        const tryPlay = () => {
          const p = v.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        };
        tryPlay();
        v.addEventListener("canplay", tryPlay, { once: true });
        // If the clip is shorter than planned, follow the clip.
        const onMeta = () => {
          if (v.duration && isFinite(v.duration) && v.duration < planned + 1.2) {
            durationRef.current = Math.max(3, v.duration - 1.3);
          }
        };
        if (v.readyState >= 1) onMeta();
        else v.addEventListener("loadedmetadata", onMeta, { once: true });
      }
      const n = videoRefs.current[(index + 1) % scenes.length];
      if (n && n.preload !== "auto") n.preload = "auto";
      // Let the outgoing clip keep moving through the crossfade, then pause everything else
      // so only one clip decodes at a time.
      window.setTimeout(() => {
        videoRefs.current.forEach((o, i) => {
          if (o && i !== indexRef.current && !o.paused) o.pause();
        });
      }, 1400);
    }

    // One advance mechanism only (a timeout plus an interval could both fire and skip a scene).
    let advanced = false;
    const check = window.setInterval(() => {
      const elapsed = (performance.now() - startedAt.current) / 1000;
      if (!advanced && elapsed >= durationRef.current - 0.05) {
        advanced = true;
        window.clearInterval(check);
        next();
      }
    }, 200);

    return () => {
      if (raf.current) window.cancelAnimationFrame(raf.current);
      window.clearInterval(check);
    };
  }, [index, scene, maxSeconds, next, reduce, scenes.length, zoomTo]);

  return (
    <div className={`overflow-hidden ${className ?? "relative"}`} style={style} aria-label={scene.label}>
      {/* Clips: all mounted so the next one is decoded before it fades in; only the active one is visible. */}
      {scenes.map((s, i) => {
        const active = i === index;
        return (
          <motion.div
            key={s.src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: reduce ? 0.3 : 1.0, ease: [0.4, 0, 0.2, 1] }}
            style={{ zIndex: active ? 2 : 1, pointerEvents: "none" }}
            aria-hidden={!active}
          >
            <div
              ref={(el) => {
                zoomRefs.current[i] = el;
              }}
              className={`absolute inset-0 ${zoomTo !== 1 ? "will-change-transform" : ""}`}
              style={{ transformOrigin: "50% 50%" }}
            >
              {reduce ? (
                <img src={s.poster} alt="" className="h-full w-full object-cover" />
              ) : (
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  className="h-full w-full object-cover"
                  src={s.src}
                  poster={s.poster}
                  muted
                  playsInline
                  preload={i === 0 ? "auto" : "metadata"}
                  aria-hidden="true"
                />
              )}
            </div>
          </motion.div>
        );
      })}

      {chrome && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 p-5 sm:p-8">
          <div className="flex gap-1.5" aria-hidden="true">
            {scenes.map((s, i) => (
              <div key={s.src} className={`h-[3px] flex-1 overflow-hidden rounded-full ${barClass}`}>
                <div
                  className={`h-full rounded-full ${barActiveClass}`}
                  style={{
                    width: i < index ? "100%" : i === index ? `${progress * 100}%` : "0%",
                    transition: i === index ? "none" : "width 300ms",
                  }}
                />
              </div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={scene.label}
              className={captionClass}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45 }}
              aria-live="polite"
            >
              <span>{scene.label}</span>
              {scene.sub && <span className="opacity-70"> · {scene.sub}</span>}
            </motion.p>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
