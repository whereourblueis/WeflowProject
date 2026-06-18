"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { CalendarDays, Clock } from "lucide-react";
import { createReservation, type ReservationFormState } from "./actions";
import { BUILD_TYPE_OPTIONS, generateTimeSlots } from "@/lib/data/forms";
import { FieldLabel, clearFormValidity, handleFormInvalid, inputClass } from "@/components/form/fields";
import InlineCalendar from "@/components/InlineCalendar";

const initialState: ReservationFormState = { status: "idle" };
const TIME_SLOTS = generateTimeSlots();

function toDateString(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full cursor-pointer rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-600/30 transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "전송 중..." : "예약 신청하기"}
    </button>
  );
}

export default function ReservationForm() {
  const [resetKey, setResetKey] = useState(0);
  return <ReservationFormFields key={resetKey} onReset={() => setResetKey((key) => key + 1)} />;
}

function ReservationFormFields({ onReset }: { onReset: () => void }) {
  const [state, formAction] = useActionState(createReservation, initialState);
  const [now] = useState(() => new Date());
  const today = toDateString(now);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customTime, setCustomTime] = useState("");

  const preferredTime = customTime.trim() || selectedTime || "";

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-accent-100 bg-accent-50 p-8 text-center">
        <p className="text-lg font-semibold text-accent-700">{state.message}</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="cursor-pointer rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-600/30 transition-colors hover:bg-accent-700"
          >
            메인으로
          </Link>
          <button
            type="button"
            onClick={onReset}
            className="cursor-pointer rounded-full border border-accent-600 px-6 py-3 text-sm font-semibold text-accent-600 transition-colors hover:bg-accent-50"
          >
            다시 예약하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      onInvalidCapture={handleFormInvalid}
      onInputCapture={clearFormValidity}
      onChangeCapture={clearFormValidity}
    >
      <input type="hidden" name="preferredDate" value={selectedDate} />
      <input type="hidden" name="preferredTime" value={preferredTime} />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 왼쪽: 날짜 + 시간 */}
        <div className="space-y-4">
          {/* 달력 카드 */}
          <div className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-600">
              <CalendarDays className="h-4 w-4 text-accent-600" />
              날짜 선택
            </p>
            <div className="mt-3">
              <InlineCalendar
                value={selectedDate}
                min={today}
                onChange={(date) => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                }}
                className="w-full"
              />
            </div>
          </div>

          {/* 시간 카드 */}
          <div className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-600">
              <Clock className="h-4 w-4 text-accent-600" />
              시간대 선택
            </p>
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
              {TIME_SLOTS.map((slot) => {
                const disabled = selectedDate === today && toMinutes(slot) < nowMinutes;
                const selected = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      setSelectedTime(slot);
                      setCustomTime("");
                    }}
                    className={`rounded-lg border px-2 py-2 text-sm font-medium transition-colors ${
                      selected
                        ? "cursor-pointer border-accent-600 bg-accent-600 text-white"
                        : disabled
                          ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300"
                          : "cursor-pointer border-border bg-white text-gray-700 hover:border-accent-600 hover:text-accent-600"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
            <div className="mt-4">
              <p className="mb-1.5 text-xs text-gray-500">원하시는 시간 (직접 입력)</p>
              <input
                type="text"
                value={customTime}
                onChange={(e) => {
                  setCustomTime(e.target.value);
                  if (e.target.value) setSelectedTime(null);
                }}
                placeholder="예: 19:00"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* 오른쪽: 정보 입력 카드 */}
        <div className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-card">
          <h2 className="text-lg font-bold text-foreground">예약 정보 입력</h2>
          <p className="mt-1 text-sm text-gray-400">왼쪽에서 날짜와 시간을 먼저 선택해주세요.</p>

          <div className="mt-5 flex flex-1 flex-col gap-5">
            <div>
              <FieldLabel required>이름</FieldLabel>
              <input name="name" type="text" required className={inputClass} placeholder="홍길동" />
            </div>

            <div>
              <FieldLabel required>연락처</FieldLabel>
              <input name="phone" type="tel" required className={inputClass} placeholder="010-0000-0000" />
            </div>

            <div>
              <FieldLabel required>제작종류</FieldLabel>
              <select name="buildType" required defaultValue="" className={inputClass}>
                <option value="" disabled>선택해주세요</option>
                {BUILD_TYPE_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <FieldLabel>업종</FieldLabel>
              <input
                name="industry"
                type="text"
                className={inputClass}
                placeholder="예: PT샵, 필라테스, 카페 등"
              />
            </div>

            <div>
              <FieldLabel>추가요청사항</FieldLabel>
              <textarea
                name="notes"
                rows={5}
                className={inputClass}
                placeholder="원하시는 내용을 자유롭게 적어주세요."
              />
            </div>

            <label className="flex cursor-pointer items-start gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-accent-600 focus:ring-accent-600"
              />
              개인정보 수집 및 상담 이용에 동의합니다.
            </label>

            <div className="mt-auto flex flex-col gap-3">
              {state.status === "error" && (
                <p className="text-sm font-medium text-red-600">{state.message}</p>
              )}
              <SubmitButton />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
