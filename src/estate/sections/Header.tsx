import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { brand, nav } from "../../shared/content";
import { easeOut } from "../../shared/motion";
import { container } from "../ui";

export function Header() {
  const [scrolled, setScrolled] = useState(() => typeof window !== "undefined" && window.scrollY > 80);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 80));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1280 && setOpen(false);
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
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ${
        solid ? "border-line bg-warm-white/95 backdrop-blur-md" : "dark-surface border-transparent bg-transparent"
      }`}
    >
      <div className={`${container} flex items-center justify-between gap-6 transition-[height] duration-500 ${scrolled ? "h-[72px]" : "h-[84px] sm:h-[96px]"}`}>
        <a href="#top" className="relative block shrink-0 cursor-pointer" aria-label={`${brand.fullName}, back to top`}>
          {/* Both logos stacked so the swap is a crossfade, not a flash. */}
          <img
            src={brand.logo.white}
            alt=""
            width={1200}
            height={586}
            className={`w-auto transition-[opacity,height] duration-500 ${scrolled ? "h-[52px]" : "h-[58px] sm:h-[72px]"} ${solid ? "opacity-0" : "opacity-100"}`}
          />
          <img
            src={brand.logo.color}
            alt=""
            width={1200}
            height={568}
            className={`absolute top-0 left-0 w-auto transition-[opacity,height] duration-500 ${scrolled ? "h-[52px]" : "h-[58px] sm:h-[72px]"} ${solid ? "opacity-100" : "opacity-0"}`}
          />
        </a>

        <nav aria-label="Primary" className="hidden items-center xl:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`label group relative flex min-h-11 cursor-pointer items-center px-3.5 transition-colors duration-300 ${
                solid ? "text-ink hover:text-brass-text" : "text-warm-white/90 hover:text-warm-white"
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-3.5 bottom-2 h-px origin-left scale-x-0 bg-brass transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={brand.phoneHref}
            className={`label hidden min-h-11 cursor-pointer items-center gap-2.5 rounded-full border px-5 transition-colors duration-300 sm:inline-flex ${
              solid
                ? "border-brass-deep text-ink hover:bg-brass hover:text-ink"
                : "border-brass text-warm-white hover:bg-brass hover:text-ink"
            }`}
          >
            <Phone className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            {brand.phone}
          </a>
          <a
            href={brand.phoneHref}
            aria-label={`Call ${brand.phone}`}
            className={`inline-flex size-11 cursor-pointer items-center justify-center rounded-full border transition-colors duration-300 sm:hidden ${
              solid ? "border-brass-deep text-ink hover:bg-brass" : "border-brass text-warm-white hover:bg-brass hover:text-ink"
            }`}
          >
            <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="estate-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`inline-flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 xl:hidden ${
              solid ? "bg-ink text-warm-white hover:bg-brass hover:text-ink" : "bg-warm-white/10 text-warm-white ring-1 ring-warm-white/40 backdrop-blur-sm hover:bg-warm-white hover:text-ink"
            }`}
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
                {open ? <X className="size-5" strokeWidth={1.5} aria-hidden="true" /> : <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="estate-mobile-menu"
            key="panel"
            initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: easeOut }}
            className={`${scrolled ? "h-[calc(100dvh-72px)]" : "h-[calc(100dvh-84px)] sm:h-[calc(100dvh-96px)]"} overflow-y-auto border-t border-line bg-warm-white xl:hidden`}
          >
            <motion.nav
              aria-label="Mobile"
              className={`${container} flex flex-col py-6`}
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } } }}
            >
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  variants={{ hidden: { opacity: 0, y: reduce ? 0 : 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } } }}
                  className="group flex min-h-16 cursor-pointer items-baseline gap-5 border-b border-line py-3 text-ink transition-colors duration-300 hover:text-brass-text"
                >
                  <span className="label w-6 text-brass-text">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-[2rem] leading-tight">{item.label}</span>
                </motion.a>
              ))}
              <motion.div
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }}
                className="mt-10 flex flex-col gap-3"
              >
                <a
                  href={brand.phoneHref}
                  className="label inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-3 bg-brass px-6 text-ink transition-colors duration-300 hover:bg-ink hover:text-warm-white"
                >
                  <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  Call {brand.phone}
                </a>
                <a
                  href={brand.emailHref}
                  className="inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-3 border border-ink/25 px-6 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-warm-white"
                >
                  <Mail className="size-4" strokeWidth={1.5} aria-hidden="true" />
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
