import { Fragment } from "react";
import { areas, services } from "../../shared/content";
import { Marquee } from "../../shared/motion";

function Row({ items, outline = false }: { items: string[]; outline?: boolean }) {
  // Repeat the list so one copy is always wider than the widest screen.
  const list = [...items, ...items];
  return (
    <>
      {list.map((t, i) => (
        <Fragment key={`${t}-${i}`}>
          <span
            className={`whitespace-nowrap font-display text-[clamp(1.4rem,3vw,2.6rem)] font-bold uppercase leading-none tracking-[-0.02em] ${
              outline ? "text-white/25" : "text-text"
            }`}
          >
            {t}
          </span>
          <span className="mx-6 h-2.5 w-2.5 shrink-0 rounded-full bg-amber shadow-[0_0_16px_rgba(247,147,30,0.85)] sm:mx-9" />
        </Fragment>
      ))}
    </>
  );
}

export function Ticker() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-night py-6 sm:py-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-night to-transparent sm:w-32" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-night to-transparent sm:w-32" />
      <Marquee speed={55}>
        <Row items={services.map((s) => s.title)} />
      </Marquee>
      <Marquee speed={70} reverse className="mt-4 sm:mt-6">
        <Row items={areas.map((a) => a.name)} outline />
      </Marquee>
    </div>
  );
}
