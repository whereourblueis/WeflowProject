"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "홈" },
  { href: "/service", label: "서비스" },
  { href: "/pricing", label: "제작플랜&가격안내" },
  { href: "/cases", label: "성공사례" },
  { href: "/reservation", label: "예약" },
  { href: "/diagnosis", label: "무료진단받기" },
];

const RESETTABLE_PATHS = new Set(["/reservation", "/diagnosis"]);

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleNavClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === href && RESETTABLE_PATHS.has(href)) {
        e.preventDefault();
        window.location.href = href;
      }
    };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-accent-600"
        >
          <Image
            src="/logo.png"
            alt="WEFLOW"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          WEFLOW
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-700 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick(item.href)}
              className="hover:text-accent-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="메뉴 열기"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">메뉴</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-gray-700" />
            <span className="block h-0.5 w-5 bg-gray-700" />
            <span className="block h-0.5 w-5 bg-gray-700" />
          </div>
        </button>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <nav className="relative z-50 border-t border-border bg-white px-4 py-2 md:hidden">
            <ul className="flex flex-col gap-1 py-2 text-sm font-medium text-gray-700">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-2 py-2 hover:bg-accent-50 hover:text-accent-600"
                    onClick={(e) => {
                      setOpen(false);
                      handleNavClick(item.href)(e);
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}
