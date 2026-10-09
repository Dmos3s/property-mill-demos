#!/usr/bin/env node
// Build one entry, serve it, and take verification screenshots with headless Chromium.
// Usage: node scripts/shoot.mjs <summit|midnight|windmill|estate|main> [--no-build]
// Output: shots/<entry>-desktop.png (full page, 1440 wide), shots/<entry>-mobile.png (390 wide),
//         shots/<entry>-hero.png (first viewport), and a console/page error report on stdout.
import { build, preview } from "vite";
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const entry = process.argv[2];
const skipBuild = process.argv.includes("--no-build");
const valid = ["summit", "midnight", "windmill", "estate", "main"];
if (!valid.includes(entry)) {
  console.error(`usage: node scripts/shoot.mjs <${valid.join("|")}> [--no-build]`);
  process.exit(2);
}
const ports = { main: 4180, summit: 4181, midnight: 4182, windmill: 4183, estate: 4184 };
const outDir = resolve(`dist-${entry}`);
const base = "/property-mill-demos/";
const path = entry === "main" ? base : `${base}${entry}/`;

process.env.PM_ONLY = entry;
if (!skipBuild) {
  await build({ logLevel: "warn", build: { outDir, emptyOutDir: true } });
}
const server = await preview({ logLevel: "silent", build: { outDir }, preview: { port: ports[entry], strictPort: true, open: false } });
const url = `http://localhost:${ports[entry]}${path}`;

mkdirSync("shots", { recursive: true });
const browser = await chromium.launch();
const problems = [];

async function shoot(width, height, file, { fullPage }) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") problems.push(`[${width}px console.${m.type()}] ${m.text()}`);
  });
  page.on("pageerror", (e) => problems.push(`[${width}px pageerror] ${e.message}`));
  page.on("requestfailed", (r) => problems.push(`[${width}px requestfailed] ${r.url()} ${r.failure()?.errorText ?? ""}`));
  page.on("response", (r) => {
    if (r.status() >= 400) problems.push(`[${width}px http ${r.status()}] ${r.url()}`);
  });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  if (fullPage) {
    // Scroll through slowly so whileInView animations fire, then return to the top.
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += Math.round(height * 0.6)) {
      await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: "instant" }), y);
      await page.waitForTimeout(220);
    }
    await page.waitForTimeout(600);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(900);
    // Freeze remaining animations so the capture is not mid-tween.
    await page.evaluate(() => document.getAnimations().forEach((a) => { try { a.finish(); } catch {} }));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 0) problems.push(`[${width}px layout] horizontal overflow of ${overflow}px`);
  }
  if (fullPage) {
    // Chromium cannot capture more than 16384px in one shot; stitch tall pages from slices.
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    const LIMIT = 16000;
    if (total <= LIMIT) {
      await page.screenshot({ path: `shots/${file}`, fullPage: true });
    } else {
      const { PNG } = await import("pngjs");
      const out = new PNG({ width, height: total });
      for (let y = 0; y < total; y += LIMIT) {
        const h = Math.min(LIMIT, total - y);
        const buf = await page.screenshot({ fullPage: true, clip: { x: 0, y, width, height: h } });
        const part = PNG.sync.read(buf);
        PNG.bitblt(part, out, 0, 0, width, h, 0, y);
      }
      const { writeFileSync } = await import("node:fs");
      writeFileSync(`shots/${file}`, PNG.sync.write(out));
    }
  } else {
    await page.screenshot({ path: `shots/${file}`, fullPage: false });
  }
  await page.close();
}

await shoot(1440, 900, `${entry}-hero.png`, { fullPage: false });
await shoot(1440, 900, `${entry}-desktop.png`, { fullPage: true });
await shoot(390, 844, `${entry}-mobile.png`, { fullPage: true });

await browser.close();
server.httpServer.close();

console.log(`shots written: shots/${entry}-hero.png shots/${entry}-desktop.png shots/${entry}-mobile.png`);
if (problems.length) {
  console.log(`PROBLEMS (${problems.length}):`);
  for (const p of [...new Set(problems)]) console.log("  " + p);
  process.exitCode = 1;
} else {
  console.log("no console errors, failed requests or horizontal overflow");
}
