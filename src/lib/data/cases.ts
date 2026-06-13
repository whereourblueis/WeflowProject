export const CASE_INDUSTRIES: string[] = [
  "PT샵",
  "필라테스",
  "헬스장",
  "보험설계",
  "법률 사무소",
  "자동차 디테일링",
  "렌터카 업체",
  "웨딩/스냅 업체",
  "세무사 사무소",
  "공인중개사",
  "카페",
  "미용실",
  "네일샵",
  "소상공인 기업형 홈페이지",
  "피부관리샵",
  "왁싱샵",
  "반영구샵",
  "애견미용",
  "반려동물 용품점",
  "인테리어 업체",
  "이사 업체",
  "키즈카페",
  "스터디카페",
  "영어학원",
  "수학학원",
  "입시학원",
  "개인과외",
  "청소업체",
];

export const CASES_PREVIEW: string[] = ["PT샵", "필라테스", "보험설계", "자동차 디테일링", "미용실"];

const CASE_IMAGE_SLUGS: Record<string, string> = {
  "PT샵": "pt",
  "필라테스": "pilates",
  "헬스장": "gym",
  "보험설계": "insurance",
  "법률 사무소": "law-firm",
  "자동차 디테일링": "car-detailing",
  "렌터카 업체": "car-rental",
  "웨딩/스냅 업체": "wedding-snap",
  "세무사 사무소": "tax-office",
  "공인중개사": "real-estate",
  "카페": "cafe",
  "미용실": "hair-salon",
  "네일샵": "nail-salon",
  "소상공인 기업형 홈페이지": "corporate-site",
  "피부관리샵": "skincare",
  "왁싱샵": "waxing",
  "반영구샵": "semi-permanent",
  "애견미용": "pet-grooming",
  "반려동물 용품점": "pet-supplies",
  "인테리어 업체": "interior",
  "이사 업체": "moving",
  "키즈카페": "kids-cafe",
  "스터디카페": "study-cafe",
  "영어학원": "english-academy",
  "수학학원": "math-academy",
  "입시학원": "exam-academy",
  "개인과외": "private-tutoring",
  "청소업체": "cleaning",
};

export function caseSlug(industry: string): string {
  return CASE_IMAGE_SLUGS[industry] ?? industry.replace(/[\s/]/g, "");
}

export function caseImagePath(industry: string): string {
  return `/images/cases/cases_${caseSlug(industry)}.jpg`;
}

export function industryBySlug(slug: string): string | undefined {
  return CASE_INDUSTRIES.find((industry) => caseSlug(industry) === slug);
}
