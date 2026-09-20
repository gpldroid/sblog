-- sblog / Supabase schema
-- Run once in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category_id uuid references public.categories(id) on delete set null,
  category text not null default 'عام',
  excerpt text not null default '',
  content text not null default '',
  image text not null default '',
  author text not null default 'فريق التحرير',
  published_at timestamptz,
  read_time text not null default '5 دقائق',
  featured boolean not null default false,
  views bigint not null default 0,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  seo_title text not null default '',
  seo_description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id bigint primary key default 1,
  site_name text not null default 'مدونة الأخبار اليومية',
  tagline text not null default 'البوابة الإخبارية الشاملة',
  description text not null default 'منصة إخبارية عربية مستقلة للنشر الرقمي.',
  logo_text text not null default 'م',
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  content text not null default '',
  seo_title text not null default '',
  seo_description text not null default '',
  status text not null default 'published' check (status in ('draft','published')),
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id) values (1) on conflict (id) do nothing;

insert into public.categories (name,slug) values
('تقنية','technology'),('ذكاء اصطناعي','ai'),('اقتصاد','economy'),
('رياضة','sports'),('ثقافة','culture'),('علوم','science'),
('سيارات','cars'),('صحة','health')
on conflict (name) do nothing;

insert into public.pages (slug,title,content) values
('about','من نحن','منصة إخبارية عربية مستقلة للنشر الرقمي.'),
('contact','اتصل بنا','يمكنكم التواصل مع فريق التحرير عبر صفحة التواصل.'),
('privacy','سياسة الخصوصية','سياسة الخصوصية الخاصة بالموقع.'),
('terms','شروط الاستخدام','شروط استخدام الموقع.'),
('cookies','سياسة ملفات الارتباط','سياسة ملفات الارتباط الخاصة بالموقع.'),
('disclaimer','إخلاء المسؤولية','إخلاء المسؤولية الخاصة بالمحتوى المنشور.')
on conflict (slug) do nothing;

alter table public.categories enable row level security;
alter table public.posts enable row level security;
alter table public.site_settings enable row level security;
alter table public.pages enable row level security;

drop policy if exists "public read categories" on public.categories;
create policy "public read categories" on public.categories for select to anon, authenticated using (true);

drop policy if exists "public read published posts" on public.posts;
create policy "public read published posts" on public.posts for select to anon, authenticated using (status='published');

drop policy if exists "authenticated manage posts" on public.posts;
create policy "authenticated manage posts" on public.posts for all to authenticated using (true) with check (true);

drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings for select to anon, authenticated using (true);

drop policy if exists "authenticated manage settings" on public.site_settings;
create policy "authenticated manage settings" on public.site_settings for all to authenticated using (true) with check (true);

drop policy if exists "public read published pages" on public.pages;
create policy "public read published pages" on public.pages for select to anon, authenticated using (status='published');

drop policy if exists "authenticated manage pages" on public.pages;
create policy "authenticated manage pages" on public.pages for all to authenticated using (true) with check (true);

insert into storage.buckets (id,name,public) values ('media','media',true)
on conflict (id) do update set public=true;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects for select to anon, authenticated using (bucket_id='media');

drop policy if exists "authenticated upload media" on storage.objects;
create policy "authenticated upload media" on storage.objects for insert to authenticated with check (bucket_id='media');

drop policy if exists "authenticated update media" on storage.objects;
create policy "authenticated update media" on storage.objects for update to authenticated using (bucket_id='media') with check (bucket_id='media');

drop policy if exists "authenticated delete media" on storage.objects;
create policy "authenticated delete media" on storage.objects for delete to authenticated using (bucket_id='media');

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at=now(); return new; end;
$$;

drop trigger if exists posts_updated_at on public.posts;
create trigger posts_updated_at before update on public.posts for each row execute function public.set_updated_at();

drop trigger if exists settings_updated_at on public.site_settings;
create trigger settings_updated_at before update on public.site_settings for each row execute function public.set_updated_at();

drop trigger if exists pages_updated_at on public.pages;
create trigger pages_updated_at before update on public.pages for each row execute function public.set_updated_at();