export default function SetupNotice() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-lg font-bold text-gray-900">Supabase 설정이 필요합니다</h1>
        <p className="mt-2 text-sm text-gray-500">
          .env.local에 NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정한 뒤 다시
          시도해주세요.
        </p>
      </div>
    </div>
  );
}
