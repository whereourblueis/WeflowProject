import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-accent-50 to-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <Image
            src="/logo.png"
            alt="WEFLOW"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          WEFLOW
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          관리자 계정으로 로그인 해주세요.
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-1 text-sm font-medium text-gray-500 hover:text-accent-600"
        >
          <ArrowLeft className="h-4 w-4" /> 메인 사이트로
        </Link>
      </div>
    </div>
  );
}
