import Link from "next/link";

export default function CaseCard({
  industry,
  href = "/diagnosis",
}: {
  industry: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 text-center text-sm font-semibold text-blue-400">
        {industry}
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-gray-900">{industry}</p>
        <p className="mt-0.5 text-xs text-blue-600 group-hover:underline">자세히 보기</p>
      </div>
    </Link>
  );
}
