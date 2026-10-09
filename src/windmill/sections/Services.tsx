// Services bento: four rounded tiles that tilt toward the cursor. Hovering reveals the bullets.
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Building2, Check, House, KeyRound, Tag } from "lucide-react";
import { useEffect, useState, type PointerEvent, type ReactNode } from "react";
import { brand, media, services, type Service } from "../../shared/content";
import { BgVideo, fadeUp } from "../../shared/motion";
import { SectionHead, Stagger, container } from "./ui";

const byId = Object.fromEntries(services.map((s) => [s.id, s])) as Record<string, Service>;

export function Services() {
  return (
    <section aria-labelledby="services-title" id="services" className={`${container} pb-20 pt-20 sm:pb-28 sm:pt-24`}>
      <SectionHead id="services-title" eyebrow="What we do" title={brand.tagline} tone="blue" className="max-w-3xl" />
      <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3" delay={0.1}>
        <VideoTile s={byId["property-management"]} label="Residential" icon={<House size={16} aria-hidden="true" />} />
        <PhotoTile s={byId["commercial"]} label="Commercial" icon={<Building2 size={16} aria-hidden="true" />} alt="Downtown Colorado Springs skyline under a cloudy sky" />
        <PhotoTile s={byId["buying"]} label="Buying" icon={<KeyRound size={16} aria-hidden="true" />} alt="Two-story mountain home with stone details and a landscaped yard" />
        <WideTile s={byId["selling"]} label="Selling" icon={<Tag size={16} aria-hidden="true" />} alt="Rooftops of a Colorado Springs neighborhood with the downtown skyline beyond" />
      </Stagger>
    </section>
  );
}

/** True only on devices with a precise pointer that can hover. */
function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

/** Card that tilts toward the cursor, max 6 degrees. Off on touch and reduced motion. */
function TiltCard({ id, className, children, max = 6 }: { id: string; className: string; children: ReactNode; max?: number }) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const enabled = fine && !reduce;
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 180, damping: 18 });

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!enabled || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.article
      id={id}
      variants={fadeUp}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={enabled ? { rotateX, rotateY, transformPerspective: 1200 } : undefined}
      className={`group relative isolate overflow-hidden rounded-3xl bg-white ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_40px_70px_-36px_rgba(11,16,32,0.45)] ${className}`}
    >
      {children}
    </motion.article>
  );
}

function TileLabel({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-3.5 text-sm font-semibold text-ink shadow-sm ring-1 ring-line">
      <span className="grid h-7 w-7 place-items-center rounded-full bg-pm-blue text-white">{icon}</span>
      {children}
    </span>
  );
}

