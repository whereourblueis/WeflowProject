import { PROCESS_STEPS } from "@/lib/data/process";

export default function ProcessSteps({
  variant = "list",
}: {
  variant?: "list" | "cards";
}) {
  if (variant === "cards") {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROCESS_STEPS.map((s) => (
          <div
            key={s.step}
            className="rounded-xl border border-border bg-white p-5 shadow-card"
          >
            <p className="text-sm font-bold text-accent-600">{s.step}</p>
            <p className="mt-1 font-semibold text-foreground">{s.title}</p>
            <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col divide-y divide-border rounded-2xl border border-border bg-white">
      {PROCESS_STEPS.map((s) => (
        <div key={s.step} className="flex items-center gap-4 px-5 py-4">
          <span className="text-sm font-bold text-accent-600">{s.step}</span>
          <span className="font-medium text-foreground">{s.title}</span>
        </div>
      ))}
    </div>
  );
}
