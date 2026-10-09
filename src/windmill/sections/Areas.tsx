// Service areas: five rounded photo cards, 3 + 2, with tag chips and a soft lift on hover.
import { ArrowRight, MapPin } from "lucide-react";
import { areas } from "../../shared/content";
import { Marquee } from "../../shared/motion";
import { Windmill } from "../../shared/Windmill";
import { Item, SectionHead, Stagger, container, sectionY } from "./ui";

const altText: Record<string, string> = {
  "Colorado Springs": "Colorado Springs rooftops with the downtown skyline",
  "Monument, Fountain & Falcon": "Sunrise over sandstone formations and pines north of Colorado Springs",
  "Manitou Springs": "Manitou Springs storefronts below the foothills",
  "Woodland Park & Teller County": "Open meadow and forest near Woodland Park in Teller County",
  "Old Colorado City": "Tree-lined street in Old Colorado City with the foothills behind",
};

// Every town we serve, taken from the area names: "Monument, Fountain & Falcon" becomes three.
const towns = areas.flatMap((a) => a.name.split(/,|&/).map((t) => t.trim())).filter(Boolean);

export function Areas() {
  return (
    <section id="areas" aria-labelledby="areas-title" className={sectionY}>
      <Marquee speed={55} className="mb-16 border-y border-line py-5 sm:mb-24 sm:py-7">
        {towns.map((t) => (
          <span key={t} className="flex items-center">
            <span className="whitespace-nowrap px-6 font-display text-3xl font-extrabold tracking-[-0.03em] text-ink sm:px-9 sm:text-5xl">{t}</span>
            <Windmill className="h-9 w-auto sm:h-12" speed={9} title="" />
          </span>
        ))}
      </Marquee>
      <div className={container}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHead id="areas-title" eyebrow="Service areas" title="Rooted across El Paso and Teller counties." tone="blue" className="max-w-2xl" />
        <a
          href="#contact"
          className="group inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 self-start rounded-full font-semibold text-pm-blue focus-visible:outline-pm-blue lg:self-end"
        >
          Ask about your neighborhood
          <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>

      <Stagger as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6" delay={0.09}>
        {areas.map((a, i) => {
          const wide = i >= 3;
          return (
            <Item
              as="li"
              key={a.name}
              className={`group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line transition-[box-shadow,translate] duration-300 hover:-translate-y-1 hover:shadow-[0_34px_60px_-30px_rgba(11,16,32,0.4)] ${
                wide ? "lg:col-span-3" : "lg:col-span-2"
              } ${i === 4 ? "sm:col-span-2" : ""}`}
            >
              <div className={`relative m-2 overflow-hidden rounded-[1.25rem] ${wide ? "aspect-[16/8]" : "aspect-[16/11]"}`}>
                <img src={a.image} alt={altText[a.name] ?? ""} loading="lazy" className="h-full w-full object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-ink shadow-sm">
                  {a.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col px-5 pb-6 pt-3 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sky text-pm-blue">
                    <MapPin size={18} aria-hidden="true" />
                  </span>
                  <h3 className="text-xl leading-tight font-bold text-ink">{a.name}</h3>
                </div>
                <p className="mt-3 text-base text-muted">{a.blurb}</p>
              </div>
            </Item>
          );
        })}
      </Stagger>
      </div>
    </section>
  );
}
