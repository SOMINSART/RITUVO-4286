// Server-only: recipe catalogue and plan computation. Never import from the web bundle.
import { storeIndex, portionsPerMeal, type Diet, type FoodInput } from "../../web/lib/food-ui";
// Food module: ingredient catalog, recipes and the weekly budget planner.
// Prices are rough French supermarket estimates (€ / kg) — tune them as needed.

export type Cat = "Fruits & légumes" | "Viandes & poissons" | "Crèmerie & œufs" | "Épicerie";

type Ing = { name: string; cat: Cat; perKg: number };

export const ING: Record<string, Ing> = {
  pates: { name: "Pâtes", cat: "Épicerie", perKg: 1.6 },
  riz: { name: "Riz", cat: "Épicerie", perKg: 2.2 },
  lentilles: { name: "Lentilles corail", cat: "Épicerie", perKg: 3.2 },
  poischiches: { name: "Pois chiches (conserve)", cat: "Épicerie", perKg: 2.6 },
  semoule: { name: "Semoule", cat: "Épicerie", perKg: 2.0 },
  tortillas: { name: "Tortillas", cat: "Épicerie", perKg: 6.0 },
  pateBrisee: { name: "Pâte brisée", cat: "Épicerie", perKg: 5.5 },
  tomateConc: { name: "Tomates concassées", cat: "Épicerie", perKg: 2.2 },
  laitCoco: { name: "Lait de coco", cat: "Épicerie", perKg: 5.0 },
  thon: { name: "Thon (conserve)", cat: "Épicerie", perKg: 13 },
  haricotsRouges: { name: "Haricots rouges", cat: "Épicerie", perKg: 2.8 },
  nouilles: { name: "Nouilles de blé", cat: "Épicerie", perKg: 4.5 },
  sauceSoja: { name: "Sauce soja", cat: "Épicerie", perKg: 6 },
  pommesTerre: { name: "Pommes de terre", cat: "Fruits & légumes", perKg: 1.4 },
  patateDouce: { name: "Patates douces", cat: "Fruits & légumes", perKg: 3.0 },
  oignon: { name: "Oignons", cat: "Fruits & légumes", perKg: 2.0 },
  carotte: { name: "Carottes", cat: "Fruits & légumes", perKg: 1.5 },
  courgette: { name: "Courgettes", cat: "Fruits & légumes", perKg: 2.8 },
  poivron: { name: "Poivrons", cat: "Fruits & légumes", perKg: 4.0 },
  brocoli: { name: "Brocoli", cat: "Fruits & légumes", perKg: 3.5 },
  epinards: { name: "Épinards", cat: "Fruits & légumes", perKg: 4.5 },
  champignons: { name: "Champignons", cat: "Fruits & légumes", perKg: 6.0 },
  aubergine: { name: "Aubergines", cat: "Fruits & légumes", perKg: 3.5 },
  poireau: { name: "Poireaux", cat: "Fruits & légumes", perKg: 2.8 },
  tomate: { name: "Tomates", cat: "Fruits & légumes", perKg: 3.2 },
  salade: { name: "Salade", cat: "Fruits & légumes", perKg: 4.0 },
  coriandre: { name: "Coriandre", cat: "Fruits & légumes", perKg: 25 },
  pouletFilet: { name: "Filets de poulet", cat: "Viandes & poissons", perKg: 11.5 },
  pouletCuisse: { name: "Cuisses de poulet", cat: "Viandes & poissons", perKg: 6.0 },
  boeufHache: { name: "Bœuf haché", cat: "Viandes & poissons", perKg: 11.0 },
  lardons: { name: "Lardons", cat: "Viandes & poissons", perKg: 10.0 },
  saucisse: { name: "Saucisses", cat: "Viandes & poissons", perKg: 9.0 },
  saumon: { name: "Pavés de saumon", cat: "Viandes & poissons", perKg: 23 },
  cabillaud: { name: "Cabillaud", cat: "Viandes & poissons", perKg: 17 },
  crevettes: { name: "Crevettes", cat: "Viandes & poissons", perKg: 18 },
  oeufs: { name: "Œufs", cat: "Crèmerie & œufs", perKg: 5.0 },
  creme: { name: "Crème fraîche", cat: "Crèmerie & œufs", perKg: 5.0 },
  fromage: { name: "Emmental râpé", cat: "Crèmerie & œufs", perKg: 11 },
  feta: { name: "Feta", cat: "Crèmerie & œufs", perKg: 13 },
  mozza: { name: "Mozzarella", cat: "Crèmerie & œufs", perKg: 9.5 },
  chevre: { name: "Bûche de chèvre", cat: "Crèmerie & œufs", perKg: 14 },
  lait: { name: "Lait", cat: "Crèmerie & œufs", perKg: 1.1 },
  tofu: { name: "Tofu ferme", cat: "Crèmerie & œufs", perKg: 8.5 },
};

