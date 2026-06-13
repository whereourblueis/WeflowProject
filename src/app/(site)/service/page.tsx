import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import ProcessSteps from "@/components/ProcessSteps";
import { AD_OPS_ITEMS } from "@/lib/data/process";

export const metadata: Metadata = {
  title: "서비스 | WEFLOW",
};

export default function ServicePage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">제작진행과정</h1>
        <p className="mt-2 text-sm text-gray-500">
          상담부터 광고운영 · 사후관리까지, WEFLOW만의 6단계 프로세스로 진행됩니다.
        </p>
        <div className="mt-8">
          <ProcessSteps variant="cards" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          광고 운영 · 사후관리 시스템
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          제작 이후에도 채널 업로드부터 검색 상단등록까지 꾸준히 관리해 드립니다.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {AD_OPS_ITEMS.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-4 text-sm font-medium text-gray-700 shadow-card"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-600" />
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
