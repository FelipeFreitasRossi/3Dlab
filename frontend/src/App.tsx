import { BackgroundFX } from "./components/BackgroundFX/BackgroundFX";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { Catalog } from "./components/Catalog/Catalog";
import { About } from "./components/About/About";
import { Features } from "./components/Features/Features";
import { Process } from "./components/Process/Process";
import { Testimonials } from "./components/Testimonials/Testimonials";
import { Contact } from "./components/Contact/Contact";
import { Footer } from "./components/Footer/Footer";

export default function App() {
  return (
    <>
      <BackgroundFX />
      <Header />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <Catalog />
        <About />
        <Features />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}