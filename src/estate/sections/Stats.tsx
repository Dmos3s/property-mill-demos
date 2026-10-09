import { stats } from "../../shared/content";
import { CountUp, Reveal } from "../../shared/motion";
import { container } from "../ui";

// Hairlines: 2x2 on phones, one row of four from lg.
const cell = [
  "border-r border-b pr-4 sm:pr-8 lg:border-b-0 lg:pr-10",
  "border-b pl-5 sm:pl-8 lg:border-b-0 lg:border-r lg:px-10",
  "border-r pr-4 sm:pr-8 lg:px-10",
  "pl-5 sm:pl-8 lg:pl-10",
];

export function Stats() {
  return (
    <section aria-label="Property Mill at a glance" className="dark-surface bg-charcoal text-warm-white">
      <div className={container}>
        <dl className="grid grid-cols-2 border-b border-line-dark lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className={`flex flex-col-reverse justify-end gap-4 border-line-dark py-10 sm:py-14 ${cell[i]}`}>
              <dt className="label max-w-[24ch] text-balance text-brass">{s.label}</dt>
              <dd className="font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-warm-white">
                {s.value === 2001 ? (
                  <>
                    <span className="mr-2 align-[0.3em] text-[0.4em] italic text-warm-white/70">Since</span>
                    2001
                  </>
                ) : (
                  <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                )}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
