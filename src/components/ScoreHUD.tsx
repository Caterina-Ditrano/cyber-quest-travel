import { cn } from "@/lib/utils";
import { Heart, Zap, Trophy, Flame } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface ScoreHUDProps {
  score: number;
  combo: number;
  bestCombo: number;
  lives: number;
  maxLives: number;
}

export function ScoreHUD({ score, combo, bestCombo, lives, maxLives }: ScoreHUDProps) {
  const { t } = useLanguage();

  return (
    <div className="cyber-card p-3 md:p-4 bg-card/80 backdrop-blur-sm border-primary/40">
      <div className="grid grid-cols-3 gap-3 items-center">
        {/* Score */}
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary shrink-0" />
          <div className="min-w-0">
            <div className="text-[10px] font-mono text-muted-foreground tracking-widest">{t("hud.score")}</div>
            <div className="text-lg md:text-xl font-mono font-bold text-primary neon-text tabular-nums truncate">
              {score.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Combo */}
        <div className="flex items-center gap-2 justify-center">
          <Flame className={cn("w-5 h-5 shrink-0", combo >= 2 ? "text-secondary animate-pulse" : "text-muted-foreground/50")} />
          <div className="text-center">
            <div className="text-[10px] font-mono text-muted-foreground tracking-widest">{t("hud.combo")}</div>
            <div className={cn(
              "text-lg md:text-xl font-mono font-bold tabular-nums",
              combo >= 2 ? "text-secondary neon-text-blue" : "text-muted-foreground"
            )}>
              x{Math.max(combo, 1)}
            </div>
          </div>
          {bestCombo >= 2 && (
            <div className="hidden md:flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
              <Zap className="w-3 h-3" />
              <span>{t("hud.best")} x{bestCombo}</span>
            </div>
          )}
        </div>

        {/* Lives */}
        <div className="flex items-center gap-1.5 justify-end">
          <div className="text-right mr-1">
            <div className="text-[10px] font-mono text-muted-foreground tracking-widest">{t("hud.lives")}</div>
          </div>
          {Array.from({ length: maxLives }).map((_, i) => (
            <Heart
              key={i}
              className={cn(
                "w-5 h-5 transition-all",
                i < lives
                  ? "text-destructive fill-destructive drop-shadow-[0_0_6px_hsl(var(--destructive)/0.7)]"
                  : "text-muted-foreground/30"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