export type Recipe = {
  id: string;
  name: string;
  icon: string;
  minutes: number;
  kind: "meat" | "pork" | "fish" | "veggie" | "vegan";
  allergens: string[];
  avoid: string[]; // matches "dislikes" ids
  kids?: boolean;
  items: [keyof typeof ING, number][]; // grams per adult portion
};

export const RECIPES: Recipe[] = [
  { id: "bolo", name: "Pâtes à la bolognaise maison", icon: "pasta", minutes: 25, kind: "meat", allergens: ["gluten"], avoid: ["beef"], kids: true,
    items: [["pates", 110], ["boeufHache", 100], ["tomateConc", 150], ["oignon", 40], ["carotte", 50]] },
  { id: "dahl", name: "Dahl de lentilles corail au coco", icon: "curry", minutes: 25, kind: "vegan", allergens: [], avoid: ["spicy", "cilantro"],
    items: [["lentilles", 80], ["laitCoco", 100], ["tomateConc", 100], ["oignon", 40], ["riz", 60], ["coriandre", 3]] },
  { id: "curry-poulet", name: "Curry de poulet & riz", icon: "pot", minutes: 30, kind: "meat", allergens: [], avoid: ["spicy"], kids: true,
    items: [["pouletFilet", 130], ["laitCoco", 80], ["riz", 80], ["poivron", 70], ["oignon", 30]] },
  { id: "quiche", name: "Quiche lardons & poireaux", icon: "pie", minutes: 45, kind: "pork", allergens: ["gluten", "lactose", "eggs"], avoid: [], kids: true,
    items: [["pateBrisee", 60], ["lardons", 50], ["poireau", 100], ["oeufs", 60], ["creme", 50], ["fromage", 20], ["salade", 40]] },
  { id: "saumon", name: "Saumon, riz & brocoli", icon: "fish", minutes: 20, kind: "fish", allergens: ["fish"], avoid: ["fish", "broccoli"],
    items: [["saumon", 130], ["riz", 80], ["brocoli", 150]] },
  { id: "chili", name: "Chili sin carne", icon: "chili", minutes: 35, kind: "vegan", allergens: [], avoid: ["spicy"],
    items: [["haricotsRouges", 120], ["tomateConc", 150], ["poivron", 80], ["oignon", 40], ["riz", 70]] },
  { id: "chili-carne", name: "Chili con carne", icon: "beans", minutes: 35, kind: "meat", allergens: [], avoid: ["spicy", "beef"],
    items: [["boeufHache", 90], ["haricotsRouges", 90], ["tomateConc", 150], ["poivron", 60], ["riz", 70]] },
  { id: "omelette", name: "Omelette pommes de terre & salade", icon: "pan", minutes: 20, kind: "veggie", allergens: ["eggs"], avoid: [], kids: true,
    items: [["oeufs", 120], ["pommesTerre", 180], ["oignon", 30], ["salade", 50]] },
  { id: "gratin-courgette", name: "Gratin de courgettes au chèvre", icon: "cheese", minutes: 40, kind: "veggie", allergens: ["lactose", "eggs"], avoid: ["zucchini", "strongcheese"],
    items: [["courgette", 250], ["chevre", 40], ["creme", 40], ["oeufs", 30], ["riz", 60]] },
  { id: "poulet-roti", name: "Cuisses de poulet rôties & patates", icon: "drumstick", minutes: 50, kind: "meat", allergens: [], avoid: [], kids: true,
    items: [["pouletCuisse", 220], ["pommesTerre", 220], ["carotte", 80]] },
  { id: "wok-tofu", name: "Wok de nouilles au tofu", icon: "noodles", minutes: 20, kind: "vegan", allergens: ["gluten", "soy"], avoid: [],
    items: [["nouilles", 90], ["tofu", 100], ["poivron", 70], ["carotte", 60], ["sauceSoja", 15]] },
  { id: "crevettes-wok", name: "Riz sauté aux crevettes", icon: "shrimp", minutes: 20, kind: "fish", allergens: ["shellfish", "eggs", "soy"], avoid: ["seafood"],
    items: [["riz", 90], ["crevettes", 90], ["oeufs", 30], ["poivron", 50], ["sauceSoja", 10]] },
  { id: "tacos", name: "Tacos au poulet & poivrons", icon: "taco", minutes: 25, kind: "meat", allergens: ["gluten", "lactose"], avoid: ["cilantro"], kids: true,
    items: [["tortillas", 90], ["pouletFilet", 100], ["poivron", 80], ["tomate", 60], ["fromage", 20], ["coriandre", 2]] },
  { id: "shakshuka", name: "Shakshuka & pain", icon: "tomato", minutes: 25, kind: "veggie", allergens: ["eggs"], avoid: ["spicy"],
    items: [["oeufs", 120], ["tomateConc", 200], ["poivron", 80], ["oignon", 40], ["feta", 20]] },
  { id: "cabillaud", name: "Cabillaud, purée maison", icon: "fish", minutes: 30, kind: "fish", allergens: ["fish", "lactose"], avoid: ["fish"], kids: true,
    items: [["cabillaud", 130], ["pommesTerre", 220], ["lait", 60], ["epinards", 80]] },
  { id: "salade-thon", name: "Salade de riz au thon", icon: "salad", minutes: 15, kind: "fish", allergens: ["fish", "eggs"], avoid: ["fish"],
    items: [["riz", 80], ["thon", 60], ["tomate", 100], ["oeufs", 30], ["salade", 40]] },
  { id: "couscous", name: "Couscous de légumes & pois chiches", icon: "couscous", minutes: 35, kind: "vegan", allergens: ["gluten"], avoid: ["zucchini"],
    items: [["semoule", 80], ["poischiches", 100], ["courgette", 100], ["carotte", 80], ["oignon", 30]] },
  { id: "pates-champi", name: "Pâtes crème & champignons", icon: "mushroom", minutes: 20, kind: "veggie", allergens: ["gluten", "lactose"], avoid: ["mushrooms"], kids: true,
    items: [["pates", 110], ["champignons", 120], ["creme", 50], ["fromage", 15]] },
  { id: "aubergine-feta", name: "Aubergines rôties, feta & semoule", icon: "eggplant", minutes: 35, kind: "veggie", allergens: ["gluten", "lactose"], avoid: ["eggplant", "strongcheese"],
    items: [["aubergine", 220], ["feta", 40], ["semoule", 70], ["tomate", 80]] },
  { id: "saucisses-lentilles", name: "Saucisses & lentilles mijotées", icon: "sausage", minutes: 35, kind: "pork", allergens: [], avoid: [], kids: true,
    items: [["saucisse", 120], ["lentilles", 70], ["carotte", 80], ["oignon", 30]] },
  { id: "patate-douce", name: "Patates douces farcies aux haricots", icon: "sweetpotato", minutes: 40, kind: "vegan", allergens: [], avoid: ["cilantro"],
    items: [["patateDouce", 280], ["haricotsRouges", 90], ["tomate", 60], ["coriandre", 2]] },
  { id: "pizza-maison", name: "Pizza maison tomate-mozza", icon: "pizza", minutes: 30, kind: "veggie", allergens: ["gluten", "lactose"], avoid: [], kids: true,
    items: [["pateBrisee", 90], ["tomateConc", 80], ["mozza", 70], ["champignons", 40], ["salade", 40]] },
  { id: "poulet-epinards", name: "Poulet crémeux aux épinards", icon: "greens", minutes: 25, kind: "meat", allergens: ["lactose"], avoid: ["spinach"],
    items: [["pouletFilet", 130], ["epinards", 120], ["creme", 50], ["pates", 90]] },
  { id: "hachis", name: "Hachis parmentier", icon: "potato", minutes: 45, kind: "meat", allergens: ["lactose"], avoid: ["beef"], kids: true,
    items: [["boeufHache", 100], ["pommesTerre", 250], ["lait", 60], ["fromage", 20], ["oignon", 30]] },
];

