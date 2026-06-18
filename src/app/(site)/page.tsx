import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import CarePlanGrid from "@/components/CarePlanGrid";
import CasesPreview from "@/components/CasesPreview";
import FunnelSteps from "@/components/FunnelSteps";
import ProcessSteps from "@/components/ProcessSteps";
import DiagnosisCTA from "@/components/DiagnosisCTA";
import ReviewMarquee from "@/components/ReviewMarquee";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
          WEFLOW만의 케어 플랜 혜택
        </h2>
        <div className="mt-8">
          <CarePlanGrid />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          성공사례
        </h2>
        <div className="mt-8">
          <CasesPreview />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              제작 진행 과정
            </h2>
            <div className="mt-6">
              <FunnelSteps />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
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
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            고객 후기
          </h2>
          <Link
            href="/diagnosis"
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-accent-600"
          >
            후기 더보기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ReviewMarquee />
      </section>
    </>
  );
}
