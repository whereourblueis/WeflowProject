"use client";

import { Fragment, useState } from "react";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import type { AdminRow, RequestStatus } from "@/lib/data/admin";

const STATUS_STYLES: Record<RequestStatus, string> = {
  대기: "bg-gray-100 text-gray-600",
  진행중: "bg-blue-100 text-blue-700",
  완료: "bg-green-100 text-green-700",
};

function formatDateTime(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

interface RequestTableProps {
  title: string;
  rows: AdminRow[];
  showSchedule?: boolean;
  onStatusChange: (id: string, status: RequestStatus) => void;
  onDelete: (id: string) => void;
  onExport: () => void;
}

export default function RequestTable({
  title,
  rows,
  showSchedule,
  onStatusChange,
  onDelete,
  onExport,
}: RequestTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const colSpan = showSchedule ? 7 : 6;

  return (
    <section>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <button
          onClick={onExport}
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:border-blue-600 hover:text-blue-600"
        >
          <Download className="h-3.5 w-3.5" />
          엑셀 다운로드
        </button>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400">
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3">이름</th>
              <th className="px-4 py-3">연락처</th>
              <th className="px-4 py-3">접수일</th>
              {showSchedule && <th className="px-4 py-3">희망 일정</th>}
              <th className="px-4 py-3">관리</th>
              <th className="w-10 px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-10 text-center text-sm text-gray-400">
                  표시할 항목이 없습니다.
                </td>
              </tr>
            )}
            {rows.map((row) => {
              const expanded = expandedId === row.id;
              return (
                <Fragment key={row.id}>
                  <tr className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[row.status]}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{row.name}</td>
                    <td className="px-4 py-3 text-gray-600">{row.phone}</td>
                    <td className="px-4 py-3 text-gray-500">{formatDateTime(row.created_at)}</td>
                    {showSchedule && (
                      <td className="px-4 py-3 text-gray-500">
                        {row.preferred_date} {row.preferred_time}
                      </td>
                    )}
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          onClick={() => onStatusChange(row.id, "진행중")}
                          className="rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:border-blue-600 hover:text-blue-600"
                        >
                          진행중
                        </button>
                        <button
                          onClick={() => onStatusChange(row.id, "완료")}
                          className="rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:border-blue-600 hover:text-blue-600"
                        >
                          완료
                        </button>
                        <button
                          onClick={() => onDelete(row.id)}
                          className="rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-red-500 transition-colors hover:border-red-500"
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setExpandedId(expanded ? null : row.id)}
                        className="text-gray-400 transition-colors hover:text-gray-600"
                      >
                        {expanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                  {expanded && (
                    <tr className="border-b border-gray-50 bg-gray-50/60 last:border-0">
                      <td colSpan={colSpan} className="px-4 py-3">
                        <dl className="grid gap-3 text-sm sm:grid-cols-3">
                          <div>
                            <dt className="text-xs font-semibold text-gray-400">제작종류</dt>
                            <dd className="mt-0.5 text-gray-700">{row.build_type}</dd>
                          </div>
                          <div>
                            <dt className="text-xs font-semibold text-gray-400">업종</dt>
                            <dd className="mt-0.5 text-gray-700">{row.industry || "-"}</dd>
                          </div>
                          <div>
                            <dt className="text-xs font-semibold text-gray-400">추가요청사항</dt>
                            <dd className="mt-0.5 whitespace-pre-wrap text-gray-700">
                              {row.notes || "-"}
                            </dd>
                          </div>
                        </dl>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
