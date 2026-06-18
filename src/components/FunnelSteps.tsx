import { FUNNEL_STEPS, type FunnelStep } from "@/lib/data/process";

export default function FunnelSteps() {
  return (
    <div className="flex h-full flex-col divide-y divide-border rounded-2xl border border-border bg-white">
      {FUNNEL_STEPS.map((step: FunnelStep, i: number) => (
        <div key={step.label} className="flex items-center gap-4 px-5 py-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-50 text-sm font-bold text-accent-600">
            {i + 1}
          </span>
          <span className="text-xl" aria-hidden="true">{step.emoji}</span>
          <span className="font-medium text-foreground">{step.label}</span>
        </div>
      ))}
    </div>
  );
}
