import { FUNNEL_STEPS } from "@/lib/data/process";

export default function FunnelSteps() {
  return (
    <div className="flex h-full flex-col divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white">
      {FUNNEL_STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-4 px-5 py-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
            {i + 1}
          </span>
          <span className="font-medium text-gray-900">{label}</span>
        </div>
      ))}
    </div>
  );
}
