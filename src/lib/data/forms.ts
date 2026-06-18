export const BUILD_TYPE_OPTIONS = [
  "랜딩페이지 제작",
  "홈페이지 제작",
  "랜딩&홈페이지 제작",
  "기타(WEFLOW 케어플랜)",
] as const;


/** 09:00 ~ 18:30, 30-minute intervals (20 slots) */
export function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let minutes = 9 * 60; minutes <= 18 * 60 + 30; minutes += 30) {
    const h = String(Math.floor(minutes / 60)).padStart(2, "0");
    const m = String(minutes % 60).padStart(2, "0");
    slots.push(`${h}:${m}`);
  }
  return slots;
}
