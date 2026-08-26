import { useLanguage } from "@/i18n/LanguageContext";
import { decisions } from "./gameData";
import { decisionsEn } from "./gameData.en";
import { characters } from "./characters";
import { charactersEn } from "./characters.en";

export function useGameContent() {
  const { language } = useLanguage();
  return language === "en"
    ? { decisions: decisionsEn, characters: charactersEn }
    : { decisions, characters };
}
