import { areas } from "../../shared/content";
import { Reveal } from "../../shared/motion";
import { container, Em, Eyebrow, h2Class, sectionPad } from "../ui";

const alts: Record<string, string> = {
  "Colorado Springs": "Rooftops of Colorado Springs neighborhoods with the downtown skyline beyond",
  "Monument, Fountain & Falcon": "Sandstone formations and pines lit by sunrise",
  "Manitou Springs": "Historic brick storefronts along the main street in Manitou Springs",
  "Woodland Park & Teller County": "Open mountain meadow and pine forest under a rainbow in Teller County",
  "Old Colorado City": "Historic storefronts and street trees in Old Colorado City",
};

export function Areas() {
  return (
    <section id="areas" aria-labelledby="areas-title" className={`bg-warm-white ${sectionPad} pt-0 sm:pt-0 lg:pt-0`}>
      <div className={container}>
        <div className="grid gap-8 border-t border-line pt-24 sm:pt-32 lg:grid-cols-12 lg:items-end lg:pt-40">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow>Service areas</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="areas-title" className={`${h2Class} mt-7 text-ink`}>
                Across the <Em>Pikes Peak</Em> region
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4 lg:pb-3 lg:text-right">
            <p className="label text-muted">El Paso and Teller counties</p>
          </Reveal>
        </div>

        {/* Scroll-snap strip on phones and tablets, five columns on desktop. */}
        <ul className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:mt-20 sm:scroll-px-8 sm:gap-6 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
          {areas.map((a, i) => (
            <Reveal
              as="li"
              key={a.name}
              delay={i * 0.08}
              className="group w-[78%] flex-none snap-start sm:w-[44%] lg:w-auto"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-stone">
                <img
                  src={a.image}
                  alt={alts[a.name] ?? a.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover brightness-[0.88] saturate-[0.92] transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-105 group-hover:saturate-100"
                />
                <span aria-hidden="true" className="pointer-events-none absolute inset-3 border border-warm-white/0 transition-colors duration-500 group-hover:border-warm-white/60" />
              </div>
              <div className="mt-6 flex items-center gap-4">
                <span className="font-display text-xl leading-none text-brass-text">{String(i + 1).padStart(2, "0")}</span>
                <span aria-hidden="true" className="h-px flex-1 bg-brass/45" />
              </div>
              <p className="label mt-4 flex text-balance text-brass-text lg:min-h-[2.8em] lg:items-end">{a.tag}</p>
              <h3 className="mt-2 font-display text-[1.75rem] leading-[1.1] text-ink">{a.name}</h3>
              <p className="text-body mt-3 text-muted">{a.blurb}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
