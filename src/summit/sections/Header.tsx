import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { brand, nav } from "../../shared/content";
import { easeOut } from "../../shared/motion";
import { container } from "../ui";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        solid
          ? "border-line bg-cream/80 shadow-[0_10px_30px_-24px_rgba(14,27,51,0.5)] backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className={`${container} flex items-center justify-between gap-6 transition-[height] duration-300 ${scrolled ? "h-[72px]" : "h-[88px]"}`}>
        <a href="#top" className="shrink-0 cursor-pointer rounded-md" aria-label={`${brand.fullName}, back to top`}>
          <img
            src={brand.logo.color}
            alt={brand.fullName}
            width={1200}
            height={568}
            className={`w-auto transition-[height] duration-300 ${scrolled ? "h-12" : "h-14 sm:h-16"}`}
          />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex xl:gap-3">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative flex min-h-11 cursor-pointer items-center px-2.5 text-[15px] font-medium text-ink transition-colors duration-200 hover:text-pm-blue"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-2.5 bottom-2 h-px origin-left scale-x-0 bg-pm-orange transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={brand.phoneHref}
            className="hidden min-h-11 cursor-pointer items-center gap-2 rounded-full border border-ink/20 bg-paper/60 px-5 text-[15px] font-semibold text-ink transition-colors duration-200 hover:border-pm-blue hover:bg-pm-blue hover:text-white sm:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            {brand.phone}
          </a>
          <a
            href={brand.phoneHref}
            aria-label={`Call ${brand.phone}`}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-ink/20 bg-paper/60 text-ink transition-colors duration-200 hover:bg-pm-blue hover:text-white sm:hidden"
          >
            <Phone className="size-[18px]" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="summit-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-ink text-cream transition-colors duration-200 hover:bg-pm-blue lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={reduce ? false : { rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={reduce ? undefined : { rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="summit-mobile-menu"
            key="panel"
            initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: easeOut }}
            className={`${scrolled ? "h-[calc(100dvh-72px)]" : "h-[calc(100dvh-88px)]"} overflow-y-auto border-t border-line bg-cream lg:hidden`}
          >
            <motion.nav
              aria-label="Mobile"
              className={`${container} flex flex-col py-6`}
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } } }}
            >
              {nav.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  variants={{ hidden: { opacity: 0, y: reduce ? 0 : 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } } }}
                  className="flex min-h-14 cursor-pointer items-center justify-between border-b border-line font-display text-[1.75rem] text-ink transition-colors duration-200 hover:text-pm-blue"
                >
                  {item.label}
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-pm-orange" />
                </motion.a>
              ))}
              <motion.div
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }}
                className="mt-8 flex flex-col gap-3"
              >
                <a
                  href={brand.phoneHref}
                  className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-pm-blue px-6 font-semibold text-white transition-colors duration-200 hover:bg-pm-blue-deep"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Call {brand.phone}
                </a>
                <a
                  href={brand.emailHref}
                  className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-ink/25 px-6 font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-cream"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  {brand.email}
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
