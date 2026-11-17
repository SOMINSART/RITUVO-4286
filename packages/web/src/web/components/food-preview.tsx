import { RvIcon } from "./rv-icons";
import { AnimatePresence, motion } from "motion/react";
import { type Answers, foodInput } from "../lib/quiz-data";
import { STORES, fmtEur } from "../lib/food-ui";
import { usePlan } from "../queries/plan";

export function FoodPreview({ answers }: { answers: Answers }) {
  const f = foodInput(answers);
  const { data: plan } = usePlan(answers);
  if (!plan) return null;
  const store = STORES.find((s) => s.id === f.store)?.label;
  const over = plan.total > f.budget + 0.5;

  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <div className="rounded-[28px] border-[1.5px] border-[var(--ink)] bg-white p-5 shadow-[8px_8px_0_var(--ink)]">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--mute)]">Coût moyen par portion</p>
            <p className="mt-1 text-[13px] text-[var(--mute)]">
              {f.dinners} dîners · {plan.portions.toLocaleString("fr-FR")} portion{plan.portions > 1 ? "s" : ""}/repas
              {store ? ` · ${store}` : ""}
            </p>
          </div>
          <motion.span
            key={plan.perPortion.toFixed(2)}
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-display text-[44px] font-extrabold leading-none text-[var(--go-deep)] tabular-nums"
          >
            {fmtEur(plan.perPortion)}
          </motion.span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <AnimatePresence mode="popLayout">
            {plan.meals.slice(0, 6).map((m, k) => (
              <motion.div
                key={m.recipe.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: k * 0.03 }}
                className={`flex aspect-square flex-col justify-between rounded-2xl p-2.5 ${
                  ["bg-[var(--cream)]", "bg-[#E8F7EE]", "bg-[#EEF1F8]"][k % 3]
                }`}
              >
                <RvIcon name={m.recipe.icon} size={38} />
                <span>
                  <span className="line-clamp-2 text-[11.5px] font-semibold leading-tight">{m.recipe.name}</span>
                  <span className="mt-0.5 block text-[11px] font-bold text-[var(--go-deep)]">{fmtEur(m.perPortion)}</span>
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-5 rounded-2xl bg-[var(--paper)] p-4">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium text-[var(--mute)]">Total semaine</span>
            <span className="font-display text-2xl font-extrabold tabular-nums">{fmtEur(plan.total, 0)}</span>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[var(--line)]">
            <motion.div
              className={`h-full rounded-full ${over ? "bg-[#F97316]" : "bg-[var(--go)]"}`}
              animate={{ width: `${Math.min(100, (plan.total / Math.max(1, f.budget)) * 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs font-medium text-[var(--mute)]">
            {over
              ? `Budget serré : ${fmtEur(plan.total - f.budget, 0)} au-dessus de ${fmtEur(f.budget, 0)}`
              : `${fmtEur(f.budget - plan.total, 0)} de marge sur ${fmtEur(f.budget, 0)}`}
          </p>
        </div>
        <p className="mt-4 text-center text-[13px] font-semibold">
          <span className="font-display text-lg font-extrabold">{plan.pool}</span> recettes compatibles avec toi
        </p>
      </div>
    </div>
  );
}
