# Brief for building one Property Mill demo

You are building ONE of three one-page demo websites for Property Mill Real Estate Group (Colorado Springs). Read this whole file, then `docs/superpowers/specs/2026-10-08-property-mill-demos-design.md`, then `src/shared/content.ts` and `src/shared/motion.tsx`, before writing code.

The client, broker Hans Rosielle, likes video, animation and movement. The bar is a "$10,000 agency site": it must look designed, not generated. Dan (FuseHQ) will review every screenshot.

## Project layout (already in place, do not change)

- Vite 8 + React 19 + TypeScript + Tailwind CSS 4 (`@tailwindcss/vite`) + framer-motion 14 + lucide-react.
- `<demo>/index.html` already exists and loads `/src/<demo>/main.tsx`. Fonts for your demo are already linked there.
- `src/shared/content.ts`: ALL copy, contact details, team, areas, services, media paths. Import from it; do not retype copy or invent facts, numbers, awards or reviews. The `asset()` helper prefixes the GitHub Pages base path.
- `src/shared/motion.tsx`: `Reveal`, `WordReveal`, `CountUp`, `Marquee`, `BgVideo`, `useSmoothAnchors`, `fadeUp`, `stagger`, `easeOut`. Use them, and add your own motion on top.
- `src/shared/DemoForm.tsx`: the contact form (no back end, shows the demo note on submit). Pass it your class names.
- `src/shared/Windmill.tsx`: animated SVG windmill drawn from the logo. Optional for Summit and Midnight, required for Windmill.
- `src/shared/base.css`: shared reset. Your `theme.css` must start with `@import "tailwindcss"; @import "../shared/base.css";` then an `@theme { ... }` block with your palette and fonts, then any global rules.
- Assets live in `public/brand/` (logo-color.png, logo-white.png, mark.png, mark-white.png, wordmark.png, wordmark-white.png, favicon.png) and `public/media/` (video/*.mp4 with matching .jpg posters, photo/*.jpg). Reference them only through `brand.logo.*` and `media.*` in content.ts.

## Files you create (only inside your folder)

- `src/<demo>/main.tsx`: imports `./theme.css`, renders `<App />` in StrictMode.
- `src/<demo>/theme.css`
- `src/<demo>/App.tsx`: calls `useSmoothAnchors()`, composes the sections in order.
- `src/<demo>/sections/*.tsx`: one file per section (Header, Hero, Services, PropertyManagement, CantSell, Areas, Why, Testimonial, Team, Contact, Footer). Keep files focused.

Do not edit anything in `src/shared/`, other demo folders, `vite.config.ts`, `index.html` files or `package.json`. If you believe a shared file needs a change, say so in your final report instead.

## Sections, in order, with the section ids the nav expects

1. Header: logo (image from `brand.logo`), nav links from `nav`, phone CTA (`brand.phoneHref`), mobile hamburger with an animated panel. Becomes compact or blurred on scroll.
2. Hero (`id="top"`): `hero.headline`, `hero.sub`, two CTAs (`hero.primaryCta` -> `#contact`, `hero.secondaryCta` -> `brand.appfolio`, opens in a new tab). Real motion here: video, word reveal, parallax, something alive.
3. Stats band using `stats` and `CountUp` (the "Since 2001" item: prefix "Since ", value 2001, no thousands separator looks wrong, so render that one as plain text "Since 2001").
4. Services (`id="services"`): the four `services`. Each card also needs an anchor so the nav works: wrap or mark the Residential PM card with `id="property-management"`, Buying with `id="buying"`, Selling with `id="selling"`. The commercial card can use `id="commercial"`.
5. Property management spotlight (`propertyManagement`): fixed-rate story, the six included items, the four-step process. This is the client's specialty, give it weight.
6. Can't sell (`cantSell`): image + bullets + CTA.
7. Areas (`id="areas"`): the five `areas` with photos.
8. Why choose (`why`): three pillars, icons from lucide-react by the `icon` name (ShieldCheck, Building2, MapPinned).
9. Testimonial (`testimonial`) and partners (`partners` logos, grayscale until hover is fine).
10. Team (`id="team"`): Hans featured with `facts`, four agents as cards with initials avatars (no stock faces as agents).
11. Contact (`id="contact"`): `contact` copy, phone/email/address/hours/directions from `brand`, map link, and `<DemoForm />`.
12. Footer: `footer.blurb`, `footer.links`, socials (`brand.facebook`, `brand.linkedin`), `footer.legal`.

## Quality bar (UI/UX Pro Max checklist, non-negotiable)

- Lucide SVG icons only. No emoji anywhere.
- Body text 16px minimum, 4.5:1 contrast, visible focus rings, 44px touch targets, `cursor-pointer` on clickables.
- Hover feedback with 150 to 300ms transitions. No hover scale that shifts layout.
- Responsive at 375, 768, 1024 and 1440. No horizontal scroll. Fixed header must not hide content (pad the hero).
- `prefers-reduced-motion`: `BgVideo` and the shared primitives already handle it; follow suit for anything you add (`useReducedMotion`).
- Videos: use `BgVideo` with the matching poster. Images get descriptive alt text or `alt=""` when decorative, and `loading="lazy"` below the fold.
- No em dashes in any text you write. Use commas and periods.
- Keep every string from content.ts. Small connective labels ("Learn more", "Call us") are fine.

## Verify before you report (required)

1. Type check: `npx tsc --noEmit -p tsconfig.<demo>.json`
2. Build and screenshot: `node scripts/shoot.mjs <demo>` (builds only your entry into `dist-<demo>/`, serves it, writes `shots/<demo>-hero.png`, `shots/<demo>-desktop.png`, `shots/<demo>-mobile.png`, and prints console errors, failed requests and horizontal overflow).
3. LOOK at all three screenshots with the Read tool. Fix anything broken, cramped, overlapping, low-contrast or empty. Repeat until the page looks like a finished agency site at both widths and the script prints no problems.

Final report: what you built, anything you could not resolve, and anything in shared files you think should change. Do not claim it is done unless step 3 passed and you looked at the screenshots.
