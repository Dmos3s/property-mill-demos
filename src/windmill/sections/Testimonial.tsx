// Testimonial on a soft card with a big orange quote mark, then partner logos in white tiles.
import { Quote } from "lucide-react";
import { partners, testimonial } from "../../shared/content";
import { Reveal } from "../../shared/motion";
import { Item, Stagger, container } from "./ui";

export function Testimonial() {
  return (
    <section aria-label="What clients say" className={`${container} py-20 sm:py-28`}>
      <Reveal>
        <figure className="relative overflow-hidden rounded-[2rem] bg-soft p-7 sm:rounded-[2.5rem] sm:p-12 lg:p-16">
          <div aria-hidden="true" className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky sm:-right-20 sm:-top-20 sm:h-72 sm:w-72" />
          <div className="relative grid gap-6 lg:grid-cols-[auto_1fr] lg:gap-12">
            <Quote size={88} className="h-16 w-16 rotate-180 text-pm-orange sm:h-[88px] sm:w-[88px]" fill="currentColor" strokeWidth={0} aria-hidden="true" />
            <div>
              <blockquote className="font-display text-[1.45rem] leading-[1.35] font-semibold tracking-[-0.015em] text-ink sm:text-[1.95rem]">
                <p>{testimonial.quote}</p>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={`Portrait of ${testimonial.name}`}
                  loading="lazy"
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full object-cover ring-4 ring-white"
                />
                <div>
                  <p className="font-display text-lg font-bold text-ink">{testimonial.name}</p>
                  <p className="text-base text-muted">{testimonial.role}</p>
                </div>
              </figcaption>
            </div>
          </div>
        </figure>
      </Reveal>

      <div className="mt-6 grid items-center gap-5 lg:grid-cols-[1fr_3fr] lg:gap-8">
        <p className="font-display text-xl font-bold text-ink">Proud to work with local partners</p>
        <Stagger as="ul" className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4" delay={0.08}>
          {partners.map((p) => (
            <Item
              as="li"
              key={p.name}
              className="group relative h-28 overflow-hidden rounded-3xl bg-white ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_24px_44px_-28px_rgba(11,16,32,0.45)] sm:h-32"
            >
              <img
                src={p.logo}
                alt={`${p.name} logo`}
                loading="lazy"
                className="absolute left-1/2 top-1/2 w-[min(64%,230px)] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-75 grayscale transition-[filter,opacity] duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
