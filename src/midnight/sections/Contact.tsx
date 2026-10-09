import { ArrowUpRight, Clock, Mail, MapPin, Navigation, Phone, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { brand, contact } from "../../shared/content";
import { DemoForm } from "../../shared/DemoForm";
import { Reveal } from "../../shared/motion";
import { btnPrimary, container, SectionHeading } from "./ui";

function Detail({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 border-b border-line py-4 first:pt-0 last:border-b-0 sm:py-5">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-electric/15 ring-1 ring-electric/40">
        <Icon className="h-5 w-5 text-electric-soft" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</p>
        <div className="mt-1.5 text-[17px] leading-snug text-text">{children}</div>
      </div>
    </li>
  );
}

const link = "cursor-pointer font-semibold text-text underline decoration-white/20 underline-offset-4 transition-colors duration-200 hover:text-electric-soft hover:decoration-electric-soft";

export function Contact() {
  return (
    <section id="contact" className="relative isolate py-16 sm:py-20 lg:py-28">
      <div aria-hidden="true" className="absolute left-0 top-48 -z-10 h-[420px] w-[420px] max-w-full rounded-full bg-electric/15 blur-[140px]" />
      <div className={`${container} grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16`}>
        <div>
          <SectionHeading eyebrow={contact.eyebrow} title={contact.title} body={contact.body} />
          <Reveal delay={0.1}>
            <ul className="mt-10">
              <Detail icon={Phone} label="Call">
                <a href={brand.phoneHref} className={link}>
                  {brand.phone}
                </a>
              </Detail>
              <Detail icon={Mail} label="Email">
                <a href={brand.emailHref} className={`${link} break-all`}>
                  {brand.email}
                </a>
              </Detail>
              <Detail icon={MapPin} label="Office">
                <p>{brand.address1}</p>
                <p>{brand.address2}</p>
                <a
                  href={brand.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-[16px] font-semibold text-electric-soft transition-colors hover:text-text"
                >
                  Open in Google Maps
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Detail>
              <Detail icon={Clock} label="Hours">
                <dl className="grid gap-y-2 sm:grid-cols-[auto_1fr] sm:gap-x-6 sm:gap-y-1">
                  {brand.hours.map((h) => (
                    <div key={h.days} className="contents">
                      <dt className="text-[16px] text-muted">{h.days}</dt>
                      <dd className="-mt-2 sm:mt-0">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </Detail>
            </ul>
          </Reveal>
        </div>

        <div className="lg:pt-4">
        <Reveal delay={0.08}>
          <div className="relative rounded-[32px] border border-line bg-panel p-6 shadow-[0_60px_140px_-60px_rgba(59,108,255,0.55)] sm:p-10">
            <div aria-hidden="true" className="absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-electric to-transparent" />
            <h3 className="font-display text-[28px] font-bold tracking-[-0.03em] text-text">Send us a message</h3>
            <DemoForm
              className="mt-8"
              labelClass="text-[15px] font-semibold text-text/90"
              inputClass="mn-field min-h-12 w-full rounded-xl border border-line bg-panel-2 px-4 py-3 text-[16px] text-text placeholder:text-muted transition-[border-color,box-shadow] duration-200 hover:border-white/20 focus:border-electric focus:ring-4 focus:ring-electric/30"
              buttonClass={`${btnPrimary} w-full disabled:cursor-default disabled:bg-panel-2 disabled:text-text disabled:shadow-none`}
              noteClass="text-[16px] leading-relaxed text-muted"
            />
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-5 flex gap-4 rounded-[24px] border border-line bg-panel/70 p-6 sm:p-7">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber/15 ring-1 ring-amber/40">
              <Navigation className="h-5 w-5 text-amber" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-[16px] font-semibold text-text">Finding our office</p>
              <p className="mt-2 text-[16px] leading-relaxed text-muted">{brand.directions}</p>
            </div>
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
