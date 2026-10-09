import { brand, estateStills, services } from "../../shared/content";
import { Reveal } from "../../shared/motion";
import { ArrowLink, container, Eyebrow, FramedImage, h2Class, sectionPad } from "../ui";

// Stills from the hero walkthrough, one per service (per the Estate brief).
const photo: Record<string, { src: string; alt: string }> = {
  "property-management": { src: estateStills.kitchen, alt: "Bright kitchen with a white quartz island, warm wood cabinets and a stone column" },
  commercial: { src: estateStills.approach, alt: "Craftsman homes with stone accents on a quiet, tree-lined cul-de-sac" },
  buying: { src: estateStills.hearth, alt: "Living room with a slate-clad fireplace, white sofas and tall sheer curtains" },
  selling: { src: estateStills.greatRoom, alt: "Great room with a vaulted beamed ceiling, linear fireplace and wall of windows" },
};

export function Services() {
  const [first, rest] = brand.tagline.split(" & ");
  return (
    <section id="services" aria-labelledby="services-title" className={`bg-warm-white ${sectionPad}`}>
      <div className={container}>
        <div className="border-b border-line pb-14 sm:pb-20">
          <div className="max-w-4xl">
            <Reveal>
              <Eyebrow>What we do</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="services-title" className={`${h2Class} mt-7 text-ink`}>
                {first} <em className="italic text-brass-deep">&amp;</em> {rest}
              </h2>
            </Reveal>
          </div>
        </div>

        <div>
          {services.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-title`}
                className="grid gap-12 border-b border-line py-16 last:border-b-0 last:pb-0 sm:py-24 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-28"
              >
                <Reveal className={`lg:row-start-1 ${flip ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-6 lg:col-start-1"}`}>
                  <FramedImage src={photo[s.id].src} alt={photo[s.id].alt} offset={flip ? "left" : "right"} />
                </Reveal>

                <div className={`lg:row-start-1 ${flip ? "lg:col-span-5 lg:col-start-1" : "lg:col-span-5 lg:col-start-8"}`}>
                  <Reveal>
                    <div className="flex items-center gap-5">
                      <span className="font-display text-[3.25rem] leading-none text-brass-deep">{String(i + 1).padStart(2, "0")}</span>
                      <span aria-hidden="true" className="h-px flex-1 bg-brass/45" />
                    </div>
                  </Reveal>
                  <Reveal delay={0.06}>
                    <h3 id={`${s.id}-title`} className="mt-7 font-display text-[clamp(2.1rem,3.4vw,3.1rem)] leading-[1.05] text-balance text-ink">
                      {s.title}
                    </h3>
                  </Reveal>
                  <Reveal delay={0.12}>
                    <p className="mt-5 text-lg leading-relaxed font-medium text-ink/85">{s.short}</p>
                    <p className="text-body mt-4 text-muted">{s.body}</p>
                  </Reveal>
                  <Reveal delay={0.18}>
                    <ul className="dash-list text-body mt-7 space-y-3 text-ink">
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <div className="mt-9">
                      <ArrowLink href="#contact">Talk to us</ArrowLink>
                    </div>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
