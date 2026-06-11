# WEFLOW

문의로 이어지는 홈페이지를 만드는 WEFLOW 공식 사이트입니다. Next.js (App Router) + Tailwind CSS + Supabase로 구현되어 있습니다.

## 시작하기

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

## 환경변수

`.env.local.example`을 참고하여 `.env.local`에 Supabase 프로젝트 정보를 설정합니다.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Supabase 스키마

`supabase/schema.sql`을 Supabase SQL Editor에서 실행하면 `reservations`, `inquiries` 테이블과 RLS 정책이 생성됩니다.

## 주요 디렉터리

- `src/app/(site)` — 공개 사이트 페이지 (홈, 서비스, 가격, 성공사례, 무료진단, 예약, 랜딩)
- `src/app/admin` — 관리자 대시보드 (예약/문의 관리)
- `src/components` — 공통 UI 컴포넌트
- `src/lib/data` — 페이지에서 사용하는 정적 데이터
- `src/lib/supabase` — Supabase 클라이언트 설정
