// Hero: word-reveal headline on white, and a living windmill over a brand-blue block with fanned photo cards.
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight, BadgeCheck, CalendarCheck, House, Phone, Wallet } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { brand, hero, media, team } from "../../shared/content";
import { WordReveal, easeOut } from "../../shared/motion";
import { Windmill } from "../../shared/Windmill";
import { btnOutline, btnPrimary, container } from "./ui";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fanY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const blockY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);

  const enter = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: easeOut, delay },
        };

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-white pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(11,16,32,0.08)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_75%_35%,black,transparent)]"
      />
      <div className={`${container} relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10`}>
        <div className="max-w-2xl">
          <motion.p {...enter(0)} className="inline-flex items-center gap-2.5 rounded-full bg-pm-orange/12 px-4 py-2 text-sm font-semibold text-pm-orange-ink">
            <span className="h-2 w-2 rounded-full bg-pm-red" aria-hidden="true" />
            {hero.eyebrow}
          </motion.p>

          <WordReveal
            text={hero.headline}
            delay={0.12}
            step={0.055}
            className="mt-6 text-[2.45rem] leading-[1.04] font-extrabold tracking-[-0.035em] text-ink sm:text-[3.5rem] lg:text-[3.1rem] xl:text-[3.3rem] [&>span:last-child>span]:bg-[linear-gradient(transparent_62%,rgba(242,106,27,0.32)_62%,rgba(242,106,27,0.32)_90%,transparent_90%)] [&>span:last-child>span]:text-pm-blue"
          />

          <motion.p {...enter(0.55)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {hero.sub}
          </motion.p>

          <motion.div {...enter(0.7)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#contact" className={btnPrimary}>
              {hero.primaryCta}
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight size={17} aria-hidden="true" />
              </span>
            </a>
            <a href={brand.appfolio} target="_blank" rel="noopener noreferrer" className={btnOutline}>
              {hero.secondaryCta}
              <ArrowUpRight size={18} aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.div {...enter(0.85)} className="mt-10 flex items-center gap-4">
            <ul className="flex -space-x-1.5" aria-hidden="true">
              {team.map((p, i) => (
                <li
                  key={p.initials}
                  className={`grid h-11 w-11 place-items-center rounded-full font-display text-[13px] font-bold ring-[3px] ring-white ${avatarTone[i % avatarTone.length]}`}
                >
                  {p.initials}
                </li>
              ))}
            </ul>
            <p className="text-base leading-snug text-muted">
              <span className="block font-semibold text-ink">Talk to a local agent</span>
              <a
                href={brand.phoneHref}
                className="inline-flex cursor-pointer items-center gap-1.5 font-semibold text-pm-blue underline-offset-4 hover:underline focus-visible:outline-pm-blue"
              >
                <Phone size={15} aria-hidden="true" />
                {brand.phone}
              </a>
            </p>
          </motion.div>
        </div>

        <HeroVisual fanY={fanY} blockY={blockY} />
      </div>
    </section>
  );
}

const avatarTone = ["bg-pm-blue text-white", "bg-pm-orange text-ink", "bg-ink text-white", "bg-sky text-pm-blue", "bg-pm-blue text-white"];

const fan = [
  { src: media.photo.homeExterior, alt: "Craftsman-style home with stone accents among pine trees", rot: -11, x: "-34%", delay: "0s" },
  { src: media.photo.gogPikes, alt: "Garden of the Gods red rocks in front of snow-capped Pikes Peak", rot: 9, x: "34%", delay: "-6s" },
  { src: media.photo.interiorLiving, alt: "Bright living room with a leather sofa and green accent wall", rot: -1, x: "0%", delay: "-12s" },
];

