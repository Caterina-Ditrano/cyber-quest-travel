import martinAvatar from "@/assets/martin-avatar.jpg";
import angelaAvatar from "@/assets/angela-avatar.jpg";
import { Laptop, Smartphone, Tablet, CreditCard, KeyRound, type LucideIcon } from "lucide-react";

export interface InventoryItem {
  icon: LucideIcon;
  label: string;
}

export interface Character {
  id: "martin" | "angela";
  name: string;
  firstName: string;
  role: string;
  company: string;
  mission: string;
  description: string;
  items: InventoryItem[];
  avatar: string;
  /** Used to adapt gendered words in scenario texts */
  pronoun: "el" | "la";
}

const sharedItems: InventoryItem[] = [
  { icon: Laptop, label: "Laptop corporativa" },
  { icon: Smartphone, label: "Smartphone personal" },
  { icon: Tablet, label: "Tablet" },
  { icon: CreditCard, label: "Tarjetas de crédito" },
  { icon: KeyRound, label: "Credenciales de acceso" },
];

export const characters: Character[] = [
  {
    id: "martin",
    name: "Martín",
    firstName: "Martín",
    role: "Ejecutivo de Ventas",
    company: "TechCorp Internacional",
    mission: "Viaje de negocios a Europa",
    description: `Martín es un ejecutivo de 35 años que trabaja en TechCorp Internacional.
Está a punto de emprender un viaje de negocios de 5 días por Europa, visitando clientes en
Madrid, París y Berlín. Lleva su laptop corporativa, smartphone personal y tablet.

Tu misión es ayudar a Martín a tomar las decisiones correctas de ciberseguridad
durante su viaje. Cada decisión incorrecta puede comprometer la seguridad de
la empresa y sus datos personales.`,
    items: sharedItems,
    avatar: martinAvatar,
    pronoun: "el",
  },
  {
    id: "angela",
    name: "Ángela",
    firstName: "Ángela",
    role: "Ejecutiva de Ventas",
    company: "TechCorp Internacional",
    mission: "Viaje de negocios a Europa",
    description: `Ángela es una ejecutiva de 32 años que trabaja en TechCorp Internacional.
Está a punto de emprender un viaje de negocios de 5 días por Europa, visitando clientes en
Madrid, París y Berlín. Lleva su laptop corporativa, smartphone personal y tablet.

Tu misión es ayudar a Ángela a tomar las decisiones correctas de ciberseguridad
durante su viaje. Cada decisión incorrecta puede comprometer la seguridad de
la empresa y sus datos personales.`,
    items: sharedItems,
    avatar: angelaAvatar,
    pronoun: "la",
  },
];

export interface TravelDetails {
  company: string;
  destination: string;
  role: string;
}

/**
 * Replace the character's default name (Martín/Ángela) and personalization tokens
 * ({player}, {company}, {destination}, {role}) with user-provided values.
 */
export function personalize(
  text: string,
  character: Character,
  playerName = "Agente",
  details?: TravelDetails,
): string {
  let out = text
    .replace(/\{player\}/g, playerName)
    .replace(/Martín/g, playerName)
    .replace(/Ángela/g, playerName);

  if (details) {
    out = out
      .replace(/\{company\}/g, details.company)
      .replace(/\{destination\}/g, details.destination)
      .replace(/\{role\}/g, details.role)
      .replace(/TechCorp Internacional/g, details.company)
      .replace(new RegExp(character.role, "g"), details.role);
  }
  return out;
}
