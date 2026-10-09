import { motion, useReducedMotion } from "framer-motion";
import { Mail } from "lucide-react";
import { brand, team } from "../../shared/content";
import { Reveal, easeOut } from "../../shared/motion";
import { Windmill } from "../../shared/Windmill";
import { container, Em, SectionHeading } from "../ui";

export function Team() {
  const reduce = useReducedMotion();
  const hans = team.find((p) => p.featured) ?? team[0];
  const agents = team.filter((p) => p !== hans);

  return (
    <section id="team" aria-labelledby="team-title" className="border-t border-line bg-paper py-20 sm:py-32">
      <div className={container}>
        <SectionHeading
          id="team-title"
          eyebrow="Our team"
          title={
            <>
              The people behind <Em>Property Mill</Em>.
            </>
          }
          className="max-w-3xl"
        />

        {/* Hans, featured */}
        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative flex aspect-[4/5] max-h-[36rem] w-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-cream p-8 sm:p-10">
              <div aria-hidden="true" className="pointer-events-none absolute top-7 right-7 w-[34%] opacity-[0.28] sm:top-9 sm:right-9">
                <Windmill
                  className="h-auto w-full"
                  tower="rgba(0,0,0,0)"
                  blade="rgba(0,0,0,0)"
                  bladeStroke="#1D3FD6"
                  ring="#1D3FD6"
                  ringInner="rgba(0,0,0,0)"
                  speed={28}
                  title=""
                />
              </div>
              <p className="eyebrow relative">Since 2001</p>
              <p aria-hidden="true" className="relative font-display text-[clamp(7rem,16vw,12rem)] leading-[0.85] font-normal tracking-[-0.04em] text-ink">
                H<span className="text-pm-blue italic">R</span>
              </p>
              <div className="relative flex items-center gap-3 text-muted">
                <span className="h-px w-10 bg-pm-orange" aria-hidden="true" />
                <span className="font-display text-lg italic">{brand.fullName}</span>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col justify-center lg:col-span-7">
            <Reveal>
              <h3 className="font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-tight font-medium tracking-[-0.015em] text-ink">{hans.name}</h3>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-2 text-[13px] font-semibold tracking-[0.18em] text-pm-rust uppercase">{hans.role}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-lg leading-relaxed text-muted">{hans.bio}</p>
            </Reveal>
            <ul className="mt-8 border-t border-line">
              {hans.facts?.map((f, i) => (
                <motion.li
                  key={f}
                  className="flex items-baseline gap-4 border-b border-line py-4 text-ink"
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, ease: easeOut, delay: 0.1 + i * 0.1 }}
                >
                  <span className="size-1.5 flex-none translate-y-[-2px] rounded-full bg-pm-orange" aria-hidden="true" />
                  <span className="leading-snug">{f}</span>
                </motion.li>
              ))}
            </ul>
            {hans.email ? (
              <Reveal delay={0.1}>
                <a
                  href={`mailto:${hans.email}`}
                  className="mt-8 inline-flex min-h-11 cursor-pointer items-center gap-2.5 font-semibold text-pm-blue transition-colors duration-200 hover:text-pm-blue-deep"
                >
                  <Mail className="size-[18px]" aria-hidden="true" />
                  {hans.email}
                </a>
              </Reveal>
            ) : null}
          </div>
        </div>

        {/* Agents */}
        <ul className="mt-20 grid gap-5 sm:grid-cols-2 lg:mt-24 lg:gap-6 xl:grid-cols-4">
          {agents.map((p, i) => (
            <motion.li
              key={p.name}
              className="group flex flex-col rounded-2xl border border-line bg-cream p-7 transition-[border-color,box-shadow,background-color] duration-300 hover:border-pm-blue/40 hover:bg-paper hover:shadow-[0_30px_60px_-36px_rgba(14,27,51,0.45)]"
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: easeOut, delay: i * 0.08 }}
            >
              <span
                aria-hidden="true"
                className="inline-flex size-16 items-center justify-center rounded-full border border-pm-blue/25 bg-paper font-display text-[1.375rem] text-pm-blue transition-colors duration-300 group-hover:border-pm-blue group-hover:bg-pm-blue group-hover:text-white"
              >
                {p.initials}
              </span>
              <h3 className="mt-6 font-display text-[1.5rem] leading-tight font-medium text-ink">{p.name}</h3>
              <p className="mt-1 text-[13px] font-semibold tracking-[0.16em] text-pm-rust uppercase">{p.role}</p>
              <p className="mt-4 leading-relaxed text-muted">{p.bio}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
