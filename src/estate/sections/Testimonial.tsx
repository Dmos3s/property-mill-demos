import { partners, testimonial } from "../../shared/content";
import { Reveal } from "../../shared/motion";
import { container, sectionPad } from "../ui";

export function Testimonial() {
  return (
    <section aria-label="Client testimonial and partners" className={`bg-warm-white ${sectionPad}`}>
      <div className={container}>
        <figure className="mx-auto max-w-[58rem] text-center">
          <Reveal>
            <span aria-hidden="true" className="block font-display text-[8rem] leading-[0.6] text-brass sm:text-[10rem]">
              &ldquo;
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <blockquote className="mt-6 font-display text-[clamp(1.65rem,3vw,2.6rem)] leading-[1.28] text-balance text-ink italic">
              <p>{testimonial.quote}</p>
            </blockquote>
          </Reveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-12 flex items-center justify-center gap-5">
              <img
                src={testimonial.avatar}
                alt=""
                width={144}
                height={144}
                loading="lazy"
                className="size-14 rounded-full object-cover ring-1 ring-brass ring-offset-4 ring-offset-warm-white"
              />
              <span className="text-left">
                <span className="block font-display text-[1.5rem] leading-tight text-ink">{testimonial.name}</span>
                <span className="label mt-1 block text-brass-text">{testimonial.role}</span>
              </span>
            </figcaption>
          </Reveal>
        </figure>

        <Reveal className="mx-auto mt-24 max-w-[58rem] border-t border-line pt-12 sm:mt-28">
          <p className="label text-center text-muted">Trusted partners</p>
          <ul className="mt-8 grid grid-cols-3 items-center gap-4 sm:flex sm:justify-center sm:gap-x-16">
            {partners.map((p) => (
              <li key={p.name}>
                <img
                  src={p.logo}
                  alt={p.name}
                  width={560}
                  height={560}
                  loading="lazy"
                  className="aspect-[2/1] h-auto w-full object-cover sm:h-24 sm:w-48 opacity-70 mix-blend-multiply grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0 sm:h-24 sm:w-48"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
