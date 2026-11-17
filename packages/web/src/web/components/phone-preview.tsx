import { motion, AnimatePresence } from "motion/react";
import { RvIcon, UiIcon } from "./rv-icons";
import { type Answers, fmtTime, pickHabits } from "../lib/quiz-data";

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const FILL = [0.3, 0.6, 1, 0.55, 0, 0, 0];

export function PhonePreview({ answers, done = 2 }: { answers: Answers; done?: number }) {
  const habits = pickHabits(answers);
  const first = answers.name?.trim();
  return (
    <div className="relative mx-auto w-[300px]">
      <div className="rounded-[46px] border-[10px] border-[var(--ink)] bg-white shadow-[0_30px_80px_-20px_rgba(17,18,20,0.35)] overflow-hidden">
        <div className="mx-auto mt-2 h-6 w-28 rounded-full bg-[var(--ink)]" />
        <div className="px-4 pb-5 pt-4">
          <p className="text-[11px] font-semibold text-[var(--mute)]">
            Réveil {fmtTime(answers.wake ?? 420)}
          </p>
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-[22px] font-extrabold uppercase leading-tight">
              {first ? `Jour de ${first}` : "Ma journée"}
            </h3>
            <span className="text-xs font-semibold text-[var(--mute)]">
              {done}/{habits.length}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-1">
            {DAYS.map((d, i) => (
              <div key={d} className="flex flex-col items-center gap-1">
                <span className={`text-[9px] ${i === 3 ? "font-bold text-[var(--ink)]" : "text-[var(--mute)]"}`}>
                  {i === 3 ? "Auj." : d}
                </span>
                <div
                  className={`relative h-7 w-7 overflow-hidden rounded-full border ${i === 3 ? "border-2 border-[var(--ink)]" : "border-[var(--line)]"}`}
                >
                  <div
                    className="absolute inset-x-0 bottom-0 bg-[var(--go)] transition-all duration-700"
                    style={{ height: `${FILL[i] * 100}%` }}
                  />
                  <span className="relative z-10 flex h-full items-center justify-center text-[10px] font-semibold">
                    {9 + i}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-[var(--ink)] bg-[var(--ink)]">
            <AnimatePresence mode="popLayout">
              {habits.slice(0, 9).map((h, i) => {
                const checked = i < done;
                return (
                  <motion.div
                    key={h.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    className={`relative flex aspect-square flex-col items-center justify-between p-1.5 text-center ${checked ? "bg-[var(--cream)]" : "bg-white"}`}
                  >
                    <span className="text-[10px] font-medium leading-tight">{h.label}</span>
                    <RvIcon name={h.icon} size={22} />
                    {checked && (
                      <span className="absolute bottom-1 right-1 flex h-5 w-5 rotate-[-8deg] items-center justify-center rounded-md bg-[var(--ink)] text-white shadow">
                        <UiIcon name="check" size={12} strokeWidth={3} />
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {Array.from({ length: (3 - (Math.min(habits.length, 9) % 3)) % 3 }).map((_, k) => (
              <div key={`pad-${k}`} className="aspect-square bg-[var(--paper)]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
