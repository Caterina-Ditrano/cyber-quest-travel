import { useEffect, useRef, useState } from "react";
import { Decision } from "@/data/gameData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MapPin, Lightbulb, ArrowRight, Timer, CheckCircle2, XCircle, Clock, Zap, Flame } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageContext";

export interface AnswerResult {
  isCorrect: boolean;
  timedOut: boolean;
  timeLeft: number;
  points: number;
  speedBonus: number;
  comboMultiplier: number;
  feedback: string;
  location: string;
  question: string;
  tip: string;
}

interface DecisionCardProps {
  decision: Decision;
  characterAvatar: string;
  characterName: string;
  combo: number;
  onAnswer: (result: AnswerResult) => void;
}

const STAGE_SECONDS = 30;
const BASE_POINTS = 100;
const MAX_SPEED_BONUS = 100;

export function DecisionCard({ decision, characterAvatar, characterName, combo, onAnswer }: DecisionCardProps) {
  const { t } = useLanguage();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(STAGE_SECONDS);
  const [timedOut, setTimedOut] = useState(false);
  const [lockedTime, setLockedTime] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const stopTimer = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    setSelectedOption(null);
    setShowResult(false);
    setTimedOut(false);
    setTimeLeft(STAGE_SECONDS);
    setLockedTime(0);

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          stopTimer();
          setShowResult(true);
          setTimedOut(true);
          setLockedTime(0);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => stopTimer();
  }, [decision.id]);

  const handleSelect = (index: number) => {
    if (showResult) return;
    stopTimer();
    setLockedTime(timeLeft);
    setSelectedOption(index);
    setShowResult(true);
  };

  const computeResult = (): AnswerResult => {
    const base = { location: decision.location, tip: decision.tip, question: decision.question };
    if (timedOut) {
      return { ...base, isCorrect: false, timedOut: true, timeLeft: 0, points: 0, speedBonus: 0, comboMultiplier: 1, feedback: t("decision.timedOutFeedback") };
    }
    if (selectedOption === null) {
      return { ...base, isCorrect: false, timedOut: false, timeLeft: lockedTime, points: 0, speedBonus: 0, comboMultiplier: 1, feedback: t("decision.noAnswerFeedback") };
    }
    const opt = decision.options[selectedOption];
    const isCorrect = opt.isCorrect;
    if (!isCorrect) {
      return { ...base, isCorrect: false, timedOut: false, timeLeft: lockedTime, points: 0, speedBonus: 0, comboMultiplier: 1, feedback: opt.consequence };
    }
    const speedBonus = Math.round((lockedTime / STAGE_SECONDS) * MAX_SPEED_BONUS);
    const nextCombo = combo + 1;
    const multiplier = Math.min(nextCombo, 5);
    const points = (BASE_POINTS + speedBonus) * multiplier;
    return { ...base, isCorrect: true, timedOut: false, timeLeft: lockedTime, points, speedBonus, comboMultiplier: multiplier, feedback: opt.consequence };
  };

  const result = computeResult();

  const handleContinue = () => {
    onAnswer(result);
  };

  const progress = (timeLeft / STAGE_SECONDS) * 100;
  const lowTime = timeLeft <= 10;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in-up">
      {/* Location Badge */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full border border-border">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-mono text-sm text-foreground">{decision.location}</span>
        </div>
      </div>

      {/* Timer */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm font-mono">
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <Timer className={cn("w-4 h-4", lowTime ? "text-destructive" : "text-primary")} />
            {t("decision.time")}
          </span>
          <span
            className={cn(
              "font-bold tabular-nums",
              lowTime ? "text-destructive neon-text-red animate-flicker" : "text-primary neon-text"
            )}
          >
            {timeLeft.toString().padStart(2, "0")}s
          </span>
        </div>
        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              "absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-linear",
              lowTime ? "bg-destructive" : "bg-primary"
            )}
            style={{ width: `${progress}%` }}
          />
          <div
            className={cn(
              "absolute inset-y-0 left-0 blur-sm transition-all duration-1000 ease-linear",
              lowTime ? "bg-destructive/50" : "bg-primary/50"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Scenario */}
      <div className="cyber-card relative overflow-hidden p-6 space-y-4 bg-card/70 backdrop-blur-sm">
        <p className="text-foreground/90 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {decision.scenario}
        </p>
        <div className="pt-4 border-t border-border/60">
          <h3 className="text-lg font-mono font-semibold text-foreground drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {decision.question}
          </h3>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {decision.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={showResult}
            className={cn(
              "w-full p-4 text-left rounded-lg border transition-all duration-300",
              "hover:border-primary/50 hover:bg-muted/50",
              showResult && selectedOption === index && option.isCorrect &&
                "border-primary bg-primary/10 neon-border",
              showResult && selectedOption === index && !option.isCorrect &&
                "border-destructive bg-destructive/10",
              showResult && selectedOption !== index && option.isCorrect &&
                "border-primary/50 bg-primary/5",
              !showResult && "border-border bg-card hover:scale-[1.01]",
              showResult && "cursor-default"
            )}
          >
            <div className="flex items-start gap-3">
              <span className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm border",
                showResult && selectedOption === index && option.isCorrect &&
                  "bg-primary text-primary-foreground border-primary",
                showResult && selectedOption === index && !option.isCorrect &&
                  "bg-destructive text-destructive-foreground border-destructive",
                showResult && selectedOption !== index && option.isCorrect &&
                  "bg-primary/20 text-primary border-primary/50",
                !showResult && "bg-muted text-muted-foreground border-border"
              )}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className={cn(
                "flex-1",
                showResult && selectedOption === index && option.isCorrect && "text-primary",
                showResult && selectedOption === index && !option.isCorrect && "text-destructive",
                !showResult && "text-foreground"
              )}>
                {option.text}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Result Modal */}
      <Dialog open={showResult} onOpenChange={() => { /* lock */ }}>
        <DialogContent
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className={cn(
            "max-w-md p-0 overflow-hidden border-2 bg-background/95 backdrop-blur-md",
            "animate-scale-in shadow-[0_0_40px_hsl(var(--primary)/0.4)]",
            timedOut || (selectedOption !== null && !decision.options[selectedOption].isCorrect)
              ? "border-destructive shadow-[0_0_40px_hsl(var(--destructive)/0.5)]"
              : "border-primary"
          )}
        >
          {(() => {
            const isCorrect = !timedOut && selectedOption !== null && decision.options[selectedOption].isCorrect;
            const accent = timedOut
              ? { color: "text-secondary", border: "border-secondary/60", bg: "bg-secondary/10", Icon: Clock, label: t("decision.timedOutLabel") }
              : isCorrect
              ? { color: "text-primary", border: "border-primary/60", bg: "bg-primary/10", Icon: CheckCircle2, label: t("decision.correctLabel") }
              : { color: "text-destructive", border: "border-destructive/60", bg: "bg-destructive/10", Icon: XCircle, label: t("decision.incorrectLabel") };

            const message = timedOut
              ? t("decision.timedOutMessage")
              : selectedOption !== null
              ? decision.options[selectedOption].consequence
              : "";

            return (
              <>
                <div className={cn("flex items-center gap-2 px-5 py-3 border-b font-mono text-xs tracking-widest", accent.border, accent.bg, accent.color)}>
                  <accent.Icon className="w-4 h-4" />
                  {accent.label}
                </div>

                <div className="p-5 space-y-4">
                  {/* Dialog bubble */}
                  <div className="flex items-start gap-3">
                    <div className={cn("relative flex-shrink-0 rounded-full border-2 p-0.5", accent.border)}>
                      <img
                        src={characterAvatar}
                        alt={t("decision.avatarAlt", { name: characterName })}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <span className={cn("absolute -bottom-1 -right-1 w-3 h-3 rounded-full animate-pulse", accent.color.replace("text-", "bg-"))} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={cn("font-mono text-xs mb-1", accent.color)}>
                        {characterName}
                      </div>
                      <div className={cn("relative cyber-card p-3 border", accent.border, "bg-card/80")}>
                        <p className="text-sm text-foreground/90 leading-relaxed">
                          {message}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Score breakdown */}
                  {isCorrect ? (
                    <div className="cyber-card p-3 border-primary/40 bg-primary/5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-muted-foreground">{t("decision.basePoints")}</span>
                        <span className="text-foreground tabular-nums">+{BASE_POINTS}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono mt-1">
                        <span className="text-muted-foreground inline-flex items-center gap-1">
                          <Zap className="w-3 h-3 text-secondary" /> {t("decision.speedBonus")}
                        </span>
                        <span className="text-secondary tabular-nums">+{result.speedBonus}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono mt-1">
                        <span className="text-muted-foreground inline-flex items-center gap-1">
                          <Flame className="w-3 h-3 text-secondary" /> {t("decision.combo")}
                        </span>
                        <span className="text-secondary tabular-nums">x{result.comboMultiplier}</span>
                      </div>
                      <div className="border-t border-primary/20 mt-2 pt-2 flex items-center justify-between font-mono">
                        <span className="text-xs text-muted-foreground">{t("decision.total")}</span>
                        <span className="text-lg text-primary neon-text font-bold tabular-nums">+{result.points}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="cyber-card p-3 border-destructive/40 bg-destructive/5">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-muted-foreground">
                          {timedOut ? t("decision.timedOutLabel") : t("decision.incorrectAnswer")}
                        </span>
                        <span className="text-destructive">{t("decision.shieldLost")}</span>
                      </div>
                    </div>
                  )}

                  {/* Tip */}
                  <div className="cyber-card p-3 border-secondary/40 bg-secondary/5">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="font-semibold text-secondary">{t("decision.tipLabel")}</span>
                        {decision.tip}
                      </p>
                    </div>
                  </div>

                  <DialogTitle className="sr-only">{accent.label}</DialogTitle>
                  <DialogDescription className="sr-only">{message}</DialogDescription>

                  <div className="flex justify-end pt-1">
                    <Button
                      onClick={handleContinue}
                      size="lg"
                      className="cyber-button font-mono bg-primary text-primary-foreground hover:bg-primary/90 group"
                    >
                      {t("decision.continue")}
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
