"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, Newspaper, ClipboardCheck } from "lucide-react";

const ITEMS = [
  { href: "tel:010-2971-7280", label: "24시간 상담", icon: Phone },
  {
    href: "http://pf.kakao.com/_xntCbX",
    label: "카카오톡문의",
    icon: MessageCircle,
    external: true,
  },
  {
    href: "https://m.blog.naver.com/weflowlab",
    label: "블로그",
    icon: Newspaper,
    external: true,
  },
  { href: "/diagnosis", label: "무료진단", icon: ClipboardCheck },
];

export default function BottomBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 grid h-16 grid-cols-4 border-t border-border bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
      {ITEMS.map(({ href, label, icon: Icon, external }) =>
        external ? (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-0.5 text-xs font-medium text-gray-600 transition-colors hover:text-accent-600"
          >
            <Icon className="h-5 w-5" />
            {label}
          </a>
        ) : (
          <Link
            key={label}
            href={href}
            onClick={(e) => {
              if (pathname === href && href === "/diagnosis") {
                e.preventDefault();
                window.location.href = href;
              }
            }}
            className="flex flex-col items-center justify-center gap-0.5 text-xs font-medium text-gray-600 transition-colors hover:text-accent-600"
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ),
      )}
    </nav>
  );
}
