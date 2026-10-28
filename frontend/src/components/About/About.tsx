import { Reveal } from "../Reveal/Reveal";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="sobre" className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <div>
            <p className={styles.eyebrow}>Sobre a oficina</p>
            <h2 className={styles.title}>
              Precisão industrial, alma artesanal.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className={styles.text}>
            <p>
              A Pedra Lunar nasceu da ideia de que objetos funcionais também
              podem ser peças de design. Cada projeto começa com uma conversa,
              passa por modelagem digital e ganha forma camada por camada.
            </p>
            <p>
              <span className={styles.highlight}>
                Não produzimos em massa.
              </span>{" "}
              Produzimos o que faz sentido para quem encomenda. Do protótipo
              rápido à peça final, o controle de qualidade é manual e obsessivo.
            </p>
            <p>
              O resultado são objetos que carregam intenção — e duram.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}