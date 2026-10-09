# Property Mill demo websites, design spec

Date: 2026-10-08
Client: Property Mill Real Estate Group, Colorado Springs (broker and owner Hans Rosielle)
Builder: FuseHQ (Dan Moses), built by Claude with the website-builder stack

## Goal

Three distinct one-page demo websites for Property Mill so Hans can react to direction before a real build. He approved reuse of his logo, layout and site copy. He likes video, animation and movement. Nothing on the back end: the pages are splash pages with real copy, real contact details and working phone, email and map links, but no form processing.

## Decisions made without Dan (reported in the hand-off)

- Hosting: GitHub Pages from the public repo `Dmos3s/property-mill-demos`, deployed by GitHub Actions on every push to `main`. Vercel was not usable: the Mac CLI is logged out and the Hermes token is not authorized. The URL can move to a nicer domain later.
- One repo, one Vite build, three entry pages plus a chooser page at the root.
- Media: free Mixkit clips (720p, Mixkit license, no attribution required), Wikimedia Commons photos of Colorado Springs (CC BY / CC BY-SA, credits kept in `public/media/photo/CREDITS-wikimedia.txt`) and the stock photos already licensed on propertymill.com.
- Forms submit nowhere. On submit they show a note that the live site will deliver the message to info@propertymill.com.

## Stack

- Vite 8, React 19, TypeScript, Tailwind CSS 4 (via `@tailwindcss/vite`), framer-motion 14, lucide-react icons.
- Google Fonts loaded per demo from each `index.html`.
- Static output in `dist/`, base path `/property-mill-demos/`.

## Shared content (`src/shared/content.ts`)

All three demos read the same content module so the copy, team, areas and contact details stay identical. Only presentation differs. Copy is tightened from propertymill.com with no em dashes.

Sections every demo must cover, in this order unless the concept calls for a swap:

1. Header: logo, anchor nav (Selling, Buying, Property Management, Available Properties, Contact), phone CTA.
2. Hero: headline, subhead, two CTAs, motion.
3. Services: Residential PM, Commercial PM, Buying, Selling.
4. Property management spotlight: fixed-rate fee story, what is included, four-step process.
5. Can't sell your home: turn it into a rental.
6. Service areas: Colorado Springs, Monument / Fountain / Falcon, Manitou Springs, Woodland Park and Teller County.
7. Why choose Property Mill: integrity, residential and commercial, independently owned.
8. Testimonial (Scott Sufak) and partner logos.
9. Team: Hans Rosielle plus Roger Swann, Shelley Eaton, Brenda Salinas, Clayton Whitney.
10. Contact: phone, email, address, hours, directions, demo form.
11. Footer.

## The three concepts

### 1. Summit (`/summit/`)  light, editorial, classic brokerage

- Palette: cream `#F7F4EE`, white, ink `#0E1B33`, muted `#4A5568`, logo blue toned to `#1D3FD6`, orange `#E4641B` for secondary accents.
- Type: Playfair Display headings, Inter body.
- Motion: full-bleed hero video (forest ridge) fading into cream, word-by-word headline reveal, scroll reveals with 0.6 s ease, image parallax, counters, a slow marquee of community names, hover zoom on area photos.
- Feel: trust, calm, premium. White space and photography carry it.

### 2. Midnight (`/midnight/`)  dark, cinematic, bold type

- Palette: night `#070B14`, panel `#0E1526`, text `#F3F5F9`, muted `#98A2B3`, electric blue `#3B6CFF`, amber `#F7931E`.
- Type: Sora headings (tight, heavy), Manrope body.
- Motion: dark forest video hero with grain overlay and gradient, kinetic oversized headline, cursor glow, ticker of services and areas, bento grid with video inside a tile, glass cards, scroll progress bar, sticky section dots.
- Feel: modern, confident, "big brokerage energy" while staying local.

### 3. Windmill (`/windmill/`)  bold brand colors, bento, playful but professional

- Palette: white, soft `#F2F4FB`, logo blue `#1428D2`, orange `#F26A1B`, red `#B5121B` (sparingly), ink `#0B1020`.
- Type: Outfit headings (Plus Jakarta Sans was tried first but its punctuation sits too far from the letters at heavy weights), DM Sans body.
- Motion: SVG windmill with slowly rotating blades in the hero, stacked rounded photo cards with Ken Burns, chips that spring in, bento tiles that tilt toward the cursor, animated fixed-rate badge, step counter that fills as you scroll.
- Feel: energetic, friendly, unmistakably Property Mill (the windmill is Hans's Dutch nod).

## Root chooser (`/`)

A small page for Dan to share: Property Mill logo, "Three design directions", three cards with a screenshot, name, one-line mood and an Open button. Footer notes these are design demos by FuseHQ.

## Quality bar (from UI/UX Pro Max)

- Lucide SVG icons only, no emoji icons.
- Body text 16 px minimum, 4.5:1 contrast, visible focus rings, 44 px touch targets.
- Responsive at 375, 768, 1024 and 1440. No horizontal scroll.
- `prefers-reduced-motion` disables the video autoplay loop and large motion.
- Videos are muted, autoplay, loop, playsinline, with poster images.

## Verification

- `npm run build` succeeds with no TypeScript errors.
- Each page checked in the browser at desktop and phone widths, screenshots captured.
- No console errors.
- Live URLs load after the Pages deploy.