export const PANTRY_PER_PORTION = 0.15; // huile, épices, sel, bouillon…

export function recipeCost(r: Recipe, idx: number) {
  const raw = r.items.reduce((s, [k, g]) => s + (ING[k].perKg * g) / 1000, 0);
  return (raw + PANTRY_PER_PORTION) * idx; // € per adult portion
}

const DIET_OK: Record<Diet, Recipe["kind"][]> = {
  all: ["meat", "pork", "fish", "veggie", "vegan"],
  flexi: ["meat", "pork", "fish", "veggie", "vegan"],
  veggie: ["veggie", "vegan"],
  vegan: ["vegan"],
  pesco: ["fish", "veggie", "vegan"],
  nopork: ["meat", "fish", "veggie", "vegan"],
};

export type PlannedMeal = { day: string; recipe: Recipe; perPortion: number; total: number };

export type Plan = {
  meals: PlannedMeal[]; // visible days only
  dinners: number; // all planned dinners, visible or not
  lockedCount: number; // planned dinners hidden behind the unlock
  total: number;
  perPortion: number;
  portions: number;
  budget: number;
  minPossible: number;
  pool: number;
  shopping: { cat: Cat; lines: { name: string; grams: number; price: number }[] }[];
};

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

export function compatibleRecipes(f: FoodInput) {
  const ok = DIET_OK[f.diet ?? "all"];
  return RECIPES.filter(
    (r) =>
      ok.includes(r.kind) &&
      !r.allergens.some((a) => f.allergies.includes(a)) &&
      !r.avoid.some((d) => f.dislikes.includes(d)),
  );
}

