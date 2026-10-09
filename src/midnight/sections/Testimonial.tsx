import { partners, testimonial } from "../../shared/content";
import { Reveal } from "../../shared/motion";
import { container } from "./ui";

export function Testimonial() {
  return (
    <section aria-label="Client review and partners" className="relative py-16 sm:py-20 lg:py-28">
      <div className={container}>
        <figure className="relative mx-auto max-w-5xl">
          <div aria-hidden="true" className="absolute -left-10 -top-10 -z-10 h-64 w-64 rounded-full bg-amber/10 blur-[100px]" />
          <Reveal>
            <span
              aria-hidden="true"
              className="block h-[0.62em] font-display text-[120px] font-extrabold leading-[0.9] text-amber [text-shadow:0_0_60px_rgba(247,147,30,0.45)] sm:text-[220px]"
            >
              &ldquo;
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <blockquote className="mt-4 font-display text-[clamp(1.5rem,2.9vw,2.5rem)] font-medium leading-[1.28] tracking-[-0.025em] text-text">
              <p>{testimonial.quote}</p>
            </blockquote>
          </Reveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-10 flex items-center gap-4">
              <img
                src={testimonial.avatar}
                alt={`Portrait of ${testimonial.name}`}
                loading="lazy"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-amber/70 ring-offset-4 ring-offset-night"
              />
              <span className="flex flex-col">
                <span className="font-display text-[18px] font-semibold tracking-[-0.01em] text-text">{testimonial.name}</span>
                <span className="text-[16px] text-muted">{testimonial.role}</span>
              </span>
            </figcaption>
          </Reveal>
        </figure>

        <Reveal className="mt-20 border-t border-line pt-10 lg:mt-24">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <p className="font-display text-[14px] font-semibold uppercase tracking-[0.18em] text-muted">Our partners</p>
            <ul className="flex items-center justify-center gap-x-4 sm:gap-x-10 md:gap-x-14">
              {partners.map((p) => (
                <li key={p.name}>
                  <img
                    src={p.logo}
                    alt={p.name}
                    loading="lazy"
                    className="h-[46px] w-[108px] object-cover sm:h-[72px] sm:w-[172px] opacity-70 mix-blend-screen transition-opacity duration-300 [filter:grayscale(1)_invert(1)_brightness(1.4)] hover:opacity-100"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
