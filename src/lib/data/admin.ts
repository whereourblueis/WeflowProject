export type RequestStatus = "대기" | "진행중" | "완료";

export interface AdminRow {
  id: string;
  status: RequestStatus;
  name: string;
  phone: string;
  build_type: string;
  industry: string | null;
  notes: string | null;
  created_at: string;
  preferred_date?: string;
  preferred_time?: string;
}

export const STATUS_FILTERS = ["전체", "대기", "진행중", "완료"] as const;
export type StatusFilter = (typeof STATUS_FILTERS)[number];
