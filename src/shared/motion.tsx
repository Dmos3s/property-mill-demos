// Shared motion primitives used by all three demos.
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export const stagger = (delay = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren } },
});

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "span" | "p" | "h1" | "h2" | "h3";
  style?: CSSProperties;
};

/** Fade and rise into view when scrolled into the viewport. */
export function Reveal({ children, className, delay = 0, y = 28, once = true, as = "div", style }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px 0px -60px 0px" }}
      transition={{ duration: 0.7, ease: easeOut, delay }}
    >
      {children}
    </Tag>
  );
}

/** Headline that reveals one word at a time. */
export function WordReveal({
  text,
  className,
  delay = 0,
  step = 0.06,
  as = "h1",
  immediate = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
  as?: "h1" | "h2" | "h3" | "p";
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      aria-label={text}
      initial={reduce ? "show" : "hidden"}
      {...(immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-60px" } })}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: easeOut } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

/** Number that counts up when it scrolls into view. */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const rounded = useTransform(spring, (v) => Math.round(v).toLocaleString("en-US"));

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = `${prefix}${value.toLocaleString("en-US")}${suffix}`;
      return;
    }
    return rounded.on("change", (v) => {
      el.textContent = `${prefix}${v}${suffix}`;
    });
  }, [rounded, prefix, suffix, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {reduce ? value.toLocaleString("en-US") : 0}
      {suffix}
    </span>
  );
}

/** Infinite horizontal marquee. Pass children twice internally for a seamless loop. */
export function Marquee({
  children,
  speed = 40,
  className,
  reverse = false,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  reverse?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={`overflow-hidden ${className ?? ""}`} aria-hidden="true">
      <div
        className="flex w-max"
        style={{
          animation: reduce ? "none" : `pm-marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    </div>
  );
}

/** Background video that respects reduced motion (falls back to the poster). */
export function BgVideo({
  src,
  poster,
  className,
  style,
}: {
  src: string;
  poster: string;
  className?: string;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <img src={poster} alt="" className={className} style={style} />;
  }
  return (
    <video
      className={className}
      style={style}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}

/** Smooth-scroll anchor handler for the whole page. */
export function useSmoothAnchors() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
