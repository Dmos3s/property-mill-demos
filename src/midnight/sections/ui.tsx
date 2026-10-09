// Small building blocks shared by the Midnight sections.
import type { ReactNode } from "react";
import { Reveal, WordReveal } from "../../shared/motion";

export const container = "mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12";

const btnBase =
  "group inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-[16px] font-semibold tracking-[-0.01em] transition duration-200";

export const btnPrimary = `${btnBase} bg-electric-deep text-white shadow-[0_12px_40px_-12px_rgba(59,108,255,0.9)] hover:bg-electric-hover hover:shadow-[0_16px_56px_-10px_rgba(59,108,255,1)]`;

export const btnGlass = `${btnBase} glass text-text hover:border-white/30 hover:bg-white/10`;

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-3 font-display text-[14px] font-semibold uppercase tracking-[0.18em] text-amber ${className}`}>
      <span aria-hidden="true" className="h-px w-8 bg-amber/70" />
      {children}
    </p>
  );
}

export const h2Class =
  "font-display text-[clamp(2.15rem,4.4vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.035em] text-text text-balance";

export function SectionHeading({
  eyebrow,
  title,
  body,
  center = false,
  className = "",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      <Reveal y={16}>
        <Eyebrow className={center ? "justify-center" : ""}>{eyebrow}</Eyebrow>
      </Reveal>
      <WordReveal as="h2" text={title} immediate={false} step={0.045} className={`mt-5 ${h2Class}`} />
      {body ? (
        <Reveal delay={0.15}>
          <p className={`mt-6 text-[18px] leading-relaxed text-muted ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{body}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
