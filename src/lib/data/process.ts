export interface ProcessStep {
  step: string;
  title: string;
  cardTitle?: string;
  desc: string;
  emoji: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  { step: "01", emoji: "💬", title: "상담 · 진단", desc: "업종 및 제작 방향 확인" },
  { step: "02", emoji: "📐", title: "기획 · 설계", desc: "문의 구조 및 전략 설계" },
  { step: "03", emoji: "🎨", title: "디자인", desc: "브랜드 맞춤 화면 구성" },
  {
    step: "04",
    emoji: "⚙️",
    title: "개발 · 제작",
    cardTitle: "개발 · 테스트",
    desc: "기능구현 최적화 검수 및 수정 진행",
  },
  {
    step: "05",
    emoji: "🔍",
    title: "SEO 최적화",
    cardTitle: "SEO 상단등록",
    desc: "네이버 · 구글 · 사이트맵 등록",
  },
  {
    step: "06",
    emoji: "📢",
    title: "광고운영 · 사후관리",
    desc: "인스타 · 블로그 · 스레드 · 네이버키워드 광고 운영관리",
  },
];

export interface FunnelStep {
  emoji: string;
  label: string;
}

export const FUNNEL_STEPS: FunnelStep[] = [
  { emoji: "💬", label: "고객 상담" },
  { emoji: "🛠️", label: "협의 후 제작" },
  { emoji: "⚡", label: "3~7일 완료" },
  { emoji: "📢", label: "광고 및 운영 사후 관리" },
];

export const AD_OPS_ITEMS: string[] = [
  "블로그 업로드",
  "인스타 업로드",
  "스레드 업로드",
  "네이버 키워드 업로드",
  "당근플레이스 키워드 업로드",
  "네이버 서치어드바이저 상단등록",
  "구글 콘솔 상단등록",
  "사이트맵 등록",
];
