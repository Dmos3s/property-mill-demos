// Stats band: four rounded tiles with counting numbers.
import { Award, CalendarCheck, Map, Wallet } from "lucide-react";
import { stats } from "../../shared/content";
import { CountUp } from "../../shared/motion";
import { Item, Stagger, container } from "./ui";

const icons = [CalendarCheck, Award, Wallet, Map];

export function Stats() {
  return (
    <section aria-label="Property Mill at a glance" className={`${container} pt-6 sm:pt-8`}>
      <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" delay={0.1}>
        {stats.map((s, i) => {
          const Icon = icons[i];
          return (
            <Item
              key={s.label}
              className="flex min-h-[188px] flex-col justify-between rounded-3xl bg-white p-5 ring-1 ring-line sm:min-h-[210px] sm:p-7"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-sky text-pm-blue">
                <Icon size={20} aria-hidden="true" />
              </span>
              <div className="mt-6">
                <p className="font-display text-[2.6rem] leading-none font-extrabold tracking-[-0.04em] text-pm-blue sm:text-[3.4rem]">
                  {s.value === 2001 ? (
                    <>
                      <span className="mr-1.5 align-[0.55em] text-[0.36em] font-bold tracking-normal text-ink">Since</span>
                      2001
                    </>
                  ) : (
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  )}
                </p>
                <p className="mt-3 min-h-[2.75em] text-base leading-snug text-muted">{s.label}</p>
              </div>
            </Item>
          );
        })}
      </Stagger>
    </section>
  );
}