function HeroVisual({ fanY, blockY }: { fanY: MotionValue<number>; blockY: MotionValue<number> }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[560px] sm:h-[560px] lg:h-[600px] lg:max-w-none">
      {/* Fanned photo cards */}
      <motion.div style={{ y: fanY }} className="absolute right-[20%] top-[3%] h-[50%] w-[34%] sm:right-[15%] sm:w-[35%]">
        {fan.map((c, i) => (
          <motion.div
            key={c.src}
            className="absolute inset-0 origin-bottom overflow-hidden rounded-[1.6rem] bg-sky shadow-[0_24px_50px_-20px_rgba(11,16,32,0.5)] ring-4 ring-white"
            initial={reduce ? false : { opacity: 0, rotate: 0, x: "0%", y: 40 }}
            animate={{ opacity: 1, rotate: c.rot, x: c.x, y: 0 }}
            transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.35 + i * 0.12 }}
          >
            <img src={c.src} alt={c.alt} className="wm-kenburns h-full w-full object-cover" style={{ animationDelay: c.delay }} />
          </motion.div>
        ))}
      </motion.div>

      {/* Brand-blue block */}
      <motion.div
        style={{ y: blockY }}
        className="absolute inset-x-0 bottom-0 h-[54%] overflow-hidden rounded-[2rem] bg-pm-blue shadow-[0_40px_80px_-40px_rgba(20,40,210,0.8)] sm:rounded-[2.5rem]"
      >
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.22),transparent_55%)]" />
        <div aria-hidden="true" className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full border-[28px] border-white/[0.07]" />
        <div aria-hidden="true" className="absolute -bottom-10 -right-2 h-40 w-40 rounded-full border-[18px] border-white/[0.07]" />
      </motion.div>

      {/* The windmill itself, standing on the block and turning slowly */}
      <motion.div style={{ y: blockY }} className="pointer-events-none absolute bottom-[2%] left-0 w-[58%] sm:w-[62%]">
        <Windmill className="h-auto w-full drop-shadow-[0_18px_24px_rgba(11,16,32,0.25)]" ring="#FFFFFF" speed={16} />
      </motion.div>


      {/* Listings link, above the windmill so the blades never cover it */}
      <motion.div
        className="absolute bottom-[6%] right-[4%] z-20 hidden sm:block"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut, delay: 1.1 }}
      >
        <a
          href={brand.appfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-[15px] font-semibold text-ink shadow-lg transition-colors duration-200 hover:bg-sky focus-visible:outline-white"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-pm-orange text-ink">
            <House size={16} aria-hidden="true" />
          </span>
          Available properties
          <ArrowUpRight size={16} aria-hidden="true" className="text-pm-blue transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </motion.div>

      {/* Floating chips */}
      <Chip index={0} className="left-0 top-[9%]">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-pm-blue text-white">
          <BadgeCheck size={16} aria-hidden="true" />
        </span>
        Fixed-rate fees
      </Chip>
      <Chip index={1} className="right-0 top-[39%]" tone="ink">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 text-white">
          <Wallet size={16} aria-hidden="true" />
        </span>
        No application fees
      </Chip>
      <Chip index={2} className="bottom-[14%] right-[5%] sm:bottom-[26%]" tone="orange">
        <CalendarCheck size={17} aria-hidden="true" />
        Since 2001
      </Chip>
    </div>
  );
}

function Chip({
  children,
  className,
  index,
  tone = "white",
}: {
  children: ReactNode;
  className: string;
  index: number;
  tone?: "white" | "ink" | "orange";
}) {
  const reduce = useReducedMotion();
  const toneClass =
    tone === "ink"
      ? "bg-ink text-white"
      : tone === "orange"
        ? "bg-pm-orange text-ink"
        : "bg-white text-ink ring-1 ring-line";
  return (
    <motion.div
      className={`absolute z-20 ${className}`}
      initial={reduce ? false : { opacity: 0, scale: 0.6, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 17, delay: 0.95 + index * 0.18 }}
    >
      <div
        className={`wm-float inline-flex items-center gap-2 whitespace-nowrap rounded-full py-1.5 pl-1.5 pr-4 text-[15px] font-bold shadow-[0_16px_32px_-14px_rgba(11,16,32,0.45)] ${toneClass} ${tone === "orange" ? "pl-3.5" : ""}`}
        style={{ animationDelay: `${index * -1.6}s`, animationDuration: `${5 + index * 0.8}s` }}
      >
        {children}
      </div>
    </motion.div>
  );
}
