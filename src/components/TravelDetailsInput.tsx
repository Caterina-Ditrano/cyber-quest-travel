import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Building, MapPin, Briefcase } from "lucide-react";

export interface TravelDetails {
  company: string;
  destination: string;
  role: string;
}

interface TravelDetailsInputProps {
  defaultValues?: Partial<TravelDetails>;
  onSubmit: (details: TravelDetails) => void;
  onBack: () => void;
}

export const DESTINATIONS = [
  "Madrid",
  "París",
  "Berlín",
  "Londres",
  "Nueva York",
  "Ciudad de México",
  "San Pablo",
  "Santiago de Chile",
];

export const ROLES = [
  "Ejecutivo/a de ventas",
  "Gerente comercial",
  "Account Manager",
  "Consultor/a",
  "Project Manager",
  "Director/a de marketing",
];

export function TravelDetailsInput({ defaultValues, onSubmit, onBack }: TravelDetailsInputProps) {
  const [company, setCompany] = useState(defaultValues?.company ?? "");
  const [destination, setDestination] = useState(defaultValues?.destination ?? "");
  const [role, setRole] = useState(defaultValues?.role ?? "");

  const canSubmit = company.trim().length > 0 && destination && role;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({
      company: company.trim(),
      destination,
      role,
    });
  };

  return (
    <div className="min-h-screen cyber-grid flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-3 animate-fade-in-up">
          <span className="text-xs font-mono text-muted-foreground tracking-widest">
            CONFIGURACIÓN DE LA MISIÓN
          </span>
          <h1 className="text-3xl md:text-4xl font-mono font-bold text-primary neon-text animate-pulse-glow">
            DATOS DEL VIAJE
          </h1>
          <p className="text-sm text-muted-foreground font-mono">
            // Personalizá la misión con tu empresa, destino y puesto
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="cyber-card p-6 space-y-5 neon-border animate-fade-in-up"
        >
          {/* Empresa */}
          <div className="space-y-2">
            <label
              htmlFor="company-name"
              className="flex items-center gap-2 font-mono text-xs text-primary tracking-widest"
            >
              <Building className="w-4 h-4" />
              EMPRESA
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-primary neon-text pointer-events-none">
                &gt;
              </span>
              <input
                id="company-name"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Nombre de la empresa"
                maxLength={60}
                autoFocus
                className="w-full pl-8 pr-3 py-3 rounded-md bg-background/60 border border-primary/40 text-foreground font-mono placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:shadow-[0_0_18px_hsl(var(--primary)/0.55)] transition-all duration-300 caret-primary"
              />
            </div>
          </div>

          {/* Destino */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 font-mono text-xs text-primary tracking-widest">
              <MapPin className="w-4 h-4" />
              DESTINO DEL VIAJE
            </label>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger className="w-full h-12 bg-background/60 border-primary/40 text-foreground font-mono focus:border-primary focus:ring-primary">
                <SelectValue placeholder="Elegí un destino" />
              </SelectTrigger>
              <SelectContent className="font-mono bg-popover border-primary/40">
                {DESTINATIONS.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Puesto */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 font-mono text-xs text-primary tracking-widest">
              <Briefcase className="w-4 h-4" />
              PUESTO / ROL
            </label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-full h-12 bg-background/60 border-primary/40 text-foreground font-mono focus:border-primary focus:ring-primary">
                <SelectValue placeholder="Elegí un puesto" />
              </SelectTrigger>
              <SelectContent className="font-mono bg-popover border-primary/40">
                {ROLES.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
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
              disabled={!canSubmit}
              className="cyber-button font-mono text-base px-8 bg-primary text-primary-foreground hover:bg-primary/90 neon-border w-full sm:w-auto disabled:opacity-50"
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
