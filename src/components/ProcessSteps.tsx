import { MessageCircle, Compass, Palette, Code2, Search, Megaphone, type LucideIcon } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/data/process";

const ICONS: LucideIcon[] = [MessageCircle, Compass, Palette, Code2, Search, Megaphone];

export default function ProcessSteps({
  variant = "list",
}: {
  variant?: "list" | "cards";
}) {
  if (variant === "cards") {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROCESS_STEPS.map((s, i) => {
          const Icon = ICONS[i];
          return (
          <div
            key={s.step}
            className="rounded-xl border border-border bg-white px-6 py-5 shadow-card transition-transform duration-200 hover:-translate-y-1"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-50 text-xs font-bold text-accent-600">
              {i + 1}
            </span>
            <div className="mt-3 flex items-center gap-2">
              <Icon className="h-5 w-5 shrink-0 text-accent-600" />
              <p className="font-semibold text-foreground">{s.cardTitle ?? s.title}</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">{s.desc}</p>
          </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col divide-y divide-border rounded-2xl border border-border bg-white">
      {PROCESS_STEPS.map((s, i) => {
        const Icon = ICONS[i];
        return (
          <div key={s.step} className="flex items-center gap-4 px-5 py-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-50 text-sm font-bold text-accent-600">
              {i + 1}
            </span>
            <Icon className="h-5 w-5 shrink-0 text-accent-600" />
            <span className="font-medium text-foreground">{s.title}</span>
          </div>
        );
      })}
    </div>
  );
}
