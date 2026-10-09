import { Mail, Phone } from "lucide-react";
import { brand, team } from "../../shared/content";
import { Reveal } from "../../shared/motion";
import { container, Em, Eyebrow, h2Class, sectionPad } from "../ui";

export function Team() {
  const hans = team.find((p) => p.featured)!;
  const agents = team.filter((p) => !p.featured);
  return (
    <section id="team" aria-labelledby="team-title" className={`bg-warm-white ${sectionPad} pt-0 sm:pt-0 lg:pt-0`}>
      <div className={container}>
        <div className="border-t border-line pt-24 sm:pt-32 lg:pt-40">
          <Reveal>
            <Eyebrow>Our team</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="team-title" className={`${h2Class} mt-7 text-ink`}>
              Meet the <Em>team</Em>
            </h2>
          </Reveal>
        </div>

        {/* Hans, featured. */}
        <div className="mt-16 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <div className="relative flex aspect-square w-full max-w-[12rem] items-center justify-center rounded-full border border-brass sm:max-w-[16rem] lg:max-w-[19rem]">
              <span aria-hidden="true" className="absolute inset-3 rounded-full border border-brass/35" />
              <span className="font-display text-[clamp(3.5rem,8vw,6.5rem)] leading-none tracking-[0.04em] text-brass-deep" aria-hidden="true">
                {hans.initials}
              </span>
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="label text-brass-text">{hans.role}</p>
              <h3 className="mt-4 font-display text-[clamp(2.5rem,4.4vw,3.75rem)] leading-[1.02] text-ink">{hans.name}</h3>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-body mt-7 text-muted">{hans.bio}</p>
            </Reveal>
            <Reveal delay={0.14}>
              <ul className="mt-9 border-t border-line">
                {hans.facts?.map((f) => (
                  <li key={f} className="text-body relative border-b border-line py-4 pl-8 !leading-7 text-ink">
                    <span aria-hidden="true" className="absolute top-[29px] left-0 h-px w-[1.1rem] bg-brass" />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2} className="mt-8 flex flex-col gap-2 sm:flex-row sm:gap-8">
              {hans.email ? (
                <a
                  href={`mailto:${hans.email}`}
                  className="inline-flex min-h-11 cursor-pointer items-center gap-3 text-ink transition-colors duration-300 hover:text-brass-text"
                >
                  <Mail className="size-4 text-brass-deep" strokeWidth={1.5} aria-hidden="true" />
                  <span className="border-b border-brass/50">{hans.email}</span>
                </a>
              ) : null}
              <a
                href={brand.phoneHref}
                className="inline-flex min-h-11 cursor-pointer items-center gap-3 text-ink transition-colors duration-300 hover:text-brass-text"
              >
                <Phone className="size-4 text-brass-deep" strokeWidth={1.5} aria-hidden="true" />
                <span className="border-b border-brass/50">{brand.phone}</span>
              </a>
            </Reveal>
          </div>
        </div>

        {/* Agents. */}
        <ul className="mt-20 grid border-t border-line sm:mt-28 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((a, i) => (
            <Reveal
              as="li"
              key={a.name}
              delay={i * 0.08}
              className={`border-b border-line py-10 sm:px-8 lg:border-b-0 lg:py-12 ${i % 2 === 0 ? "sm:border-r sm:pl-0" : "sm:pr-0"} ${
                i === 2 ? "lg:pl-8" : ""
              } ${i === 1 ? "lg:border-r lg:pr-8" : ""} ${i === 3 ? "lg:pr-0" : ""}`}
            >
              <span
                aria-hidden="true"
                className="inline-flex size-14 items-center justify-center rounded-full border border-brass/70 font-display text-[1.35rem] tracking-[0.04em] text-brass-deep"
              >
                {a.initials}
              </span>
              <h3 className="mt-7 font-display text-[1.85rem] leading-tight text-ink">{a.name}</h3>
              <p className="label mt-2 text-brass-text">{a.role}</p>
              <p className="text-body mt-5 text-muted">{a.bio}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
