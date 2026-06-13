import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { AdminRow } from "@/lib/data/admin";
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
    <AdminDashboard
      email={user.email ?? ""}
      initialReservations={(reservations as AdminRow[] | null) ?? []}
      initialInquiries={(inquiries as AdminRow[] | null) ?? []}
    />
  );
}
