import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "../../data/site";
import { Reveal } from "../Reveal/Reveal";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section id="contato" className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <h2 className={styles.title}>Tem uma ideia? Vamos dar forma.</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className={styles.text}>
            Conte o que você precisa. Respondemos com prazo, possibilidades e
            próximos passos — sem compromisso.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            <MessageCircle size={20} aria-hidden="true" />
            Conversar no WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}