"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { createInquiry, type InquiryFormState } from "./actions";
import { BUILD_TYPE_OPTIONS } from "@/lib/data/forms";
import { FieldLabel, clearFormValidity, handleFormInvalid, inputClass } from "@/components/form/fields";

const initialState: InquiryFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full cursor-pointer rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-600/30 transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
    >
      {pending ? "전송 중..." : "무료진단 후 견적받기"}
    </button>
  );
}

export default function DiagnosisForm() {
  const [resetKey, setResetKey] = useState(0);
  return <DiagnosisFormFields key={resetKey} onReset={() => setResetKey((key) => key + 1)} />;
}

function DiagnosisFormFields({ onReset }: { onReset: () => void }) {
  const [state, formAction] = useActionState(createInquiry, initialState);

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
            다시 신청하기
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
      className="space-y-5"
    >
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
