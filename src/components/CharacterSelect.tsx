import { characters, type Character } from "@/data/characters";
import { Briefcase, Building } from "lucide-react";

interface CharacterSelectProps {
  onSelect: (character: Character) => void;
}

export function CharacterSelect({ onSelect }: CharacterSelectProps) {
  return (
    <div className="min-h-screen cyber-grid flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-10 animate-fade-in-up">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono text-muted-foreground tracking-widest">
            TELEDATA PRESENTA
          </span>
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-primary neon-text animate-pulse-glow">
            ELEGÍ TU PERSONAJE
          </h1>
          <p className="text-sm md:text-base text-muted-foreground font-mono">
            // Seleccioná al ejecutivo que vas a guiar en la misión
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {characters.map((character, index) => {
            const displayName = `Player ${index + 1}`;
            return (
              <button
                key={character.id}
                onClick={() => onSelect(character)}
                className="group cyber-card p-6 text-left transition-all duration-300 hover:scale-[1.03] hover:neon-border hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="space-y-4">
                  <div className="relative aspect-square overflow-hidden rounded-lg border border-primary/30">
                    <img
                      src={character.avatar}
                      alt={`Avatar de ${displayName}`}
                      width={512}
                      height={512}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                      {displayName}
                    </h2>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {character.role}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {character.company}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <span className="font-mono text-xs text-primary group-hover:neon-text transition-all">
                      [ SELECCIONAR ]
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground font-mono">
          Las preguntas y la lógica del juego son las mismas para ambos personajes.
        </p>
      </div>
    </div>
  );
}
