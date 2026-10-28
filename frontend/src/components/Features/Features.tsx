import { Layers, Ruler, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "../Reveal/Reveal";
import styles from "./Features.module.css";

const FEATURES = [
  {
    icon: Layers,
    title: "Camada por camada",
    text: "Impressão FDM com controle de altura de camada para acabamento preciso.",
  },
  {
    icon: Ruler,
    title: "Sob medida",
    text: "Peças adaptadas às suas dimensões, encaixes e necessidades reais.",
  },
  {
    icon: ShieldCheck,
    title: "Materiais selecionados",
    text: "Filamentos técnicos escolhidos para resistência e durabilidade.",
  },
  {
    icon: Sparkles,
    title: "Acabamento manual",
    text: "Pós-processamento, lixamento e pintura feitos peça por peça.",
  },
];

export function Features() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Por que Pedra Lunar</p>
            <h2 className={styles.title}>O que muda quando é feito para você.</h2>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={index * 80}>
                <article className={styles.card}>
                  <span className={styles.icon}>
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className={styles.cardTitle}>{feature.title}</h3>
                  <p className={styles.cardText}>{feature.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}