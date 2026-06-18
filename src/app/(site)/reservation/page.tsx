import type { Metadata } from "next";
import ReservationForm from "./ReservationForm";

export const metadata: Metadata = {
  title: "예약 | WEFLOW",
};

export default function ReservationPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">예약</h1>
      <p className="mt-2 text-sm text-gray-500">
        희망 날짜와 시간을 선택하고 정보를 남겨주시면 상담 일정을 확정해드립니다.
      </p>
      <div className="mt-8">
        <ReservationForm />
      </div>
    </section>
  );
}
