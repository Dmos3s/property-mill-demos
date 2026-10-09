import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Fragment } from "react";
import { areas } from "../../shared/content";
import { Marquee, easeOut } from "../../shared/motion";
import { container, Em, SectionHeading } from "../ui";

const marqueeNames = [...areas.map((a) => a.name), "El Paso County", "Teller County", "Pikes Peak Region"];

const alts: Record<string, string> = {
  "Colorado Springs": "Colorado Springs rooftops with the downtown skyline beyond",
  "Monument, Fountain & Falcon": "Sandstone boulders and pine trees at sunrise",
  "Manitou Springs": "Foothills rising behind a low brick building under a wide blue sky",
  "Woodland Park & Teller County": "Open mountain meadow and evergreen forest under a stormy sky",
  "Old Colorado City": "Tree lined street with green foothills rising behind",
};

// Desktop layout: two wide cards, then three. Image heights stay fixed so hover zoom never shifts layout.
const layout = [
  { col: "md:col-span-2 lg:col-span-7", img: "aspect-[3/2] lg:aspect-auto lg:h-[30rem]" },
  { col: "lg:col-span-5", img: "aspect-[3/2] md:aspect-[4/5] lg:aspect-auto lg:h-[30rem]" },
  { col: "lg:col-span-4", img: "aspect-[3/2] md:aspect-[4/5] lg:aspect-auto lg:h-[24rem]" },
  { col: "lg:col-span-4", img: "aspect-[3/2] md:aspect-[4/5] lg:aspect-auto lg:h-[24rem]" },
  { col: "lg:col-span-4", img: "aspect-[3/2] md:aspect-[4/5] lg:aspect-auto lg:h-[24rem]" },
];

export function Areas() {
  const reduce = useReducedMotion();
  return (
    <section id="areas" aria-labelledby="areas-title" className="pb-20 sm:pb-32">
      {/* Slow marquee of the communities we serve. */}
      <div className="border-y border-line bg-sand/60 py-7 sm:py-9">
        <Marquee speed={70}>
          {marqueeNames.map((name) => (
            <Fragment key={name}>
              <span className="px-7 font-display text-[2rem] leading-none whitespace-nowrap text-ink italic sm:px-10 sm:text-[3.25rem]">{name}</span>
              <span className="size-2 flex-none rounded-full bg-pm-orange" />
            </Fragment>
          ))}
        </Marquee>
      </div>

      <div className={`${container} pt-20 sm:pt-32`}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="areas-title"
            className="lg:col-span-7"
            eyebrow="Service areas"
            title={
              <>
                At home across the <Em>Pikes Peak</Em> region.
              </>
            }
          />
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16">
          {areas.map((a, i) => (
            <motion.article
              key={a.name}
              className={`group ${layout[i]?.col ?? "lg:col-span-4"}`}
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px 0px -60px 0px" }}
              transition={{ duration: 0.75, ease: easeOut, delay: i < 2 ? i * 0.12 : (i - 2) * 0.12 }}
            >
              <div className={`relative overflow-hidden rounded-2xl bg-sand ${layout[i]?.img ?? "aspect-[3/2]"}`}>
                <img
                  src={a.image}
                  alt={alts[a.name] ?? a.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-editorial)] group-hover:scale-[1.06]"
                />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-cream/95 px-3 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-ink uppercase backdrop-blur">
                  <MapPin className="size-3.5 text-pm-orange" aria-hidden="true" />
                  {a.tag}
                </span>
              </div>
              <div className="mt-6 flex items-start gap-5">
                <span className="mt-1 font-display text-lg text-pm-rust italic">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-[1.625rem] leading-tight font-medium text-ink sm:text-[1.875rem]">{a.name}</h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-muted">{a.blurb}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
