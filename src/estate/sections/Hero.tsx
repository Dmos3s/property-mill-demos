import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { brand, estateScenes, hero } from "../../shared/content";
import { easeOut, WordReveal } from "../../shared/motion";
import { VideoSequence } from "../../shared/VideoSequence";
import { btnBrass, btnOutlineLight, container } from "../ui";

const SCENE_SECONDS = 7.5; // clips run 9 s, so the outgoing room keeps moving through the 1.1 s crossfade
const pad = (n: number) => String(n).padStart(2, "0");

export function Hero() {
  const reduce = useReducedMotion();
  const [scene, setScene] = useState(0);
  const onScene = useCallback((i: number) => setScene(i), []);
  const seqRef = useRef<HTMLDivElement>(null);

  // VideoSequence loads clip 1, promotes the next clip to preload="auto" on each turn, and leaves the
  // rest on "metadata". Hold clips 3 to 6 at "none" until their turn so a first visit downloads two
  // clips, not six partial ones (the browser cancels those metadata fetches, which also floods the
  // network log with aborted requests).
  useLayoutEffect(() => {
    seqRef.current?.querySelectorAll("video").forEach((v, i) => {
      if (i > 1) v.preload = "none";
    });
  }, []);

  const rise = (delay: number) =>
    reduce
      ? { initial: false as const }
      : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease: easeOut, delay } };

  return (
    <section id="top" className="dark-surface relative isolate flex min-h-dvh flex-col overflow-hidden bg-charcoal text-warm-white">
      {/* The walkthrough. Own chrome below, so the caption and progress never collide with the CTAs. */}
      <div ref={seqRef} className="absolute inset-0 -z-20">
        <VideoSequence scenes={estateScenes} maxSeconds={SCENE_SECONDS} zoomTo={1.08} chrome={false} onScene={onScene} className="h-full w-full" />
      </div>

      {/* Legibility over every room: charcoal from the bottom and the left, a veil up top for the header.
          Phones get a heavier even veil because the copy spans the full width there. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-charcoal/40 lg:hidden" />
        {/* Phones and tablets: copy fills the width, so the veil climbs most of the frame. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(21,23,28,0.9)_0%,rgba(21,23,28,0.74)_42%,rgba(21,23,28,0.55)_72%,rgba(21,23,28,0.25)_100%)] lg:hidden" />
        {/* Desktop: bottom and left, leaving the right of the room open. */}
        <div className="absolute inset-0 hidden bg-[linear-gradient(to_top,rgba(21,23,28,0.92)_0%,rgba(21,23,28,0.74)_34%,rgba(21,23,28,0.36)_64%,rgba(21,23,28,0)_90%)] lg:block" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(21,23,28,0.9)_0%,rgba(21,23,28,0.8)_42%,rgba(21,23,28,0.62)_60%,rgba(21,23,28,0.22)_76%,rgba(21,23,28,0)_92%)] lg:block" />
        <div className="absolute inset-x-0 top-0 h-56 bg-linear-to-b from-charcoal/70 to-transparent" />
      </div>

      <div className={`${container} flex flex-1 flex-col pt-[104px] sm:pt-[140px]`}>
        <div className="flex flex-1 flex-col justify-end pb-8 sm:pb-14">
          <motion.p {...rise(0.1)} className="label flex w-fit items-start gap-4 text-warm-white/90 sm:items-center">
            <span aria-hidden="true" className="mt-[0.7em] h-px w-8 flex-none bg-brass sm:mt-0 sm:w-14" />
            <span className="text-balance">Property management and real estate across the Pikes Peak region</span>
          </motion.p>

          <WordReveal
            as="h1"
            text={hero.headline}
            delay={0.25}
            step={0.07}
            className="hero-headline mt-5 max-w-[56rem] font-display lg:max-w-[42rem] xl:max-w-[56rem] text-[clamp(2.4rem,5.8vw,6rem)] md:text-[3.5rem] lg:text-[clamp(2.4rem,5.8vw,6rem)] leading-[0.98] tracking-[-0.015em] text-warm-white sm:mt-8 md:text-balance"
          />

          <motion.p {...rise(0.95)} className="text-body mt-5 max-w-[36rem] text-warm-white/85 sm:mt-8">
            {hero.sub}
          </motion.p>

          <motion.div {...rise(1.1)} className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
            <a href="#contact" className={btnBrass}>
              {hero.primaryCta}
            </a>
            <a href={brand.appfolio} target="_blank" rel="noopener noreferrer" className={btnOutlineLight}>
              {hero.secondaryCta}
              <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </motion.div>
        </div>

        {/* Sequence chrome: scene counter, caption and story-style progress, bottom left. */}
        <motion.div
          {...rise(1.3)}
          className="grid items-end gap-6 border-t border-line-dark pt-4 pb-5 sm:pt-5 sm:pb-8 md:grid-cols-[1fr_auto_1fr]"
        >
          <div className="w-full max-w-[26rem]">
            <div className="flex items-baseline gap-4">
              <p className="font-display text-[1.6rem] leading-none text-brass" aria-hidden="true">
                {pad(scene + 1)}
                <span className="ml-1.5 text-base text-warm-white/70">/ {pad(estateScenes.length)}</span>
              </p>
              <div className="relative h-5 flex-1 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={scene}
                    className="label absolute inset-0 truncate text-warm-white"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: easeOut }}
                  >
                    {estateScenes[scene].label}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
            <div className="mt-4 flex gap-1.5" aria-hidden="true">
              {estateScenes.map((s, i) => (
                <div key={s.src} className="h-[2px] flex-1 overflow-hidden bg-white/25">
                  {i < scene ? (
                    <div className="h-full w-full bg-brass" />
                  ) : i === scene ? (
                    <motion.div
                      key={`run-${scene}`}
                      className="h-full w-full origin-left bg-brass"
                      initial={{ scaleX: reduce ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: reduce ? 0 : SCENE_SECONDS, ease: "linear" }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <a
            href="#services"
            className="label group hidden cursor-pointer flex-col items-center gap-3 text-warm-white/75 transition-colors duration-300 hover:text-warm-white md:flex"
          >
            Scroll
            <span aria-hidden="true" className="relative block h-10 w-px overflow-hidden bg-warm-white/25">
              <span className="scroll-tick absolute inset-x-0 top-0 block h-1/3 bg-brass" />
            </span>
          </a>

          <p className="label hidden text-right leading-[1.7] text-warm-white/75 lg:block">
            {hero.eyebrow.split(". ").map((part, i, all) => (
              <span key={part} className="block">
                {part}
                {i < all.length - 1 ? "." : ""}
              </span>
            ))}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
