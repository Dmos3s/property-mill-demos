import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, KeyRound } from "lucide-react";
import { useRef } from "react";
import { cantSell } from "../../shared/content";
import { Reveal } from "../../shared/motion";
import { btnPrimary, container, SectionHeading } from "./ui";

export function CantSell() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [-3, -3] : [-7, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);

  return (
    <section className="relative py-16 sm:py-20 lg:py-28">
      <div className={`${container} grid items-center gap-16 lg:grid-cols-2 lg:gap-20`}>
        <div ref={ref} className="relative mx-auto w-full max-w-[520px] px-2 sm:px-6">
          <div aria-hidden="true" className="absolute inset-8 -z-10 rounded-full bg-electric/30 blur-[90px]" />
          <motion.div style={{ rotate, y }} className="glass rounded-[32px] p-3 shadow-[0_50px_120px_-40px_rgba(59,108,255,0.55)] sm:p-4">
            <img
              src={cantSell.image}
              alt="Homeowner at a dining table in a bright home with large windows and mountain views"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-[22px] object-cover lg:aspect-[4/5]"
            />
            <div className="glass-dark absolute -bottom-6 right-3 flex sm:-right-8 items-center gap-3 rounded-2xl px-4 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] sm:-right-8">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber text-night">
                <KeyRound className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-display text-[15px] font-semibold leading-tight text-text">
                Fixed monthly
                <br />
                rate
              </span>
            </div>
          </motion.div>
        </div>

        <div>
          <SectionHeading eyebrow={cantSell.eyebrow} title={cantSell.title} body={cantSell.body} />
          <Reveal delay={0.1}>
            <ul className="mt-8 grid gap-4">
              {cantSell.bullets.map((b) => (
                <li key={b} className="flex items-start gap-4 border-b border-line pb-4 text-[17px] leading-snug text-text/90 last:border-b-0">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber/15 ring-1 ring-amber/50">
                    <Check className="h-3.5 w-3.5 text-amber" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <a href="#contact" className={`${btnPrimary} mt-8`}>
              {cantSell.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
