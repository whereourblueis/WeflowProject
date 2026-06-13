import { Check, Crown } from "lucide-react";
import type { PricingCard } from "@/lib/data/pricing";

export default function PricingCardGrid({ cards }: { cards: PricingCard[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`flex flex-col rounded-2xl border p-6 shadow-card ${
            card.featured
              ? "border-accent-600 bg-accent-50 ring-1 ring-accent-600"
              : "border-border bg-white"
          }`}
        >
          <div className="flex items-center gap-2">
            {card.featured && <Crown className="h-5 w-5 text-accent-600" />}
            <h3 className="text-lg font-bold text-foreground">{card.title}</h3>
          </div>
          {card.subtitle && (
            <p className="mt-1 text-sm text-gray-500">({card.subtitle})</p>
          )}

          <ul className="mt-4 flex-1 space-y-2 text-sm text-gray-600">
            {card.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-border pt-4">
            <p className="text-sm text-gray-400 line-through">{card.originalPrice}</p>
            <p
              className={`text-2xl font-extrabold ${
                card.featured ? "text-accent-600" : "text-foreground"
              }`}
            >
              {card.salePrice}
            </p>
            <p className="mt-1 text-xs text-gray-400">VAT포함</p>
          </div>
        </div>
      ))}
    </div>
  );
}
