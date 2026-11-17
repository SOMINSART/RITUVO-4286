// Client-safe food helpers: store list, budget suggestion, formatting. No recipe data here.
export type Diet = "all" | "flexi" | "veggie" | "vegan" | "pesco" | "nopork";
export const STORES = [
  { id: "lidl", label: "Lidl", index: 0.86 },
  { id: "aldi", label: "Aldi", index: 0.86 },
  { id: "leclerc", label: "E.Leclerc", index: 0.92 },
  { id: "intermarche", label: "Intermarché", index: 0.97 },
  { id: "auchan", label: "Auchan", index: 0.96 },
  { id: "carrefour", label: "Carrefour", index: 1.0 },
  { id: "superu", label: "Super U", index: 0.98 },
  { id: "monoprix", label: "Monoprix", index: 1.18 },
  { id: "bio", label: "Bio / marché", index: 1.32 },
];

export const storeIndex = (id?: string) => STORES.find((s) => s.id === id)?.index ?? 1;
export function portionsPerMeal(adults: number, kids: number) {
  return adults + kids * 0.5;
}

export type FoodInput = {
  adults: number;
  kids: number;
  dinners: number;
  budget: number; // € per week for dinners
  store?: string;
  diet: Diet;
  allergies: string[];
  dislikes: string[];
};

export function fmtEur(v: number, digits = 2) {
  return v.toLocaleString("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function fmtQty(g: number) {
  if (g >= 1000) return `${(g / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} kg`;
  return `${Math.round(g / 10) * 10} g`;
}

/** Suggested weekly budget for the household (≈ 3,20 € / portion at the chosen store). */
export function suggestedBudget(adults: number, kids: number, dinners: number, store?: string) {
  const v = portionsPerMeal(adults, kids) * dinners * 3.2 * storeIndex(store);
  return Math.max(15, Math.round(v / 5) * 5);
}

