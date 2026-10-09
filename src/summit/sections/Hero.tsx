import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { brand, hero, media } from "../../shared/content";
import { BgVideo, Reveal, WordReveal } from "../../shared/motion";
import { btnGhost, btnPrimary, container } from "../ui";

const cream = (a: number) => `rgba(247,244,238,${a})`;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate overflow-hidden pt-[20.5rem] pb-28 sm:pt-[25rem] lg:flex lg:min-h-[max(calc(100svh-5.5rem),46rem)] lg:items-center lg:pt-[7.5rem] lg:pb-28"
    >
      {/* Video layer: a band on small screens, full-bleed from lg up. */}
      <div className="absolute inset-x-0 top-0 -z-20 h-[23rem] overflow-hidden sm:h-[28rem] lg:inset-0 lg:h-auto">
        <motion.div className="h-full w-full" style={reduce ? undefined : { y: videoY, scale: videoScale }}>
          <BgVideo src={media.video.forestRidge.src} poster={media.video.forestRidge.poster} className="h-full w-full object-cover object-[70%_50%]" />
        </motion.div>
      </div>

      {/* Cream washes: header legibility, the text column, and the fade into the page. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[23rem] sm:h-[28rem] lg:hidden"
        style={{ background: `linear-gradient(180deg, ${cream(0.8)} 0%, ${cream(0)} 30%, ${cream(0)} 52%, ${cream(0.9)} 86%, ${cream(1)} 100%)` }}
      />
      {/* Laptop widths: the text column takes more of the screen, so the wash reaches further. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden lg:block xl:hidden"
        style={{
          background: `linear-gradient(90deg, ${cream(1)} 0%, ${cream(0.97)} 50%, ${cream(0.86)} 60%, ${cream(0.45)} 73%, ${cream(0.08)} 87%, ${cream(0)} 95%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden xl:block"
        style={{
          background: `linear-gradient(90deg, ${cream(1)} 0%, ${cream(0.97)} 36%, ${cream(0.86)} 48%, ${cream(0.45)} 62%, ${cream(0.08)} 77%, ${cream(0)} 87%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden lg:block"
        style={{ background: `linear-gradient(180deg, ${cream(0.75)} 0%, ${cream(0)} 20%, ${cream(0)} 62%, ${cream(0.85)} 88%, ${cream(1)} 100%)` }}
      />

      <motion.div className={`${container} relative`} style={reduce ? undefined : { y: copyY }}>
        <div className="max-w-[46rem] lg:max-w-none">
          <Reveal y={16}>
            <p className="eyebrow">{hero.eyebrow}</p>
          </Reveal>

          <WordReveal
            text={hero.headline}
            delay={0.15}
            step={0.07}
            className="mt-6 max-w-[10.3em] font-display text-[clamp(2.5rem,4.9vw,4.6rem)] leading-[1.03] font-medium tracking-[-0.02em] text-ink [&>span:last-child]:pr-[0.08em] [&>span:last-child]:font-normal [&>span:last-child]:text-pm-blue [&>span:last-child]:italic"
          />

          <Reveal delay={0.75} y={18}>
            <p className="mt-7 max-w-[40rem] text-lg leading-relaxed text-ink/80 lg:max-w-[36rem] xl:max-w-[42rem]">{hero.sub}</p>
          </Reveal>

          <Reveal delay={0.9} y={18}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#contact" className={`${btnPrimary} group`}>
                {hero.primaryCta}
                <ArrowRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a href={brand.appfolio} target="_blank" rel="noopener noreferrer" className={`${btnGhost} group bg-paper/50 backdrop-blur-sm`}>
                {hero.secondaryCta}
                <ArrowUpRight className="size-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
