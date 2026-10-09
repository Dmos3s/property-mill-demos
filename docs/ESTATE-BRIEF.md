# Estate concept: addendum to AGENT-BRIEF.md

Read `docs/AGENT-BRIEF.md` first; everything there applies. This file adds what is specific to the Estate concept. Work only inside `src/estate/`.

## The idea

One beautiful Colorado home, walked through on camera, is the whole hero. The visitor lands on the approach to the house, the camera moves inside to the great room, the kitchen, the hearth, the primary suite, and ends on a Front Range view. Property Mill's headline, eyebrow and two CTAs sit over the footage. Everything after the hero reads like a luxury listing brochure: thin serifs, brass hairlines, big photography, lots of quiet.

## Shared pieces built for you (do not edit them)

- `src/shared/VideoSequence.tsx`: `<VideoSequence scenes={estateScenes} maxSeconds={8} zoomTo={1.08} className="absolute inset-0" captionClass="..." barClass="bg-white/25" barActiveClass="bg-brass" />`. It crossfades the clips, pushes in slowly, shows story-style progress segments and a caption per scene, and falls back to posters under reduced motion. Pass `chrome={false}` and use `onScene` if you want to draw your own caption and progress UI.
- `estateScenes` and `estateStills` in `src/shared/content.ts`. Stills are 1800px frames from the same clips; use them as section photography (kitchen for Residential PM, hearth for Buying, great room for Selling, approach for Commercial, suite for Can't sell, view for Why or Areas).
- Fonts are already linked in `estate/index.html`: Cormorant Garamond (300 to 700, italics) and Jost (300 to 600).

## Design tokens (define in `@theme` as `--color-*` and `--font-*`)

- charcoal `#15171C` (dark sections and hero overlay), warm-white `#F6F2EB` (page bg), stone `#E9E3D8` (soft panels), brass `#B8935A` (hairlines, numerals, small caps labels, primary button), brass-deep `#8E6E3C` (brass text on light backgrounds so it passes 4.5:1), ink `#1B1D22` (text), muted `#6B6760`, line `rgba(27,29,34,0.12)`, line-dark `rgba(246,242,235,0.14)`.
- `--font-display: "Cormorant Garamond"`, `--font-sans: "Jost"`. Headlines in Cormorant 400 (light feel), one italic word for emphasis, sizes up to clamp(3rem, 7vw, 6.5rem). Body in Jost 400, 17px on desktop. Labels in Jost 500 small caps with 0.18em tracking.

## Sections (same order and ids as the brief)

1. Header: transparent over the hero with `brand.logo.white`; after scrolling 80px it becomes warm-white with a hairline and `brand.logo.color`. Nav in Jost small caps. Phone CTA as a brass-outlined pill.
2. Hero (`id="top"`): the `VideoSequence` fills the viewport (min-h-dvh). Over it: a gradient from charcoal/70 at the bottom and left to transparent; eyebrow "Property management and real estate across the Pikes Peak region" with a brass hairline; `hero.headline` with WordReveal in Cormorant, white, "integrity." in italic brass; `hero.sub` in warm-white/85; CTAs: brass solid with ink text (`#contact`) and white outline (`brand.appfolio`, new tab). The sequence's own caption and progress segments sit bottom-left in Jost small caps. A thin "Scroll" cue bottom-center. Keep the headline readable over every clip (the gradient handles it).
3. Stats: a listing-spec strip under the hero on charcoal: four Cormorant numerals with brass small-caps labels, hairlines between them, CountUp on the numbers ("Since 2001" as plain text).
4. Services (`id="services"`): editorial two-column rows alternating image left/right. Each row: brass numeral 01 to 04, Cormorant title, Jost short line, body, bullets with thin brass dashes, "Talk to us" link with arrow. Images are the stills in 4:3 frames with a 1px brass offset frame behind them and a slow parallax. Ids: property-management, commercial, buying, selling.
5. Property management spotlight: charcoal section. Cormorant headline, body, six included items as a two-column list with small brass check icons, four process steps in a row with a brass line that draws between them on reveal (Reveal + motion.div scaleX).
6. Can't sell: warm-white. Suite still with the brass offset frame, bullets, CTA.
7. Areas (`id="areas"`): a horizontal strip of five photos (the shared `areas` photos) in 3:4 frames with small-caps captions and the blurb under each; scroll-snap on mobile, five columns on desktop; hover brightens.
8. Why: stone section, three columns with a thin top rule, brass numerals, lucide icons in thin brass circles.
9. Testimonial: large Cormorant italic quote centered on warm-white, brass quotation mark, avatar. Partners row below in grayscale.
10. Team (`id="team"`): Hans featured with a brass-outlined circle monogram "HR" in Cormorant, his facts as a hairline list, email and phone; four agents as a four-column list with hairlines, Cormorant names, Jost small-caps roles.
11. Contact (`id="contact"`): charcoal. Details left (phone, email, address with map link, hours, directions), `DemoForm` right with stone inputs on a warm-white card. Pass classes so inputs are 44px tall with brass focus rings.
12. Footer: ink. White logo, blurb, links, socials as text pills, legal.

## Verify

`npx tsc --noEmit -p tsconfig.estate.json`, then `node scripts/shoot.mjs estate`, then LOOK at `shots/estate-hero.png`, `shots/estate-desktop.png`, `shots/estate-mobile.png` and fix until it reads as a finished luxury brokerage site at both widths with no problems printed. The screenshots show poster frames because headless Chromium does not decode these mp4s; that is expected.
