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
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-bold text-blue-600">{s.step}</p>
            <p className="mt-1 font-semibold text-gray-900">{s.title}</p>
            <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white">
      {PROCESS_STEPS.map((s) => (
        <div key={s.step} className="flex items-center gap-4 px-5 py-4">
          <span className="text-sm font-bold text-blue-600">{s.step}</span>
          <span className="font-medium text-gray-900">{s.title}</span>
        </div>
      ))}
    </div>
  );
}
