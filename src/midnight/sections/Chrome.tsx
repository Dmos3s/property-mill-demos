// Page-level chrome: the scroll progress bar and the sticky section dots.
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-electric shadow-[0_0_14px_rgba(59,108,255,0.95)]"
    />
  );
}

const dots = [
  { id: "top", label: "Home" },
  { id: "services", label: "Services" },
  { id: "fixed-rate", label: "Fixed-rate management" },
  { id: "areas", label: "Areas" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
];

export function SectionDots() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const els = dots.map((d) => document.getElementById(d.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Sections" className="fixed right-2 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <ul className="flex flex-col items-center">
        {dots.map((d) => {
          const on = d.id === active;
          return (
            <li key={d.id}>
              <a
                href={`#${d.id}`}
                aria-label={d.label}
                aria-current={on ? "true" : undefined}
                className="group relative flex h-11 w-7 cursor-pointer items-center justify-center rounded-full"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    on ? "h-6 w-[5px] bg-electric shadow-[0_0_14px_rgba(59,108,255,1)]" : "h-[7px] w-[7px] bg-white/35 group-hover:bg-white"
                  }`}
                />
                <span className="glass-dark pointer-events-none absolute right-9 whitespace-nowrap rounded-full px-3 py-1.5 text-[14px] font-semibold text-text opacity-0 transition-[opacity,translate] duration-200 group-hover:-translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {d.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
