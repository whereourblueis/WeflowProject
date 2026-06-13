import Link from "next/link";

const SERVICE_LINKS = [
  { href: "/service", label: "홈페이지 제작 과정" },
  { href: "/service", label: "랜딩페이지 제작 과정" },
  { href: "/service", label: "광고 운영 · 관리 안내" },
];

const CARE_LINKS = [
  { href: "/pricing", label: "WE 케어" },
  { href: "/pricing", label: "FLOW 케어" },
  { href: "/pricing", label: "WEFLOW 케어" },
];

const CONTACT_LINKS = [
  { href: "tel:010-2971-7280", label: "전화문의" },
  { href: "mailto:contact@weflowlab.kr", label: "이메일 문의" },
  { href: "http://pf.kakao.com/_xntCbX", label: "카카오 채널 문의" },
  { href: "https://m.blog.naver.com/weflowlab", label: "블로그 문의" },
  { href: "https://www.instagram.com/weflowlab.kr", label: "인스타 문의" },
  {
    href: "https://www.facebook.com/profile.php?id=61590187124682",
    label: "페이스북 문의",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-accent-50 px-4 pb-20 pt-12 text-sm text-gray-600">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <p className="text-lg font-bold text-accent-600">WEFLOW</p>
          <p className="mt-3 leading-relaxed">
            제작부터 관리까지
            <br />
            비즈니스 성장을 함께합니다.
          </p>
          <dl className="mt-4 space-y-1 text-gray-500">
            <p>대표 : 신서준</p>
            <p>사업자등록번호 : 884-07-03480</p>
            <p>이메일 : contact@weflowlab.kr</p>
            <p>운영시간 : 연중무휴 24시간 상담가능</p>
          </dl>
          <div className="mt-4 flex gap-3 text-xs text-gray-400">
            <span>개인정보처리방침</span>
            <span>|</span>
            <span>이용약관</span>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            © 2026 WEFLOW. All rights reserved.
          </p>
        </div>

        <FooterColumn title="서비스" links={SERVICE_LINKS} />
        <FooterColumn title="WEFLOW 케어플랜" links={CARE_LINKS} />
        <FooterColumn title="상담문의" links={CONTACT_LINKS} external />
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  external,
}: {
  title: string;
  links: { href: string; label: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <p className="font-semibold text-foreground">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            {external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-600"
              >
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className="hover:text-accent-600">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
