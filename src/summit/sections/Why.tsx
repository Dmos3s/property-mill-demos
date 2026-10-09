import { motion, useReducedMotion } from "framer-motion";
import { Building2, MapPinned, ShieldCheck, type LucideIcon } from "lucide-react";
import { media, why } from "../../shared/content";
import { Reveal, easeOut } from "../../shared/motion";
import { container, ParallaxImage } from "../ui";

const icons: Record<string, LucideIcon> = { ShieldCheck, Building2, MapPinned };

export function Why() {
  const reduce = useReducedMotion();
  const [lead, ...rest] = why.title.split(" ");

  return (
    <section aria-labelledby="why-title" className="border-y border-line bg-paper py-20 sm:py-32">
      <div className={`${container} grid gap-14 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow">{why.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="why-title"
                className="mt-5 font-display text-[clamp(2.4rem,4.8vw,4rem)] leading-[1.04] font-medium tracking-[-0.02em] text-balance text-ink"
              >
                <em className="text-pm-blue italic">{lead}</em> {rest.join(" ")}
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{why.body}</p>
            </Reveal>
          </div>
        </div>

        <ol className="border-t border-line lg:col-span-7">
          {why.pillars.map((p, i) => {
            const Icon = icons[p.icon] ?? ShieldCheck;
            return (
              <motion.li
                key={p.title}
                className="group grid gap-5 border-b border-line py-9 sm:grid-cols-[4.5rem_1fr] sm:gap-8 sm:py-11"
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: easeOut, delay: i * 0.1 }}
              >
                <span className="inline-flex size-[4.5rem] items-center justify-center rounded-full border border-line bg-cream text-pm-blue transition-colors duration-300 group-hover:border-pm-blue group-hover:bg-pm-blue group-hover:text-white">
                  <Icon className="size-7" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-base text-pm-rust italic">0{i + 1}</p>
                  <h3 className="mt-1 font-display text-[1.625rem] leading-tight font-medium text-ink sm:text-[1.875rem]">{p.title}</h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-muted">{p.body}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>

      <div className={`${container} mt-20 sm:mt-28`}>
        <Reveal>
          <ParallaxImage
            src={media.photo.gogPikes}
            alt="Red sandstone formations of Garden of the Gods with snow capped Pikes Peak behind"
            className="aspect-[4/3] rounded-2xl bg-sand sm:aspect-[21/9]"
            strength={7}
          >
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,27,51,0)_55%,rgba(14,27,51,0.5)_100%)]" />
            <p className="absolute bottom-5 left-5 text-[13px] font-semibold tracking-[0.16em] text-white uppercase sm:bottom-7 sm:left-8">
              Garden of the Gods and Pikes Peak
            </p>
          </ParallaxImage>
        </Reveal>
      </div>
    </section>
  );
}
