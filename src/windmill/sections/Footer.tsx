// Footer: ink background, white logo, links, socials, legal, and a tiny windmill still turning.
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { brand, footer } from "../../shared/content";
import { Windmill } from "../../shared/Windmill";
import { container } from "./ui";

const linkClass =
  "inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-base text-white/80 transition-colors duration-200 hover:text-white focus-visible:outline-white";

export function Footer() {
  return (
    <footer className="relative mx-2 mt-4 overflow-hidden rounded-t-[2rem] bg-ink text-white sm:mx-4 sm:rounded-t-[2.5rem]">
      <div className={`${container} relative pb-10 pt-16 sm:pt-20`}>
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1.1fr] lg:gap-16">
          <div>
            <span aria-hidden="true" className="block h-1 w-14 rounded-full bg-pm-red" />
            <img src={brand.logo.white} alt={brand.fullName} loading="lazy" width={1200} height={586} className="mt-6 h-16 w-auto sm:h-20" />
            <p className="mt-6 max-w-md text-base text-white/75">{footer.blurb}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {[
                { label: "Facebook", href: brand.facebook },
                { label: "LinkedIn", href: brand.linkedin },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-5 text-[15px] font-semibold text-white ring-1 ring-white/25 transition-colors duration-200 hover:bg-white hover:text-ink focus-visible:outline-white"
                >
                  {s.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white/60">Explore</p>
            <ul className="mt-4">
              {footer.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className={linkClass}
                    {...("external" in l && l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {l.label}
                    {"external" in l && l.external ? <ArrowUpRight size={15} aria-hidden="true" /> : null}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white/60">Visit</p>
            <address className="mt-5 text-base not-italic text-white/80">
              {brand.address1}
              <br />
              {brand.address2}
            </address>
            <ul className="mt-3">
              <li>
                <a href={brand.phoneHref} className={linkClass}>
                  {brand.phone}
                </a>
              </li>
              <li>
                <a href={brand.emailHref} className={linkClass}>
                  {brand.email}
                </a>
              </li>
            </ul>
            <ul className="mt-3 space-y-1 text-base text-white/80">
              {brand.hours.map((h) => (
                <li key={h.days}>
                  <span className="text-white">{h.days}:</span> {h.time}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/65">{footer.legal}</p>
          <div className="flex items-center gap-4">
            <a href="#top" className={`${linkClass} text-sm`}>
              Back to top
              <ArrowUp size={15} aria-hidden="true" />
            </a>
            <Windmill className="h-14 w-auto" ring="#3D52F5" speed={8} title="Property Mill windmill" />
          </div>
        </div>
      </div>
    </footer>
  );
}
