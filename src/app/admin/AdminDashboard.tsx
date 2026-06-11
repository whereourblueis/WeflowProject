"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { downloadCsv } from "@/lib/csv";
import { STATUS_FILTERS, type AdminRow, type RequestStatus, type StatusFilter } from "@/lib/data/admin";
import RequestTable from "./RequestTable";

type Table = "reservations" | "inquiries";

function exportRows(filename: string, rows: AdminRow[], includeSchedule: boolean) {
  const headers = includeSchedule
    ? ["상태", "이름", "연락처", "제작종류", "업종", "희망일", "희망시간", "추가요청사항", "접수일"]
    : ["상태", "이름", "연락처", "제작종류", "업종", "추가요청사항", "접수일"];

  const data = rows.map((row) =>
    includeSchedule
      ? [
          row.status,
          row.name,
          row.phone,
          row.build_type,
          row.industry,
          row.preferred_date,
          row.preferred_time,
          row.notes,
          row.created_at,
        ]
      : [row.status, row.name, row.phone, row.build_type, row.industry, row.notes, row.created_at],
  );

  downloadCsv(filename, headers, data);
}

interface AdminDashboardProps {
  initialReservations: AdminRow[];
  initialInquiries: AdminRow[];
}

export default function AdminDashboard({
  initialReservations,
  initialInquiries,
}: AdminDashboardProps) {
  const supabase = useMemo(() => createClient(), []);
  const [reservations, setReservations] = useState<AdminRow[]>(initialReservations);
  const [inquiries, setInquiries] = useState<AdminRow[]>(initialInquiries);
  const [filter, setFilter] = useState<StatusFilter>("전체");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: r }, { data: i }] = await Promise.all([
      supabase.from("reservations").select("*").order("created_at", { ascending: false }),
      supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
    ]);
    setReservations((r as AdminRow[] | null) ?? []);
    setInquiries((i as AdminRow[] | null) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    const channel = supabase
      .channel("admin-dashboard")
      .on("postgres_changes", { event: "*", schema: "public", table: "reservations" }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "inquiries" }, load)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [load, supabase]);

  const updateStatus = useCallback(
    async (table: Table, id: string, status: RequestStatus) => {
      await supabase.from(table).update({ status }).eq("id", id);
      load();
    },
    [supabase, load],
  );

  const remove = useCallback(
    async (table: Table, id: string) => {
      await supabase.from(table).delete().eq("id", id);
      load();
    },
    [supabase, load],
  );

  const filterRows = (rows: AdminRow[]) =>
    filter === "전체" ? rows : rows.filter((row) => row.status === filter);

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-full border border-gray-200 px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                filter === status ? "bg-blue-600 text-white" : "bg-white text-gray-500 hover:text-blue-600"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-gray-600 transition-colors hover:border-blue-600 hover:text-blue-600 disabled:opacity-60"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          새로고침
        </button>
      </div>

      <RequestTable
        title="예약 관리"
        rows={filterRows(reservations)}
        showSchedule
        onStatusChange={(id, status) => updateStatus("reservations", id, status)}
        onDelete={(id) => remove("reservations", id)}
        onExport={() => exportRows("reservations.csv", filterRows(reservations), true)}
      />

      <RequestTable
        title="문의 관리"
        rows={filterRows(inquiries)}
        onStatusChange={(id, status) => updateStatus("inquiries", id, status)}
        onDelete={(id) => remove("inquiries", id)}
        onExport={() => exportRows("inquiries.csv", filterRows(inquiries), false)}
      />
    </div>
  );
}
