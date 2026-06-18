import { Check, Crown } from "lucide-react";
import type { PricingCard } from "@/lib/data/pricing";

export default function PricingCardGrid({ cards }: { cards: PricingCard[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const hoverBorderClass = card.title.includes("네이버")
          ? "hover:border-[#03C75A]"
          : card.title.includes("당근")
          ? "hover:border-[#FF8A3D]"
          : "hover:border-accent-600";

        return (
          <div
            key={card.title}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover ${hoverBorderClass} ${
              card.featured
                ? "border-accent-600 bg-gradient-to-b from-accent-50 to-white"
                : "border-border bg-white"
            }`}
          >
            {card.featured && (
              <div className="bg-gradient-to-r from-accent-600 to-accent-500 px-6 py-3">
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-white transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
                  <span className="text-xs font-bold tracking-widest text-white/90">인기 추천</span>
                </div>
              </div>
            )}

            <div className={`flex flex-1 flex-col p-6 ${card.featured ? "pt-5" : ""}`}>
              <h3 className={`text-lg font-bold ${card.featured ? "text-accent-700" : "text-foreground"}`}>
                {card.title}
              </h3>
              {card.subtitle && (
                <p className="mt-1 text-sm text-gray-500">({card.subtitle})</p>
              )}

              <ul className="mt-4 flex-1 space-y-2 text-sm text-gray-600">
                {card.features.map((feature) => {
                  const match = feature.match(/^(.+?)\s(\(.*→.*\))$/);
                  return (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                      {match ? (
                        <span>
                          {match[1]}
                          <span className="mt-0.5 block whitespace-nowrap text-xs text-gray-400">
                            {match[2]}
                          </span>
                        </span>
                      ) : (
                        <span>{feature}</span>
                      )}
                    </li>
                  );
                })}
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
          </div>
        );
      })}
    </div>
  );
}
