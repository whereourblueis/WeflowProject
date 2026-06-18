export interface ProcessStep {
  step: string;
  title: string;
  cardTitle?: string;
  desc: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  { step: "01", title: "상담 · 진단", desc: "업종 및 제작 방향 확인" },
  { step: "02", title: "기획 · 설계", desc: "문의 구조 및 전략 설계" },
  { step: "03", title: "디자인", desc: "브랜드 맞춤 화면 구성" },
  { step: "04", title: "개발 · 제작", cardTitle: "개발 · 테스트", desc: "기능구현 최적화 검수 및 수정 진행" },
  { step: "05", title: "SEO 최적화", cardTitle: "SEO 상단등록", desc: "네이버 · 구글 · 사이트맵 등록" },
  { step: "06", title: "광고운영 · 사후관리", desc: "인스타 · 블로그 · 스레드 · 네이버키워드 광고 운영관리" },
];

export interface FunnelStep {
  label: string;
}

export const FUNNEL_STEPS: FunnelStep[] = [
  { label: "고객 상담" },
  { label: "협의 후 제작" },
  { label: "3~7일 완료" },
  { label: "광고 및 운영 사후 관리" },
];
