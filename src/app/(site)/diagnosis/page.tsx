import type { Metadata } from "next";
import DiagnosisForm from "./DiagnosisForm";

export const metadata: Metadata = {
  title: "무료진단받기 | WEFLOW",
};

export default function DiagnosisPage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">무료진단 받기</h1>
      <p className="mt-2 text-sm text-gray-500">
        이름, 연락처, 제작종류 등을 남겨주시면 빠르게 무료진단 후 견적을 안내해드립니다.
      </p>
      <div className="mt-8">
        <DiagnosisForm />
      </div>
    </section>
  );
}
