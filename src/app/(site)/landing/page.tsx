import type { Metadata } from "next";
import Link from "next/link";
import { Rocket, Wallet, Headset, LifeBuoy, Megaphone, Check, ArrowRight } from "lucide-react";
import DiagnosisForm from "../diagnosis/DiagnosisForm";
import ProcessSteps from "@/components/ProcessSteps";
import PricingCardGrid from "@/components/PricingCardGrid";
import ReviewMarquee from "@/components/ReviewMarquee";
import { AD_PLANS, BUILD_PLANS, CARE_PLANS } from "@/lib/data/pricing";

export const metadata: Metadata = {
  title: "WEFLOW 랜딩 페이지",
};

const FEATURES = [
  {
    icon: Rocket,
    title: "빠른 제작 진행",
    lines: ["랜딩페이지 3~4일, 홈페이지 약 1주일.", "빠르게 제작하고 빠르게 운영 시작합니다."],
  },
  {
    icon: Wallet,
    title: "합리적인 비용",
    lines: ["불필요한 비용 없이 필요한 기능만 구성하여", "가성비 + 실속 + 퀄리티를 함께 제공합니다."],
  },
  {
    icon: Headset,
    title: "24시간 상담 가능",
    lines: ["정해진 시간만 기다리지 마세요.", "문의가 생길 때 언제든 빠른 상담 및 피드백 가능합니다."],
  },
  {
    icon: LifeBuoy,
    title: "제작 후 운영 관리",
    lines: ["홈페이지 만들고 끝이 아닙니다.", "검색 등록, 수정, 유지보수, 운영 관리까지 함께합니다."],
  },
];

const AD_CHECKLIST = [
  "문의 증가 구조 설계",
  "업종별 고객 흐름 분석",
  "상담 버튼 위치 최적화",
  "모바일 문의 동선 구성",
];

const DIAGNOSIS_CHECKLIST = ["문의 구조 진단", "디자인 점검", "검색 노출 분석", "문의 개선 제안"];

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:grid lg:grid-cols-3 lg:gap-8">
      <div className="lg:col-span-2">
        <section className="rounded-2xl bg-gradient-to-b from-accent-50 to-background p-8 text-center sm:p-12 lg:text-left">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
            문의로 이어지는
            <br />
            홈페이지를 만듭니다
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-500 sm:text-base">
            기획부터 제작, 광고 연동, 운영 관리까지 WEFLOW가 함께합니다.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link
              href="/diagnosis"
              className="rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-600/30 transition-colors hover:bg-accent-700 sm:text-base"
            >
              무료 진단 후 견적받기 →
            </Link>
            <Link
              href="/cases"
              className="rounded-full border border-accent-600 px-6 py-3 text-sm font-semibold text-accent-600 transition-colors hover:bg-accent-50 sm:text-base"
            >
              실제 제작 성공 보기 →
            </Link>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">WEFLOW CARE PLAN</h2>
          <p className="mt-2 text-sm text-gray-500">제작부터 운영 · 광고 · 관리까지 한 번에</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, lines }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-white p-6 shadow-card"
              >
                <Icon className="h-6 w-6 text-accent-600" />
                <h3 className="mt-3 text-lg font-bold text-foreground">{title}</h3>
                {lines.map((line) => (
                  <p key={line} className="mt-1 text-sm text-gray-500">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-accent-100 bg-accent-50 p-6 sm:p-8">
            <Megaphone className="h-6 w-6 text-accent-600" />
            <h3 className="mt-3 text-lg font-bold text-foreground">광고 연동 지원</h3>
            <p className="mt-1 text-sm text-gray-600">
              홈페이지 + 랜딩페이지 + 광고 한 번에 연결하여 문의가 들어오는 구조를 만듭니다.
            </p>
            <p className="mt-3 text-xs font-medium text-accent-600">
              인스타, 스레드, 블로그, 카카오톡, 당근 플레이스 등
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              사람들은 검색하고 비교한 뒤 문의합니다.
              <br />
              홈페이지만 필요한 시대는 지났습니다.
              <br />
              어디에 맡길지, 광고는 어떻게 해야 할지 고민되셨나요?
            </p>
            <p className="mt-4 text-sm font-semibold text-foreground">
              WEFLOW는 랜딩페이지 + 홈페이지 + 광고 + 사후관리까지 저렴한 비용과 높은 퀄리티로 한
              번에 해결합니다.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {AD_CHECKLIST.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-medium text-gray-700"
                >
                  <Check className="h-3.5 w-3.5 shrink-0 text-accent-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">제작플랜&가격안내</h2>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-foreground sm:text-2xl">WEFLOW 제작 플랜</h3>
            <p className="mt-1 text-sm text-gray-500">필수 선택형 (3중 택1)</p>
            <div className="mt-6">
              <PricingCardGrid cards={BUILD_PLANS} />
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold text-foreground sm:text-2xl">WEFLOW 케어 플랜</h3>
            <p className="mt-1 text-sm text-gray-500">필수 선택형 (3중 택1)</p>
            <div className="mt-6">
              <PricingCardGrid cards={CARE_PLANS} />
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold text-foreground sm:text-2xl">WEFLOW 광고 세팅</h3>
            <div className="mt-6">
              <PricingCardGrid cards={AD_PLANS} />
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">제작진행과정</h2>
          <div className="mt-8">
            <ProcessSteps variant="cards" />
          </div>
        </section>

        <section className="mt-16 rounded-2xl bg-accent-50 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            무료진단에서 이런 걸 확인해드립니다
          </h2>
          <div className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {DIAGNOSIS_CHECKLIST.map((item) => (
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
            무료진단 후 견적받기 <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">고객 후기</h2>
          <div className="mt-6">
            <ReviewMarquee />
          </div>
        </section>
      </div>

      <aside className="mt-16 lg:mt-0">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-foreground">무료진단 받기</h2>
          <p className="mt-1 text-sm text-gray-500">
            정보를 남겨주시면 빠르게 견적을 안내해드립니다.
          </p>
          <div className="mt-6">
            <DiagnosisForm />
          </div>
        </div>
      </aside>
    </div>
  );
}
