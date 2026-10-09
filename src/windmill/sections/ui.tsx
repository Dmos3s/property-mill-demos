// Small building blocks shared by the Windmill sections.
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, stagger } from "../../shared/motion";

export const container = "mx-auto w-full max-w-[1240px] px-5 sm:px-8";
export const panel = "mx-2 rounded-[2rem] bg-soft sm:mx-4 sm:rounded-[2.5rem]";
export const sectionY = "py-20 sm:py-28";

const btnBase =
  "group inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full px-6 text-base font-semibold transition-colors duration-200 sm:min-h-14 sm:px-7";

export const btnPrimary = `${btnBase} bg-pm-blue text-white shadow-[0_14px_30px_-14px_rgba(20,40,210,0.8)] hover:bg-pm-blue-deep focus-visible:outline-pm-blue`;
export const btnOutline = `${btnBase} border-2 border-ink text-ink hover:bg-ink hover:text-white focus-visible:outline-ink`;
export const btnWhite = `${btnBase} bg-white text-pm-blue hover:bg-sky focus-visible:outline-white`;

type Tone = "orange" | "blue" | "onBlue";

const toneClass: Record<Tone, string> = {
  orange: "bg-pm-orange/12 text-pm-orange-ink",
  blue: "bg-sky text-pm-blue",
  onBlue: "bg-white/12 text-white ring-1 ring-white/25",
};

export function Eyebrow({ children, tone = "orange", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold tracking-wide ${toneClass[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Heading block used at the top of most sections. */
export function SectionHead({
  eyebrow,
  title,
  body,
  tone = "orange",
  className = "",
  id,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  tone?: Tone;
  className?: string;
  id?: string;
}) {
  return (
    <Stagger className={className}>
      <Item>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </Item>
      <Item as="h2" id={id} className="mt-5 text-[2.1rem] leading-[1.08] font-extrabold text-ink sm:text-5xl">
        {title}
      </Item>
      {body ? (
        <Item as="p" className="mt-5 max-w-2xl text-lg text-muted">
          {body}
        </Item>
      ) : null}
    </Stagger>
  );
}

/** Parent that staggers its <Item> children into view once. */
export function Stagger({
  children,
  className,
  delay = 0.08,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "ul" | "ol";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={stagger(delay)}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px 0px -40px 0px" }}
    >
      {children}
    </Tag>
  );
}

export function Item({
  children,
  className,
  as = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "p" | "h2" | "h3" | "span";
  id?: string;
}) {
  const Tag = motion[as];
  return (
    <Tag id={id} className={className} variants={fadeUp}>
      {children}
    </Tag>
  );
}
