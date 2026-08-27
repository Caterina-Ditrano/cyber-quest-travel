import { useState } from "react";
import type { Character, TravelDetails } from "@/data/characters";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building,
  Target,
  Package,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Plane,
  AlertTriangle,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface CharacterIntroProps {
  character: Character;
  playerName: string;
  travelDetails: TravelDetails;
  onStart: () => void;
  onBack: () => void;
}

type Step = "profile" | "mission";

export function CharacterIntro({ character, playerName, travelDetails, onStart, onBack }: CharacterIntroProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>("profile");

  return (
    <div className="min-h-screen cyber-grid flex items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 animate-fade-in-up">
          <span className="text-xs font-mono text-muted-foreground tracking-widest">
            {t("common.presents")}
          </span>
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-primary neon-text animate-pulse-glow">
            CYBER ESCAPE
          </h1>
          <div className="flex items-center justify-center gap-2 font-mono text-xs">
            <span className={step === "profile" ? "text-primary neon-text" : "text-muted-foreground"}>
              {t("intro.step1")}
            </span>
            <span className="text-muted-foreground">—</span>
            <span className={step === "mission" ? "text-primary neon-text" : "text-muted-foreground"}>
              {t("intro.step2")}
            </span>
          </div>
        </div>

        {step === "profile" && (
          <div key="profile" className="space-y-6 animate-fade-in-up">
            <div className="cyber-card p-0 overflow-hidden neon-border">
              <div className="grid md:grid-cols-[220px_1fr]">
                {/* Avatar */}
                <div className="relative aspect-square md:aspect-auto md:h-full bg-background/40 border-b md:border-b-0 md:border-r border-primary/30">
                  <img
                    src={character.avatar}
                    alt={t("intro.avatarAlt", { name: character.name })}
                    width={512}
                    height={512}
                    className="w-full h-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 font-mono text-[10px] text-primary flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    {t("intro.verified")}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 space-y-5">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-primary tracking-widest">
                      {t("intro.profileKicker")}
                    </span>
                    <h2 className="text-3xl font-mono font-bold text-foreground">
                      {playerName}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 p-2 rounded-md bg-background/60 border border-border">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-muted-foreground">{t("intro.role")}</span>
                        <span className="text-sm text-foreground">{travelDetails.role}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md bg-background/60 border border-border">
                      <Building className="w-4 h-4 text-primary" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-muted-foreground">{t("intro.company")}</span>
                        <span className="text-sm text-foreground">{travelDetails.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md bg-background/60 border border-border sm:col-span-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-muted-foreground">{t("intro.destination")}</span>
                        <span className="text-sm text-foreground">{travelDetails.destination}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary font-mono text-xs">
                      <Target className="w-4 h-4" />
                      <span>{t("intro.bio")}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {playerName} {t("intro.bioWorksAt")}{" "}
                      <span className="text-primary">{travelDetails.company}</span> {t("intro.bioAs")}{" "}
                      <span className="text-primary">{travelDetails.role}</span> {t("intro.bioTravelling")}{" "}
                      <span className="text-primary">{travelDetails.destination}</span>
                      {t("intro.bioTail")}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary font-mono text-xs">
                      <Package className="w-4 h-4" />
                      <span>{t("intro.gear")}</span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {character.items.map((item, index) => {
                        const ItemIcon = item.icon;
                        return (
                          <div
                            key={index}
                            className="group relative aspect-square flex flex-col items-center justify-center gap-1 p-1.5 rounded-md bg-background/60 border border-primary/40 shadow-[0_0_10px_hsl(var(--primary)/0.15)] transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-[0_0_18px_hsl(var(--primary)/0.55)]"
                          >
                            <div className="absolute top-1 left-1 font-mono text-[9px] text-primary/70">
                              0{index + 1}
                            </div>
                            <ItemIcon className="w-6 h-6 text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.8)] transition-transform duration-300 group-hover:scale-110" />
                            <span className="text-[9px] font-mono text-center text-muted-foreground group-hover:text-foreground leading-tight">
                              {item.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <Button onClick={onBack} variant="outline" size="lg" className="font-mono">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("intro.changeCharacter")}
              </Button>
              <Button
                onClick={() => setStep("mission")}
                size="lg"
                className="cyber-button font-mono text-base px-8 bg-primary text-primary-foreground hover:bg-primary/90 neon-border"
              >
                {t("common.continue")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === "mission" && (
          <div key="mission" className="space-y-6 animate-fade-in-up">
            <div className="cyber-card p-6 space-y-6 neon-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-md bg-primary/10 border border-primary/40 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.8)]" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-primary tracking-widest">
                    {t("intro.objective")}
                  </span>
                  <h2 className="text-2xl font-mono font-bold text-foreground">
                    {t("intro.missionTitle")} {travelDetails.destination}
                  </h2>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-md bg-background/60 border border-primary/30 space-y-2">
                  <div className="flex items-center gap-2 text-primary font-mono text-xs">
                    <Plane className="w-4 h-4" />
                    {t("intro.context")}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("intro.contextTripTo")} {travelDetails.destination}.
                    {" "}{playerName} ({travelDetails.role} {t("intro.contextIn")} {travelDetails.company}) {t("intro.contextTail")}
                  </p>
                </div>

                <div className="p-4 rounded-md bg-background/60 border border-primary/30 space-y-2">
                  <div className="flex items-center gap-2 text-primary font-mono text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    {t("intro.yourRole")}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("intro.yourRoleGuide")} <span className="text-primary">{playerName}</span> {t("intro.yourRoleTail")}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-md border border-destructive/50 bg-destructive/5 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground font-mono">
                  <span className="text-destructive">{t("intro.warningLabel")}</span> {t("intro.warningText")}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-primary neon-text">8</div>
                  <div className="text-[10px] text-muted-foreground font-mono">{t("intro.statDecisions")}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-primary neon-text">30s</div>
                  <div className="text-[10px] text-muted-foreground font-mono">{t("intro.statPerStage")}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-primary neon-text">3</div>
                  <div className="text-[10px] text-muted-foreground font-mono">{t("intro.statCities")}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <Button
                onClick={() => setStep("profile")}
                variant="outline"
                size="lg"
                className="font-mono"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("intro.backToProfile")}
              </Button>
              <Button
                onClick={onStart}
                size="lg"
                className="cyber-button font-mono text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 neon-border"
              >
                {t("intro.start")}
              </Button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground font-mono">
          {t("intro.footer")}
        </p>
      </div>
    </div>
  );
}
