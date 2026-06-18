import { PROCESS_STEPS } from "@/lib/data/process";

export default function ProcessSteps({
  variant = "list",
}: {
  variant?: "list" | "cards";
}) {
  if (variant === "cards") {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROCESS_STEPS.map((s, i) => (
          <div
            key={s.step}
            className="rounded-xl border border-border bg-white p-5 shadow-card"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-50 text-sm font-bold text-accent-600">
                {i + 1}
              </span>
              <span className="text-2xl" aria-hidden="true">{s.emoji}</span>
            </div>
            <p className="mt-3 font-semibold text-foreground">{s.cardTitle ?? s.title}</p>
            <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col divide-y divide-border rounded-2xl border border-border bg-white">
      {PROCESS_STEPS.map((s, i) => (
        <div key={s.step} className="flex items-center gap-4 px-5 py-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-50 text-sm font-bold text-accent-600">
            {i + 1}
          </span>
          <span className="text-xl" aria-hidden="true">{s.emoji}</span>
          <span className="font-medium text-foreground">{s.title}</span>
        </div>
      ))}
    </div>
  );
}
