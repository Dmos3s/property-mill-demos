// Small building blocks shared by the Estate sections.
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, type ReactNode } from "react";

export const container = "mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12";

export const sectionPad = "py-24 sm:py-32 lg:py-40";

const btn =
  "label inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-3 px-8 text-center transition-[background-color,color,border-color] duration-300 ease-out";

/** Solid brass, ink text. */
export const btnBrass = `${btn} bg-brass text-ink hover:bg-warm-white`;

/** Hairline outline on dark surfaces. */
export const btnOutlineLight = `${btn} border border-warm-white/55 text-warm-white hover:border-warm-white hover:bg-warm-white hover:text-ink`;

/** Solid ink on light surfaces. */
export const btnInk = `${btn} bg-ink text-warm-white hover:bg-brass hover:text-ink`;

/** Brass hairline + small caps eyebrow. */
export function Eyebrow({ children, tone = "light", className = "" }: { children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <p className={`label flex items-center gap-4 ${tone === "dark" ? "text-brass" : "text-brass-text"} ${className}`}>
      <span aria-hidden="true" className={`h-px w-10 flex-none ${tone === "dark" ? "bg-brass" : "bg-brass-deep"}`} />
      <span>{children}</span>
    </p>
  );
}

/** Cormorant section title. */
export const h2Class = "font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.01em] text-balance";

/** One italic word or phrase for emphasis. */
export function Em({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return <em className={`font-display italic ${tone === "dark" ? "text-brass" : "text-brass-deep"}`}>{children}</em>;
}

/** "Talk to us" style link with a sliding arrow. */
export function ArrowLink({ href, children, tone = "light" }: { href: string; children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <a
      href={href}
      className={`label group/link inline-flex min-h-11 cursor-pointer items-center gap-3 border-b pb-1 transition-colors duration-300 ${
        tone === "dark"
          ? "border-brass/50 text-warm-white hover:border-brass hover:text-brass"
          : "border-brass-deep/50 text-ink hover:border-brass-deep hover:text-brass-text"
      }`}
    >
      {children}
      <ArrowRight
        className="size-4 transition-transform duration-300 ease-out group-hover/link:translate-x-1"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </a>
  );
}

/** Still in a fixed frame with a 1px brass offset frame behind and a slow parallax drift. */
export function FramedImage({
  src,
  alt,
  ratio = "aspect-[4/3]",
  offset = "right",
  strength = 7,
  className = "",
}: {
  src: string;
  alt: string;
  ratio?: string;
  offset?: "left" | "right";
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className={`absolute inset-0 border border-brass/80 ${
          offset === "right" ? "translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5" : "-translate-x-3 translate-y-3 sm:-translate-x-5 sm:translate-y-5"
        }`}
      />
      <div ref={ref} className={`relative overflow-hidden bg-stone ${ratio}`}>
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={reduce ? undefined : { y }}
          className="absolute inset-x-0 -top-[9%] h-[118%] w-full object-cover"
        />
      </div>
    </div>
  );
}
