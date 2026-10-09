import { useEffect } from "react";
import { useSmoothAnchors } from "../shared/motion";
import { Areas } from "./sections/Areas";
import { CantSell } from "./sections/CantSell";
import { ScrollProgress, SectionDots } from "./sections/Chrome";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { PropertyManagement } from "./sections/PropertyManagement";
import { Services } from "./sections/Services";
import { Stats } from "./sections/Stats";
import { Team } from "./sections/Team";
import { Testimonial } from "./sections/Testimonial";
import { Ticker } from "./sections/Ticker";
import { Why } from "./sections/Why";

/** Flags the page as "live" on the first real interaction, which switches on the .mn-fx transitions. */
function useLiveFlag() {
  useEffect(() => {
    const events = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart"] as const;
    const off = () => events.forEach((e) => window.removeEventListener(e, on));
    const on = () => {
      document.documentElement.dataset.mnLive = "1";
      off();
    };
    events.forEach((e) => window.addEventListener(e, on, { passive: true }));
    return off;
  }, []);
}

export function App() {
  useSmoothAnchors();
  useLiveFlag();
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[80] -translate-y-24 rounded-full bg-electric-deep px-5 py-3 font-semibold text-white transition-transform focus-visible:translate-y-0"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Header />
      <SectionDots />
      <main id="main">
        <Hero />
        <Ticker />
        <Stats />
        <Services />
        <PropertyManagement />
        <CantSell />
        <Areas />
        <Why />
        <Testimonial />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
