import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

interface ProgressBarProps {
  current: number;
  total: number;
  correctAnswers: number;
}

export function ProgressBar({ current, total, correctAnswers }: ProgressBarProps) {
  const { t } = useLanguage();
  const progress = (current / total) * 100;
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm font-mono">
        <span className="text-muted-foreground">
          {t("progress.decision")} <span className="text-primary neon-text">{current}</span> / {total}
        </span>
        <span className="text-muted-foreground">
          {t("progress.security")} <span className={cn(
            "font-bold",
            correctAnswers >= current * 0.7 ? "text-primary neon-text" : "text-destructive neon-text-red"
          )}>
            {Math.round((correctAnswers / Math.max(current, 1)) * 100)}%
          </span>
        </span>
      </div>
      
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-primary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
        <div 
          className="absolute inset-y-0 left-0 bg-primary/50 blur-sm transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex justify-between gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              i < current 
                ? "bg-primary" 
                : "bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
}
