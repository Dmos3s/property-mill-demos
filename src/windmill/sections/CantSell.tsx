// Can't sell: a white card on soft, image in a rounded frame, orange checks, one clear CTA.
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CircleCheck, KeyRound } from "lucide-react";
import { useRef } from "react";
import { cantSell } from "../../shared/content";
import { Eyebrow, Item, Stagger, btnPrimary, container, panel } from "./ui";

export function CantSell() {
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <section aria-labelledby="cantsell-title" className={panel}>
      <div className={`${container} py-16 sm:py-24`}>
        <div className="grid items-center gap-8 rounded-[2rem] bg-white p-3 shadow-[0_30px_60px_-40px_rgba(11,16,32,0.35)] ring-1 ring-line sm:rounded-[2.5rem] sm:p-4 lg:grid-cols-2 lg:gap-14 lg:p-5">
          <div ref={frame} className="relative h-72 overflow-hidden rounded-[1.6rem] sm:h-[26rem] sm:rounded-[2rem] lg:h-full lg:min-h-[560px]">
            <motion.img
              src={cantSell.image}
              alt="Homeowner working at a dining table in a bright home with mountain views"
              loading="lazy"
              style={{ y: imgY, scale: 1.14 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-[15px] font-bold text-ink shadow-lg sm:bottom-6 sm:left-6">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-pm-orange text-ink">
                <KeyRound size={16} aria-hidden="true" />
              </span>
              Fixed monthly rate
            </div>
          </div>

          <Stagger className="px-3 pb-8 sm:px-6 lg:py-10 lg:pl-0 lg:pr-10">
            <Item>
              <Eyebrow>{cantSell.eyebrow}</Eyebrow>
            </Item>
            <Item as="h2" id="cantsell-title" className="mt-5 text-[2rem] leading-[1.08] font-extrabold text-ink sm:text-[2.6rem]">
              {cantSell.title}
            </Item>
            <Item as="p" className="mt-5 text-lg text-muted">
              {cantSell.body}
            </Item>
            <ul className="mt-7 space-y-3.5">
              {cantSell.bullets.map((b) => (
                <Item as="li" key={b} className="flex gap-3 text-base font-medium leading-snug text-ink">
                  <CircleCheck size={24} className="shrink-0 text-pm-orange" aria-hidden="true" />
                  <span className="pt-0.5">{b}</span>
                </Item>
              ))}
            </ul>
            <Item className="mt-9">
              <a href="#contact" className={btnPrimary}>
                {cantSell.cta}
                <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </Item>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
