"use server";

import { createClient } from "@/lib/supabase/server";

export interface ReservationFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function createReservation(
  _prevState: ReservationFormState,
  formData: FormData,
): Promise<ReservationFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const buildType = String(formData.get("buildType") ?? "").trim();
  const industry = String(formData.get("industry") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const preferredDate = String(formData.get("preferredDate") ?? "").trim();
  const preferredTime = String(formData.get("preferredTime") ?? "").trim();
  const consent = formData.get("consent");

  if (!name || !phone || !buildType || !preferredDate || !preferredTime) {
    return { status: "error", message: "필수 항목을 모두 입력해주세요." };
  }
  if (!consent) {
    return { status: "error", message: "개인정보 수집 및 상담 동의가 필요합니다." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("reservations").insert({
    name,
    phone,
    build_type: buildType,
    industry: industry || null,
    notes: notes || null,
    preferred_date: preferredDate,
    preferred_time: preferredTime,
  });

  if (error) {
    return {
      status: "error",
      message: "예약 접수에 실패했습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  return {
    status: "success",
    message: "예약 신청이 접수되었습니다. 빠르게 연락드리겠습니다.",
  };
}
