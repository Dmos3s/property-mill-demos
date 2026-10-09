import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { brand, hero, media } from "../../shared/content";
import { BgVideo, WordReveal, easeOut } from "../../shared/motion";
import { btnGlass, btnPrimary, container } from "./ui";

/** True only for a mouse or trackpad, so the glow never chases a finger. */
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

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const follow = fine && !reduce;

  // Slow parallax: video drifts down, copy lifts and fades as the hero leaves.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0.15]);

  // Cursor orb, eased with a soft spring so it trails the pointer.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 38, damping: 18, mass: 1.1 });
  const sy = useSpring(my, { stiffness: 38, damping: 18, mass: 1.1 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.jump(r.width * 0.72);
    my.jump(r.height * 0.32);
    sx.jump(r.width * 0.72);
    sy.jump(r.height * 0.32);
  }, [mx, my, sx, sy]);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!follow) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night"
    >
      {/* Video and atmosphere */}
      <motion.div aria-hidden="true" style={{ y: videoY }} className="absolute inset-0 -z-30">
        <BgVideo
          src={media.video.darkForest.src}
          poster={media.video.darkForest.poster}
          className="h-[115%] w-full object-cover"
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-gradient-to-b from-night/80 via-night/35 to-night" />
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-gradient-to-r from-night/85 via-night/40 to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
        <div className="mn-grain" />
      </div>
      <motion.div
        aria-hidden="true"
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute left-0 top-0 -z-10 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,rgba(59,108,255,0.42),rgba(59,108,255,0.12)_42%,transparent_68%)] mix-blend-screen blur-2xl" />
      </motion.div>
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[420px] w-[420px] rounded-full bg-amber/15 blur-[120px]" />

      {/* Copy */}
      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className={`${container} relative flex flex-1 flex-col justify-end pb-16 pt-32 sm:pb-24 lg:pb-32 lg:pt-40`}
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
          className="glass inline-flex max-w-full items-center gap-3 self-start rounded-full px-4 py-2 text-[14px] font-semibold text-text/90"
        >
          <span aria-hidden="true" className="mn-pulse h-2 w-2 shrink-0 rounded-full bg-amber" />
          {hero.eyebrow}
        </motion.p>

        <WordReveal
          text={hero.headline}
          delay={0.2}
          step={0.055}
          className="mt-7 max-w-[15ch] font-display text-[clamp(2.6rem,6.2vw,5.6rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-text sm:max-w-[17ch] lg:max-w-[18ch] [&>span:last-child>span]:bg-gradient-to-r [&>span:last-child>span]:from-amber [&>span:last-child>span]:to-[#FFD29A] [&>span:last-child>span]:bg-clip-text [&>span:last-child>span]:text-transparent"
        />

        <motion.div
          aria-hidden="true"
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, ease: easeOut, delay: 1.05 }}
          className="mt-8 h-[3px] w-40 origin-left rounded-full bg-gradient-to-r from-electric to-amber shadow-[0_0_24px_rgba(59,108,255,0.9)] sm:w-56"
        />

        <div className="mt-8 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.9 }}
            className="max-w-[560px] text-[17px] leading-relaxed text-text/85 sm:text-[18px]"
          >
            {hero.sub}
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 1.05 }}
            className="flex flex-col gap-3 sm:flex-row xl:shrink-0"
          >
            <a href="#contact" className={btnPrimary}>
              {hero.primaryCta}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a href={brand.appfolio} target="_blank" rel="noopener noreferrer" className={btnGlass}>
              {hero.secondaryCta}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-5 left-1/2 hidden min-h-11 -translate-x-1/2 cursor-pointer flex-col items-center gap-3 px-3 text-[12px] font-semibold uppercase tracking-[0.3em] text-text/70 transition-colors hover:text-text md:flex"
      >
        <span>Scroll</span>
        <span className="relative block h-11 w-px overflow-hidden bg-white/15">
          <span className="mn-scroll-cue absolute inset-x-0 top-0 block h-5 bg-gradient-to-b from-transparent via-electric-soft to-transparent" />
        </span>
      </a>
    </section>
  );
}
