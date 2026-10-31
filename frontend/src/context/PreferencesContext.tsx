import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, type Language } from "../i18n/translations";

export type Theme = "dark" | "light";

interface PreferencesContextValue {
  language: Language;
  theme: Theme;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
}

const PreferencesContext = createContext<PreferencesContextValue | undefined>(
  undefined,
);

const LANG_KEY = "pl_language";
const THEME_KEY = "pl_theme";

function readStoredLanguage(): Language {
  if (typeof window === "undefined") return "pt-BR";
  const stored = window.localStorage.getItem(LANG_KEY);
  return stored === "en-US" ? "en-US" : "pt-BR";
}

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(THEME_KEY);
  return stored === "light" ? "light" : "dark";
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* */
    }
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      /* */
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      const dict = translations[language] as Record<string, string> | undefined;
      return dict?.[key] ?? key;
    },
    [language],
  );

  const value = useMemo(
    () => ({ language, theme, setLanguage, setTheme, t }),
    [language, theme, setLanguage, setTheme, t],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }
  return ctx;
}