import { motion, useReducedMotion } from "framer-motion";
import { CircleCheck, Mail, Phone } from "lucide-react";
import { brand, team } from "../../shared/content";
import { Reveal, easeOut } from "../../shared/motion";
import { Windmill } from "../../shared/Windmill";
import { btnGlass, btnPrimary, container, SectionHeading } from "./ui";

const avatarStyles = [
  "bg-gradient-to-br from-electric to-[#1c3196] text-white shadow-[0_12px_32px_-12px_rgba(59,108,255,0.9)]",
  "bg-gradient-to-br from-amber to-[#c25a0c] text-night shadow-[0_12px_32px_-12px_rgba(247,147,30,0.8)]",
];

export function Team() {
  const reduce = useReducedMotion();
  const hans = team.find((p) => p.featured)!;
  const agents = team.filter((p) => !p.featured);

  return (
    <section id="team" className="relative py-16 sm:py-20 lg:py-28">
      <div className={container}>
        <SectionHeading eyebrow="Our team" title="Meet the people behind Property Mill." />

        <Reveal className="mt-14">
          <article className="grid overflow-hidden rounded-[32px] border border-line bg-panel lg:grid-cols-[0.82fr_1.18fr]">
            <div className="relative isolate flex min-h-[190px] items-end overflow-hidden bg-gradient-to-br from-electric-deep via-[#16245c] to-night p-8 sm:min-h-[360px] lg:min-h-full lg:p-10">
              <div aria-hidden="true" className="absolute -right-10 -top-10 -z-10 h-64 w-64 rounded-full bg-amber/30 blur-[90px]" />
              <div aria-hidden="true" className="absolute -bottom-8 -right-10 -z-10 w-[62%] max-w-[300px] opacity-[0.14] sm:w-[48%] lg:-right-[12%] lg:bottom-auto lg:top-10 lg:w-[88%] lg:max-w-[420px] lg:opacity-[0.16]">
                <Windmill
                  className="h-auto w-full"
                  tower="#FFFFFF"
                  blade="rgba(255,255,255,0.35)"
                  bladeStroke="#FFFFFF"
                  ring="#FFFFFF"
                  ringInner="rgba(255,255,255,0.5)"
                  speed={36}
                  title=""
                />
              </div>
              <div className="mn-grain opacity-[0.1]" aria-hidden="true" />
              <div className="relative">
                <span className="block font-display text-[clamp(5rem,14vw,10rem)] font-extrabold leading-[0.85] tracking-[-0.06em] text-white">
                  {hans.initials}
                </span>
                <span className="glass mt-6 inline-flex rounded-full px-4 py-1.5 text-[15px] font-semibold text-text">{hans.role}</span>
              </div>
            </div>
            <div className="p-8 sm:p-10 lg:p-14">
              <p className="font-display text-[14px] font-semibold uppercase tracking-[0.18em] text-amber">Founder</p>
              <h3 className="mt-3 font-display text-[clamp(2rem,3.4vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.035em] text-text">{hans.name}</h3>
              <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted">{hans.bio}</p>
              <ul className="mt-8 grid gap-3.5">
                {hans.facts?.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[16px] leading-snug text-text">
                    <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-electric-soft" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                {hans.email ? (
                  <a href={`mailto:${hans.email}`} className={btnPrimary}>
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Email Hans
                  </a>
                ) : null}
                <a href={brand.phoneHref} className={btnGlass}>
                  <Phone className="h-4 w-4 text-amber" aria-hidden="true" />
                  {brand.phone}
                </a>
              </div>
            </div>
          </article>
        </Reveal>

        <ul className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {agents.map((p, i) => (
            <motion.li
              key={p.name}
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: easeOut, delay: i * 0.08 }}
              className="group grid grid-cols-[auto_1fr] items-center gap-x-4 rounded-[24px] border border-line bg-panel p-6 transition-[box-shadow,border-color] duration-300 hover:border-electric/50 hover:glow-electric sm:p-7 xl:flex xl:flex-col xl:items-start"
            >
              <span
                aria-hidden="true"
                className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl xl:h-16 xl:w-16 font-display text-[22px] font-bold tracking-[-0.02em] ${avatarStyles[i % 2]}`}
              >
                {p.initials}
              </span>
              <div className="xl:mt-6">
                <h3 className="font-display text-[21px] font-semibold leading-tight tracking-[-0.02em] text-text">{p.name}</h3>
                <p className="mt-1 text-[15px] font-semibold text-amber">{p.role}</p>
              </div>
              <p className="col-span-2 mt-4 text-[16px] leading-relaxed text-muted">{p.bio}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
