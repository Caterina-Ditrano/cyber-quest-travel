import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type Language = "es" | "en";

const translations = {
  es: {
    "select.presents": "TELEDATA PRESENTA",
    "select.title": "ELEGÍ TU PERSONAJE",
    "select.subtitle": "// Seleccioná al ejecutivo que vas a guiar en la misión",
    "select.cta": "[ SELECCIONAR ]",
    "select.footer": "Las preguntas y la lógica del juego son las mismas para ambos personajes.",
    "select.avatarAlt": "Avatar de",
    "lang.switchTo": "Cambiar a inglés",
  },
  en: {
    "select.presents": "TELEDATA PRESENTS",
    "select.title": "CHOOSE YOUR CHARACTER",
    "select.subtitle": "// Select the executive you will guide on the mission",
    "select.cta": "[ SELECT ]",
    "select.footer": "The questions and the game logic are the same for both characters.",
    "select.avatarAlt": "Avatar of",
    "lang.switchTo": "Switch to Spanish",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["es"];

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  const toggleLanguage = useCallback(
    () => setLanguage((prev) => (prev === "es" ? "en" : "es")),
    [],
  );

  const t = useCallback(
    (key: TranslationKey) => translations[language][key] ?? key,
    [language],
  );

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t }),
    [language, toggleLanguage, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
