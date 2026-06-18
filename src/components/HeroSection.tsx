"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Sparkles, Rocket, Wallet } from "lucide-react";

const HERO_BADGES = [
  { icon: Sparkles, title: "케어 플랜", desc: "제작·광고·운영" },
  { icon: Rocket, title: "빠른제작", desc: "3일~7일" },
  { icon: Wallet, title: "합리적 비용", desc: "가성비+퀄리티" },
];

const FULL_TEXT = "문의로 이어지는\n홈페이지를 만듭니다";

export default function HeroSection() {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const renderedLines = displayed.split("\n");

  return (
    <section className="bg-gradient-to-b from-accent-50 to-background px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="text-center lg:text-left">
            <p className="text-sm font-medium text-accent-700 sm:text-base">
              랜딩&홈페이지 제작 · 광고 운영 · 검색 상단 노출 · 맞춤형 웹 솔루션
            </p>

            <h1 className="relative mt-4 break-keep text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
              <span className="invisible" aria-hidden="true">
                문의로 이어지는<br />홈페이지를 만듭니다
              </span>
              <span className="absolute inset-0">
                {renderedLines.map((line, idx, arr) => (
                  <Fragment key={idx}>
                    {line}
                    {idx < arr.length - 1 && <br />}
                  </Fragment>
                ))}
                {!done && (
                  <span className="ml-1 inline-block h-[0.85em] w-0.5 animate-pulse bg-foreground align-middle" />
                )}
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base lg:mx-0">
              홈페이지 제작부터 광고 연동·운영 관리까지
              <br />
              단순 제작이 아닌 문의 구조까지 설계합니다
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href="/diagnosis"
                className="badge-shimmer rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-600/30 sm:text-base"
              >
                무료 진단 신청
              </Link>
              <Link
                href="/cases"
                className="rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-600/30 transition-colors hover:bg-accent-700 sm:text-base"
              >
                성공 사례 보기
              </Link>
              <Link
                href="/landing"
                className="rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-600/30 transition-colors hover:bg-accent-700 sm:text-base"
              >
                WEFLOW 랜딩 페이지
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-stretch justify-center gap-3 lg:justify-start">
              {HERO_BADGES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex w-36 flex-col items-center gap-2 rounded-xl border border-border bg-white px-4 py-5 shadow-card transition-colors hover:border-accent-600"
                >
                  <Icon className="h-6 w-6 text-accent-600" />
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-float relative hidden lg:block">
            <Image src="/main_icon.png" alt="WEFLOW" fill priority sizes="420px" className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}
