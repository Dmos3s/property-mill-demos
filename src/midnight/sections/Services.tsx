import { ArrowRight, ArrowUpRight, Check, ChevronDown, Phone } from "lucide-react";
import { useId, useState } from "react";
import { brand, media, propertyManagement, services, type Service } from "../../shared/content";
import { BgVideo, Reveal } from "../../shared/motion";
import { btnGlass, btnPrimary, container, SectionHeading } from "./ui";

// "bento:" = wide screen with a real pointer (see theme.css). There the tiles sit in a fixed grid and the
// detail copy slides in on hover or keyboard focus. Everywhere else the tiles are stacked cards showing everything.
const tileBase =
  "group relative isolate flex flex-col overflow-hidden rounded-[28px] border border-line bg-panel transition-[box-shadow,border-color] duration-300 hover:border-electric/50 hover:glow-electric focus-within:border-electric/50";

function Bullets({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((b) => (
        <li key={b} className="flex items-start gap-3 text-[16px] leading-snug text-text/90">
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric/20 ring-1 ring-electric/50">
            <Check className="h-3 w-3 text-electric-soft" strokeWidth={3} aria-hidden="true" />
          </span>
          {b}
        </li>
      ))}
    </ul>
  );
}

function Index({ n }: { n: number }) {
  return <span className="font-display text-[14px] font-semibold tracking-[0.12em] text-amber">0{n}</span>;
}

/** The large tile: residential management, with video playing behind a gradient. */
function FeatureTile({ s }: { s: Service }) {
  return (
    <article id={s.id} className={`${tileBase} min-h-[640px] md:col-span-2 bento:col-span-7 bento:row-span-2 bento:min-h-0`}>
      <BgVideo
        src={media.video.homeOffice.src}
        poster={media.video.homeOffice.poster}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[75%_center]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,var(--color-night)_0%,var(--color-night)_50%,rgb(7_11_20/0.86)_61%,rgb(7_11_20/0.4)_76%,rgb(7_11_20/0.05)_92%)]"
      />
      <div className="flex w-full flex-1 flex-col p-7 sm:p-10">
        <div className="flex items-center justify-between gap-4">
          <Index n={1} />
          <span className="glass-dark rounded-full px-3.5 py-1.5 text-[14px] font-semibold text-text">{propertyManagement.eyebrow}</span>
        </div>
        <div className="mt-auto pt-28 sm:pt-40">
          <h3 className="max-w-[16ch] font-display text-[clamp(2rem,3.4vw,3rem)] font-bold leading-[1.02] tracking-[-0.035em] text-text">
            {s.title}
          </h3>
          <p className="mt-4 max-w-xl font-display text-[19px] font-medium leading-snug tracking-[-0.01em] text-amber">{s.short}</p>
          <div className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
            <Bullets items={s.bullets.slice(0, 2)} />
            <Bullets items={s.bullets.slice(2)} />
          </div>
          <MoreDetails text={s.body} className="mt-4 max-w-xl bento:mt-6" />
          <a href="#fixed-rate" className={`${btnPrimary} mt-8`}>
            See how fixed-rate works
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

