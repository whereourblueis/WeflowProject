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
      className="group block overflow-hidden rounded-xl border border-border bg-white shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-accent-50 to-accent-100 px-4 text-center text-sm font-semibold text-accent-400">
        {industry}
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-foreground">{industry}</p>
        <p className="mt-0.5 text-xs text-accent-600 group-hover:underline">자세히 보기</p>
      </div>
    </Link>
  );
}
