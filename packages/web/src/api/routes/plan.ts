import { z } from "zod";
import { base } from "../__core/app";
import { buildPlan } from "../food/plan";
import { FREE_DAYS, isUnlocked } from "../food/access";

const input = z.object({
  adults: z.number().int().min(1).max(10),
  kids: z.number().int().min(0).max(10),
  dinners: z.number().int().min(1).max(7),
  budget: z.number().min(0).max(1000),
  store: z.string().optional(),
  diet: z.enum(["all", "flexi", "veggie", "vegan", "pesco", "nopork"]),
  allergies: z.array(z.string()).max(20),
  dislikes: z.array(z.string()).max(20),
  unlock: z.string().max(300).optional(),
});

export const plan = {
  compute: base.input(input).handler(({ input }) => {
    const { unlock, ...food } = input;
    const unlocked = isUnlocked(unlock);
    const result = buildPlan(food, unlocked ? undefined : FREE_DAYS);
    return { ...result, freeDays: FREE_DAYS, unlocked };
  }),
};
