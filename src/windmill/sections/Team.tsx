// Team: Hans featured on a sky-tint card, four agents with colored initials avatars.
import { Award, Mail } from "lucide-react";
import { brand, team } from "../../shared/content";
import { Reveal } from "../../shared/motion";
import { Windmill } from "../../shared/Windmill";
import { Item, SectionHead, Stagger, container } from "./ui";

const tones = [
  "bg-pm-blue text-white",
  "bg-pm-orange text-ink",
  "bg-ink text-white",
  "bg-sky text-pm-blue ring-1 ring-pm-blue/15",
];

export function Team() {
  const hans = team.find((p) => p.featured)!;
  const agents = team.filter((p) => !p.featured);

  return (
    <section id="team" aria-labelledby="team-title" className={`${container} pb-20 sm:pb-28`}>
      <SectionHead id="team-title" eyebrow="Our team" title={`Meet the people behind ${brand.name}.`} tone="blue" className="max-w-2xl" />

      <Reveal className="mt-12">
        <article className="relative overflow-hidden rounded-[2rem] bg-sky p-6 sm:rounded-[2.5rem] sm:p-10 lg:p-14">
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <div className="flex flex-col">
              <div className="grid h-28 w-28 place-items-center rounded-[1.75rem] bg-pm-blue font-display text-4xl font-extrabold tracking-tight text-white shadow-[0_20px_40px_-20px_rgba(20,40,210,0.8)] sm:h-36 sm:w-36 sm:text-5xl">
                {hans.initials}
              </div>
              <h3 className="mt-7 text-3xl font-extrabold text-ink sm:text-4xl">{hans.name}</h3>
              <p className="mt-2 text-lg font-semibold text-pm-blue">{hans.role}</p>
              {hans.email ? (
                <a
                  href={`mailto:${hans.email}`}
                  className="mt-6 inline-flex min-h-11 cursor-pointer items-center gap-2.5 self-start rounded-full bg-white lg:mb-8 py-1.5 pl-1.5 pr-5 font-semibold text-ink ring-1 ring-line transition-colors duration-200 hover:bg-pm-blue hover:text-white focus-visible:outline-pm-blue"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-pm-blue text-white">
                    <Mail size={16} aria-hidden="true" />
                  </span>
                  {hans.email}
                </a>
              ) : null}
              <div className="mt-8 flex items-center gap-4 self-start rounded-3xl bg-white/70 p-4 pr-6 ring-1 ring-line lg:mt-auto">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white ring-1 ring-line">
                  <Windmill className="h-12 w-auto" speed={18} title="Property Mill windmill" />
                </span>
                <p className="text-base leading-snug text-muted">
                  <span className="block font-display font-bold text-ink">Founder of {brand.fullName}</span>
                  Independently owned and locally operated since 2001
                </p>
              </div>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-ink/85">{hans.bio}</p>
              <ul className="mt-7 space-y-3">
                {hans.facts?.map((f) => (
                  <li key={f} className="flex items-start gap-3 rounded-2xl bg-white p-4 text-base font-medium text-ink ring-1 ring-line">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-pm-orange/15 text-pm-orange-ink">
                      <Award size={17} aria-hidden="true" />
                    </span>
                    <span className="pt-1">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </Reveal>

      <Stagger as="ul" className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" delay={0.09}>
        {agents.map((p, i) => (
          <Item
            as="li"
            key={p.name}
            className="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-line transition-[box-shadow,translate] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_56px_-30px_rgba(11,16,32,0.4)] sm:p-7"
          >
            <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-0">
              <span
                className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl font-display text-xl font-extrabold tracking-tight ${tones[i % tones.length]}`}
                aria-hidden="true"
              >
                {p.initials}
              </span>
              <div className="lg:mt-6">
                <h3 className="text-xl font-bold text-ink">{p.name}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.08em] text-pm-blue">{p.role}</p>
              </div>
            </div>
            <p className="mt-4 text-base text-muted">{p.bio}</p>
          </Item>
        ))}
      </Stagger>
    </section>
  );
}
