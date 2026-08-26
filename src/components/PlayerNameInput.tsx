import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, User } from "lucide-react";

interface PlayerNameInputProps {
  onSubmit: (name: string) => void;
  onBack: () => void;
}

export function PlayerNameInput({ onSubmit, onBack }: PlayerNameInputProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || "Agente";
    onSubmit(finalName);
  };

  return (
    <div className="min-h-screen cyber-grid flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-3 animate-fade-in-up">
          <span className="text-xs font-mono text-muted-foreground tracking-widest">
            IDENTIFICACIÓN DEL PERSONAJE
          </span>
          <h1 className="text-3xl md:text-4xl font-mono font-bold text-primary neon-text animate-pulse-glow">
            ¿CÓMO SE LLAMA?
          </h1>
          <p className="text-sm text-muted-foreground font-mono">
            // Elegí el nombre con el que se conocerá a tu personaje en la misión
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="cyber-card p-6 space-y-6 neon-border animate-fade-in-up"
        >
          <div className="space-y-2">
            <label
              htmlFor="player-name"
              className="flex items-center gap-2 font-mono text-xs text-primary tracking-widest"
            >
              <User className="w-4 h-4" />
              NOMBRE DEL PERSONAJE
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-primary neon-text pointer-events-none">
                &gt;
              </span>
              <input
                id="player-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresá tu nombre"
                maxLength={24}
                autoFocus
                className="w-full pl-8 pr-3 py-3 rounded-md bg-background/60 border border-primary/40 text-foreground font-mono placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:shadow-[0_0_18px_hsl(var(--primary)/0.55)] transition-all duration-300 caret-primary"
              />
            </div>
            <p className="text-[10px] font-mono text-muted-foreground">
              Si lo dejás vacío, te llamaremos <span className="text-primary">Agente</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              size="lg"
              className="font-mono w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              VOLVER
            </Button>
            <Button
              type="submit"
              size="lg"
              className="cyber-button font-mono text-base px-8 bg-primary text-primary-foreground hover:bg-primary/90 neon-border w-full sm:w-auto"
            >
              CONTINUAR
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
