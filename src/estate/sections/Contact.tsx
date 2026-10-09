import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { brand, contact } from "../../shared/content";
import { DemoForm } from "../../shared/DemoForm";
import { Reveal } from "../../shared/motion";
import { btnBrass, container, Em, Eyebrow, h2Class, sectionPad } from "../ui";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-2 border-b border-line-dark py-6 sm:grid-cols-[9rem_1fr] sm:gap-6">
      <dt className="label pt-1 text-brass">{label}</dt>
      <dd className="min-w-0 text-warm-white">{children}</dd>
    </div>
  );
}

const valueLink =
  "cursor-pointer border-b border-brass/40 font-display text-[1.6rem] leading-snug text-warm-white transition-colors duration-300 hover:border-brass hover:text-brass";

export function Contact() {
  const [ask, answer] = contact.title.split("? ");
  return (
    <section id="contact" aria-labelledby="contact-title" className={`dark-surface bg-charcoal text-warm-white ${sectionPad}`}>
      <div className={`${container} grid gap-16 lg:grid-cols-12 lg:gap-10`}>
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow tone="dark">{contact.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="contact-title" className={`${h2Class} mt-7 text-warm-white`}>
              {ask}? <Em tone="dark">{answer}</Em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-body mt-8 text-warm-white/75">{contact.body}</p>
          </Reveal>

          <Reveal delay={0.22}>
            <dl className="mt-12 border-t border-line-dark">
              <Row label="Phone">
                <a href={brand.phoneHref} className={valueLink}>
                  {brand.phone}
                </a>
              </Row>
              <Row label="Email">
                <a href={brand.emailHref} className={`${valueLink} break-all`}>
                  {brand.email}
                </a>
              </Row>
              <Row label="Office">
                <p className="text-body text-warm-white/90">
                  {brand.address1}
                  <br />
                  {brand.address2}
                </p>
                <a
                  href={brand.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label mt-3 inline-flex min-h-11 cursor-pointer items-center gap-2 text-brass transition-colors duration-300 hover:text-warm-white"
                >
                  Open in Google Maps
                  <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Row>
              <Row label="Hours">
                <ul className="text-body space-y-1.5">
                  {brand.hours.map((h) => (
                    <li key={h.days} className="flex flex-wrap justify-between gap-x-6 text-warm-white/90">
                      <span>{h.days}</span>
                      <span className="text-warm-white/70">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </Row>
              <Row label="Directions">
                <p className="text-body text-warm-white/75">{brand.directions}</p>
              </Row>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 border border-brass/50 sm:translate-x-5 sm:translate-y-5" />
            <div className="relative bg-warm-white p-6 text-ink sm:p-10 lg:p-12">
              <p className="label text-brass-text">Send a message</p>
              <h3 className="mt-4 font-display text-[clamp(2rem,3vw,2.6rem)] leading-[1.08] text-ink">
                Tell us about your <Em>property</Em>
              </h3>
              <DemoForm
                className="mt-9"
                inputClass="estate-field"
                labelClass="label text-ink/75"
                buttonClass={`${btnBrass} w-full hover:bg-ink hover:text-warm-white disabled:cursor-default disabled:opacity-80`}
                noteClass="text-[15px] leading-relaxed text-muted"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
