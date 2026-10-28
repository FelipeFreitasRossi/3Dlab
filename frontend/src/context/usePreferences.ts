import { useContext } from "react";
import { PreferencesContext } from "./preferencesStore";

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error("usePreferences precisa estar dentro de <PreferencesProvider>");
  }
  return ctx;
}
