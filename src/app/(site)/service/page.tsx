import type { Metadata } from "next";
import ProcessSteps from "@/components/ProcessSteps";

export const metadata: Metadata = {
  title: "서비스 | WEFLOW",
};

const MARKETING_COLUMNS = [
  {
    emoji: "✍️",
    title: "콘텐츠 마케팅",
    items: ["블로그 업로드", "인스타 업로드", "스레드 업로드"],
  },
  {
    emoji: "🎯",
    title: "키워드 타겟팅",
    items: ["네이버 키워드 업로드", "당근플레이스 키워드 업로드"],
  },
  {
    emoji: "🔍",
    title: "SEO 최적화",
    items: ["네이버 서치어드바이저 상단등록", "구글 콘솔 상단등록", "사이트맵 등록"],
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

        <div className="mt-10 grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {MARKETING_COLUMNS.map((col) => (
            <div key={col.title} className="py-8 sm:px-10 sm:py-0 first:sm:pl-0 last:sm:pr-0">
              <p className="text-lg font-bold text-foreground">
                {col.emoji} {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="text-sm text-gray-500">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
