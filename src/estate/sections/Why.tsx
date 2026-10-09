import { Building2, MapPinned, ShieldCheck, type LucideIcon } from "lucide-react";
import { estateStills, why } from "../../shared/content";
import { Reveal } from "../../shared/motion";
import { container, Em, Eyebrow, FramedImage, h2Class, sectionPad } from "../ui";

const icons: Record<string, LucideIcon> = { ShieldCheck, Building2, MapPinned };

export function Why() {
  const [lead, tail] = why.title.split(", ");
  return (
    <section aria-labelledby="why-title" className={`bg-stone ${sectionPad}`}>
      <div className={container}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{why.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="why-title" className={`${h2Class} mt-7 text-ink`}>
                {lead}, <Em>{tail}</Em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p className="text-body text-muted-deep">{why.body}</p>
          </Reveal>
        </div>

        <Reveal className="mt-14 sm:mt-20">
          <FramedImage
            src={estateStills.view}
            alt="Front Range peaks under evening clouds above autumn trees and a mountain town"
            ratio="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/8]"
            offset="right"
            strength={9}
          />
        </Reveal>

        <div className="mt-20 grid gap-14 sm:mt-28 md:grid-cols-3 md:gap-10">
          {why.pillars.map((p, i) => {
            const Icon = icons[p.icon] ?? ShieldCheck;
            return (
              <Reveal key={p.title} delay={i * 0.1} className="border-t border-ink/20 pt-8">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[2.75rem] leading-none text-brass-deep">{String(i + 1).padStart(2, "0")}</span>
                  <span className="inline-flex size-14 items-center justify-center rounded-full border border-brass-deep/70 text-brass-deep">
                    <Icon className="size-6" strokeWidth={1.25} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-8 font-display text-[1.85rem] leading-[1.12] text-balance text-ink">{p.title}</h3>
                <p className="text-body mt-4 text-muted-deep">{p.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
