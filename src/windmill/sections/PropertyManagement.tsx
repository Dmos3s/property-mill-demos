// Property management spotlight: the big brand-blue block. Fixed-rate story, what is included, four steps.
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { propertyManagement as pm } from "../../shared/content";
import { easeOut } from "../../shared/motion";
import { Windmill } from "../../shared/Windmill";
import { Eyebrow, Item, Stagger, btnWhite } from "./ui";

export function PropertyManagement() {
  return (
    <section aria-labelledby="pm-title" className="px-2 py-20 sm:px-4 sm:py-28">
      <div className="relative mx-auto max-w-[1320px] rounded-[2rem] bg-pm-blue text-white sm:rounded-[2.5rem]">
        {/* Decoration, clipped to the block */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(255,255,255,0.18),transparent_45%)]" />
          <div className="absolute -right-40 top-1/3 h-[34rem] w-[34rem] rounded-full border-[56px] border-white/[0.05]" />
          <div className="absolute -left-24 -bottom-32 h-80 w-80 rounded-full border-[40px] border-white/[0.05]" />
          <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_55%)]" />
        </div>

        <RateBadge className="absolute -top-12 right-5 z-10 h-28 w-28 sm:-top-16 sm:right-10 sm:h-36 sm:w-36 lg:right-14 lg:h-44 lg:w-44" />

        <div className="relative mx-auto max-w-[1240px] px-6 pb-8 pt-16 sm:px-10 sm:pb-12 sm:pt-20 lg:px-14 lg:pt-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <Stagger>
              <Item>
                <Eyebrow tone="onBlue">{pm.eyebrow}</Eyebrow>
              </Item>
              <Item as="h2" id="pm-title" className="mt-5 text-[2.2rem] leading-[1.05] font-extrabold sm:text-5xl lg:text-[3.4rem]">
                {pm.title}
              </Item>
              <Item as="p" className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
                {pm.body}
              </Item>
              <Item className="mt-9">
                <a href="#contact" className={btnWhite}>
                  {pm.cta}
                  <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </Item>
            </Stagger>

            <div className="lg:pt-24">
              <p className="font-display text-lg font-bold text-white">What is included</p>
              <Stagger as="ul" className="mt-5 flex flex-wrap gap-3" delay={0.06}>
                {pm.included.map((item) => (
                  <Item
                    as="li"
                    key={item}
                    className="inline-flex items-center gap-2.5 rounded-[1.4rem] bg-white py-2 pl-2 pr-5 text-base font-semibold leading-snug text-ink shadow-[0_12px_24px_-14px_rgba(0,0,0,0.5)]"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-pm-blue text-white">
                      <Check size={15} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {item}
                  </Item>
                ))}
              </Stagger>
            </div>
          </div>

          <div className="mt-16 border-t border-white/15 pt-12 sm:mt-20">
            <p className="font-display text-lg font-bold text-white">How it works</p>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pm.process.map((p, i) => (
                <StepCard key={p.step} index={i} step={p.step} title={p.title} body={p.body} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Numbered step whose ring fills when it scrolls into view. */
function StepCard({ index, step, title, body }: { index: number; step: string; title: string; body: string }) {
  const reduce = useReducedMotion();
  const fill = (index + 1) / 4;
  return (
    <motion.li
      className="relative rounded-3xl bg-white/[0.08] p-6 ring-1 ring-white/15 sm:p-7"
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: easeOut, delay: index * 0.12 }}
    >
      <div className="relative h-16 w-16">
        <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden="true">
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="4" />
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="#F26A1B"
            strokeWidth="4"
            strokeLinecap="round"
            initial={reduce ? { pathLength: fill } : { pathLength: 0 }}
            whileInView={{ pathLength: fill }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: easeOut, delay: 0.25 + index * 0.18 }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-lg font-extrabold">{step}</span>
      </div>
      <h3 className="mt-6 text-xl font-bold">{title}</h3>
      <p className="mt-2.5 text-base leading-relaxed text-white/80">{body}</p>
    </motion.li>
  );
}

/** Orange sticker with circular text that rotates slowly around a small windmill. */
function RateBadge({ className }: { className: string }) {
  return (
    <div className={className}>
      <div className="relative h-full w-full rounded-full shadow-[0_24px_40px_-18px_rgba(11,16,32,0.6)]">
        <svg viewBox="0 0 200 200" className="wm-spin absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <path id="wm-badge-path" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
          </defs>
          <circle cx="100" cy="100" r="99" fill="#F26A1B" />
          <text
            fill="#0B1020"
            fontSize="18"
            fontWeight="800"
            letterSpacing="1"
            textLength="462"
            lengthAdjust="spacing"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <textPath href="#wm-badge-path">FIXED RATE • PREDICTABLE COSTS •{"\u00a0"}</textPath>
          </text>
        </svg>
        <div className="absolute inset-[27%] grid place-items-center rounded-full bg-white">
          <Windmill className="h-[78%] w-auto" speed={10} title="Fixed rate, predictable costs" />
        </div>
      </div>
    </div>
  );
}
