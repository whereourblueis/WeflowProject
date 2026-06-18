import type { Metadata } from "next";
import { PenLine, Camera, AtSign, Megaphone, MapPin, TrendingUp, Globe, Map, Search } from "lucide-react";
import ProcessSteps from "@/components/ProcessSteps";

export const metadata: Metadata = {
  title: "서비스 | WEFLOW",
};

const MARKETING_COLUMNS = [
  {
    label: "콘텐츠",
    icon: PenLine,
    items: [
      { icon: PenLine, label: "블로그 업로드" },
      { icon: Camera,  label: "인스타 업로드" },
      { icon: AtSign,  label: "스레드 업로드" },
    ],
  },
  {
    label: "광고",
    icon: Megaphone,
    items: [
      { icon: Megaphone, label: "네이버 키워드 광고" },
      { icon: MapPin,    label: "당근 플레이스 광고" },
    ],
  },
  {
    label: "SEO",
    icon: Search,
    items: [
      { icon: TrendingUp, label: "네이버 서치어드바이저" },
      { icon: Globe,      label: "구글 서치 콘솔" },
      { icon: Map,        label: "사이트맵 등록" },
    ],
  },
];

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
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">광고 운영 · 사후관리</h2>
        <p className="mt-2 text-sm text-gray-500">
          제작 이후에도 세 가지 축으로 채널을 꾸준히 성장시켜 드립니다.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {MARKETING_COLUMNS.map((col) => {
            const ColIcon = col.icon;
            return (
              <div key={col.label} className="flex flex-col rounded-2xl border border-border bg-white shadow-card">
                <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-100">
                    <ColIcon className="h-4 w-4 text-accent-600" />
                  </span>
                  <span className="text-base font-bold text-foreground">{col.label}</span>
                </div>
                <div className="flex flex-col divide-y divide-border border-b border-border">
                  {col.items.map(({ icon: ItemIcon, label }) => (
                    <div key={label} className="flex items-center gap-3 px-5 py-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-50">
                        <ItemIcon className="h-3.5 w-3.5 text-accent-600" />
                      </span>
                      <span className="text-sm font-medium text-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
