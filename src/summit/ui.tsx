// Small building blocks shared by the Summit sections.
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Reveal } from "../shared/motion";

export const container = "mx-auto w-full max-w-7xl px-5 sm:px-8";

const pill =
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3 text-base font-semibold transition-[background-color,color,border-color,box-shadow] duration-200 ease-out";

export const btnPrimary = `${pill} bg-pm-blue text-white shadow-[0_14px_30px_-14px_rgba(29,63,214,0.75)] hover:bg-pm-blue-deep hover:shadow-[0_18px_36px_-14px_rgba(29,63,214,0.85)]`;

export const btnGhost = `${pill} border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-cream`;

export const textLink =
  "group/link inline-flex min-h-11 cursor-pointer items-center gap-2 font-semibold text-pm-blue transition-colors duration-200 hover:text-pm-orange";

/** Eyebrow + serif title (+ optional lead) with a scroll reveal. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
  titleClass = "",
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClass?: string;
  id?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} ${className}`}>
      <Reveal>
        <p className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          id={id}
          className={`mt-5 font-display text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.06] font-medium tracking-[-0.015em] text-balance text-ink ${titleClass}`}
        >
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={0.16}>
          <p className={`mt-6 text-lg leading-relaxed text-muted ${center ? "mx-auto" : ""} max-w-2xl`}>{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

/** One emphasised word: Playfair italic in brand blue. */
export function Em({ children }: { children: ReactNode }) {
  return <em className="font-display italic text-pm-blue">{children}</em>;
}

/** Photo inside a fixed box that drifts on scroll. The box never changes size. */
export function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  strength = 8,
  eager = false,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  strength?: number;
  eager?: boolean;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        style={reduce ? undefined : { y }}
        className={`absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover ${imgClassName}`}
      />
      {children}
    </div>
  );
}
