import { useSmoothAnchors } from "../shared/motion";
import { Areas } from "./sections/Areas";
import { CantSell } from "./sections/CantSell";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { PropertyManagement } from "./sections/PropertyManagement";
import { Services } from "./sections/Services";
import { Stats } from "./sections/Stats";
import { Team } from "./sections/Team";
import { Testimonial } from "./sections/Testimonial";
import { Why } from "./sections/Why";

export function App() {
  useSmoothAnchors();
  return (
    <>
      <a
        href="#main"
        className="label sr-only z-[60] bg-brass px-5 py-3 text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
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
