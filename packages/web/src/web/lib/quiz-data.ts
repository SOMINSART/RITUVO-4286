import { buildPlan, suggestedBudget, type Diet, type FoodInput } from "./food-data";

export type Option = { id: string; icon: string; label: string; hint?: string };
export type Preview = "routine" | "food";

export type Step =
  | { kind: "single"; id: string; title: string; sub: string; options: Option[]; layout?: "list" | "grid" | "grid3" | "row" }
  | { kind: "multi"; id: string; title: string; sub: string; options: Option[]; layout?: "chips" | "grid"; none?: string; min?: number }
  | { kind: "name"; id: string; title: string; sub: string }
  | { kind: "time"; id: string; title: string; sub: string }
  | { kind: "stepper"; id: string; title: string; sub: string }
  | { kind: "household"; id: string; title: string; sub: string }
  | { kind: "budget"; id: string; title: string; sub: string }
  | { kind: "proof"; id: string }
  | { kind: "loading"; id: string }
  | { kind: "result"; id: string };

export const HABITS: Option[] = [
  { id: "water", icon: "drop", label: "Boire un grand verre d'eau" },
  { id: "bed", icon: "bed", label: "Faire son lit" },
  { id: "stretch", icon: "stretch", label: "S'étirer 5 min" },
  { id: "walk", icon: "walk", label: "Marcher 20 min" },
  { id: "read", icon: "book", label: "Lire 10 pages" },
  { id: "journal", icon: "pen", label: "Écrire 3 lignes" },
  { id: "noscreen", icon: "nophone", label: "Pas d'écran au réveil" },
  { id: "vitamins", icon: "pill", label: "Prendre ses compléments" },
  { id: "sport", icon: "dumbbell", label: "Séance de sport" },
  { id: "plan", icon: "calendar", label: "Planifier sa journée" },
  { id: "tidy", icon: "basket", label: "Ranger 10 min" },
  { id: "sleep", icon: "moon", label: "Couché avant 23h" },
];

