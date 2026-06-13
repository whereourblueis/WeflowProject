import Image from "next/image";
import Link from "next/link";
import { caseImagePath } from "@/lib/data/cases";

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
      className="group block overflow-hidden rounded-xl border border-border bg-white shadow-card transition-all hover:-translate-y-1 hover:border-2 hover:border-accent-600 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-accent-50">
        <Image
          src={caseImagePath(industry)}
          alt={industry}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-foreground">{industry}</p>
        <p className="mt-0.5 text-xs text-accent-600 group-hover:underline">자세히 보기</p>
      </div>
    </Link>
  );
}
