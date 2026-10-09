import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { services } from "../../shared/content";
import { easeOut } from "../../shared/motion";
import { container, Em, SectionHeading } from "../ui";

const alts: Record<string, string> = {
  "property-management": "Bright living room in a well kept rental home",
  commercial: "Colorado Springs skyline with downtown office buildings",
  buying: "Craftsman style home surrounded by pine trees",
  selling: "Colorado Springs neighborhood rooftops with the downtown skyline beyond",
};

const kicker: Record<string, string> = {
  "property-management": "Residential",
  commercial: "Commercial",
  buying: "Buyers",
  selling: "Sellers",
};

export function Services() {
  const reduce = useReducedMotion();
  return (
    <section id="services" aria-labelledby="services-title" className="pt-24 pb-20 sm:pt-36 sm:pb-32">
      <div className={container}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="services-title"
            className="lg:col-span-7"
            eyebrow="What we do"
            title={
              <>
                Four services. One <Em>local</Em> team.
              </>
            }
          />
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-20 lg:gap-8">
          {services.map((s, i) => (
            <motion.article
              key={s.id}
              id={s.id}
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px 0px -60px 0px" }}
              transition={{ duration: 0.75, ease: easeOut, delay: (i % 2) * 0.12 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-shadow duration-300 hover:shadow-[0_40px_70px_-40px_rgba(14,27,51,0.45)]"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-sand">
                <img
                  src={s.image}
                  alt={alts[s.id] ?? ""}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-x-0 top-0 h-[116%] w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:-translate-y-[13.8%]"
                />
                <span className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-cream/95 px-3.5 py-1.5 text-[13px] font-semibold tracking-[0.14em] text-ink uppercase backdrop-blur">
                  <span className="font-display text-sm tracking-normal text-pm-rust italic">0{i + 1}</span>
                  {kicker[s.id]}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7 sm:p-10">
                <h3 className="font-display text-[1.75rem] leading-tight font-medium tracking-[-0.01em] text-ink sm:text-[2rem]">{s.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-ink">{s.short}</p>
                <p className="mt-4 leading-relaxed text-muted">{s.body}</p>
                <ul className="mt-7 grid gap-3 border-t border-line pt-7">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 leading-snug text-ink">
                      <Check className="mt-[3px] size-[18px] flex-none text-pm-orange" strokeWidth={2.25} aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <a href="#contact" className="group/link inline-flex min-h-11 cursor-pointer items-center gap-2 font-semibold text-pm-blue transition-colors duration-200 hover:text-pm-blue-deep">
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover/link:bg-[length:100%_1px]">
                      Talk to us
                    </span>
                    <ArrowRight className="size-[18px] transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
