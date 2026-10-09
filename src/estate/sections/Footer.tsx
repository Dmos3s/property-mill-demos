import { ArrowUpRight } from "lucide-react";
import { brand, footer } from "../../shared/content";
import { container } from "../ui";

const pill =
  "label inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line-dark px-5 text-warm-white/85 transition-colors duration-300 hover:border-brass hover:text-brass";

export function Footer() {
  return (
    <footer className="dark-surface border-t border-line-dark bg-ink text-warm-white">
      <div className={`${container} grid gap-14 pt-20 pb-14 sm:pt-24 lg:grid-cols-12 lg:gap-10`}>
        <div className="lg:col-span-5">
          <a href="#top" className="inline-block cursor-pointer" aria-label={`${brand.fullName}, back to top`}>
            <img src={brand.logo.white} alt="" width={1200} height={586} loading="lazy" className="h-16 w-auto sm:h-20" />
          </a>
          <p className="text-body mt-8 max-w-md text-warm-white/65">{footer.blurb}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={brand.facebook} target="_blank" rel="noopener noreferrer" className={pill}>
              Facebook
              <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a href={brand.linkedin} target="_blank" rel="noopener noreferrer" className={pill}>
              LinkedIn
              <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
          <p className="label text-brass">Explore</p>
          <ul className="mt-5">
            {footer.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...("external" in l && l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group inline-flex min-h-11 cursor-pointer items-center gap-2 font-display text-[1.35rem] text-warm-white/85 transition-colors duration-300 hover:text-brass"
                >
                  {l.label}
                  {"external" in l && l.external ? (
                    <>
                      <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="label text-brass">Visit</p>
          <address className="text-body mt-6 text-warm-white/75 not-italic">
            {brand.address1}
            <br />
            {brand.address2}
          </address>
          <div className="mt-5 flex flex-col items-start">
            <a href={brand.phoneHref} className="inline-flex min-h-11 cursor-pointer items-center text-warm-white/90 transition-colors duration-300 hover:text-brass">
              {brand.phone}
            </a>
            <a href={brand.emailHref} className="inline-flex min-h-11 cursor-pointer items-center text-warm-white/90 transition-colors duration-300 hover:text-brass">
              {brand.email}
            </a>
          </div>
        </div>
      </div>

      <div className={container}>
        <p className="border-t border-line-dark py-8 text-[14px] leading-relaxed text-warm-white/60">{footer.legal}</p>
      </div>
    </footer>
  );
}
