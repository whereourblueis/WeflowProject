import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { AdminRow } from "@/lib/data/admin";
import { logout } from "./actions";
import AdminDashboard from "./AdminDashboard";
import SetupNotice from "./SetupNotice";

export const metadata: Metadata = {
  title: "관리자 | WEFLOW",
};

export default async function AdminPage() {
  if (!isSupabaseConfigured()) {
    return <SetupNotice />;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const [{ data: reservations }, { data: inquiries }] = await Promise.all([
    supabase.from("reservations").select("*").order("created_at", { ascending: false }),
    supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900">WEFLOW 관리자</h1>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
              로그아웃
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <AdminDashboard
          initialReservations={(reservations as AdminRow[] | null) ?? []}
          initialInquiries={(inquiries as AdminRow[] | null) ?? []}
        />
      </main>
    </div>
  );
}
