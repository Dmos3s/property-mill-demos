# Property Mill demo websites

Three one-page design concepts for Property Mill Real Estate Group (Colorado Springs), prepared by FuseHQ.

| Concept | Path | Feel |
| --- | --- | --- |
| Summit | `/summit/` | Light, editorial, serif headlines, mountain video |
| Midnight | `/midnight/` | Dark, cinematic, bold type, glowing accents |
| Windmill | `/windmill/` | Bright brand colors, rounded bento cards, turning windmill |

The root page is a chooser that links to all three.

Live: https://dmos3s.github.io/property-mill-demos/

These are splash pages. The contact forms do not send anywhere yet. See `DEMO-NOTES.md` for every placeholder that must change before a real launch.

## Stack

Vite 8, React 19, TypeScript, Tailwind CSS 4, framer-motion 14, lucide-react. One build, four HTML entries. Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Working on it

```bash
npm install
npm run dev            # all four entries at http://localhost:5173/property-mill-demos/
npm run build          # full static build into dist/
node scripts/shoot.mjs summit   # build one entry, serve it, screenshot desktop + mobile into shots/
```

`PM_ONLY=midnight npm run build` builds a single entry. Per-entry type checks: `npx tsc --noEmit -p tsconfig.midnight.json`.

## Layout

- `src/shared/content.ts`: every word of copy, contact details, team, areas, media paths. All three demos read from it.
- `src/shared/motion.tsx`: reveal, word reveal, count-up, marquee, background video, smooth anchors.
- `src/summit`, `src/midnight`, `src/windmill`: one folder per concept, sections in `sections/`.
- `public/brand`: logo cut-outs from the client's logo. `public/media`: clips and photos (see `public/media/photo/CREDITS-wikimedia.txt`).
- `docs/superpowers/specs/`: the design spec. `docs/AGENT-BRIEF.md`: the build brief each concept was built from.
