import type { Metadata } from "next";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import SetupNotice from "../SetupNotice";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "관리자 로그인 | WEFLOW",
};

export default function AdminLoginPage() {
  if (!isSupabaseConfigured()) {
    return <SetupNotice />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">WEFLOW 관리자</h1>
        <p className="mt-1 text-sm text-gray-500">관리자 계정으로 로그인해주세요.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
