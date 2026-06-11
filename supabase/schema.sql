-- WEFLOW: reservations & free-diagnosis inquiries
-- Run this once in the Supabase SQL editor for your project.

create extension if not exists "pgcrypto";

create type request_status as enum ('대기', '진행중', '완료');
create type build_type as enum (
  '랜딩페이지 제작',
  '홈페이지 제작',
  '랜딩&홈페이지 제작',
  '기타(WEFLOW 케어플랜)'
);

-- 예약 (reservation)
create table reservations (
  id uuid primary key default gen_random_uuid(),
  status request_status not null default '대기',
  name text not null,
  phone text not null,
  build_type build_type not null,
  industry text,
  notes text,
  preferred_date date not null,
  preferred_time text not null,
  created_at timestamptz not null default now()
);

-- 무료진단 (diagnosis inquiry)
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  status request_status not null default '대기',
  name text not null,
  phone text not null,
  build_type build_type not null,
  industry text,
  notes text,
  created_at timestamptz not null default now()
);

alter table reservations enable row level security;
alter table inquiries enable row level security;

-- public site: anyone can submit a reservation/inquiry
create policy "anon can insert reservations" on reservations
  for insert to anon with check (true);

create policy "anon can insert inquiries" on inquiries
  for insert to anon with check (true);

-- admin dashboard: logged-in (Supabase Auth) users can read/update/delete
create policy "authenticated can manage reservations" on reservations
  for all to authenticated using (true) with check (true);

create policy "authenticated can manage inquiries" on inquiries
  for all to authenticated using (true) with check (true);

-- realtime updates for the admin dashboard
alter publication supabase_realtime add table reservations;
alter publication supabase_realtime add table inquiries;
