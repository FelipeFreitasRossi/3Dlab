import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { DEFAULT_LANGUAGE, translations } from "../i18n/translations";
import type { Language } from "../i18n/translations";
import { PreferencesContext } from "./preferencesStore";
import type { PreferencesValue, Theme } from "./preferencesStore";

const LANGUAGE_KEY = "pl_language";
const THEME_KEY = "pl_theme";

function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null; // navegação privada / storage bloqueado
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* sem problema: a preferência só não será lembrada */
  }
}

function initialLanguage(): Language {
  const saved = readStorage(LANGUAGE_KEY);
  return saved === "en-US" || saved === "pt-BR" ? saved : DEFAULT_LANGUAGE;
}

function initialTheme(): Theme {
  return readStorage(THEME_KEY) === "light" ? "light" : "dark";
}

function lookup(source: unknown, key: string): string | undefined {
  let current: unknown = source;
  for (const part of key.split(".")) {
    if (current === null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  // Mantém <html data-theme> e <html lang> sempre em sincronia
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    writeStorage(LANGUAGE_KEY, next);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    writeStorage(THEME_KEY, next);
  }, []);

  const t = useCallback<PreferencesValue["t"]>(
    (key, vars) => {
      const text =
        lookup(translations[language], key) ??
        lookup(translations[DEFAULT_LANGUAGE], key) ??
        key;
      if (!vars) return text;
      return text.replace(/\{(\w+)\}/g, (_, name: string) =>
        name in vars ? String(vars[name]) : `{${name}}`,
      );
    },
    [language],
  );

  const value = useMemo<PreferencesValue>(
    () => ({ language, theme, setLanguage, setTheme, t }),
    [language, theme, setLanguage, setTheme, t],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}
