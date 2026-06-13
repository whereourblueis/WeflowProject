import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CaseCard from "@/components/CaseCard";
import { CASES_PREVIEW } from "@/lib/data/cases";

export default function CasesPreview() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="flex flex-col justify-between rounded-2xl bg-accent-600 p-8 text-white">
        <div>
          <h3 className="break-keep text-xl font-bold sm:text-2xl">
            다양한 업종의 성공 사례를 확인 하세요.
          </h3>
          <p className="mt-3 break-keep text-sm text-accent-100">
            어디서도 볼 수 없는 업종별 전환 최적화 사례를 직접 확인하세요.
          </p>
        </div>
        <Link
          href="/diagnosis"
          className="mt-6 inline-flex w-fit items-center gap-1 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-accent-600 transition-colors hover:bg-accent-50"
        >
          살펴보기 <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="lg:col-span-2">
        <div className="mb-3 flex justify-end">
          <Link
            href="/cases"
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-accent-600"
          >
            더보기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {CASES_PREVIEW.map((industry) => (
            <CaseCard key={industry} industry={industry} href="/cases" />
          ))}
        </div>
      </div>
    </div>
  );
}
