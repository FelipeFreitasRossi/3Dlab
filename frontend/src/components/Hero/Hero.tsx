import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { WHATSAPP_URL } from "../../data/site";
import { Reveal } from "../Reveal/Reveal";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.inner}>
        <Reveal>
          <span className={styles.eyebrow}>
            <Sparkles size={12} aria-hidden="true" />
            Impressão 3D artesanal
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className={styles.title}>
            Objetos únicos,
            <br />
            <span className={styles.titleAccent}>feitos camada por camada.</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className={styles.subtitle}>
            Peças de design impressas em 3D com precisão. Do protótipo ao
            objeto final, cada detalhe é pensado para durar.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className={styles.actions}>
            <a href="#catalogo" className={styles.primaryCta}>
              Explorar catálogo
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryCta}
            >
              <MessageCircle size={18} aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}