export function buildPlan(f: FoodInput, visibleDays?: number): Plan {
  const idx = storeIndex(f.store);
  const portions = portionsPerMeal(f.adults, f.kids);
  const pool = compatibleRecipes(f).map((r) => ({ r, c: recipeCost(r, idx) }));
  pool.sort((a, b) => a.c - b.c);
  const n = Math.min(f.dinners, pool.length);
  const target = f.budget / Math.max(1, portions * f.dinners);

  // Start from the cheapest set, then upgrade meals while budget allows → variety without overspending.
  const picked = pool.slice(0, n);
  const rest = pool.slice(n);
  const sum = () => picked.reduce((s, x) => s + x.c, 0) * portions;
  let guard = 0;
  while (rest.length && guard++ < 50) {
    // try swapping the cheapest picked meal with the next pricier one if it still fits
    const cand = rest[0];
    const cheapestIdx = picked.reduce((m, x, k, arr) => (x.c < arr[m].c ? k : m), 0);
    const delta = (cand.c - picked[cheapestIdx].c) * portions;
    if (sum() + delta <= f.budget && cand.c <= target * 1.6) {
      rest.shift();
      picked[cheapestIdx] = cand;
    } else break;
  }

  // Flexitarian cap on meat
  if (f.diet === "flexi") {
    let meat = 0;
    for (let k = 0; k < picked.length; k++) {
      if (picked[k].r.kind === "meat" || picked[k].r.kind === "pork") {
        meat++;
        if (meat > 2) {
          const alt = pool.find((p) => !picked.includes(p) && (p.r.kind === "veggie" || p.r.kind === "vegan" || p.r.kind === "fish"));
          if (alt) picked[k] = alt;
        }
      }
    }
  }

  // Spread kinds across the week (alternate)
  picked.sort((a, b) => a.r.kind.localeCompare(b.r.kind));
  const spread: typeof picked = [];
  const buckets = [...picked];
  while (buckets.length) {
    const last = spread[spread.length - 1]?.r.kind;
    const k = buckets.findIndex((x) => x.r.kind !== last);
    spread.push(buckets.splice(k === -1 ? 0 : k, 1)[0]);
  }

  const meals: PlannedMeal[] = spread.map((x, k) => ({
    day: DAYS[k] ?? `Repas ${k + 1}`,
    recipe: x.r,
    perPortion: x.c,
    total: x.c * portions,
  }));
  const total = meals.reduce((s, m) => s + m.total, 0);
  const minPossible = pool.slice(0, n).reduce((s, x) => s + x.c, 0) * portions;

  // Only the free days are returned in full; the shopping list covers those days only.
  const visible = visibleDays === undefined ? meals : meals.slice(0, visibleDays);

  // Shopping list
  const agg = new Map<string, number>();
  for (const m of visible) for (const [k, g] of m.recipe.items) agg.set(k, (agg.get(k) ?? 0) + g * portions);
  const cats: Cat[] = ["Fruits & légumes", "Viandes & poissons", "Crèmerie & œufs", "Épicerie"];
  const shopping = cats
    .map((cat) => ({
      cat,
      lines: [...agg.entries()]
        .filter(([k]) => ING[k].cat === cat)
        .map(([k, g]) => ({ name: ING[k].name, grams: g, price: (ING[k].perKg * g * idx) / 1000 }))
        .sort((a, b) => b.price - a.price),
    }))
    .filter((c) => c.lines.length);

  return {
    meals: visible,
    dinners: meals.length,
    lockedCount: meals.length - visible.length,
    total,
    perPortion: meals.length ? total / (portions * meals.length) : 0,
    portions,
    budget: f.budget,
    minPossible,
    pool: pool.length,
    shopping,
  };
}
