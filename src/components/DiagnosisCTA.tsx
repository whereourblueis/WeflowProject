import Link from "next/link";
import { Check } from "lucide-react";

const CHECK_ITEMS = ["문의 구조 진단", "디자인 점검", "검색 노출 분석", "문의 개선 제안"];

export default function DiagnosisCTA() {
  return (
    <div className="rounded-2xl bg-accent-50 p-8 text-center sm:p-12">
      <h2 className="text-2xl font-bold text-foreground sm:text-3xl">무료진단 받기</h2>
      <p className="mt-3 text-sm text-gray-500 sm:text-base">
        지금 바로 무료 진단받고, 사이트의 숨겨진 잠재력을 발견하세요.
      </p>

      <div className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
        {CHECK_ITEMS.map((item) => (
          <div
            key={item}
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-3 py-3 text-sm font-medium text-gray-700"
          >
            <Check className="h-4 w-4 shrink-0 text-accent-600" />
            {item}
          </div>
        ))}
      </div>

      <Link
        href="/diagnosis"
        className="mt-8 inline-flex items-center gap-1 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-600/30 transition-colors hover:bg-accent-700 sm:text-base"
      >
        무료진단 후 견적 받기
      </Link>
    </div>
  );
}
