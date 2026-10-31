import { useEffect, useState } from "react";
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
import { WhatsAppFloat } from "./components/WhatsAppFloat/WhatsAppFloat";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
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
          <WhatsAppFloat />
        </>
      )}
    </>
  );
}