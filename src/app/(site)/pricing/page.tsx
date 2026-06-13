import type { Metadata } from "next";
import PricingCardGrid from "@/components/PricingCardGrid";
import { AD_PLANS, BUILD_PLANS, CARE_PLANS, PRICING_NOTES } from "@/lib/data/pricing";

export const metadata: Metadata = {
  title: "제작플랜&가격안내 | WEFLOW",
};

export default function PricingPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">제작플랜&가격안내</h1>
        <p className="mt-2 text-sm text-gray-500">
          홈페이지 · 랜딩페이지 제작부터 운영 케어, 광고 세팅까지 한눈에 확인하세요.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">제작 플랜</h2>
        <p className="mt-1 text-sm text-gray-500">필수 선택형 (3중 택1)</p>
        <div className="mt-6">
          <PricingCardGrid cards={BUILD_PLANS} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">WEFLOW 케어플랜</h2>
        <p className="mt-1 text-sm text-gray-500">필수 선택형 (3중 택1)</p>
        <div className="mt-6">
          <PricingCardGrid cards={CARE_PLANS} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">광고 세팅</h2>
        <div className="mt-6">
          <PricingCardGrid cards={AD_PLANS} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <ul className="space-y-2 rounded-2xl border border-border bg-accent-50 p-6 text-xs leading-relaxed text-gray-500">
          {PRICING_NOTES.map((note) => (
            <li key={note}>· {note}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
