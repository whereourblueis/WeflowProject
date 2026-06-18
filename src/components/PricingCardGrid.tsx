import Link from "next/link";
import { ArrowRight, Check, Crown } from "lucide-react";
import type { PricingCard } from "@/lib/data/pricing";

export default function PricingCardGrid({ cards }: { cards: PricingCard[] }) {
  return (
    <div className="grid gap-6 pb-5 pt-8 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const hoverBorderClass = card.title.includes("네이버")
          ? "hover:border-[#03C75A]"
          : card.title.includes("당근")
          ? "hover:border-[#FF8A3D]"
          : "hover:border-accent-600";

        const buttonClass = card.title.includes("네이버")
          ? "border-[#03C75A] text-[#03C75A] hover:bg-[#03C75A] hover:text-white"
          : card.title.includes("당근")
          ? "border-[#FF8A3D] text-[#FF8A3D] hover:bg-[#FF8A3D] hover:text-white"
          : "border-accent-600 text-accent-600 hover:bg-accent-600 hover:text-white";

        return (
          <div
            key={card.title}
            className={`group relative flex flex-col rounded-2xl border transition-all hover:-translate-y-1 ${hoverBorderClass} ${
              card.featured
                ? "border-accent-500 bg-white shadow-xl shadow-accent-600/20 ring-1 ring-accent-400/40 lg:z-10 lg:scale-105"
                : "border-border bg-white shadow-card hover:shadow-card-hover"
            }`}
          >
            {card.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="badge-shimmer inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-accent-600/40">
                  <Crown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
                  BEST
                </span>
              </div>
            )}

            <div className={`flex flex-1 flex-col p-6 ${card.featured ? "pt-8" : ""}`}>
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

              <Link
                href="/reservation"
                className={`mt-5 block rounded-full py-3 text-center text-sm font-semibold transition-colors ${
                  card.featured
                    ? "bg-accent-600 text-white shadow-lg shadow-accent-600/30 hover:bg-accent-700"
                    : `border ${buttonClass}`
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  신청하기 <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
