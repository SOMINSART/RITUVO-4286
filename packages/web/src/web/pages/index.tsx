import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RvIcon, RvMark, UiIcon } from "../components/rv-icons";
import { DEFAULT_ANSWERS, STEPS, fmtTime, foodInput, pickHabits, type Answers, type Option, type Step } from "../lib/quiz-data";
import { PhonePreview } from "../components/phone-preview";
import { FoodPreview } from "../components/food-preview";
import { STORES, fmtEur, fmtQty, suggestedBudget } from "../lib/food-ui";
import { useSubmitQuiz } from "../queries/quiz";
import { usePlan } from "../queries/plan";
import { completeUnlockFromUrl, startUnlockCheckout } from "../queries/checkout";

const QUESTION_STEPS = STEPS.filter((s) => s.kind !== "loading" && s.kind !== "result").length;

export default function Index() {
  useEffect(() => {
    // Back from Stripe: verify the payment, then reload so the plan query picks up the unlock.
    completeUnlockFromUrl()
      .then((unlocked) => {
        if (unlocked) window.location.reload();
      })
      .catch(() => {});
  }, []);
  const [i, setI] = useState(() => {
    const v = Number(localStorage.getItem("rituvo:step") ?? 0);
    return Number.isFinite(v) && v >= 0 && v < STEPS.length ? v : 0;
  });
  const [dir, setDir] = useState(1);
  const [a, setA] = useState<Answers>(() => {
    try {
      return { ...DEFAULT_ANSWERS, ...JSON.parse(localStorage.getItem("rituvo:answers") ?? "{}") };
    } catch {
      return DEFAULT_ANSWERS;
    }
  });
  useEffect(() => {
    localStorage.setItem("rituvo:answers", JSON.stringify(a));
    localStorage.setItem("rituvo:step", String(STEPS[i].kind === "loading" ? i - 1 : i));
  }, [a, i]);
  const step = STEPS[i];
  const preview = "preview" in step ? step.preview : undefined;

  const next = () => {
    setDir(1);
    setI((v) => Math.min(v + 1, STEPS.length - 1));
  };
  const back = () => {
    setDir(-1);
    setI((v) => Math.max(v - 1, 0));
  };
  const restart = () => {
    setDir(-1);
    setA(DEFAULT_ANSWERS);
    setI(0);
  };
  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => setA((p) => ({ ...p, [k]: v }));

  const progress = Math.min(1, (i + 1) / QUESTION_STEPS);
  const showChrome = step.kind !== "result";
  const done = Math.min(pickHabits(a).length, Math.max(1, Math.round(i / 3)));

  return (
    <div className="bg-grid min-h-screen">
      {showChrome && (
        <header className="sticky top-0 z-20 bg-[var(--paper)]/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-4">
            <button
              aria-label="Retour"
              onClick={back}
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition ${
                i === 0 || step.kind === "loading" ? "pointer-events-none opacity-0" : ""
              }`}
            >
              <UiIcon name="back" size={18} />
            </button>
            <Logo />
            <button
              aria-label="Quitter"
              onClick={restart}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
            >
              <UiIcon name="close" size={18} />
            </button>
          </div>
          <div className="mx-auto max-w-6xl px-5 pb-3 pt-4">
            <div className="h-2 overflow-hidden rounded-full bg-[var(--line)]">
              <motion.div
                className="h-full rounded-full bg-[var(--go)]"
                animate={{ width: `${progress * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </div>
        </header>
      )}

      <main className="mx-auto max-w-6xl px-5 pb-16">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step.id}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {step.kind === "loading" ? (
              <Loading answers={a} onDone={next} />
            ) : step.kind === "result" ? (
              <Result answers={a} onRestart={restart} />
            ) : step.kind === "proof" ? (
              <Proof onNext={next} />
            ) : (
              <div className="grid items-center gap-10 pt-6 md:grid-cols-[minmax(0,460px)_1fr] md:gap-16 md:pt-12">
                <section className="w-full">
                  <StepBody step={step} a={a} set={set} next={next} />
                </section>
                <aside className="hidden md:block">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={preview ?? "routine"}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.3 }}
                    >
                      {preview === "food" ? <FoodPreview answers={a} /> : <PhonePreview answers={a} done={done} />}
                    </motion.div>
                  </AnimatePresence>
                </aside>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function Logo() {
  return (
    <div className="font-display flex items-center gap-1.5 text-2xl font-extrabold">
      <RvMark size={28} />
      <span>
        Rituvo<span className="text-[var(--go)]">.</span>
      </span>
    </div>
  );
}

function Title({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-7 text-center md:text-left">
      <h1 className="font-display text-[32px] font-extrabold leading-[1.05] md:text-[40px]">{title}</h1>
      <p className="mt-3 text-[15px] text-[var(--mute)]">{sub}</p>
    </div>
  );
}

function PrimaryButton({ children, disabled, onClick }: { children: React.ReactNode; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="mt-7 h-14 w-full rounded-full bg-[var(--ink)] text-[16px] font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:shadow-none"
    >
      {children}
    </button>
  );
}

function Tick({ on }: { on: boolean }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
        on ? "border-[var(--go)] bg-[var(--go)] text-white" : "border-[var(--line)] bg-white"
      }`}
    >
      {on && <UiIcon name="check" size={14} strokeWidth={3.2} />}
    </span>
  );
}

function StepBody({
  step,
  a,
  set,
  next,
}: {
  step: Step;
  a: Answers;
  set: <K extends keyof Answers>(k: K, v: Answers[K]) => void;
  next: () => void;
}) {
  if (step.kind === "single") {
    const key = step.id as keyof Answers;
    const pick = (o: Option) => {
      set(key, o.id as never);
      setTimeout(next, 260);
    };
    const cur = a[key];
    const grid =
      step.layout === "grid"
        ? "grid grid-cols-2 gap-3"
        : step.layout === "grid3"
          ? "grid grid-cols-3 gap-2.5"
          : step.layout === "row"
            ? "grid grid-cols-5 gap-2"
            : "flex flex-col gap-3";
    return (
      <>
        <Title title={step.title} sub={step.sub} />
        <div className={grid}>
          {step.options.map((o, idx) => {
            const on = cur === o.id;
            return (
              <motion.button
                key={o.id}
                aria-pressed={on}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                onClick={() => pick(o)}
                className={`group rounded-[18px] border-[1.5px] bg-white text-left transition hover:border-[var(--ink)] ${
                  on ? "border-[var(--ink)] bg-[var(--cream)]" : "border-[var(--ink)]/10"
                } ${
                  step.layout === "grid"
                    ? "flex flex-col items-start gap-2 p-4"
                    : step.layout === "grid3"
                      ? "flex min-h-[76px] flex-col items-center justify-center gap-1 px-2 py-3 text-center"
                      : step.layout === "row"
                      ? "flex flex-col items-center gap-1 px-2 py-5 text-center"
                      : "flex items-center gap-4 px-4 py-4"
                }`}
              >
                {step.layout !== "row" && step.layout !== "grid3" && <RvIcon name={o.icon} size={32} />}
                <span className="flex-1">
                  <span
                    className={`block font-semibold ${step.layout === "row" ? "font-display text-2xl" : step.layout === "grid3" ? "text-[15px]" : "text-[16px]"}`}
                  >
                    {o.label}
                  </span>
                  {o.hint && <span className="mt-0.5 block text-[13px] text-[var(--mute)]">{o.hint}</span>}
                </span>
                {!step.layout || step.layout === "list" ? <Tick on={on} /> : null}
              </motion.button>
            );
          })}
        </div>
      </>
    );
  }

  if (step.kind === "multi") {
    const key = step.id as "habits" | "blockers" | "allergies" | "dislikes";
    const cur = (a[key] as string[]) ?? [];
    const toggle = (id: string) => set(key, cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
    const canGo = cur.length >= (step.min ?? 1);
    return (
      <>
        <Title title={step.title} sub={step.sub} />
        {step.layout === "grid" ? (
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
            {step.options.map((o, idx) => {
              const on = cur.includes(o.id);
              return (
                <motion.button
                  key={o.id}
                  aria-pressed={on}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={() => toggle(o.id)}
                  className={`relative flex min-h-[104px] flex-col items-center justify-center gap-2 rounded-2xl border-[1.5px] px-2 py-3 text-center transition ${
                    on ? "border-[var(--ink)] bg-[var(--cream)]" : "border-[var(--ink)]/10 bg-white hover:border-[var(--ink)]/40"
                  }`}
                >
                  <RvIcon name={o.icon} size={30} />
                  <span className="text-[12.5px] font-medium leading-tight">{o.label}</span>
                  {on && (
                    <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--go)] text-white">
                      <UiIcon name="check" size={12} strokeWidth={3.2} />
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-2.5 md:justify-start">
            {step.options.map((o, idx) => {
              const on = cur.includes(o.id);
              return (
                <motion.button
                  key={o.id}
                  aria-pressed={on}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={() => toggle(o.id)}
                  className={`flex items-center gap-2 rounded-full border-[1.5px] px-4 py-2.5 text-[15px] font-medium transition ${
                    on ? "border-[var(--ink)] bg-[var(--ink)] text-white" : "border-[var(--ink)]/10 bg-white hover:border-[var(--ink)]/40"
                  }`}
                >
                  <RvIcon name={o.icon} size={20} />
                  {o.label}
                </motion.button>
              );
            })}
          </div>
        )}
        {step.none && cur.length === 0 ? (
          <PrimaryButton onClick={next}>{step.none}</PrimaryButton>
        ) : (
          <PrimaryButton disabled={!canGo} onClick={next}>
            Continuer{cur.length > 0 ? ` · ${cur.length}` : ""}
          </PrimaryButton>
        )}
      </>
    );
  }

  if (step.kind === "name") {
    const v = a.name ?? "";
    return (
      <>
        <Title title={step.title} sub={step.sub} />
        <input
          aria-label="Ton prénom"
          value={v}
          maxLength={40}
          onChange={(e) => set("name", e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && v.trim() && next()}
          placeholder="Ton prénom"
          className="font-display h-16 w-full rounded-2xl border-[1.5px] border-[var(--ink)]/15 bg-white px-5 text-2xl font-bold outline-none transition placeholder:text-[var(--mute)]/50 focus:border-[var(--ink)]"
        />
        <PrimaryButton disabled={!v.trim()} onClick={next}>
          Continuer
        </PrimaryButton>
        <button onClick={next} className="mt-3 w-full text-sm font-medium text-[var(--mute)] underline-offset-4 hover:underline">
          Passer cette étape
        </button>
      </>
    );
  }

  if (step.kind === "time") {
    const min = 5 * 60,
      max = 10 * 60;
    const v = a.wake ?? 420;
    const pct = ((v - min) / (max - min)) * 100;
    const mood = v < 360 ? "Lève-tôt 🐓" : v < 450 ? "Classique ☕" : v < 510 ? "Tranquille 🛋️" : "Grasse mat' 😴";
    return (
      <>
        <Title title={step.title} sub={step.sub} />
        <div className="rounded-3xl border-[1.5px] border-[var(--ink)]/10 bg-white p-6 text-center">
          <div className="font-display text-[64px] font-extrabold leading-none tabular-nums">{fmtTime(v)}</div>
          <div className="mt-2 text-sm font-semibold text-[var(--go-deep)]">{mood}</div>
          <input
            type="range"
            aria-label="Heure de réveil"
            className="rv-range mt-7 w-full"
            style={{ ["--pct" as string]: `${pct}%` }}
            min={min}
            max={max}
            step={15}
            value={v}
            onChange={(e) => set("wake", Number(e.target.value))}
          />
          <div className="mt-2 flex justify-between text-xs font-medium text-[var(--mute)]">
            <span>5:00</span>
            <span>10:00</span>
          </div>
        </div>
        <PrimaryButton onClick={next}>Continuer</PrimaryButton>
      </>
    );
  }

  if (step.kind === "household") {
    const rows: { k: "adults" | "kids"; icon: string; label: string; hint: string; min: number }[] = [
      { k: "adults", icon: "adult", label: "Adultes", hint: "Ados gros mangeurs inclus", min: 1 },
      { k: "kids", icon: "kid", label: "Enfants", hint: "Moins de 12 ans", min: 0 },
    ];
    return (
      <>
        <Title title={step.title} sub={step.sub} />
        <div className="flex flex-col gap-3">
          {rows.map((r) => {
            const v = a[r.k] ?? r.min;
            return (
              <div key={r.k} className="flex items-center gap-4 rounded-[18px] border-[1.5px] border-[var(--ink)]/10 bg-white px-4 py-4">
                <RvIcon name={r.icon} size={32} />
                <span className="flex-1">
                  <span className="block text-[16px] font-semibold">{r.label}</span>
                  <span className="block text-[13px] text-[var(--mute)]">{r.hint}</span>
                </span>
                <button
                  aria-label={`${r.label} : un de moins`}
                  disabled={v <= r.min}
                  onClick={() => set(r.k, v - 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-[var(--ink)] disabled:opacity-20"
                >
                  <UiIcon name="minus" size={18} />
                </button>
                <span className="font-display w-6 text-center text-2xl font-extrabold tabular-nums">{v}</span>
                <button
                  aria-label={`${r.label} : un de plus`}
                  disabled={v >= 8}
                  onClick={() => set(r.k, v + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--ink)] text-white disabled:opacity-20"
                >
                  <UiIcon name="plus" size={18} />
                </button>
              </div>
            );
          })}
        </div>
        <p className="mt-4 rounded-2xl bg-[var(--cream)] px-4 py-3 text-[13.5px] text-[var(--ink)]/80">
          💡 Un enfant compte pour une demi-portion adulte.
        </p>
        <PrimaryButton onClick={next}>Continuer</PrimaryButton>
      </>
    );
  }

  if (step.kind === "budget") {
    const f = foodInput(a);
    const suggested = suggestedBudget(f.adults, f.kids, f.dinners, f.store);
    const min = 10,
      max = Math.max(150, Math.ceil((suggested * 2.5) / 10) * 10);
    const v = a.budgetTouched && a.budget ? a.budget : suggested;
    const pct = ((v - min) / (max - min)) * 100;
    const perPortion = v / Math.max(1, f.dinners * (f.adults + f.kids * 0.5));
    const tag = perPortion < 2 ? "Petit budget 🪙" : perPortion < 3.5 ? "Malin 👌" : perPortion < 5 ? "Confort 😋" : "Large 🍾";
    return (
      <>
        <Title title={step.title} sub={step.sub} />
        <div className="rounded-3xl border-[1.5px] border-[var(--ink)]/10 bg-white p-6 text-center">
          <div className="font-display text-[64px] font-extrabold leading-none tabular-nums">{fmtEur(v, 0)}</div>
          <div className="mt-2 text-sm font-semibold text-[var(--go-deep)]">
            soit {fmtEur(perPortion)} par portion · {tag}
          </div>
          <input
            type="range"
            aria-label="Budget de la semaine"
            className="rv-range mt-7 w-full"
            style={{ ["--pct" as string]: `${pct}%` }}
            min={min}
            max={max}
            step={5}
            value={v}
            onChange={(e) => setA2(set, Number(e.target.value))}
          />
          <div className="mt-2 flex justify-between text-xs font-medium text-[var(--mute)]">
            <span>{fmtEur(min, 0)}</span>
            <button className="font-semibold text-[var(--ink)] underline underline-offset-2" onClick={() => setA2(set, suggested)}>
              Suggéré : {fmtEur(suggested, 0)}
            </button>
            <span>{fmtEur(max, 0)}</span>
          </div>
        </div>
        <BudgetHint answers={a} budget={v} />
        <PrimaryButton onClick={() => (setA2(set, v), next())}>Continuer</PrimaryButton>
      </>
    );
  }

  if (step.kind === "stepper") {
    const v = a.perDay ?? 5;
    const label = v <= 3 ? "Démarrage en douceur" : v <= 6 ? "Le bon équilibre" : "Ambitieux — on y va";
    return (
      <>
        <Title title={step.title} sub={step.sub} />
        <div className="flex items-center justify-between rounded-3xl border-[1.5px] border-[var(--ink)]/10 bg-white p-5">
          <button
            aria-label="Une de moins"
            disabled={v <= 2}
            onClick={() => set("perDay", v - 1)}
            className="flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-[var(--ink)] transition disabled:opacity-20"
          >
            <UiIcon name="minus" size={24} />
          </button>
          <div className="text-center">
            <div className="font-display text-[64px] font-extrabold leading-none tabular-nums">{v}</div>
            <div className="mt-1 text-sm font-semibold text-[var(--go-deep)]">{label}</div>
          </div>
          <button
            aria-label="Une de plus"
            disabled={v >= 9}
            onClick={() => set("perDay", v + 1)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--ink)] text-white transition disabled:opacity-20"
          >
            <UiIcon name="plus" size={24} />
          </button>
        </div>
        <p className="mt-4 rounded-2xl bg-[var(--cream)] px-4 py-3 text-[13.5px] text-[var(--ink)]/80">
          💡 La plupart des gens qui tiennent plus de 30 jours démarrent avec 4 ou 5 actions.
        </p>
        <PrimaryButton onClick={next}>Continuer</PrimaryButton>
      </>
    );
  }
  return null;
}

function setA2(set: <K extends keyof Answers>(k: K, v: Answers[K]) => void, v: number) {
  set("budget", v);
  set("budgetTouched", true);
}

function Proof({ onNext }: { onNext: () => void }) {
  const quotes = [
    { n: "Camille, 29 ans", t: "Première fois que je tiens une routine du matin plus de deux semaines. Cocher les cases, c'est bêtement addictif." },
    { n: "Yanis, 34 ans", t: "J'ai arrêté de vouloir tout changer d'un coup. 4 actions par jour, et ça tient." },
    { n: "Léa, 41 ans", t: "Le mode coach me secoue juste ce qu'il faut les jours sans." },
  ];
  return (
    <div className="mx-auto max-w-xl pt-10 text-center md:pt-16">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="font-display text-[80px] font-extrabold leading-none">
        4,8<span className="text-[var(--mute)]/50">/5</span>
      </motion.div>
      <div className="mt-2 flex justify-center gap-1">
        {Array.from({ length: 5 }).map((_, k) => (
          <UiIcon key={k} name="star" size={22} className="text-[var(--sun)]" />
        ))}
      </div>
      <h2 className="font-display mx-auto mt-5 max-w-md text-[28px] font-extrabold leading-tight">
        Tu n'es pas seul à vouloir des journées qui tiennent debout.
      </h2>
      <div className="mt-8 grid gap-3 text-left">
        {quotes.map((q, k) => (
          <motion.div
            key={q.n}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + k * 0.1 }}
            className={`rounded-2xl border-[1.5px] border-[var(--ink)]/10 bg-white p-4 ${k === 1 ? "md:translate-x-6" : ""}`}
          >
            <p className="text-[15px]">“{q.t}”</p>
            <p className="mt-2 text-xs font-semibold text-[var(--mute)]">{q.n}</p>
          </motion.div>
        ))}
      </div>
      <div className="mx-auto max-w-sm">
        <PrimaryButton onClick={onNext}>Continuer</PrimaryButton>
      </div>
    </div>
  );
}

function Loading({ answers, onDone }: { answers: Answers; onDone: () => void }) {
  const lines = useMemo(
    () => [
      "Tri des recettes compatibles avec toi",
      `Calcul des prix ${STORES.find((x) => x.id === answers.store)?.label ?? "magasin"}`,
      `Menu de ${answers.dinners ?? 5} dîners dans ${fmtEur(foodInput(answers).budget, 0)}`,
      `Routine calée sur ${fmtTime(answers.wake ?? 420)}`,
    ],
    [answers],
  );
  const [p, setP] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setP((v) => Math.min(100, v + 1.25)), 40);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (p >= 100) {
      const t = setTimeout(onDone, 450);
      return () => clearTimeout(t);
    }
  }, [p, onDone]);
  const r = 70,
    c = 2 * Math.PI * r;
  return (
    <div className="mx-auto flex max-w-md flex-col items-center pt-14 text-center">
      <div className="relative h-44 w-44">
        <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
          <circle cx="80" cy="80" r={r} stroke="var(--line)" strokeWidth="12" fill="none" />
          <circle
            cx="80"
            cy="80"
            r={r}
            stroke="var(--go)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c - (p / 100) * c}
          />
        </svg>
        <div className="font-display absolute inset-0 flex items-center justify-center text-4xl font-extrabold tabular-nums">
          {Math.round(p)}%
        </div>
      </div>
      <h2 className="font-display mt-8 text-[28px] font-extrabold">
        On prépare ton plan{answers.name ? `, ${answers.name}` : ""}…
      </h2>
      <ul className="mt-6 w-full space-y-2.5 text-left">
        {lines.map((l, k) => {
          const on = p > (k + 1) * 22;
          return (
            <li key={l} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-[15px]">
              <Tick on={on} />
              <span className={on ? "" : "text-[var(--mute)]"}>{l}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Budget hint under the slider, computed on the server for the chosen budget. */
function BudgetHint({ answers, budget }: { answers: Answers; budget: number }) {
  const { data: plan } = usePlan({ ...answers, budget });
  if (!plan) return null;
  return plan.minPossible > budget ? (
    <p className="mt-4 rounded-2xl bg-[#FFEDD5] px-4 py-3 text-[13.5px] text-[#9A3412]">
      ⚠️ Minimum possible avec tes critères : {fmtEur(plan.minPossible, 0)}. On fera au plus serré.
    </p>
  ) : (
    <p className="mt-4 rounded-2xl bg-[var(--cream)] px-4 py-3 text-[13.5px] text-[var(--ink)]/80">
      💡 Ton menu estimé : {fmtEur(plan.total, 0)} — il te reste {fmtEur(budget - plan.total, 0)} de marge.
    </p>
  );
}

function Result({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const [email, setEmail] = useState("");
  const [tab, setTab] = useState<"menu" | "courses" | "routine">("menu");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [unlocking, setUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState(false);
  const submit = useSubmitQuiz();
  const habits = pickHabits(answers);
  const { data: plan } = usePlan(answers);
  const f = foodInput(answers);
  const valid = /^\S+@\S+\.\S+$/.test(email);
  const first = answers.name?.trim();
  if (!plan) return <div className="pt-10 text-sm text-[var(--mute)]">Calcul de ton plan…</div>;
  const over = plan.total > f.budget + 0.5;
  const saved = Math.max(0, plan.dinners * plan.portions * 4.6 - plan.total); // vs ~4,60 €/portion en "improvisé"
  let t = answers.wake ?? 420;
  const per = Math.max(2, Math.round(20 / Math.max(1, habits.length)));

  return (
    <div className="pt-6 md:pt-10">
      <div className="flex items-center justify-between">
        <Logo />
        <button onClick={onRestart} className="text-sm font-medium text-[var(--mute)] hover:text-[var(--ink)]">
          Refaire le quiz
        </button>
      </div>
      <div className="mt-10 grid gap-12 md:grid-cols-[1fr_minmax(0,400px)] md:items-start">
        <section className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--go)]/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--go-deep)]">
            <UiIcon name="sparkle" size={14} /> Ton plan est prêt
          </span>
          <h1 className="font-display mt-4 text-[38px] font-extrabold leading-[1.02] md:text-[54px]">
            {first ? `${first}, ` : ""}
            {plan.dinners} dîners pour
            <br />
            <span className="text-[var(--go-deep)]">{fmtEur(plan.total, 0)}</span> cette semaine.
          </h1>
          <p className="mt-4 max-w-lg text-[16px] text-[var(--mute)]">
            {plan.portions.toLocaleString("fr-FR")} portion{plan.portions > 1 ? "s" : ""} par repas, prix{" "}
            {STORES.find((x) => x.id === f.store)?.label ?? "moyens"}, soit {fmtEur(plan.perPortion)} la portion.
          </p>

          <div className="mt-6 grid max-w-xl grid-cols-3 gap-2.5">
            <Stat label="Budget" value={fmtEur(f.budget, 0)} />
            <Stat label={over ? "Dépassement" : "Marge"} value={fmtEur(Math.abs(f.budget - plan.total), 0)} tone={over ? "warn" : "go"} />
            <Stat label="Économie estimée*" value={fmtEur(saved, 0)} tone="go" />
          </div>

          <div className="mt-8 inline-flex rounded-full border-[1.5px] border-[var(--ink)]/10 bg-white p-1">
            {(
              [
                ["menu", "Menu"],
                ["courses", "Liste de courses"],
                ["routine", "Routine"],
              ] as const
            ).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${tab === k ? "bg-[var(--ink)] text-white" : "text-[var(--mute)]"}`}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="mt-5 max-w-xl">
            {tab === "menu" && (
              <ol className="space-y-2">
                {plan.meals.length === 0 && (
                  <li className="rounded-2xl bg-white p-4 text-sm">Aucune recette ne correspond à tous tes critères — retire un filtre.</li>
                )}
                {plan.meals.map((m, k) => (
                  <motion.li
                    key={m.recipe.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + k * 0.05 }}
                    className="flex items-center gap-4 rounded-2xl border-[1.5px] border-[var(--ink)]/10 bg-white px-4 py-3"
                  >
                    <span className="w-[72px] shrink-0 text-xs font-bold uppercase tracking-wide text-[var(--mute)]">{m.day}</span>
                    <RvIcon name={m.recipe.icon} size={36} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold">{m.recipe.name}</span>
                      <span className="text-xs text-[var(--mute)]">
                        {m.recipe.minutes} min · {fmtEur(m.perPortion)}/portion
                      </span>
                    </span>
                    <span className="font-display text-lg font-extrabold tabular-nums">{fmtEur(m.total)}</span>
                  </motion.li>
                ))}
                {plan.lockedCount > 0 && (
                  <li className="rounded-2xl border-[1.5px] border-dashed border-[var(--ink)]/20 p-4 text-sm text-[var(--mute)]">
                    <span className="block">
                      Les jours suivants : {plan.lockedCount} dîner{plan.lockedCount > 1 ? "s" : ""} à débloquer.
                    </span>
                    <button
                      type="button"
                      disabled={unlocking}
                      onClick={async () => {
                        setUnlocking(true);
                        setUnlockError(false);
                        try {
                          await startUnlockCheckout();
                        } catch {
                          setUnlockError(true);
                          setUnlocking(false);
                        }
                      }}
                      className="mt-3 rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
                    >
                      {unlocking ? "Redirection vers le paiement…" : "Débloquer pour 3,90 €"}
                    </button>
                    {unlockError && <span className="mt-2 block text-red-600">Paiement indisponible pour l'instant, réessaie dans un instant.</span>}
                  </li>
                )}
              </ol>
            )}

            {tab === "courses" && (
              <div className="space-y-4">
                {plan.shopping.map((c) => (
                  <div key={c.cat} className="rounded-2xl border-[1.5px] border-[var(--ink)]/10 bg-white p-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-display text-lg font-extrabold">{c.cat}</h3>
                      <span className="text-sm font-semibold text-[var(--mute)]">
                        {fmtEur(c.lines.reduce((s, l) => s + l.price, 0))}
                      </span>
                    </div>
                    <ul className="mt-2 divide-y divide-[var(--line)]">
                      {c.lines.map((l) => {
                        const on = checked[l.name];
                        return (
                          <li key={l.name}>
                            <button
                              onClick={() => setChecked((p) => ({ ...p, [l.name]: !p[l.name] }))}
                              className="flex w-full items-center gap-3 py-2.5 text-left"
                            >
                              <Tick on={!!on} />
                              <span className={`flex-1 text-[15px] ${on ? "text-[var(--mute)] line-through" : ""}`}>{l.name}</span>
                              <span className="text-sm text-[var(--mute)]">{fmtQty(l.grams)}</span>
                              <span className="w-16 text-right text-sm font-semibold tabular-nums">{fmtEur(l.price)}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
                <p className="px-1 text-xs text-[var(--mute)]">
                  + {fmtEur(0.15 * plan.portions * plan.meals.length)} de placard (huile, épices, bouillon) inclus dans le total.
                </p>
              </div>
            )}

            {tab === "routine" && (
              <ol className="space-y-2">
                {habits.map((h, k) => {
                  const at = fmtTime(t);
                  t += per + 3;
                  return (
                    <li
                      key={h.id}
                      className="flex items-center gap-4 rounded-2xl border-[1.5px] border-[var(--ink)]/10 bg-white px-4 py-3"
                      style={{ animationDelay: `${k * 40}ms` }}
                    >
                      <span className="w-12 text-sm font-bold tabular-nums text-[var(--mute)]">{at}</span>
                      <RvIcon name={h.icon} size={28} />
                      <span className="flex-1 font-medium">{h.label}</span>
                      <span className="text-xs font-semibold text-[var(--mute)]">{per} min</span>
                    </li>
                  );
                })}
              </ol>
            )}
            <p className="mt-4 text-xs text-[var(--mute)]">
              *Prix estimés à partir de moyennes en grande surface, ajustés selon ton magasin. Économie comparée à ~4,60 € la portion pour des
              dîners non planifiés.
            </p>
          </div>
        </section>

        <aside className="md:sticky md:top-8">
          <FoodPreview answers={answers} />
          <div className="mt-8 rounded-3xl border-[1.5px] border-[var(--ink)] bg-white p-5 shadow-[6px_6px_0_var(--ink)]">
            {submit.isSuccess ? (
              <div className="py-4 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--go)] text-white">
                  <UiIcon name="check" size={22} strokeWidth={3} />
                </div>
                <p className="font-display mt-3 text-xl font-extrabold">C'est noté !</p>
                <p className="mt-1 text-sm text-[var(--mute)]">Ton menu, ta liste et ta routine sont enregistrés.</p>
              </div>
            ) : (
              <>
                <p className="font-display text-xl font-extrabold">Garde ton plan</p>
                <p className="mt-1 text-sm text-[var(--mute)]">Menu, liste de courses et routine. Sans engagement.</p>
                <div className="mt-4 flex items-center gap-2 rounded-2xl border-[1.5px] border-[var(--ink)]/15 bg-[var(--paper)] px-4 focus-within:border-[var(--ink)]">
                  <UiIcon name="mail" size={18} className="text-[var(--mute)]" />
                  <input
                    type="email"
                    aria-label="Adresse e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ton@email.fr"
                    className="w-full bg-transparent py-3.5 outline-none"
                  />
                </div>
                <PrimaryButton
                  disabled={!valid || submit.isPending}
                  onClick={() =>
                    submit.mutate({
                      email,
                      firstName: first || undefined,
                      answers: {
                        ...answers,
                        plan: { total: plan.total, perPortion: plan.perPortion, meals: plan.meals.map((m) => m.recipe.id) },
                      } as Record<string, unknown>,
                    })
                  }
                >
                  {submit.isPending ? "Envoi…" : "Recevoir mon plan"}
                </PrimaryButton>
                {submit.isError && <p className="mt-2 text-sm text-red-600">Oups, réessaie dans un instant.</p>}
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "go" | "warn" }) {
  return (
    <div className="rounded-2xl border-[1.5px] border-[var(--ink)]/10 bg-white px-3 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--mute)]">{label}</p>
      <p
        className={`font-display mt-1 text-2xl font-extrabold tabular-nums ${
          tone === "go" ? "text-[var(--go-deep)]" : tone === "warn" ? "text-[#C2410C]" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
