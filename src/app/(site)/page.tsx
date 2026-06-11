import Link from "next/link";
import { Sparkles, Rocket, Wallet, ArrowRight } from "lucide-react";
import CarePlanGrid from "@/components/CarePlanGrid";
import CasesPreview from "@/components/CasesPreview";
import FunnelSteps from "@/components/FunnelSteps";
import ProcessSteps from "@/components/ProcessSteps";
import DiagnosisCTA from "@/components/DiagnosisCTA";
import ReviewMarquee from "@/components/ReviewMarquee";

const HERO_BADGES = [
  {
    icon: Sparkles,
    title: "케어 플랜",
    desc: "제작·광고·운영",
  },
  {
    icon: Rocket,
    title: "빠른제작",
    desc: "3일~7일",
  },
  {
    icon: Wallet,
    title: "합리적 비용",
    desc: "가성비+퀄리티",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-16 text-center sm:py-24">
        <p className="text-sm font-medium text-blue-600 sm:text-base">
          랜딩&홈페이지 제작 · 광고 운영 · 검색 상단 노출 · 맞춤형 웹 솔루션
        </p>

        <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
          문의로 이어지는
          <br />
          홈페이지를 만듭니다
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">
          홈페이지 제작부터 광고 연동·운영 관리까지
          <br />
          단순 제작이 아닌 문의 구조까지 설계합니다
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/diagnosis"
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-colors hover:bg-blue-700 sm:text-base"
          >
            무료 진단 신청
          </Link>
          <Link
            href="/cases"
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-colors hover:bg-blue-700 sm:text-base"
          >
            성공 사례 보기
          </Link>
          <Link
            href="/landing"
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-colors hover:bg-blue-700 sm:text-base"
          >
            WEFLOW 랜딩 페이지
          </Link>
        </div>

        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-stretch justify-center gap-3">
          {HERO_BADGES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex w-40 flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-5 shadow-sm"
            >
              <Icon className="h-6 w-6 text-blue-600" />
              <p className="text-sm font-semibold text-gray-900">{title}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          WEFLOW만의 케어 플랜 혜택
        </h2>
        <div className="mt-8">
          <CarePlanGrid />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">성공사례</h2>
        <div className="mt-8">
          <CasesPreview />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">제작 진행 과정</h2>
            <div className="mt-6">
              <FunnelSteps />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              6단계 제작 프로세스
            </h2>
            <div className="mt-6">
              <ProcessSteps />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <DiagnosisCTA />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">고객 후기</h2>
          <Link
            href="/diagnosis"
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-blue-600"
          >
            후기 더보기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ReviewMarquee />
      </section>
    </div>
  );
}
