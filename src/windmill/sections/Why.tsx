// Why choose Property Mill: three pillars with icons in brand-blue circles.
import { Building2, MapPinned, ShieldCheck, type LucideIcon } from "lucide-react";
import { why } from "../../shared/content";
import { Item, SectionHead, Stagger, container, panel, sectionY } from "./ui";

const icons: Record<string, LucideIcon> = { ShieldCheck, Building2, MapPinned };

export function Why() {
  return (
    <section aria-labelledby="why-title" className={panel}>
      <div className={`${container} ${sectionY}`}>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <SectionHead id="why-title" eyebrow={why.eyebrow} title={why.title} />
          <p className="text-lg text-muted lg:pb-2">{why.body}</p>
        </div>
        <Stagger as="ul" className="mt-12 grid gap-4 md:grid-cols-3" delay={0.1}>
          {why.pillars.map((p, i) => {
            const Icon = icons[p.icon] ?? ShieldCheck;
            return (
              <Item
                as="li"
                key={p.title}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-line transition-[box-shadow,translate] duration-300 hover:-translate-y-1 hover:shadow-[0_34px_60px_-30px_rgba(11,16,32,0.35)] sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-pm-blue text-white shadow-[0_12px_24px_-10px_rgba(20,40,210,0.7)]">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm font-bold text-muted" aria-hidden="true">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-8 text-[1.35rem] leading-snug font-bold text-ink">{p.title}</h3>
                <p className="mt-3 text-base text-muted">{p.body}</p>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-pm-orange transition-transform duration-300 group-hover:scale-x-100"
                />
              </Item>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
