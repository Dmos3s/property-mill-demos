import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, CircleCheck } from "lucide-react";
import { useRef } from "react";
import { propertyManagement, services } from "../../shared/content";
import { Reveal, WordReveal, easeOut } from "../../shared/motion";
import { btnPrimary, container, Eyebrow } from "./ui";

function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden="true" className="absolute bottom-6 left-[21px] top-6 w-px bg-white/10" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: reduce ? 1 : fill }}
        className="absolute bottom-6 left-[20px] top-6 w-[3px] origin-top rounded-full bg-gradient-to-b from-electric via-electric to-amber shadow-[0_0_18px_rgba(59,108,255,0.8)]"
      />
      {propertyManagement.process.map((p, i) => (
        <motion.li
          key={p.step}
          initial={reduce ? false : { opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
          transition={{ duration: 0.7, ease: easeOut, delay: i * 0.08 }}
          className="relative pb-8 pl-[62px] last:pb-0 sm:pb-10 sm:pl-[72px]"
        >
          <span className="absolute left-0 top-0 inline-flex h-[44px] w-[44px] items-center justify-center rounded-full border border-electric/50 bg-night font-display text-[15px] font-bold text-electric-soft shadow-[0_0_24px_-4px_rgba(59,108,255,0.7)]">
            {p.step}
          </span>
          <h4 className="pt-2 font-display text-[22px] font-semibold leading-tight tracking-[-0.02em] text-text">{p.title}</h4>
          <p className="mt-2 text-[16px] leading-relaxed text-muted">{p.body}</p>
        </motion.li>
      ))}
    </ol>
  );
}

export function PropertyManagement() {
  const reduce = useReducedMotion();
  const pricingLine = services[0].bullets[0];
  return (
    <section id="fixed-rate" className="relative py-10 lg:py-14">
      <div className={container}>
        <div className="relative isolate -mx-5 overflow-hidden border-y border-line bg-panel px-5 py-12 sm:mx-0 sm:py-14 sm:rounded-[36px] sm:border sm:px-10 lg:px-16 lg:py-20">
          <div aria-hidden="true" className="absolute -left-40 -top-48 -z-10 h-[520px] w-[520px] rounded-full bg-electric/20 blur-[130px]" />
          <div aria-hidden="true" className="absolute -bottom-56 -right-40 -z-10 h-[460px] w-[460px] rounded-full bg-amber/10 blur-[130px]" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
          />

          <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <Reveal y={16}>
                <Eyebrow>{propertyManagement.eyebrow}</Eyebrow>
              </Reveal>
              <WordReveal
                as="h2"
                text={propertyManagement.title}
                immediate={false}
                step={0.045}
                className="mt-5 font-display text-[clamp(2.15rem,3.9vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.035em] text-text text-balance"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-text/80">{propertyManagement.body}</p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-amber/30 bg-amber/[0.07] px-5 py-4">
                  <span className="font-display text-[34px] font-extrabold leading-none tracking-[-0.04em] text-amber">$</span>
                  <span className="font-display text-[18px] font-semibold leading-snug tracking-[-0.01em] text-text">{pricingLine}</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <a href="#contact" className={`${btnPrimary} mt-10 w-full sm:w-auto`}>
                  {propertyManagement.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </Reveal>
            </div>

            <div className="lg:pt-1">
              <Reveal y={16}>
                <h3 className="font-display text-[14px] font-semibold uppercase tracking-[0.18em] text-muted">How it works</h3>
              </Reveal>
              <div className="glass mt-5 rounded-[24px] p-5 sm:rounded-[28px] sm:p-9">
                <Timeline />
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-line pt-10 lg:mt-16 lg:pt-12">
            <Reveal y={16}>
              <h3 className="font-display text-[14px] font-semibold uppercase tracking-[0.18em] text-muted">What is included</h3>
            </Reveal>
            <ul className="mt-5 flex flex-wrap gap-3">
              {propertyManagement.included.map((item, i) => (
                <motion.li
                  key={item}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: easeOut, delay: i * 0.05 }}
                  className="flex min-h-12 items-center gap-3 rounded-2xl border border-line bg-panel-2 px-5 py-2.5 text-[16px] font-medium text-text transition-colors duration-200 hover:border-electric/50 sm:rounded-full"
                >
                  <CircleCheck className="h-5 w-5 shrink-0 text-electric-soft" aria-hidden="true" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
