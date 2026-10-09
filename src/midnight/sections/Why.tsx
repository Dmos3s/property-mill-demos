import { motion, useReducedMotion } from "framer-motion";
import { Building2, MapPinned, ShieldCheck, type LucideIcon } from "lucide-react";
import { media, why } from "../../shared/content";
import { easeOut } from "../../shared/motion";
import { container, SectionHeading } from "./ui";

const icons: Record<string, LucideIcon> = { ShieldCheck, Building2, MapPinned };

export function Why() {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-28">
      <img
        src={media.photo.pikesGogWide}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-night via-night/60 to-night" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--color-night)_80%)]" />

      <div className={container}>
        <SectionHeading center eyebrow={why.eyebrow} title={why.title} body={why.body} />
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {why.pillars.map((p, i) => {
            const Icon = icons[p.icon] ?? ShieldCheck;
            return (
              <motion.article
                key={p.title}
                initial={reduce ? false : { opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: easeOut, delay: i * 0.1 }}
                className="glass group relative overflow-hidden rounded-[28px] p-6 transition-[box-shadow,border-color] duration-300 hover:border-electric/50 hover:glow-electric sm:p-8 lg:p-10"
              >
                <div aria-hidden="true" className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-electric/15 blur-3xl" />
                <div className="relative flex items-center gap-4 lg:block">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-electric/15 shadow-[0_0_32px_-6px_rgba(59,108,255,0.85)] ring-1 ring-electric/50 lg:h-14 lg:w-14">
                    <Icon className="h-6 w-6 text-electric-soft" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-[20px] font-semibold leading-tight tracking-[-0.02em] text-text lg:mt-7 lg:text-[22px]">{p.title}</h3>
                </div>
                <p className="relative mt-4 text-[16px] leading-relaxed text-muted lg:mt-3">{p.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