/** Long-form body copy: folded behind a toggle on stacked cards, always open inside the bento hover panel. */
function MoreDetails({ text, className = "" }: { text: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={className}>
      <div
        id={id}
        className={`mn-fx grid bento:grid-rows-[1fr] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="pb-3 text-[16px] leading-relaxed text-muted bento:pb-0 bento:text-text/90">{text}</p>
        </div>
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-[16px] font-semibold text-electric-soft transition-colors hover:text-text bento:hidden"
      >
        {open ? "Show less" : "Read more"}
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
    </div>
  );
}

/** Photo tiles. Bento: title and summary at rest; the body and bullets slide up over the photo on hover or focus. */
function PhotoTile({ s, n, wide = false }: { s: Service; n: number; wide?: boolean }) {
  const show =
    "bento:group-hover:pointer-events-auto bento:group-hover:translate-y-0 bento:group-hover:opacity-100 bento:group-focus-within:pointer-events-auto bento:group-focus-within:translate-y-0 bento:group-focus-within:opacity-100";
  return (
    <article id={s.id} className={`${tileBase} ${wide ? "md:col-span-2 bento:col-span-12" : "bento:col-span-5"}`}>
      {/* Photo: a header image on stacked cards, the full background on the bento grid. */}
      <div className="relative h-40 shrink-0 overflow-hidden sm:h-64 bento:absolute bento:inset-0 bento:-z-20 bento:h-full">
        <img
          src={s.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-90 transition-[opacity,filter] duration-500 bento:opacity-75 bento:group-hover:opacity-50 bento:group-hover:saturate-[0.8]"
        />
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-[linear-gradient(0deg,var(--color-panel)_0%,rgb(14_21_38/0.35)_45%,transparent_80%)] ${
            wide
              ? "bento:bg-[linear-gradient(90deg,var(--color-night)_0%,rgb(7_11_20/0.94)_28%,rgb(7_11_20/0.55)_55%,rgb(7_11_20/0.12)_100%)]"
              : "bento:bg-[linear-gradient(0deg,var(--color-night)_6%,rgb(7_11_20/0.72)_45%,rgb(7_11_20/0.05)_88%)]"
          }`}
        />
      </div>

      <a
        href="#contact"
        aria-label={`Talk to us about ${s.title.toLowerCase()}`}
        className="glass-dark absolute right-5 top-5 z-20 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-text transition duration-300 hover:border-electric/60 hover:bg-electric-deep group-hover:border-white/25"
      >
        <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
      </a>

      <div className="relative -mt-10 flex flex-1 flex-col px-7 pb-8 sm:px-9 bento:static bento:mt-auto bento:flex-none bento:p-9">
        {/* Rest state */}
        <div className="mn-fx bento:group-hover:opacity-0 bento:group-focus-within:opacity-0">
          <Index n={n} />
          <h3 className="mt-3 max-w-[18ch] font-display text-[clamp(1.6rem,2.3vw,2.1rem)] font-bold leading-[1.08] tracking-[-0.03em] text-text">
            {s.title}
          </h3>
          <p className="mt-3 max-w-md text-[16px] leading-relaxed text-text/80">{s.short}</p>
        </div>

        {/* Detail: inline on stacked cards, a sliding panel on the bento grid */}
        <div
          className={`mn-fx mt-5 bento:pointer-events-none bento:absolute bento:inset-0 bento:z-10 bento:mt-0 bento:flex bento:translate-y-6 bento:flex-col bento:justify-end bento:bg-night/80 bento:p-9 bento:pt-24 bento:opacity-0 bento:backdrop-blur-md ${show}`}
        >
          <p aria-hidden="true" className="hidden font-display text-[14px] font-semibold uppercase leading-snug tracking-[0.14em] text-amber bento:absolute bento:left-9 bento:right-20 bento:top-8 bento:block">
            0{n} &middot; {s.title}
          </p>
          <div
            className={`flex flex-col ${wide ? "bento:grid bento:grid-cols-2 bento:items-start bento:gap-12" : ""}`}
          >
            <Bullets items={s.bullets} className={`order-1 bento:order-2 ${wide ? "" : "bento:mt-5"}`} />
            <MoreDetails text={s.body} className="order-2 mt-3 max-w-xl bento:order-1 bento:mt-0" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function Services() {
  const [residential, commercial, buying, selling] = services;
  return (
    <section id="services" className="relative pb-16 pt-6 sm:pb-24 sm:pt-10 lg:pb-28 lg:pt-14">
      <div className={container}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Services" title={brand.tagline} />
          <Reveal delay={0.1} className="shrink-0">
            <a href={brand.phoneHref} className={btnGlass}>
              <Phone className="h-4 w-4 text-amber" aria-hidden="true" />
              {brand.phone}
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 bento:grid-cols-12 bento:grid-rows-[450px_450px_330px] bento:gap-5">
          <FeatureTile s={residential} />
          <PhotoTile s={commercial} n={2} />
          <PhotoTile s={buying} n={3} />
          <PhotoTile s={selling} n={4} wide />
        </div>
      </div>
    </section>
  );
}
