import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";
import { usePreferences } from "../../context/usePreferences";
import { useTestimonials } from "../../hooks/useTestimonials";
import styles from "./Testimonials.module.css";

interface Slide {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

const DEFAULT_KEYS = [1, 2, 3, 4, 5] as const;

/* ============================================================
   PARÂMETROS DO ANEL 3D E DA FÍSICA
   ============================================================ */
const AUTO_MS = 4500; // intervalo do auto-advance
const STIFFNESS = 85; // rigidez da mola (menor = mais lento/orgânico)
const DAMPING = 2 * Math.sqrt(STIFFNESS) * 0.95; // ~criticamente amortecida
const FAST_PX_PER_MS = 0.5; // flick: acima disso avança/volta 1 card
const DRAG_THRESHOLD = 5; // px para considerar arrasto (e não clique)
const MAX_RELEASE_VEL = 8; // cards/s

const LAMBDA = 1.35; // curva de saturação do afastamento lateral
const ROT_MAX = 56; // graus (saturação); ~29° no 1º vizinho, ~43° no 2º
const Z_CENTER = 40; // translateZ do card central (px)
const Z_DROP = 240; // quanto os cards recuam em profundidade
const SCALE_DROP = 0.22;
const SIGMA_SHAPE = 1.1; // largura da curva gaussiana de escala/profundidade
const SIGMA_OPACITY = 1.2; // vizinhos ficam ~50%, segundos vizinhos ~6%
const SIGMA_FOCUS = 0.7; // “foco” (glow, aspas, estrelas) concentrado no centro

const sat = (a: number) => 1 - Math.exp(-a / LAMBDA);
const SAT1 = sat(1);
const gauss = (a: number, sigma: number) => Math.exp(-(a * a) / (sigma * sigma));
const wrap = (v: number, n: number) => ((v % n) + n) % n;
const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/** Distância assinada (em cards) de um card à posição contínua `pos`, no círculo. */
function signedOffset(i: number, pos: number, n: number) {
  return wrap(i - pos + n / 2, n) - n / 2;
}

interface Layout {
  x: number;
  rot: number;
  z: number;
  scale: number;
  opacity: number;
  focus: number;
}

/**
 * Curvas suaves (sem “quina” no centro):
 * - x e rotação: função ímpar saturante (acompanha o anel)
 * - escala, profundidade, opacidade e foco: gaussianas (derivada 0 no centro)
 */
function computeLayout(offset: number, x1: number): Layout {
  const a = Math.abs(offset);
  const sign = offset < 0 ? -1 : 1;
  const g = 1 - gauss(a, SIGMA_SHAPE);
  return {
    x: sign * x1 * (sat(a) / SAT1),
    rot: -sign * ROT_MAX * sat(a),
    z: Z_CENTER - Z_DROP * g,
    scale: 1 - SCALE_DROP * g,
    opacity: gauss(a, SIGMA_OPACITY),
    focus: gauss(a, SIGMA_FOCUS),
  };
}

/** Distância centro→1º vizinho, para que o “peek” seja o desejado em cada breakpoint. */
function measureX1(cardWidth: number, stageWidth: number) {
  const peek =
    stageWidth < 640 ? stageWidth * 0.14 : stageWidth < 1000 ? 100 : 170;
  const side = computeLayout(1, 0);
  const sideHalf =
    0.5 * cardWidth * side.scale * Math.cos((Math.abs(side.rot) * Math.PI) / 180);
  return Math.max(cardWidth * 0.3, cardWidth / 2 + peek - sideHalf);
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface Engine {
  pos: number;
  vel: number;
  target: number;
  last: number;
  raf: number;
  running: boolean;
  x1: number;
  dragging: boolean;
  moved: boolean;
  startX: number;
  startPos: number;
  startBase: number;
  downIndex: number;
  samples: { t: number; x: number }[];
}

interface CarouselApi {
  step: (dir: number) => void;
  goTo: (index: number) => void;
}

const NOOP_API: CarouselApi = { step: () => {}, goTo: () => {} };

export function Testimonials() {
  const { t, language } = usePreferences();
  const { items: apiItems, loading } = useTestimonials();
  const stageId = useId();

  const slides = useMemo<Slide[]>(() => {
    if (apiItems && apiItems.length > 0) {
      const en = language === "en-US";
      return apiItems.map((it) => ({
        id: it.id,
        quote: (en && it.quote_en) || it.quote,
        author: it.author,
        role: (en && it.role_en) || it.role,
        rating: it.rating,
      }));
    }
    return DEFAULT_KEYS.map((n) => ({
      id: `default-${n}`,
      quote: t(`testimonials.quote${n}`),
      author: t(`testimonials.author${n}`),
      role: t(`testimonials.role${n}`),
      rating: 5,
    }));
  }, [apiItems, language, t]);

  const count = slides.length;
  const ready = !loading;

  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [active, setActive] = useState(0);
  const [live, setLive] = useState("");

  const regionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<CarouselApi>(NOOP_API);
  const activeRef = useRef(0);
  const statusRef = useRef<(index: number, total: number) => string>(() => "");

  useEffect(() => {
    statusRef.current = (index, total) =>
      t("testimonials.status")
        .replace("{current}", String(index + 1))
        .replace("{total}", String(total));
  }, [t]);

  /* prefers-reduced-motion reativo */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* ============================================================
     MOTOR DO CARROSSEL
     Tudo aqui usa refs e manipulação direta de style: nenhum
     setState por frame. O React só re-renderiza quando o card
     ativo muda (dots / aria).
     ============================================================ */
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const region = regionRef.current;
    if (!stage || !region || !ready || count === 0) return;

    const cards = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-index]"),
    );
    if (cards.length !== count) return;

