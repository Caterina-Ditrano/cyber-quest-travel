import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { common } from "./translations/common";
import { select } from "./translations/select";
import { setup } from "./translations/setup";
import { game } from "./translations/game";
import { decision } from "./translations/decision";
import { result } from "./translations/result";

export type Language = "es" | "en";

const dictionaries: Record<Language, Record<string, string>> = {
  es: {
    ...common.es,
    ...select.es,
    ...setup.es,
    ...game.es,
    ...decision.es,
    ...result.es,
  },
  en: {
    ...common.en,
    ...select.en,
    ...setup.en,
    ...game.en,
    ...decision.en,
    ...result.en,
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  const toggleLanguage = useCallback(
    () => setLanguage((prev) => (prev === "es" ? "en" : "es")),
    [],
  );

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let value = dictionaries[language][key] ?? dictionaries.es[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          value = value.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        }
      }
      return value;
    },
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
