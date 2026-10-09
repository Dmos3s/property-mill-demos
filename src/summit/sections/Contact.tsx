import { ArrowUpRight, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { brand, contact, media } from "../../shared/content";
import { DemoForm } from "../../shared/DemoForm";
import { Reveal } from "../../shared/motion";
import { btnPrimary, container, Em } from "../ui";

function Detail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-5 border-b border-line py-6">
      <span className="inline-flex size-11 flex-none items-center justify-center rounded-full border border-line bg-paper text-pm-blue">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold tracking-[0.16em] text-muted uppercase">{label}</p>
        <div className="mt-1.5 text-ink">{children}</div>
      </div>
    </div>
  );
}

export function Contact() {
  const [lead, ...rest] = contact.title.split("? ");
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 sm:py-32">
      <div className={`${container} grid gap-14 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">{contact.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="contact-title"
              className="mt-5 font-display text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.06] font-medium tracking-[-0.015em] text-balance text-ink"
            >
              {lead}? <Em>{rest.join("? ")}</Em>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 text-lg leading-relaxed text-muted">{contact.body}</p>
          </Reveal>

          <Reveal delay={0.18} className="mt-10 border-t border-line">
            <Detail icon={<Phone className="size-[18px]" aria-hidden="true" />} label="Call">
              <a href={brand.phoneHref} className="inline-flex min-h-11 cursor-pointer items-center font-display text-2xl text-ink transition-colors duration-200 hover:text-pm-blue">
                {brand.phone}
              </a>
            </Detail>
            <Detail icon={<Mail className="size-[18px]" aria-hidden="true" />} label="Email">
              <a href={brand.emailHref} className="inline-flex min-h-11 cursor-pointer items-center text-lg font-medium break-all text-ink transition-colors duration-200 hover:text-pm-blue">
                {brand.email}
              </a>
            </Detail>
            <Detail icon={<MapPin className="size-[18px]" aria-hidden="true" />} label="Office">
              <address className="not-italic">
                {brand.address1}
                <br />
                {brand.address2}
              </address>
              <a
                href={brand.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-1 inline-flex min-h-11 cursor-pointer items-center gap-1.5 font-semibold text-pm-blue transition-colors duration-200 hover:text-pm-blue-deep"
              >
                Open in Google Maps
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Detail>
            <Detail icon={<Clock className="size-[18px]" aria-hidden="true" />} label="Hours">
              <dl className="grid gap-1.5">
                {brand.hours.map((h) => (
                  <div key={h.days} className="flex flex-wrap justify-between gap-x-6 gap-y-0.5">
                    <dt>{h.days}</dt>
                    <dd className="text-muted">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </Detail>
            <Detail icon={<Navigation className="size-[18px]" aria-hidden="true" />} label="Finding us">
              <p className="leading-relaxed text-muted">{brand.directions}</p>
            </Detail>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-line bg-paper p-6 shadow-[0_40px_80px_-48px_rgba(14,27,51,0.45)] sm:p-10">
              <h3 className="font-display text-[1.875rem] leading-tight font-medium text-ink">Send us a message</h3>
              <p className="mt-2 text-muted">Tell us a little about your property or your plans.</p>
              <DemoForm
                className="mt-8"
                inputClass="summit-field"
                labelClass="text-sm font-semibold text-ink"
                buttonClass={`${btnPrimary} w-full sm:w-auto sm:self-start disabled:cursor-default disabled:bg-ink disabled:shadow-none`}
                noteClass="text-base leading-relaxed text-muted"
              />
            </div>
            <figure className="mt-6 grid items-center gap-5 sm:grid-cols-[11rem_1fr]">
              <div className="aspect-[3/2] overflow-hidden rounded-2xl bg-sand sm:aspect-square">
                <img
                  src={media.photo.office2}
                  alt="Property Mill sign outside the office at 4040 East Bijou Street"
                  loading="lazy"
                  className="h-full w-full object-cover object-[52%_50%]"
                />
              </div>
              <figcaption className="text-muted">
                <span className="font-display text-xl text-ink italic">Look for the Property Mill sign.</span>
                <br />
                {brand.address1}, {brand.address2}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
