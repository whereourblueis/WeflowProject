import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CaseCard from "@/components/CaseCard";
import { CASE_INDUSTRIES, caseSlug } from "@/lib/data/cases";

export const metadata: Metadata = {
  title: "성공사례 | WEFLOW",
};

export default function CasesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">성공사례</h1>
      <p className="mt-2 text-sm text-gray-500">
        업종별 전환 최적화 사례를 확인하고, 우리 업종에 맞는 제작 방향을 살펴보세요.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {CASE_INDUSTRIES.map((industry) => (
          <CaseCard key={industry} industry={industry} href={`/cases/${caseSlug(industry)}`} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/diagnosis"
          className="inline-flex items-center gap-1 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-600/30 transition-colors hover:bg-accent-700 sm:text-base"
        >
          더보기 <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