export const STEPS: (Step & { preview?: Preview })[] = [
  {
    kind: "single",
    id: "goal",
    title: "Qu'est-ce qui t'amène ?",
    sub: "Rituvo organise tes journées et tes repas autour de ce qui compte pour toi.",
    preview: "food",
    options: [
      { id: "budget", icon: "coins", label: "Dépenser moins en courses", hint: "Bien manger sans exploser le budget" },
      { id: "dinner", icon: "plate", label: "Ne plus me demander quoi manger", hint: "Le menu de la semaine, déjà prêt" },
      { id: "energy", icon: "bolt", label: "Avoir plus d'énergie", hint: "Fini les après-midis en mode zombie" },
      { id: "consistency", icon: "loop", label: "Enfin tenir mes habitudes", hint: "Arrêter de recommencer chaque lundi" },
      { id: "family", icon: "family", label: "Organiser la vie de famille", hint: "Repas, routines, tout le monde suit" },
    ],
  },
  { kind: "name", id: "name", title: "On fait connaissance ?", sub: "Ton prénom, pour que ton plan te parle vraiment.", preview: "routine" },
  { kind: "household", id: "household", title: "Tu cuisines pour combien ?", sub: "On ajuste les quantités et le budget à ton foyer.", preview: "food" },
  {
    kind: "single",
    id: "store",
    title: "Tu fais tes courses où ?",
    sub: "Les prix de ta liste s'alignent sur ton magasin.",
    layout: "grid3",
    preview: "food",
    options: [
      { id: "lidl", icon: "cart", label: "Lidl" },
      { id: "aldi", icon: "cart", label: "Aldi" },
      { id: "leclerc", icon: "cart", label: "E.Leclerc" },
      { id: "carrefour", icon: "cart", label: "Carrefour" },
      { id: "auchan", icon: "cart", label: "Auchan" },
      { id: "intermarche", icon: "cart", label: "Intermarché" },
      { id: "superu", icon: "cart", label: "Super U" },
      { id: "monoprix", icon: "cart", label: "Monoprix" },
      { id: "bio", icon: "basket", label: "Bio / marché" },
    ],
  },
  {
    kind: "single",
    id: "dinners",
    title: "Combien de dîners à prévoir ?",
    sub: "Les soirs où c'est toi qui cuisines cette semaine.",
    layout: "row",
    preview: "food",
    options: ["3", "4", "5", "6", "7"].map((n) => ({ id: n, icon: "", label: n })),
  },
  { kind: "budget", id: "budget", title: "Ton budget courses pour ces dîners ?", sub: "Pour la semaine. On construit un menu qui rentre dedans.", preview: "food" },
  {
    kind: "single",
    id: "diet",
    title: "Tu manges comment ?",
    sub: "On filtre toutes les recettes en fonction.",
    layout: "grid",
    preview: "food",
    options: [
      { id: "all", icon: "plate", label: "De tout" },
      { id: "flexi", icon: "salad", label: "Flexitarien", hint: "2 repas viande max" },
      { id: "veggie", icon: "carrot", label: "Végétarien" },
      { id: "vegan", icon: "sprout", label: "Végan" },
      { id: "pesco", icon: "fish", label: "Pescétarien", hint: "Poisson oui, viande non" },
      { id: "nopork", icon: "nopork", label: "Sans porc" },
    ],
  },
  {
    kind: "multi",
    id: "allergies",
    title: "Des allergies ou intolérances ?",
    sub: "On retire les recettes concernées. Vérifie toujours les étiquettes des produits.",
    layout: "chips",
    none: "Aucune",
    preview: "food",
    options: [
      { id: "gluten", icon: "wheat", label: "Gluten" },
      { id: "lactose", icon: "milk", label: "Lactose" },
      { id: "eggs", icon: "egg", label: "Œufs" },
      { id: "fish", icon: "fish", label: "Poisson" },
      { id: "shellfish", icon: "shrimp", label: "Crustacés" },
      { id: "soy", icon: "beans", label: "Soja" },
      { id: "peanut", icon: "peanut", label: "Arachides" },
      { id: "nuts", icon: "nut", label: "Fruits à coque" },
    ],
  },
  {
    kind: "multi",
    id: "dislikes",
    title: "Des aliments que tu ne supportes pas ?",
    sub: "Promis, tu ne les verras jamais dans ton menu.",
    layout: "chips",
    none: "Je mange de tout",
    preview: "food",
    options: [
      { id: "mushrooms", icon: "mushroom", label: "Champignons" },
      { id: "spicy", icon: "chili", label: "Épicé" },
      { id: "cilantro", icon: "herb", label: "Coriandre" },
      { id: "fish", icon: "fish", label: "Poisson" },
      { id: "seafood", icon: "shrimp", label: "Fruits de mer" },
      { id: "eggplant", icon: "eggplant", label: "Aubergine" },
      { id: "zucchini", icon: "zucchini", label: "Courgette" },
      { id: "broccoli", icon: "broccoli", label: "Brocoli" },
      { id: "spinach", icon: "greens", label: "Épinards" },
      { id: "strongcheese", icon: "cheese", label: "Fromage fort" },
      { id: "beef", icon: "cow", label: "Bœuf" },
    ],
  },
  { kind: "proof", id: "proof" },
  { kind: "time", id: "wake", title: "Tu te lèves à quelle heure ?", sub: "En semaine, en vrai — pas l'heure rêvée.", preview: "routine" },
  {
    kind: "multi",
    id: "habits",
    title: "Quelles habitudes veux-tu ancrer ?",
    sub: "Choisis-en autant que tu veux. On les dose pour toi.",
    layout: "grid",
    min: 1,
    options: HABITS,
    preview: "routine",
  },
  { kind: "stepper", id: "perDay", title: "Combien d'actions par jour ?", sub: "Mieux vaut 4 tenues que 10 abandonnées.", preview: "routine" },
  {
    kind: "single",
    id: "tone",
    title: "Tu préfères qu'on te parle comment ?",
    sub: "Le ton de tes rappels et de tes bilans.",
    preview: "routine",
    options: [
      { id: "soft", icon: "heart", label: "Tout en douceur", hint: "Encouragements, zéro pression" },
      { id: "coach", icon: "megaphone", label: "Mode coach", hint: "Direct, un peu piquant" },
      { id: "silent", icon: "quiet", label: "Discret", hint: "Juste l'essentiel, pas de notif superflue" },
    ],
  },
  { kind: "loading", id: "loading" },
  { kind: "result", id: "result" },
];

export type Answers = {
  goal?: string;
  name?: string;
  chaos?: string;
  wake?: number; // minutes since midnight
  habits?: string[];
  perDay?: number;
  blockers?: string[];
  tone?: string;
  minutes?: string;
  adults?: number;
  kids?: number;
  store?: string;
  dinners?: string;
  budget?: number;
  budgetTouched?: boolean;
  diet?: string;
  allergies?: string[];
  dislikes?: string[];
};

export const DEFAULT_ANSWERS: Answers = {
  wake: 7 * 60,
  perDay: 5,
  habits: [],
  blockers: [],
  adults: 2,
  kids: 0,
  dinners: "5",
  allergies: [],
  dislikes: [],
};

export function fmtTime(m: number) {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${h}:${mm.toString().padStart(2, "0")}`;
}

export function pickHabits(a: Answers): Option[] {
  const chosen = HABITS.filter((h) => a.habits?.includes(h.id));
  const base = chosen.length ? chosen : HABITS.slice(0, 6);
  const n = a.perDay ?? 5;
  const list = [...base];
  // Fill to n with defaults if user picked fewer
  for (const h of HABITS) {
    if (list.length >= n) break;
    if (!list.find((x) => x.id === h.id)) list.push(h);
  }
  return list.slice(0, n);
}


export function foodInput(a: Answers): FoodInput {
  const adults = a.adults ?? 2;
  const kids = a.kids ?? 0;
  const dinners = Number(a.dinners ?? 5);
  return {
    adults,
    kids,
    dinners,
    store: a.store,
    budget: a.budget ?? suggestedBudget(adults, kids, dinners, a.store),
    diet: (a.diet as Diet) ?? "all",
    allergies: a.allergies ?? [],
    dislikes: a.dislikes ?? [],
  };
}

export const planFor = (a: Answers) => buildPlan(foodInput(a));
