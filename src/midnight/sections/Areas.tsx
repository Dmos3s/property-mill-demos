import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import { useRef } from "react";
import { areas, stats } from "../../shared/content";
import { easeOut } from "../../shared/motion";
import { container, SectionHeading } from "./ui";

export function Areas() {
  const reduce = useReducedMotion();
  const rowRef = useRef<HTMLUListElement>(null);
  const nudge = (dir: 1 | -1) => {
    const row = rowRef.current;
    const card = row?.querySelector("li");
    if (!row || !card) return;
    row.scrollBy({ left: dir * (card.getBoundingClientRect().width + 16), behavior: reduce ? "auto" : "smooth" });
  };
  const arrow =
    "glass inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-text transition duration-200 hover:border-electric/60 hover:bg-electric-deep";
  const counties = stats[3].label.split(": ")[1];
  return (
    <section id="areas" className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
      <div className={`${container} flex flex-col items-center gap-6`}>
        <SectionHeading center eyebrow="Service areas" title={`Serving ${counties} counties.`} />
        <p className="flex items-center gap-2 text-[15px] font-semibold text-muted md:hidden">
          Swipe to explore
          <MoveRight className="h-4 w-4 text-amber" aria-hidden="true" />
        </p>
        <div className="hidden gap-3 md:flex xl:hidden">
          <button type="button" className={arrow} onClick={() => nudge(-1)} aria-label="Previous area">
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" className={arrow} onClick={() => nudge(1)} aria-label="Next area">
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <ul ref={rowRef} className="mn-no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:-mx-12 lg:mt-14 lg:scroll-px-12 lg:px-12 xl:mx-0 xl:grid xl:grid-cols-5 xl:gap-5 xl:overflow-visible xl:px-0 xl:pb-0">
          {areas.map((a, i) => (
            <motion.li
              key={a.name}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: easeOut, delay: i * 0.07 }}
              className="group w-[78%] shrink-0 snap-start sm:w-[44%] md:w-[36%] lg:w-[28%] xl:w-auto"
            >
              <div className="relative isolate flex aspect-[3/4] w-full overflow-hidden rounded-[24px] border border-line bg-panel transition-[box-shadow,border-color] duration-300 group-hover:border-electric/50 group-hover:glow-electric">
                <img
                  src={a.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 -z-20 h-full w-full object-cover brightness-[0.68] saturate-[0.85] transition-[filter] duration-500 group-hover:brightness-105 group-hover:saturate-100"
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/40 via-35% to-transparent to-65%" />
                <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 font-display text-[13px] font-semibold text-text">
                  0{i + 1}
                </span>
                <div className="mt-auto w-full p-5 xl:p-6">
                  <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-amber">{a.tag}</p>
                  <h3 className="mt-2 font-display text-[22px] font-bold leading-[1.12] tracking-[-0.03em] text-text">{a.name}</h3>
                </div>
              </div>
              <p className="mt-4 pr-2 text-[16px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-text/90">{a.blurb}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
