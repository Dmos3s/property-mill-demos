import { stats } from "../../shared/content";
import { CountUp, Reveal } from "../../shared/motion";
import { container } from "./ui";

// Divider classes per cell: 2x2 on phones, one row of four from lg.
const cellBorders = [
  "border-b border-r lg:border-b-0",
  "border-b lg:border-b-0 lg:border-r",
  "border-r",
  "",
];

export function Stats() {
  return (
    <section aria-label="Property Mill at a glance" className="relative isolate py-16 sm:py-20">
      <div aria-hidden="true" className="absolute left-[8%] top-1/2 -z-10 h-48 w-[38%] -translate-y-1/2 rounded-full bg-electric/25 blur-[100px]" />
      <div aria-hidden="true" className="absolute right-[6%] top-1/2 -z-10 h-44 w-[30%] -translate-y-1/2 rounded-full bg-amber/15 blur-[100px]" />
      <div className={container}>
        <Reveal>
          <dl className="glass grid grid-cols-2 overflow-hidden rounded-[28px] lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`flex flex-col-reverse justify-end gap-3 border-line p-5 sm:p-8 lg:p-10 ${cellBorders[i]}`}>
                <dt className="text-[16px] font-semibold leading-snug text-amber">{s.label}</dt>
                <dd className="font-display text-[clamp(2.3rem,4.2vw,3.6rem)] font-bold leading-none tracking-[-0.04em] text-text">
                  {s.value === 2001 ? (
                    <>
                      <span className="mr-2 align-[0.35em] text-[0.42em] font-semibold tracking-[-0.01em] text-muted">Since</span>
                      2001
                    </>
                  ) : (
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
