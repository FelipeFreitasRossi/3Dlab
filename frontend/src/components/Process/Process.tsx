import { Reveal } from "../Reveal/Reveal";
import styles from "./Process.module.css";

const STEPS = [
  {
    title: "Conversa",
    text: "Entendemos a ideia, o uso e as restrições. Nada é produzido sem clareza do objetivo.",
  },
  {
    title: "Modelagem",
    text: "Criamos ou ajustamos o modelo 3D, validando dimensões, encaixes e viabilidade.",
  },
  {
    title: "Produção",
    text: "Impressão, pós-processamento e conferência peça por peça antes da entrega.",
  },
];

export function Process() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Como funciona</p>
            <h2 className={styles.title}>Da ideia ao objeto, sem atalhos.</h2>
          </div>
        </Reveal>

        <div className={styles.steps}>
          {STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 100}>
              <article className={styles.step}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}