import { motion, useReducedMotion } from "framer-motion";
import { stats } from "../../shared/content";
import { CountUp, fadeUp, stagger } from "../../shared/motion";
import { container } from "../ui";

export function Stats() {
  const reduce = useReducedMotion();
  return (
    <section aria-label="Property Mill at a glance" className="relative z-10 -mt-16 lg:-mt-[4.5rem]">
      <div className={container}>
        <motion.dl
          variants={stagger(0.1)}
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_40px_80px_-40px_rgba(14,27,51,0.35)] lg:grid-cols-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className={`flex flex-col gap-2 px-5 py-6 sm:px-8 sm:py-7 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${
                i === 2 ? "lg:border-l" : ""
              }`}
            >
              <dt className="order-2 text-base leading-snug text-muted">{s.label}</dt>
              <dd className="order-1 font-display text-[2.25rem] leading-none font-medium tracking-[-0.02em] text-ink sm:text-[2.75rem]">
                {s.value === 2001 ? (
                  <>
                    <span className="mr-2 align-[0.12em] font-sans text-sm font-semibold tracking-[0.16em] text-pm-rust uppercase">Since</span>
                    2001
                  </>
                ) : (
                  <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                )}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
