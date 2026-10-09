import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cantSell } from "../../shared/content";
import { Reveal, fadeUp, stagger } from "../../shared/motion";
import { btnPrimary, container, Em, ParallaxImage } from "../ui";

export function CantSell() {
  const reduce = useReducedMotion();
  // Emphasise the last word of the title ("rental.").
  const words = cantSell.title.split(" ");
  const last = words.pop();

  return (
    <section aria-labelledby="cant-sell-title" className="py-20 sm:py-32">
      <div className={`${container} grid items-center gap-12 lg:grid-cols-12 lg:gap-20`}>
        <Reveal className="relative lg:col-span-6">
          <ParallaxImage
            src={cantSell.image}
            alt="Homeowner working at a dining table in a bright home with mountain views"
            className="aspect-[4/5] rounded-2xl bg-sand sm:aspect-[3/2] lg:aspect-[4/5]"
            imgClassName="object-[60%_50%]"
          />
        </Reveal>

        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">{cantSell.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="cant-sell-title"
              className="mt-5 font-display text-[clamp(2.1rem,3.9vw,3.25rem)] leading-[1.08] font-medium tracking-[-0.015em] text-balance text-ink"
            >
              {words.join(" ")} <Em>{last}</Em>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 text-lg leading-relaxed text-muted">{cantSell.body}</p>
          </Reveal>
          <motion.ol
            variants={stagger(0.08)}
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-9 grid gap-0 border-t border-line"
          >
            {cantSell.bullets.map((b, i) => (
              <motion.li key={b} variants={fadeUp} className="flex items-baseline gap-5 border-b border-line py-4">
                <span className="w-6 flex-none font-display text-lg text-pm-rust italic">{i + 1}.</span>
                <span className="text-[1.0625rem] leading-snug text-ink">{b}</span>
              </motion.li>
            ))}
          </motion.ol>
          <Reveal delay={0.1}>
            <a href="#contact" className={`${btnPrimary} group mt-10`}>
              {cantSell.cta}
              <ArrowRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
