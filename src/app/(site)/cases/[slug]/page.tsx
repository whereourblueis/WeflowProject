import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, MapPin, Phone, Star } from "lucide-react";
import { CASE_INDUSTRIES, caseImagePath, caseSlug, industryBySlug } from "@/lib/data/cases";
import { REVIEWS } from "@/lib/data/reviews";

const SERVICE_FEATURES = [
  { title: "1:1 맞춤 상담", desc: "고객의 상황에 맞는 맞춤형 상담을 제공합니다." },
  { title: "전문 서비스", desc: "검증된 노하우와 시스템으로 만족도 높은 결과를 제공합니다." },
  { title: "체계적인 관리", desc: "이용 후에도 꾸준한 관리와 피드백으로 챙겨드립니다." },
];

const PRICE_TIERS = [
  { name: "베이직", price: "₩50,000~", desc: "처음 이용하시는 분들을 위한 기본 패키지" },
  { name: "스탠다드", price: "₩120,000~", desc: "가장 많이 찾는 표준 패키지" },
  { name: "프리미엄", price: "₩250,000~", desc: "1:1 집중 케어와 추가 혜택을 제공하는 패키지" },
];

export async function generateStaticParams() {
  return CASE_INDUSTRIES.map((industry) => ({ slug: caseSlug(industry) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  return { title: industry ? `${industry} 제작 사례 | WEFLOW` : "성공사례 | WEFLOW" };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) notFound();

  const reviews = REVIEWS.filter((r) => r.industry === industry);
  const pageTitle = industry.includes("홈페이지") ? industry : `${industry} 홈페이지`;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <Link
        href="/cases"
        className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-accent-600"
      >
        <ArrowLeft className="h-4 w-4" /> 성공사례 목록
      </Link>

      <p className="mt-6 text-sm font-medium text-accent-600">WEFLOW 제작 예시</p>
      <h1 className="mt-2 max-w-2xl break-keep text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
        {pageTitle} 제작 사례
      </h1>
      <p className="mt-3 max-w-xl break-keep text-sm leading-relaxed text-gray-500 sm:text-base">
        WEFLOW가 {industry} 업종에 맞춰 제작한 홈페이지 예시입니다.
        <br />
        실제 업체 정보가 아닌 디자인 참고용 샘플입니다.
      </p>

      {/* 예시 홈페이지 미리보기 */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-card">
        <div className="flex items-center gap-2 border-b border-border bg-gray-50 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
          <span className="ml-3 rounded-full border border-border bg-white px-3 py-1 text-xs text-gray-400">
            www.{caseSlug(industry)}.co.kr
          </span>
        </div>

        <div className="bg-white">
          {/* 가상 업체 헤더 */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4 sm:px-12">
            <span className="text-lg font-bold text-foreground">{industry}</span>
            <nav className="hidden items-center gap-6 text-sm text-gray-500 sm:flex">
              <span>홈</span>
              <span>소개</span>
              <span>서비스</span>
              <span>요금</span>
              <span>오시는길</span>
            </nav>
            <span className="rounded-full bg-accent-600 px-4 py-2 text-xs font-semibold text-white">
              예약 문의
            </span>
          </div>

          {/* 히어로 */}
          <div className="relative aspect-[16/9]">
            <Image
              src={caseImagePath(industry)}
              alt={industry}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 flex flex-col items-start justify-center bg-black/30 px-6 sm:px-12">
              <h2 className="break-keep text-2xl font-bold text-white sm:text-4xl">
                {pageTitle}
                <br />
                전문가와 함께하세요
              </h2>
              <p className="mt-2 max-w-md break-keep text-sm text-white/90 sm:text-base">
                지금 상담 신청하고 맞춤 안내를 받아보세요.
              </p>
              <span className="mt-4 rounded-full bg-white px-5 py-2 text-sm font-semibold text-foreground">
                상담 신청하기
              </span>
            </div>
          </div>

          {/* 서비스 안내 */}
          <div className="px-6 py-12 sm:px-12">
            <h3 className="text-xl font-bold text-foreground">서비스 안내</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {SERVICE_FEATURES.map((f) => (
                <div key={f.title} className="rounded-xl border border-border p-4">
                  <p className="font-semibold text-foreground">{f.title}</p>
                  <p className="mt-1 text-sm text-gray-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 요금 안내 */}
          <div className="bg-accent-50 px-6 py-12 sm:px-12">
            <h3 className="text-xl font-bold text-foreground">이용 요금</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {PRICE_TIERS.map((p) => (
                <div key={p.name} className="rounded-xl bg-white p-5 shadow-card">
                  <p className="font-semibold text-accent-600">{p.name}</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">{p.price}</p>
                  <p className="mt-1 text-sm text-gray-500">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 고객 후기 */}
          {reviews.length > 0 && (
            <div className="px-6 py-12 sm:px-12">
              <h3 className="text-xl font-bold text-foreground">고객 후기</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {reviews.map((review, i) => (
                  <div key={i} className="flex flex-col gap-2 rounded-xl border border-border p-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, star) => (
                        <Star key={star} className="h-4 w-4 fill-current" />
                      ))}
                      <span className="ml-1 text-xs font-medium text-gray-400">별다섯개!</span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700">{review.comment}</p>
                    <p className="text-xs font-medium text-gray-400">- OO {review.industry} 대표</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 가상 업체 푸터 */}
          <div className="border-t border-border px-6 py-8 text-sm text-gray-500 sm:px-12">
            <p className="font-semibold text-foreground">{industry}</p>
            <p className="mt-2 flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> 서울특별시 강남구 테헤란로 000
            </p>
            <p className="mt-1 flex items-center gap-1.5">
              <Phone className="h-4 w-4" /> 02-000-0000
            </p>
            <p className="mt-1 flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> 매일 10:00 - 22:00
            </p>
          </div>
        </div>
      </div>

      {/* WEFLOW CTA */}
      <div className="mt-10 text-center">
        <p className="break-keep text-sm text-gray-500">
          {industry}에 딱 맞는 홈페이지가 필요하신가요?
        </p>
        <Link
          href="/diagnosis"
          className="mt-4 inline-flex items-center gap-1 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-600/30 transition-colors hover:bg-accent-700 sm:text-base"
        >
          무료진단 후 견적받기 <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
