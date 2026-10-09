// Windmill: bold brand colors, rounded bento cards, the windmill as the signature motif.
import { useSmoothAnchors } from "../shared/motion";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Stats } from "./sections/Stats";
import { Services } from "./sections/Services";
import { PropertyManagement } from "./sections/PropertyManagement";
import { CantSell } from "./sections/CantSell";
import { Areas } from "./sections/Areas";
import { Why } from "./sections/Why";
import { Testimonial } from "./sections/Testimonial";
import { Team } from "./sections/Team";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { panel } from "./sections/ui";

export function App() {
  useSmoothAnchors();
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-pm-blue px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <div className={panel}>
          <Stats />
          <Services />
        </div>
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