    const pause = { hover: false, focus: false, hidden: document.hidden, drag: false };
    let timer: number | null = null;
    const announce = (index: number) =>
      setLive(statusRef.current(index, count));

    const clearTimer = () => {
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
    };

    const syncActive = (idx: number) => {
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
      }
    };

    /* ---------- Modo reduzido: fila estática rolável ---------- */
    if (reduced) {
      cards.forEach((el) => {
        el.style.transform = "";
        el.style.opacity = "";
        el.style.visibility = "";
        el.style.zIndex = "";
        el.style.removeProperty("--focus");
      });
      stage.removeAttribute("data-animating");

      let raf = 0;
      const detect = () => {
        raf = 0;
        const rect = stage.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        let best = 0;
        let bestDist = Infinity;
        cards.forEach((el, i) => {
          const r = el.getBoundingClientRect();
          const d = Math.abs(r.left + r.width / 2 - center);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        syncActive(best);
      };
      const onScroll = () => {
        if (!raf) raf = requestAnimationFrame(detect);
      };
      const scrollToCard = (i: number) => {
        cards[wrap(i, count)]?.scrollIntoView({
          behavior: "auto",
          inline: "center",
          block: "nearest",
        });
        announce(wrap(i, count));
      };
      apiRef.current = {
        step: (dir) => scrollToCard(activeRef.current + dir),
        goTo: (i) => scrollToCard(i),
      };
      stage.addEventListener("scroll", onScroll, { passive: true });
      activeRef.current = -1;
      detect();

      return () => {
        stage.removeEventListener("scroll", onScroll);
        if (raf) cancelAnimationFrame(raf);
        apiRef.current = NOOP_API;
      };
    }

    /* ---------- Modo anel 3D ---------- */
    const s: Engine = {
      pos: 0,
      vel: 0,
      target: 0,
      last: 0,
      raf: 0,
      running: false,
      x1: 200,
      dragging: false,
      moved: false,
      startX: 0,
      startPos: 0,
      startBase: 0,
      downIndex: -1,
      samples: [],
    };

    const measure = () => {
      s.x1 = measureX1(cards[0].offsetWidth, stage.clientWidth);
    };

    const render = () => {
      for (let i = 0; i < count; i++) {
        const l = computeLayout(signedOffset(i, s.pos, count), s.x1);
        const el = cards[i];
        el.style.transform = `translate3d(${l.x.toFixed(2)}px,0,${l.z.toFixed(2)}px) rotateY(${l.rot.toFixed(2)}deg) scale(${l.scale.toFixed(4)})`;
        el.style.opacity = l.opacity.toFixed(3);
        el.style.visibility = l.opacity < 0.015 ? "hidden" : "visible";
        el.style.zIndex = String(
          Math.round(100 - Math.abs(signedOffset(i, s.pos, count)) * 10),
        );
        el.style.setProperty("--focus", l.focus.toFixed(3));
      }
      syncActive(wrap(Math.round(s.pos), count));
    };

    const stop = () => {
      s.running = false;
      cancelAnimationFrame(s.raf);
      stage.removeAttribute("data-animating");
    };

    const tick = (now: number) => {
      const dt = clamp((now - s.last) / 1000, 0.001, 0.032);
      s.last = now;

      if (!s.dragging) {
        s.vel += (STIFFNESS * (s.target - s.pos) - DAMPING * s.vel) * dt;
        s.pos += s.vel * dt;

        if (Math.abs(s.target - s.pos) < 0.0004 && Math.abs(s.vel) < 0.003) {
          const shift = Math.floor(s.target / count) * count;
          s.pos = s.target - shift;
          s.target = s.pos;
          s.vel = 0;
          render();
          stop();
          return;
        }
      }

      render();
      s.raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (s.running) return;
      s.running = true;
      s.last = performance.now();
      stage.setAttribute("data-animating", "true");
      s.raf = requestAnimationFrame(tick);
    };

    /* ---------- Auto-advance ---------- */
    const isPaused = () =>
      pause.hover || pause.focus || pause.hidden || pause.drag;

    const schedule = () => {
      clearTimer();
      if (count < 2 || isPaused()) return;
      timer = window.setTimeout(() => step(1, false), AUTO_MS);
    };

    /* ---------- Navegação ---------- */
    const step = (dir: number, user = true) => {
      if (count < 2) return;
      s.target = Math.round(s.target) + dir;
      if (user) announce(wrap(s.target, count));
      start();
      schedule();
    };

    const goTo = (index: number, user = true) => {
      if (count < 2) return;
      const cur = Math.round(s.target);
      const d = Math.round(wrap(index - cur + count / 2, count) - count / 2);
      s.target = cur + d;
      if (user) announce(wrap(s.target, count));
      start();
      schedule();
    };

    apiRef.current = { step: (d) => step(d), goTo: (i) => goTo(i) };

    /* ---------- Drag com momentum ---------- */
    const onDown = (e: PointerEvent) => {
      if (count < 2) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;

      s.dragging = true;
      s.moved = false;
      s.startX = e.clientX;
      s.startPos = s.pos;
      s.startBase = Math.round(s.pos);
      s.target = s.pos;
      s.vel = 0;
      s.samples = [{ t: e.timeStamp, x: e.clientX }];
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-index]");
      s.downIndex = card ? Number(card.dataset.index) : -1;

      pause.drag = true;
      clearTimer();
      try {
        stage.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      stage.setAttribute("data-dragging", "true");
      start();
    };

    const onMove = (e: PointerEvent) => {
      if (!s.dragging) return;
      const dx = e.clientX - s.startX;
      if (!s.moved && Math.abs(dx) > DRAG_THRESHOLD) s.moved = true;
      if (s.moved) {
        s.pos = s.startPos - dx / s.x1;
        s.target = s.pos;
      }
      s.samples.push({ t: e.timeStamp, x: e.clientX });
      if (s.samples.length > 8) s.samples.shift();
    };

    const onUp = (e: PointerEvent) => {
      if (!s.dragging) return;
      s.dragging = false;
      pause.drag = false;
      stage.removeAttribute("data-dragging");
      try {
        stage.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }

      const cancelled = e.type === "pointercancel";

      if (!s.moved) {
        // clique simples: se foi num card lateral, vai até ele
        if (!cancelled && s.downIndex >= 0 && s.downIndex !== activeRef.current) {
          goTo(s.downIndex);
        } else {
          s.target = Math.round(s.pos);
          start();
          schedule();
        }
        return;
      }

      // velocidade (px/ms) nos últimos ~120ms
      let v = 0;
      const last = s.samples[s.samples.length - 1];
      const first = s.samples.find((p) => last.t - p.t <= 120) ?? last;
      if (!cancelled && last.t > first.t) {
        v = (last.x - first.x) / (last.t - first.t);
      }

      const velCards = clamp((-v * 1000) / s.x1, -MAX_RELEASE_VEL, MAX_RELEASE_VEL);
      let target: number;

      if (Math.abs(v) > FAST_PX_PER_MS) {
        // flick: avança/volta pelo menos 1 card na direção do gesto
        const dir = v < 0 ? 1 : -1;
        const cand = s.startBase + dir;
        const here = Math.round(s.pos);
        target = dir > 0 ? Math.max(here, cand) : Math.min(here, cand);
      } else {
        // solto devagar: projeta um pouco da inércia e encaixa no card mais próximo,
        // sem andar mais cards do que o arrasto já cobriu (mín. 1)
        const here = Math.round(s.pos);
        const travel = Math.max(1, Math.abs(here - s.startBase));
        target = clamp(
          Math.round(s.pos + velCards * 0.2),
          s.startBase - travel,
          s.startBase + travel,
        );
      }

      s.target = clamp(target, s.startBase - 3, s.startBase + 3);
      s.vel = velCards; // mantém a inércia: a mola “absorve” o resto
      announce(wrap(s.target, count));
      start();
      schedule();
    };

    /* ---------- Roda / trackpad horizontal ---------- */
    let wheelLock = 0;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < 24 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      if (e.timeStamp - wheelLock < 500) return;
      wheelLock = e.timeStamp;
      step(e.deltaX > 0 ? 1 : -1);
    };

    /* ---------- Teclado ---------- */
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(count - 1);
      }
    };

    /* ---------- Pausas: hover, foco, aba oculta ---------- */
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pause.hover = true;
      clearTimer();
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pause.hover = false;
      schedule(); // reinicia o timer completo ao retomar
    };
    const onFocusIn = (e: FocusEvent) => {
      // só pausa quando o foco veio do teclado (não de um clique de mouse)
      if ((e.target as HTMLElement).matches(":focus-visible")) {
        pause.focus = true;
        clearTimer();
      }
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!region.contains(e.relatedTarget as Node | null)) {
        pause.focus = false;
        schedule();
      }
    };
    const onVisibility = () => {
      pause.hidden = document.hidden;
      if (pause.hidden) clearTimer();
      else schedule();
    };

    /* ---------- Resize ---------- */
    const ro = new ResizeObserver(() => {
      measure();
      render();
    });

    measure();
    activeRef.current = -1;
    render();
    ro.observe(stage);

    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);
    stage.addEventListener("wheel", onWheel, { passive: true });
    region.addEventListener("keydown", onKey);
    region.addEventListener("pointerenter", onEnter);
    region.addEventListener("pointerleave", onLeave);
    region.addEventListener("focusin", onFocusIn);
    region.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", onVisibility);

    schedule();

    return () => {
      stop();
      clearTimer();
      ro.disconnect();
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
      stage.removeEventListener("wheel", onWheel);
      region.removeEventListener("keydown", onKey);
      region.removeEventListener("pointerenter", onEnter);
      region.removeEventListener("pointerleave", onLeave);
      region.removeEventListener("focusin", onFocusIn);
      region.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", onVisibility);
      apiRef.current = NOOP_API;
    };
  }, [count, ready, reduced]);

  const statusText = useCallback(
    (index: number) =>
      t("testimonials.status")
        .replace("{current}", String(index + 1))
        .replace("{total}", String(count)),
    [t, count],
  );

  const ratingLabel = (n: number) =>
    t("testimonials.rating").replace("{n}", String(n));

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{t("testimonials.eyebrow")}</p>
          <h2 className={styles.title}>{t("testimonials.title")}</h2>
          <p className={styles.subtitle}>{t("testimonials.subtitle")}</p>
        </div>

        <div
          ref={regionRef}
          className={styles.region}
          role="region"
          aria-roledescription={t("testimonials.carousel")}
          aria-label={t("testimonials.title")}
          tabIndex={0}
        >
          <div className={styles.viewport}>
            {ready && count > 1 && (
              <button
                type="button"
                className={`${styles.arrow} ${styles.arrowPrev}`}
                aria-label={t("testimonials.prev")}
                aria-controls={stageId}
                onClick={() => apiRef.current.step(-1)}
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
            )}

            <div
              id={stageId}
              ref={stageRef}
              className={styles.stage}
              data-reduced={reduced ? "true" : undefined}
              data-loading={ready ? undefined : "true"}
            >
              {!ready && <div className={styles.skeleton} aria-hidden="true" />}

              {ready &&
                slides.map((item, index) => (
                  <article
                    key={item.id}
                    data-index={index}
                    data-active={index === active ? "true" : undefined}
                    className={styles.card}
                    role="group"
                    aria-roledescription={t("testimonials.slide")}
                    aria-label={statusText(index)}
                    aria-hidden={!reduced && index !== active ? true : undefined}
                  >
                    <div className={styles.face}>
                      <Quote
                        className={styles.quoteMark}
                        size={72}
                        aria-hidden="true"
                      />

                      <div
                        className={styles.rating}
                        role="img"
                        aria-label={ratingLabel(item.rating)}
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

                      <p className={styles.quote}>“{item.quote}”</p>

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
                              aria-label={t("testimonials.verified")}
                            />
                          </span>
                          <span className={styles.authorRole}>{item.role}</span>
                        </div>
                      </footer>
                    </div>
                  </article>
                ))}
            </div>

            {ready && count > 1 && (
              <button
                type="button"
                className={`${styles.arrow} ${styles.arrowNext}`}
                aria-label={t("testimonials.next")}
                aria-controls={stageId}
                onClick={() => apiRef.current.step(1)}
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            )}
          </div>

          {ready && count > 1 && (
            <div
              className={styles.dots}
              role="group"
              aria-label={t("testimonials.dots")}
            >
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={styles.dot}
                  data-active={index === active ? "true" : undefined}
                  aria-label={`${t("testimonials.goTo")} ${index + 1}`}
                  aria-current={index === active ? "true" : undefined}
                  onClick={() => apiRef.current.goTo(index)}
                />
              ))}
            </div>
          )}

          <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
            {live}
          </p>
        </div>

        {!reduced && (
          <p className={styles.dragHint} aria-hidden="true">
            <span className={styles.dragDot} />
            {t("testimonials.drag")}
            <span className={styles.dragDot} />
          </p>
        )}
      </div>
    </section>
  );
}
