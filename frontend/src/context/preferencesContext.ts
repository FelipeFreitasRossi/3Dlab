import { createContext } from "react";
import type { Language } from "../i18n/translations";

export type Theme = "dark" | "light";

export interface PreferencesValue {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  /**
   * Busca um texto pelo caminho (ex.: "hero.title1" ou "features.items.0.title").
   * Valores entre chaves, como {name}, são trocados pelos que você passar em `vars`.
   */
  t: (key: string, vars?: Record<string, string | number>) => string;
}

export const PreferencesContext = createContext<PreferencesValue | null>(null);
