// Contact: brand-blue details block beside a white form card.
import { ArrowUpRight, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { brand, contact } from "../../shared/content";
import { DemoForm } from "../../shared/DemoForm";
import { Reveal } from "../../shared/motion";
import { Eyebrow, container, panel } from "./ui";

function Detail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/12 text-white ring-1 ring-white/20">{icon}</span>
      <div className="min-w-0">
        <dt className="text-sm font-semibold uppercase tracking-[0.1em] text-white/75">{label}</dt>
        <dd className="mt-1 text-base text-white">{children}</dd>
      </div>
    </div>
  );
}

const linkOnBlue =
  "cursor-pointer font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors duration-200 hover:decoration-white focus-visible:outline-white";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className={panel}>
      <div className={`${container} grid gap-4 py-16 sm:py-24 lg:grid-cols-[1fr_1.05fr]`}>
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-pm-blue p-7 text-white sm:rounded-[2.5rem] sm:p-10 lg:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border-[44px] border-white/[0.06]" />
          <div className="relative">
            <Eyebrow tone="onBlue">{contact.eyebrow}</Eyebrow>
            <h2 id="contact-title" className="mt-5 text-[2.2rem] leading-[1.06] font-extrabold sm:text-5xl">
              {contact.title}
            </h2>
            <p className="mt-5 text-lg text-white/85">{contact.body}</p>

            <dl className="mt-10 grid gap-6">
              <Detail icon={<Phone size={19} aria-hidden="true" />} label="Call">
                <a href={brand.phoneHref} className={`${linkOnBlue} text-lg`}>
                  {brand.phone}
                </a>
              </Detail>
              <Detail icon={<Mail size={19} aria-hidden="true" />} label="Email">
                <a href={brand.emailHref} className={`${linkOnBlue} text-lg`}>
                  {brand.email}
                </a>
              </Detail>
              <Detail icon={<MapPin size={19} aria-hidden="true" />} label="Office">
                <address className="not-italic">
                  {brand.address1}
                  <br />
                  {brand.address2}
                </address>
                <a
                  href={brand.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-white px-4 text-[15px] font-semibold text-pm-blue transition-colors duration-200 hover:bg-sky focus-visible:outline-white"
                >
                  Open in Google Maps
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </Detail>
              <Detail icon={<Clock size={19} aria-hidden="true" />} label="Hours">
                <ul className="space-y-1">
                  {brand.hours.map((h) => (
                    <li key={h.days} className="flex flex-wrap gap-x-2">
                      <span className="font-semibold">{h.days}</span>
                      <span className="text-white/85">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </Detail>
              <Detail icon={<Navigation size={19} aria-hidden="true" />} label="Finding us">
                <span className="text-white/85">{brand.directions}</span>
              </Detail>
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col rounded-[2rem] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(11,16,32,0.35)] ring-1 ring-line sm:rounded-[2.5rem] sm:p-10 lg:p-12">
          <h3 className="text-2xl font-extrabold text-ink sm:text-3xl">Send us a message</h3>
          <p className="mt-2 text-base text-muted">Tell us about your property or your move. A local agent will get back to you.</p>
          <DemoForm
            className="wm-form mt-8"
            labelClass="text-sm font-semibold text-ink"
            inputClass="w-full min-h-12 rounded-2xl border border-line bg-soft px-4 py-3 text-base text-ink placeholder:text-[#5F6673] transition-[border-color,background-color,box-shadow] duration-200 hover:border-ink/25 focus:border-pm-blue focus:bg-white focus:outline-none focus:ring-4 focus:ring-pm-blue/15"
            buttonClass="inline-flex min-h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-pm-blue px-7 text-base font-semibold text-white shadow-[0_14px_30px_-14px_rgba(20,40,210,0.8)] transition-colors duration-200 hover:bg-pm-blue-deep focus-visible:outline-pm-blue disabled:cursor-default disabled:bg-ink sm:w-auto sm:self-start"
            noteClass="text-sm text-muted"
          />
          <div className="mt-10 flex flex-col gap-4 rounded-3xl bg-sky p-5 sm:flex-row sm:items-center sm:justify-between lg:mt-auto">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-pm-blue text-white">
                <Phone size={19} aria-hidden="true" />
              </span>
              <p className="text-base leading-snug text-ink">
                <span className="block font-display font-bold">Prefer to talk it through?</span>
                <span className="text-muted">{brand.hours[0].days}, {brand.hours[0].time}</span>
              </p>
            </div>
            <a
              href={brand.phoneHref}
              className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-5 font-semibold text-pm-blue ring-1 ring-pm-blue/20 transition-colors duration-200 hover:bg-pm-blue hover:text-white focus-visible:outline-pm-blue"
            >
              {brand.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
