"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface InlineCalendarProps {
  value: string;
  min?: string;
  onChange: (value: string) => void;
}

const MONTH_NAMES = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];
const DAY_NAMES = ["일","월","화","수","목","금","토"];

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export default function InlineCalendar({ value, min, onChange }: InlineCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const initYear = value ? parseInt(value.slice(0, 4)) : today.getFullYear();
  const initMonth = value ? parseInt(value.slice(5, 7)) - 1 : today.getMonth();

  const [viewYear, setViewYear] = useState(initYear);
  const [viewMonth, setViewMonth] = useState(initMonth);

  const minDate = min ? (() => { const d = new Date(min); d.setHours(0,0,0,0); return d; })() : today;

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="w-full rounded-2xl border border-border bg-white p-4 shadow-card sm:max-w-sm">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={prevMonth}
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-accent-50 hover:text-accent-600"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-base font-bold text-foreground">
          {viewYear}년 {MONTH_NAMES[viewMonth]}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-accent-50 hover:text-accent-600"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7">
        {DAY_NAMES.map((d, i) => (
          <div
            key={d}
            className={`py-1 text-center text-xs font-semibold ${
              i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-gray-400"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`e-${i}`} />;

          const dateStr = toDateStr(viewYear, viewMonth, day);
          const date = new Date(viewYear, viewMonth, day);
          date.setHours(0, 0, 0, 0);
          const disabled = date < minDate;
          const selected = value === dateStr;
          const isToday = dateStr === todayStr;
          const dayOfWeek = (firstDayOfWeek + day - 1) % 7;

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => onChange(dateStr)}
              className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                selected
                  ? "bg-accent-600 text-white shadow-md"
                  : disabled
                  ? "cursor-not-allowed text-gray-200"
                  : isToday
                  ? "border border-accent-400 text-accent-600 hover:bg-accent-50"
                  : dayOfWeek === 0
                  ? "text-red-500 hover:bg-red-50"
                  : dayOfWeek === 6
                  ? "text-blue-500 hover:bg-blue-50"
                  : "text-gray-700 hover:bg-accent-50"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
