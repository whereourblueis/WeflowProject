"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { LogOut, Menu, RefreshCw, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { downloadCsv } from "@/lib/csv";
import { STATUS_FILTERS, type AdminRow, type RequestStatus, type StatusFilter } from "@/lib/data/admin";
import { logout } from "./actions";
import RequestTable from "./RequestTable";

type Table = "reservations" | "inquiries";
type Tab = "overview" | "reservations" | "inquiries";

const NAV_ITEMS: { key: Tab; label: string }[] = [
  { key: "overview", label: "전체 현황" },
  { key: "reservations", label: "예약 관리" },
  { key: "inquiries", label: "문의 관리" },
];

function StatCard({ label, value, color }: { label: string; value: number; color: "blue" | "green" }) {
  const valueColor = color === "blue" ? "text-accent-600" : "text-green-700";
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-card">
      <p className="text-xs font-semibold text-gray-400">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${valueColor}`}>{value}건</p>
    </div>
  );
}

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
  email: string;
  initialReservations: AdminRow[];
  initialInquiries: AdminRow[];
}

export default function AdminDashboard({
  email,
  initialReservations,
  initialInquiries,
}: AdminDashboardProps) {
  const supabase = useMemo(() => createClient(), []);
  const [reservations, setReservations] = useState<AdminRow[]>(initialReservations);
  const [inquiries, setInquiries] = useState<AdminRow[]>(initialInquiries);
  const [filter, setFilter] = useState<StatusFilter>("전체");
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const pendingReservations = reservations.filter((row) => row.status === "대기").length;
  const pendingInquiries = inquiries.filter((row) => row.status === "대기").length;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 xl:flex-row">
      <aside className="flex flex-col border-b border-gray-200 bg-white xl:sticky xl:top-0 xl:h-screen xl:w-60 xl:shrink-0 xl:gap-8 xl:border-b-0 xl:border-r xl:px-5 xl:py-6">
        <div className="flex items-center justify-between gap-4 px-4 py-4 xl:px-0 xl:py-0">
          <div>
            <h1 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <Image src="/logo.png" alt="WEFLOW" width={28} height={28} className="h-7 w-7" />
              WEFLOW
            </h1>
            <p className="mt-1 truncate text-xs text-gray-400">{email}</p>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="cursor-pointer text-gray-500 transition-colors hover:text-gray-900 xl:hidden"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 xl:hidden"
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        <div
          className={`${
            mobileMenuOpen ? "relative z-50 flex" : "hidden"
          } flex-col gap-4 border-t border-gray-100 px-4 py-4 xl:flex xl:relative xl:z-auto xl:flex-1 xl:gap-8 xl:border-t-0 xl:px-0 xl:py-0`}
        >
          <nav className="flex gap-1.5 overflow-x-auto xl:flex-col xl:gap-1 xl:overflow-visible">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  setMobileMenuOpen(false);
                }}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors xl:w-full xl:rounded-xl xl:text-left ${
                  activeTab === item.key
                    ? "bg-accent-600 text-white"
                    : "text-gray-500 hover:bg-accent-50 hover:text-accent-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <form action={logout} className="xl:mt-auto">
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
              로그아웃
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 px-4 py-8 xl:px-8 xl:py-10">
        <div className="mx-auto w-full max-w-6xl space-y-12">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {NAV_ITEMS.find((item) => item.key === activeTab)?.label}
            </h2>
            <div
              className={`mt-4 grid grid-cols-2 gap-3 ${
                activeTab === "overview" ? "sm:grid-cols-4" : "sm:max-w-md"
              }`}
            >
              {activeTab !== "inquiries" && (
                <>
                  <StatCard label="전체 예약" value={reservations.length} color="blue" />
                  <StatCard label="대기중 예약" value={pendingReservations} color="green" />
                </>
              )}
              {activeTab !== "reservations" && (
                <>
                  <StatCard label="전체 문의" value={inquiries.length} color="blue" />
                  <StatCard label="대기중 문의" value={pendingInquiries} color="green" />
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {STATUS_FILTERS.map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`cursor-pointer rounded-full border border-gray-200 px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                    filter === status ? "bg-accent-600 text-white" : "bg-white text-gray-500 hover:text-accent-600"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <button
              onClick={load}
              disabled={loading}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-gray-600 transition-colors hover:border-accent-600 hover:text-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              새로고침
            </button>
          </div>

          {activeTab !== "inquiries" && (
            <RequestTable
              title={activeTab === "overview" ? "예약 관리" : undefined}
              rows={filterRows(reservations)}
              showSchedule
              onStatusChange={(id, status) => updateStatus("reservations", id, status)}
              onDelete={(id) => remove("reservations", id)}
              onExport={() => exportRows("reservations.csv", filterRows(reservations), true)}
            />
          )}

          {activeTab !== "reservations" && (
            <RequestTable
              title={activeTab === "overview" ? "문의 관리" : undefined}
              rows={filterRows(inquiries)}
              onStatusChange={(id, status) => updateStatus("inquiries", id, status)}
              onDelete={(id) => remove("inquiries", id)}
              onExport={() => exportRows("inquiries.csv", filterRows(inquiries), false)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
