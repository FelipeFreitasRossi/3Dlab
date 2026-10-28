import { BadgeCheck, Quote, Star } from "lucide-react";
import { Reveal } from "../Reveal/Reveal";
import styles from "./Testimonials.module.css";

const TESTIMONIALS = [
  {
    quote:
      "Precisava de uma peça de reposição que não existe mais no mercado. Recebi algo melhor que o original.",
    author: "Cliente A",
    role: "Reposição técnica",
    rating: 5,
  },
  {
    quote:
      "O cuidado com o acabamento foi o que me surpreendeu. Não parece impressão 3D de longe.",
    author: "Cliente B",
    role: "Peça decorativa",
    rating: 5,
  },
  {
    quote:
      "Do primeiro contato à entrega, tudo foi claro. Sabia exatamente o que esperar em cada etapa.",
    author: "Cliente C",
    role: "Protótipo funcional",
    rating: 5,
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Quem já encomendou</p>
            <h2 className={styles.title}>
              O que dizem sobre a Pedra Lunar.
            </h2>
            <p className={styles.subtitle}>
              Feedback de projetos entregues.
            </p>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {TESTIMONIALS.map((item, index) => (
            <Reveal
              key={item.author}
              delay={index * 90}
              className={styles.cardWrapper}
            >
              <article className={styles.card}>
                <Quote
                  className={styles.quoteMark}
                  size={72}
                  aria-hidden="true"
                />

                <div
                  className={styles.rating}
                  aria-label={`${item.rating} de 5 estrelas`}
                >
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill="currentColor"
                      strokeWidth={0}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <p className={styles.quote}>"{item.quote}"</p>

                <div className={styles.divider} aria-hidden="true" />

                <footer className={styles.authorRow}>
                  <span className={styles.avatar} aria-hidden="true">
                    {initials(item.author)}
                  </span>
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>
                      {item.author}
                      <BadgeCheck
                        size={14}
                        className={styles.verified}
                        aria-label="Cliente verificado"
                      />
                    </span>
                    <span className={styles.authorRole}>{item.role}</span>
                  </div>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}