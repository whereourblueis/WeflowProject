"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
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
      className="w-full rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-600/30 transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
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
            className="cursor-pointer rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-600/30 transition-colors hover:bg-accent-700 sm:text-base"
          >
            메인으로
          </Link>
          <button
            type="button"
            onClick={onReset}
            className="cursor-pointer rounded-full border border-accent-600 px-6 py-3 text-sm font-semibold text-accent-600 transition-colors hover:bg-accent-50 sm:text-base"
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
      className="space-y-8"
    >
      <div>
        <FieldLabel required>날짜 선택</FieldLabel>
        <div className="mt-1.5">
          <InlineCalendar
            value={selectedDate}
            min={today}
            onChange={(date) => {
              setSelectedDate(date);
              setSelectedTime(null);
            }}
          />
        </div>
        {selectedDate && (
          <p className="mt-2 text-sm font-medium text-accent-600">
            선택됨: {selectedDate}
          </p>
        )}
      </div>

      <div>
        <FieldLabel required>시간 선택</FieldLabel>
        <div className="mt-1.5 grid grid-cols-4 gap-2 sm:grid-cols-5">
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
                    ? "border-accent-600 bg-accent-600 text-white"
                    : disabled
                      ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300"
                      : "border-border bg-white text-gray-700 hover:border-accent-600 hover:text-accent-600"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          <FieldLabel>원하시는 시간대 (직접 입력)</FieldLabel>
          <input
            type="text"
            value={customTime}
            onChange={(e) => {
              setCustomTime(e.target.value);
              if (e.target.value) setSelectedTime(null);
            }}
            placeholder="예: 19:00 이후 희망"
            className={`${inputClass} sm:max-w-xs`}
          />
        </div>
      </div>

      <input type="hidden" name="preferredDate" value={selectedDate} />
      <input type="hidden" name="preferredTime" value={preferredTime} />

      <div>
        <FieldLabel required>이름</FieldLabel>
        <input name="name" type="text" required className={inputClass} placeholder="홍길동" />
      </div>

      <div>
        <FieldLabel required>연락처</FieldLabel>
        <input
          name="phone"
          type="tel"
          required
          className={inputClass}
          placeholder="010-0000-0000"
        />
      </div>

      <div>
        <FieldLabel required>제작종류</FieldLabel>
        <select name="buildType" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            선택해주세요
          </option>
          {BUILD_TYPE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <FieldLabel>업종</FieldLabel>
        <input
          name="industry"
          type="text"
          className={inputClass}
          placeholder="예: 필라테스, 카페, 공인중개사 등"
        />
      </div>

      <div>
        <FieldLabel>추가요청사항</FieldLabel>
        <textarea
          name="notes"
          rows={4}
          className={inputClass}
          placeholder="추가로 전달하고 싶은 내용을 입력해주세요"
        />
      </div>

      <label className="flex items-start gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-accent-600 focus:ring-accent-600"
        />
        개인정보 수집 및 상담 동의
      </label>

      {state.status === "error" && (
        <p className="text-sm font-medium text-red-600">{state.message}</p>
      )}

      <SubmitButton />
    </form>
  );
}
