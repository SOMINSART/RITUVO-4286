import { ICON_NAMES, RvIcon, RvMark, UiIcon, type UiName } from "../components/rv-icons";

const UI_NAMES: UiName[] = ["back", "close", "check", "minus", "plus", "star", "sparkle", "mail"];

export default function Icons() {
  return (
    <div className="bg-grid min-h-screen px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-3">
          <RvMark size={44} />
          <div>
            <h1 className="font-display text-3xl font-extrabold">Icônes Rituvo</h1>
            <p className="text-[var(--mute)]">{ICON_NAMES.length} pictos originaux + {UI_NAMES.length} icônes d'interface</p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-8">
          {ICON_NAMES.map((n) => (
            <div key={n} className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm">
              <RvIcon name={n} size={44} />
              <span className="text-[11px] text-[var(--mute)]">{n}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {UI_NAMES.map((n) => (
            <div key={n} className="flex flex-col items-center gap-2 rounded-2xl bg-[var(--ink)] p-4 text-white">
              <UiIcon name={n} size={26} />
              <span className="text-[11px] opacity-70">{n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
