import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  const options: { code: "es" | "en"; label: string }[] = [
    { code: "es", label: "ES" },
    { code: "en", label: "EN" },
  ];

  return (
    <div
      role="group"
      aria-label={t("lang.switchTo")}
      className="fixed top-4 right-16 z-50 flex items-center gap-0.5 rounded-md border border-primary/50 bg-background/70 p-0.5 backdrop-blur"
    >
      {options.map((option) => {
        const isActive = language === option.code;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLanguage(option.code)}
            aria-pressed={isActive}
            className={cn(
              "rounded px-2 py-1 font-mono text-xs font-bold tracking-widest transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "bg-primary/20 text-primary neon-text"
                : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
