import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { propertyManagement as pm } from "../../shared/content";
import { easeOut, Reveal } from "../../shared/motion";
import { btnBrass, container, Em, Eyebrow, h2Class, sectionPad } from "../ui";

export function PropertyManagement() {
  const reduce = useReducedMotion();
  const [lead, ...rest] = pm.title.split(" ");
  const draw = (axis: "x" | "y") =>
    reduce
      ? {}
      : {
          initial: axis === "x" ? { scaleX: 0 } : { scaleY: 0 },
          whileInView: axis === "x" ? { scaleX: 1 } : { scaleY: 1 },
          viewport: { once: true, margin: "-120px 0px -120px 0px" },
          transition: { duration: 1.8, ease: easeOut, delay: 0.2 },
        };

  return (
    <section aria-labelledby="pm-title" className={`dark-surface relative overflow-hidden bg-charcoal text-warm-white ${sectionPad}`}>
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow tone="dark">{pm.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="pm-title" className={`${h2Class} mt-7 text-warm-white`}>
                <Em tone="dark">{lead}</Em> {rest.join(" ")}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pb-2">
            <Reveal delay={0.16}>
              <p className="text-body text-warm-white/75">{pm.body}</p>
            </Reveal>
            <Reveal delay={0.22}>
              <a href="#contact" className={`${btnBrass} mt-9`}>
                {pm.cta}
              </a>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 sm:mt-28">
          <Reveal className="flex items-center justify-between gap-6">
            <p className="label text-brass">What is included</p>
            <p className="label hidden text-warm-white/70 sm:block">Fixed monthly rate</p>
          </Reveal>
          <ul className="mt-6 grid border-t border-line-dark sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
            {pm.included.map((item, i) => (
              <Reveal as="li" key={item} delay={0.05 * i} className="flex items-center gap-4 border-b border-line-dark py-6">
                <span className="inline-flex size-9 flex-none items-center justify-center rounded-full border border-brass/60 text-brass">
                  <Check className="size-4" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="font-display text-[1.45rem] leading-snug text-warm-white">{item}</span>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="mt-24 sm:mt-32">
          <Reveal className="flex items-center justify-between gap-6">
            <p className="label text-brass">How it works</p>
            <p className="label hidden text-warm-white/60 sm:block">Four steps</p>
          </Reveal>

          <div className="relative mt-10 pl-10 lg:pl-0 lg:pt-14">
            {/* Track + brass line that draws across (desktop) or down (phone) on reveal. */}
            <div aria-hidden="true" className="absolute top-[7px] right-0 left-0 hidden h-px bg-line-dark lg:block">
              <motion.div className="h-full origin-left bg-brass" {...draw("x")} />
            </div>
            <div aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-line-dark lg:hidden">
              <motion.div className="h-full w-full origin-top bg-brass" {...draw("y")} />
            </div>

            <ol className="grid gap-12 lg:grid-cols-4 lg:gap-10">
              {pm.process.map((p, i) => (
                <Reveal as="li" key={p.step} delay={0.15 + i * 0.15} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-1 -left-10 size-[15px] rounded-full border border-brass bg-charcoal lg:-top-14 lg:left-0"
                  >
                    <span className="absolute inset-[4px] rounded-full bg-brass" />
                  </span>
                  <p className="font-display text-[3rem] leading-none text-brass">{p.step}</p>
                  <h3 className="mt-5 font-display text-[1.75rem] leading-tight text-warm-white">{p.title}</h3>
                  <p className="text-body mt-3 text-warm-white/70">{p.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
