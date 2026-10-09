import { motion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import { brand, asset } from "./shared/content";
import { fadeUp, stagger } from "./shared/motion";

const concepts = [
  {
    slug: "summit",
    name: "Summit",
    mood: "Light, editorial and calm. Serif headlines, mountain video, lots of breathing room.",
    palette: ["#F7F4EE", "#0E1B33", "#1D3FD6", "#E4641B"],
    shot: asset("shots/summit.jpg"),
  },
  {
    slug: "midnight",
    name: "Midnight",
    mood: "Dark and cinematic. Bold type, glowing accents, video inside the layout.",
    palette: ["#070B14", "#0E1526", "#3B6CFF", "#F7931E"],
    shot: asset("shots/midnight.jpg"),
  },
  {
    slug: "windmill",
    name: "Windmill",
    mood: "Bright brand colors, rounded cards and a turning windmill. Friendly and energetic.",
    palette: ["#FFFFFF", "#1428D2", "#F26A1B", "#0B1020"],
    shot: asset("shots/windmill.jpg"),
  },
];

export function Chooser() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-6xl flex-col px-4 py-10 sm:px-6 lg:px-8">
      <motion.header variants={stagger(0.1)} initial="hidden" animate="show" className="flex flex-col gap-6">
        <motion.img variants={fadeUp} src={brand.logo.color} alt={brand.fullName} className="h-16 w-auto self-start sm:h-20" />
        <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.2em] text-pm-blue">
          Website design concepts
        </motion.p>
        <motion.h1 variants={fadeUp} className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
          Three directions for the new Property Mill website.
        </motion.h1>
        <motion.p variants={fadeUp} className="max-w-2xl text-lg text-ink/75">
          Same words, same team, same phone number. Three different feelings. Open each one, scroll all the way down, and tell us which
          one feels like Property Mill. Everything here is a design demo: the forms do not send yet, and the photos are placeholders we
          will swap for your own.
        </motion.p>
      </motion.header>

      <motion.section
        variants={stagger(0.12, 0.3)}
        initial="hidden"
        animate="show"
        className="mt-12 grid gap-6 md:grid-cols-3"
        aria-label="Design concepts"
      >
        {concepts.map((c, i) => (
          <motion.a
            key={c.slug}
            variants={fadeUp}
            href={`${c.slug}/`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl focus-visible:shadow-xl"
          >
            <div
              className="relative aspect-[4/3] overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${c.palette[1]} 0%, ${c.palette[2]} 60%, ${c.palette[3]} 100%)` }}
            >
              <img
                src={c.shot}
                alt={`${c.name} concept preview`}
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading={i === 0 ? "eager" : "lazy"}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                Concept {i + 1}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl">{c.name}</h2>
                <ArrowUpRight className="h-6 w-6 text-pm-blue transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <p className="text-ink/75">{c.mood}</p>
              <div className="mt-auto flex items-center gap-2 pt-2" aria-hidden="true">
                {c.palette.map((p) => (
                  <span key={p} className="h-5 w-5 rounded-full border border-ink/10" style={{ background: p }} />
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </motion.section>

      <footer className="mt-auto flex flex-col gap-3 pt-16 text-sm text-ink/60 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Prepared for {brand.fullName} by FuseHQ. Design demos only, nothing on the back end yet.
        </p>
        <a href={brand.phoneHref} className="inline-flex items-center gap-2 font-semibold text-ink hover:text-pm-blue">
          <Phone className="h-4 w-4" /> {brand.phone}
        </a>
      </footer>
    </main>
  );
}
