import { ArrowUp, ArrowUpRight } from "lucide-react";
import { brand, footer } from "../../shared/content";
import { container } from "./ui";

const heading = "font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-muted";
const footLink = "inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-[16px] text-text/85 transition-colors duration-200 hover:text-electric-soft";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-panel">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/70 to-transparent" />
      <div className={`${container} grid gap-10 pb-10 pt-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-12 lg:pt-20`}>
        <div className="sm:col-span-2 lg:col-span-1">
          <img src={brand.logo.white} alt={brand.fullName} loading="lazy" className="h-16 w-auto" />
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-muted">{footer.blurb}</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {[
              { label: "Facebook", href: brand.facebook },
              { label: "LinkedIn", href: brand.linkedin },
            ].map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-5 text-[15px] font-semibold text-text transition duration-200 hover:border-electric/60 hover:bg-white/10"
                >
                  {s.label}
                  <ArrowUpRight className="h-4 w-4 text-amber" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <p className={heading}>Explore</p>
          <ul className="mt-4">
            {footer.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={footLink}
                  {...("external" in l && l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {l.label}
                  {"external" in l && l.external ? <ArrowUpRight className="h-4 w-4" aria-hidden="true" /> : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className={heading}>Visit</p>
          <address className="mt-5 not-italic text-[16px] leading-relaxed text-text/85">
            {brand.address1}
            <br />
            {brand.address2}
          </address>
          <ul className="mt-3">
            <li>
              <a href={brand.phoneHref} className={footLink}>
                {brand.phone}
              </a>
            </li>
            <li>
              <a href={brand.emailHref} className={footLink}>
                {brand.email}
              </a>
            </li>
          </ul>
          <ul className="mt-3 space-y-1 text-[16px] text-muted">
            {brand.hours.map((h) => (
              <li key={h.days}>
                {h.days}: <span className="text-text/85">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div aria-hidden="true" className={`${container} select-none`}>
        <svg viewBox="0 0 1000 132" className="block h-auto w-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="mn-foot-word" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F3F5F9" stopOpacity="0.16" />
              <stop offset="1" stopColor="#F3F5F9" stopOpacity="0.015" />
            </linearGradient>
          </defs>
          <text
            x="500"
            y="116"
            textAnchor="middle"
            textLength="996"
            lengthAdjust="spacingAndGlyphs"
            fill="url(#mn-foot-word)"
            style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 136, letterSpacing: "-0.02em" }}
          >
            PROPERTY MILL
          </text>
        </svg>
      </div>

      <div className={container}>
        <div className="flex flex-col gap-4 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] text-muted">{footer.legal}</p>
          <a href="#top" className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-[15px] font-semibold text-text/85 transition-colors hover:text-electric-soft">
            Back to top
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
