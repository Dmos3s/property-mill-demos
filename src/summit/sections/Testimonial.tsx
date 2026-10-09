import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { partners, testimonial } from "../../shared/content";
import { Reveal, fadeUp, stagger } from "../../shared/motion";
import { container } from "../ui";

export function Testimonial() {
  const reduce = useReducedMotion();
  return (
    <section aria-label="What clients say" className="py-20 sm:py-32">
      <div className={container}>
        <figure className="mx-auto max-w-5xl">
          <Reveal>
            <Quote className="size-12 text-pm-orange sm:size-14" strokeWidth={1.25} aria-hidden="true" />
          </Reveal>
          <Reveal delay={0.08}>
            <blockquote className="mt-8 font-display text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[1.3] font-normal tracking-[-0.01em] text-ink">
              <p>{testimonial.quote}</p>
            </blockquote>
          </Reveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-10 flex items-center gap-4">
              <img
                src={testimonial.avatar}
                alt={`${testimonial.name}`}
                width={56}
                height={56}
                loading="lazy"
                className="size-14 rounded-full object-cover ring-4 ring-paper"
              />
              <div>
                <p className="font-semibold text-ink">{testimonial.name}</p>
                <p className="text-muted">{testimonial.role}</p>
              </div>
            </figcaption>
          </Reveal>
        </figure>

        <div className="mx-auto mt-20 max-w-5xl border-t border-line pt-12 sm:mt-24">
          <Reveal>
            <p className="text-center text-[13px] font-semibold tracking-[0.18em] text-muted uppercase">Trusted local partners</p>
          </Reveal>
          <motion.ul
            variants={stagger(0.1)}
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="mt-8 grid grid-cols-3 items-center gap-4 sm:gap-10"
          >
            {partners.map((p) => (
              <motion.li key={p.name} variants={fadeUp} className="flex justify-center">
                <img
                  src={p.logo}
                  alt={p.name}
                  loading="lazy"
                  className="aspect-[2/1] w-full max-w-[11.5rem] object-cover opacity-70 mix-blend-multiply grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
