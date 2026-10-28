import { useCallback, useState } from "react";
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
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";
import { WhatsAppFloat } from "./components/WhatsAppFloat/WhatsAppFloat";

export default function App() {
  // Tela de carregamento só na primeira carga do app
  const [isBooting, setIsBooting] = useState(true);

  // Quando a saída começa: libera o scroll e as animações do Hero
  // (o index.html já nasce com data-booting="true" para não piscar)
  const handleExitStart = useCallback(() => {
    document.documentElement.removeAttribute("data-booting");
  }, []);

  const handleDone = useCallback(() => setIsBooting(false), []);

  return (
    <>
      {isBooting && (
        <LoadingScreen onExitStart={handleExitStart} onDone={handleDone} />
      )}
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
  );
}
