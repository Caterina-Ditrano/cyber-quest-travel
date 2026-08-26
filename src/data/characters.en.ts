import martinAvatar from "@/assets/martin-avatar.jpg";
import angelaAvatar from "@/assets/angela-avatar.jpg";
import { Laptop, Smartphone, Tablet, CreditCard, KeyRound } from "lucide-react";
import type { Character, InventoryItem } from "./characters";

const sharedItemsEn: InventoryItem[] = [
  { icon: Laptop, label: "Corporate laptop" },
  { icon: Smartphone, label: "Personal smartphone" },
  { icon: Tablet, label: "Tablet" },
  { icon: CreditCard, label: "Credit cards" },
  { icon: KeyRound, label: "Access credentials" },
];

export const charactersEn: Character[] = [
  {
    id: "martin",
    name: "Martín",
    firstName: "Martín",
    role: "Sales Executive",
    company: "TechCorp Internacional",
    mission: "Business trip to Europe",
    description: `Martín is a 35-year-old executive who works at TechCorp Internacional.
He's about to embark on a 5-day business trip across Europe, visiting clients in
Madrid, Paris, and Berlin. He carries his corporate laptop, personal smartphone, and tablet.

Your mission is to help Martín make the right cybersecurity decisions
during his trip. Every wrong decision could compromise the security of
the company and his personal data.`,
    items: sharedItemsEn,
    avatar: martinAvatar,
    pronoun: "el",
  },
  {
    id: "angela",
    name: "Ángela",
    firstName: "Ángela",
    role: "Sales Executive",
    company: "TechCorp Internacional",
    mission: "Business trip to Europe",
    description: `Ángela is a 32-year-old executive who works at TechCorp Internacional.
She's about to embark on a 5-day business trip across Europe, visiting clients in
Madrid, Paris, and Berlin. She carries her corporate laptop, personal smartphone, and tablet.

Your mission is to help Ángela make the right cybersecurity decisions
during her trip. Every wrong decision could compromise the security of
the company and her personal data.`,
    items: sharedItemsEn,
    avatar: angelaAvatar,
    pronoun: "la",
  },
];
