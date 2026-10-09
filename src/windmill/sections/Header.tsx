// Floating header: transparent over the hero, then a blurred rounded pill once you scroll.
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { brand, nav } from "../../shared/content";
import { easeOut } from "../../shared/motion";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2 pt-2 sm:pt-3">
      <div
        className={`mx-auto flex max-w-[1224px] items-center justify-between gap-4 rounded-full pl-3 pr-2 transition-[background-color,box-shadow,padding] duration-300 sm:pl-6 ${
          solid
            ? "bg-white/85 py-1.5 shadow-[0_18px_40px_-22px_rgba(11,16,32,0.45)] ring-1 ring-line backdrop-blur-xl"
            : "py-2.5"
        }`}
      >
        <a href="#top" className="shrink-0 rounded-xl focus-visible:outline-pm-blue" aria-label="Property Mill, back to top">
          <img
            src={brand.logo.color}
            alt="Property Mill Real Estate Group"
            className={`w-auto transition-[height] duration-300 ${scrolled ? "h-10 sm:h-12" : "h-12 sm:h-16"}`}
            width={1200}
            height={568}
          />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 cursor-pointer items-center rounded-full px-3 text-[15px] font-semibold text-ink transition-colors duration-200 hover:bg-sky hover:text-pm-blue focus-visible:outline-pm-blue xl:px-4"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={brand.phoneHref}
            className="hidden min-h-11 cursor-pointer items-center gap-2 rounded-full bg-pm-blue px-5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-pm-blue-deep focus-visible:outline-pm-blue sm:inline-flex"
          >
            <Phone size={17} aria-hidden="true" />
            <span className="lg:hidden xl:inline">{brand.phone}</span>
            <span className="hidden lg:inline xl:hidden">Call us</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="wm-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-ink text-white transition-colors duration-200 hover:bg-pm-blue focus-visible:outline-pm-blue lg:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="wm-mobile-nav"
            key="panel"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: easeOut }}
            className="mx-auto mt-2 max-w-[1224px] origin-top rounded-[1.75rem] bg-white p-3 shadow-[0_30px_60px_-24px_rgba(11,16,32,0.45)] ring-1 ring-line lg:hidden"
          >
            <nav aria-label="Mobile">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.045, delayChildren: 0.05 } } }}
              >
                {nav.map((item) => (
                  <motion.li
                    key={item.href}
                    variants={{ hidden: { opacity: 0, x: reduce ? 0 : -12 }, show: { opacity: 1, x: 0 } }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 cursor-pointer items-center justify-between rounded-2xl px-4 font-display text-lg font-bold text-ink transition-colors duration-200 hover:bg-sky hover:text-pm-blue focus-visible:outline-pm-blue"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>
            <div className="mt-2 grid gap-2 border-t border-line pt-3 sm:grid-cols-2">
              <a
                href={brand.phoneHref}
                className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-pm-blue px-5 font-semibold text-white transition-colors duration-200 hover:bg-pm-blue-deep focus-visible:outline-pm-blue"
              >
                <Phone size={18} aria-hidden="true" />
                {brand.phone}
              </a>
              <a
                href={brand.appfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-ink px-5 font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-white focus-visible:outline-ink"
              >
                Available properties
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
