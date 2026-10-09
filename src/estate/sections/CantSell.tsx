import { cantSell, estateStills } from "../../shared/content";
import { Reveal } from "../../shared/motion";
import { btnInk, container, Em, Eyebrow, FramedImage, sectionPad } from "../ui";

export function CantSell() {
  const [question, answer] = cantSell.title.split("? ");
  return (
    <section aria-labelledby="cant-sell-title" className={`bg-warm-white ${sectionPad}`}>
      <div className={`${container} grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-10`}>
        <Reveal className="lg:col-span-6">
          <FramedImage
            src={estateStills.suite}
            alt="Primary bedroom with paneled walls, framed prints and soft morning light"
            ratio="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[5/6]"
            offset="right"
          />
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <Eyebrow>{cantSell.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="cant-sell-title" className="mt-7 font-display text-[clamp(2.4rem,4vw,3.75rem)] leading-[1.04] tracking-[-0.01em] text-balance text-ink">
              {question}? <Em>{answer}</Em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-body mt-8 text-muted">{cantSell.body}</p>
          </Reveal>
          <Reveal delay={0.22}>
            <ul className="mt-9 border-t border-line">
              {cantSell.bullets.map((b, i) => (
                <li key={b} className="text-body flex gap-5 border-b border-line py-4 text-ink">
                  <span className="font-display w-6 flex-none pt-px text-lg leading-[1.6] text-brass-text">{String(i + 1).padStart(2, "0")}</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.28}>
            <a href="#contact" className={`${btnInk} mt-10`}>
              {cantSell.cta}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
