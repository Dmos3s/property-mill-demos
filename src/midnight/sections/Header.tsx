import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Menu, Phone, X, ArrowUpRight, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { brand, nav } from "../../shared/content";
import { easeOut } from "../../shared/motion";
import { btnPrimary } from "./ui";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || open ? "border-line bg-night/75 backdrop-blur-xl backdrop-saturate-150" : "border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mn-fx mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12 ${
            scrolled ? "h-[72px]" : "h-20 lg:h-24"
          }`}
        >
          <a href="#top" className="flex shrink-0 cursor-pointer items-center rounded-md" aria-label={`${brand.fullName}, back to top`}>
            <img
              src={brand.logo.white}
              alt={brand.fullName}
              className={`mn-fx w-auto ${scrolled ? "h-11" : "h-12 lg:h-[60px]"}`}
            />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="group relative flex min-h-11 cursor-pointer items-center px-3 text-[15px] font-semibold text-text/80 transition-colors duration-200 hover:text-text"
                  >
                    {n.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-2 h-px origin-left scale-x-0 bg-electric-soft transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <a href={brand.phoneHref} className={`${btnPrimary} min-h-11! px-5!`}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                {brand.phone}
              </a>
            </div>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mn-mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="glass inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-text transition duration-200 hover:bg-white/10 lg:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mn-mobile-menu"
            key="menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: easeOut }}
            className={`fixed inset-x-0 bottom-0 z-40 ${scrolled ? "top-[72px]" : "top-20"} overflow-y-auto border-t border-line bg-night/95 backdrop-blur-2xl lg:hidden`}
          >
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-electric/25 blur-[90px]" />
            <nav aria-label="Mobile" className="relative px-6 pb-10 pt-8">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } } }}
                className="flex flex-col"
              >
                {nav.map((n, i) => (
                  <motion.li
                    key={n.href}
                    variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } } }}
                    className="border-b border-line"
                  >
                    <a
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-16 cursor-pointer items-center justify-between font-display text-[28px] font-semibold tracking-[-0.03em] text-text transition-colors hover:text-electric-soft"
                    >
                      {n.label}
                      <span className="font-display text-[14px] font-semibold text-amber">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="mt-8 flex flex-col gap-3">
                <a href={brand.phoneHref} onClick={() => setOpen(false)} className={`${btnPrimary} w-full`}>
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call {brand.phone}
                </a>
                <a
                  href={brand.emailHref}
                  className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-line-strong px-6 text-[16px] font-semibold text-text transition hover:bg-white/5"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {brand.email}
                </a>
                <a
                  href={brand.appfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 text-[16px] font-semibold text-electric-soft transition hover:text-text"
                >
                  Available properties
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
