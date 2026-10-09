import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { brand, footer } from "../../shared/content";
import { Reveal } from "../../shared/motion";
import { container } from "../ui";

const link = "inline-flex min-h-11 cursor-pointer items-center gap-2 text-cream/80 transition-colors duration-200 hover:text-white";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-pm-orange),transparent)] opacity-70" />
      <div className={`${container} pt-20 pb-10 sm:pt-24`}>
        <Reveal>
          <p className="max-w-4xl font-display text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.08] font-normal tracking-[-0.015em] text-white">
            {brand.tagline.split(" & ")[0]} <span className="text-[#f6b48a] italic">&amp; {brand.tagline.split(" & ")[1]}</span>
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 border-t border-cream/15 pt-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <img src={brand.logo.white} alt={brand.fullName} width={1200} height={586} loading="lazy" className="h-20 w-auto" />
            <p className="mt-6 max-w-md leading-relaxed text-cream/75">{footer.blurb}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="text-[13px] font-semibold tracking-[0.18em] text-cream/60 uppercase">Explore</p>
            <ul className="mt-4 grid">
              {footer.links.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className={`${link} group`}>
                      {l.label}
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <a href={l.href} className={link}>
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2 lg:col-span-4">
            <p className="text-[13px] font-semibold tracking-[0.18em] text-cream/60 uppercase">Visit or call</p>
            <ul className="mt-4 grid">
              <li>
                <a href={brand.phoneHref} className={link}>
                  <Phone className="size-4 text-pm-orange" aria-hidden="true" />
                  {brand.phone}
                </a>
              </li>
              <li>
                <a href={brand.emailHref} className={link}>
                  <Mail className="size-4 text-pm-orange" aria-hidden="true" />
                  {brand.email}
                </a>
              </li>
              <li>
                <a href={brand.mapsHref} target="_blank" rel="noopener noreferrer" className={`${link} items-start py-2.5`}>
                  <MapPin className="mt-1 size-4 flex-none text-pm-orange" aria-hidden="true" />
                  <span>
                    {brand.address1}
                    <br />
                    {brand.address2}
                  </span>
                  <span className="sr-only">(opens Google Maps in a new tab)</span>
                </a>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { label: "Facebook", href: brand.facebook },
                { label: "LinkedIn", href: brand.linkedin },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-cream/25 px-5 text-[15px] font-semibold text-cream transition-colors duration-200 hover:border-cream hover:bg-cream hover:text-ink"
                >
                  {s.label}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] text-cream/65">{footer.legal}</p>
          <a href="#top" className={`${link} group text-[15px]`}>
            Back to top
            <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
