import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ClipboardCheck, FileSignature, Gavel, MonitorSmartphone, Receipt, UserCheck, type LucideIcon } from "lucide-react";
import { media, propertyManagement as pm } from "../../shared/content";
import { BgVideo, Reveal, easeOut, fadeUp, stagger } from "../../shared/motion";
import { btnPrimary, container, Em } from "../ui";

// Blend from brand blue to brand orange along the process line.
const mix = (t: number) => `color-mix(in srgb, var(--color-pm-orange) ${Math.round(t * 100)}%, var(--color-pm-blue))`;

const includedIcons: LucideIcon[] = [UserCheck, Receipt, ClipboardCheck, FileSignature, Gavel, MonitorSmartphone];

export function PropertyManagement() {
  const reduce = useReducedMotion();
  const [first, ...rest] = pm.title.split(" ");

  return (
    <section aria-labelledby="pm-title" className="relative overflow-hidden border-y border-line bg-paper py-20 sm:py-32">
      <div className={container}>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Story */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">{pm.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="pm-title"
                className="mt-5 font-display text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.06] font-medium tracking-[-0.015em] text-balance text-ink"
              >
                <Em>{first}</Em> {rest.join(" ")}
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">{pm.body}</p>
            </Reveal>

            <Reveal delay={0.2}>
              <h3 className="mt-12 text-[13px] font-semibold tracking-[0.18em] text-ink uppercase">What is included</h3>
            </Reveal>
            <motion.ul
              variants={stagger(0.07)}
              initial={reduce ? "show" : "hidden"}
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="mt-5 grid border-t border-line sm:grid-cols-2 sm:gap-x-10"
            >
              {pm.included.map((item, i) => {
                const Icon = includedIcons[i] ?? ClipboardCheck;
                return (
                  <motion.li key={item} variants={fadeUp} className="flex min-h-[4.25rem] items-center gap-4 border-b border-line py-3">
                    <span className="inline-flex size-10 flex-none items-center justify-center rounded-full bg-pm-blue/[0.07] text-pm-blue">
                      <Icon className="size-[19px]" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="leading-snug text-ink">{item}</span>
                  </motion.li>
                );
              })}
            </motion.ul>

            <Reveal delay={0.1}>
              <a href="#contact" className={`${btnPrimary} group mt-10`}>
                {pm.cta}
                <ArrowRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </Reveal>
          </div>

          {/* Living media */}
          <Reveal className="lg:col-span-5" delay={0.1}>
            <figure className="relative lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
                <BgVideo src={media.video.homeOffice.src} poster={media.video.homeOffice.poster} className="absolute inset-0 h-full w-full object-cover object-[88%_50%]" />
                <figcaption className="absolute bottom-4 left-4 rounded-2xl border border-white/60 bg-cream/90 px-5 py-4 shadow-[0_20px_40px_-24px_rgba(14,27,51,0.6)] backdrop-blur-md sm:bottom-6 sm:left-6 sm:px-6 sm:py-5">
                  <p className="font-display text-[1.5rem] leading-tight text-pm-blue italic sm:text-[1.75rem]">No surprises.</p>
                  <p className="font-display text-[1.5rem] leading-tight text-ink sm:text-[1.75rem]">No hidden fees.</p>
                </figcaption>
              </div>
              <div
                aria-hidden="true"
                className="absolute -top-4 -right-4 -z-10 hidden h-full w-full rounded-2xl border border-pm-orange/40 sm:block"
              />
            </figure>
          </Reveal>
        </div>

        {/* Process */}
        <div className="mt-24 sm:mt-32">
          <Reveal>
            <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-medium text-ink">
              How it <Em>works</Em>
            </h3>
          </Reveal>

          <motion.ol
            className="relative mt-12 grid gap-10 lg:grid-cols-4 lg:gap-8"
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Connecting line, drawn as the steps reveal. Triggered by the list so a zero-size line still animates. */}
            <motion.span
              aria-hidden="true"
              className="absolute top-7 right-[calc(25%-52px)] left-7 hidden h-px origin-left bg-[linear-gradient(90deg,var(--color-pm-blue),var(--color-pm-orange))] lg:block"
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.6, ease: easeOut } } }}
            />
            {pm.process.map((p, i) => (
              <motion.li
                key={p.step}
                className="relative grid grid-cols-[3.5rem_1fr] gap-x-6 lg:block"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut, delay: 0.15 + i * 0.32 } },
                }}
              >
                {i < pm.process.length - 1 ? (
                  <motion.span
                    aria-hidden="true"
                    className="absolute top-14 -bottom-10 left-7 w-px origin-top lg:hidden"
                    style={{ background: `linear-gradient(180deg, ${mix(i / 3)}, ${mix((i + 1) / 3)})` }}
                    variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.5, ease: easeOut, delay: 0.45 + i * 0.32 } } }}
                  />
                ) : null}
                <span className="relative z-10 inline-flex size-14 items-center justify-center rounded-full border border-pm-blue/30 bg-paper font-display text-xl text-pm-blue italic shadow-[0_0_0_8px_var(--color-paper)]">
                  {p.step}
                </span>
                <div className="lg:mt-8 lg:pr-4">
                  <h4 className="font-display text-[1.5rem] leading-tight font-medium text-ink">{p.title}</h4>
                  <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