/** Blue bullet panel: slides over the media on hover for mouse users. */
function HoverBullets({ bullets, className = "" }: { bullets: string[]; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 hidden translate-y-4 rounded-2xl bg-pm-blue/95 p-5 text-white opacity-0 shadow-xl backdrop-blur-sm transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 can-hover:block ${className}`}
    >
      <ul className="space-y-2.5">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2.5 text-base leading-snug">
            <Check size={18} className="mt-0.5 shrink-0 text-pm-orange" aria-hidden="true" strokeWidth={3} />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Bullets shown inline, for keyboard, screen reader and touch users. */
function InlineBullets({ bullets }: { bullets: string[] }) {
  return (
    <ul className="mt-5 space-y-2 can-hover:sr-only">
      {bullets.map((b) => (
        <li key={b} className="flex gap-2.5 text-base leading-snug text-ink">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-pm-blue text-white">
            <Check size={13} strokeWidth={3} aria-hidden="true" />
          </span>
          {b}
        </li>
      ))}
    </ul>
  );
}

function TileLink() {
  return (
    <a
      href="#contact"
      className="mt-6 inline-flex min-h-11 cursor-pointer items-center gap-2 self-start rounded-full font-semibold text-pm-blue focus-visible:outline-pm-blue"
    >
      Talk to us
      <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
    </a>
  );
}

function VideoTile({ s, label, icon }: { s: Service; label: string; icon: ReactNode }) {
  return (
    <TiltCard id={s.id} max={3.5} className="flex min-h-[620px] flex-col justify-end md:col-span-2 lg:min-h-[660px]">
      <BgVideo
        src={media.video.mountainTown.src}
        poster={media.video.mountainTown.poster}
        className="absolute inset-x-0 top-0 -z-10 h-72 w-full object-cover sm:inset-0 sm:h-full"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-28 -z-10 [background:linear-gradient(to_bottom,rgba(255,255,255,0)_0,rgba(255,255,255,0.92)_5.5rem,#fff_8rem)] sm:top-auto sm:h-[78%] sm:[background:linear-gradient(to_top,#fff_45%,rgba(255,255,255,0.85)_68%,rgba(255,255,255,0))]"
      />
      <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
        <TileLabel icon={icon}>{label}</TileLabel>
      </div>
      <HoverBullets bullets={s.bullets} className="right-5 top-5 w-[min(380px,44%)] sm:right-7 sm:top-7" />
      <div className="relative flex max-w-2xl flex-col p-6 pt-52 sm:p-9 sm:pt-56">
        <h3 className="text-[1.9rem] leading-tight font-extrabold text-ink sm:text-4xl">{s.title}</h3>
        <p className="mt-3 text-lg font-semibold text-ink">{s.short}</p>
        <p className="mt-3 text-base text-muted">{s.body}</p>
        <InlineBullets bullets={s.bullets} />
        <TileLink />
      </div>
    </TiltCard>
  );
}

function PhotoTile({ s, label, icon, alt }: { s: Service; label: string; icon: ReactNode; alt: string }) {
  return (
    <TiltCard id={s.id} className="flex flex-col">
      <div className="relative h-60 shrink-0 overflow-hidden sm:h-72">
        <img src={s.image} alt={alt} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute left-5 top-5">
          <TileLabel icon={icon}>{label}</TileLabel>
        </div>
        <HoverBullets bullets={s.bullets} className="inset-3" />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-2xl leading-tight font-extrabold text-ink">{s.title}</h3>
        <p className="mt-2.5 text-base font-semibold text-ink">{s.short}</p>
        <p className="mt-3 text-base text-muted">{s.body}</p>
        <InlineBullets bullets={s.bullets} />
        <div className="mt-auto">
          <TileLink />
        </div>
      </div>
    </TiltCard>
  );
}

/** Wide tile: photo band on top, story and bullets side by side below. */
function WideTile({ s, label, icon, alt }: { s: Service; label: string; icon: ReactNode; alt: string }) {
  return (
    <TiltCard id={s.id} max={3.5} className="flex flex-col md:col-span-2">
      <div className="relative h-60 shrink-0 overflow-hidden sm:h-72">
        <img src={s.image} alt={alt} loading="lazy" className="h-full w-full object-cover object-[center_72%]" />
        <div className="absolute left-5 top-5">
          <TileLabel icon={icon}>{label}</TileLabel>
        </div>
      </div>
      <div className="grid flex-1 gap-6 p-6 sm:p-7 md:grid-cols-[1fr_1fr] md:gap-8">
        <div className="flex flex-col">
          <h3 className="text-2xl leading-tight font-extrabold text-ink">{s.title}</h3>
          <p className="mt-2.5 text-base font-semibold text-ink">{s.short}</p>
          <p className="mt-3 text-base text-muted">{s.body}</p>
          <div className="mt-auto hidden md:block">
            <TileLink />
          </div>
        </div>
        <ul className="grid content-start gap-2.5">
          {s.bullets.map((b) => (
            <li key={b} className="flex gap-3 rounded-2xl bg-soft px-4 py-3 text-base font-medium leading-snug text-ink">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-pm-orange text-ink">
                <Check size={13} strokeWidth={3} aria-hidden="true" />
              </span>
              {b}
            </li>
          ))}
        </ul>
        <div className="-mt-6 md:hidden">
          <TileLink />
        </div>
      </div>
    </TiltCard>
  );
}
