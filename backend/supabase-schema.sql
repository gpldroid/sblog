-- sblog / Supabase secure schema
-- Run this file in Supabase SQL Editor.
-- IMPORTANT: never expose the service_role/secret key in the frontend.

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

-- Roles are stored separately from Auth. Never trust a client-provided role.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'editor' check (role in ('admin','editor')),
  created_at timestamptz not null default now(),
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
alter table public.profiles enable row level security;

-- Security helper: SECURITY DEFINER avoids recursive profile RLS checks.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.is_editor_or_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid() and role in ('admin','editor')
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;
revoke all on function public.is_editor_or_admin() from public;
grant execute on function public.is_editor_or_admin() to authenticated;

-- Drop the old broad authenticated policies.
drop policy if exists "authenticated manage posts" on public.posts;
drop policy if exists "authenticated manage settings" on public.site_settings;
drop policy if exists "authenticated manage pages" on public.pages;
drop policy if exists "public read categories" on public.categories;
drop policy if exists "public read published posts" on public.posts;
drop policy if exists "public read settings" on public.site_settings;
drop policy if exists "public read published pages" on public.pages;
drop policy if exists "authenticated read profiles" on public.profiles;
drop policy if exists "admin manage profiles" on public.profiles;

-- Public read policies.
create policy "public read categories" on public.categories
for select to anon, authenticated using (true);

create policy "public read published posts" on public.posts
for select to anon, authenticated using (status = 'published');

create policy "public read settings" on public.site_settings
for select to anon, authenticated using (true);

create policy "public read published pages" on public.pages
for select to anon, authenticated using (status = 'published');

-- Editors/admins manage editorial content.
create policy "editor admin manage posts" on public.posts
for all to authenticated
using (public.is_editor_or_admin())
with check (public.is_editor_or_admin());

create policy "editor admin manage categories" on public.categories
for all to authenticated
using (public.is_editor_or_admin())
with check (public.is_editor_or_admin());

create policy "editor admin manage pages" on public.pages
for all to authenticated
using (public.is_editor_or_admin())
with check (public.is_editor_or_admin());

-- Only administrators can change global site settings.
create policy "admin manage settings" on public.site_settings
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

-- A user can read only their own profile; admins can manage roles.
create policy "users read own profile" on public.profiles
for select to authenticated
using (id = auth.uid() or public.is_admin());

create policy "admin manage profiles" on public.profiles
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Storage: public media can be viewed, but only editorial users can modify it.
insert into storage.buckets (id,name,public) values ('media','media',true)
on conflict (id) do update set public=true;

drop policy if exists "public read media" on storage.objects;
drop policy if exists "authenticated upload media" on storage.objects;
drop policy if exists "authenticated update media" on storage.objects;
drop policy if exists "authenticated delete media" on storage.objects;

create policy "public read media" on storage.objects
for select to anon, authenticated using (bucket_id = 'media');

create policy "editor admin upload media" on storage.objects
for insert to authenticated
with check (bucket_id = 'media' and public.is_editor_or_admin());

create policy "editor admin update media" on storage.objects
for update to authenticated
using (bucket_id = 'media' and public.is_editor_or_admin())
with check (bucket_id = 'media' and public.is_editor_or_admin());

create policy "editor admin delete media" on storage.objects
for delete to authenticated
using (bucket_id = 'media' and public.is_editor_or_admin());

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_updated_at on public.posts;
create trigger posts_updated_at before update on public.posts
for each row execute function public.set_updated_at();

drop trigger if exists settings_updated_at on public.site_settings;
create trigger settings_updated_at before update on public.site_settings
for each row execute function public.set_updated_at();

drop trigger if exists pages_updated_at on public.pages;
create trigger pages_updated_at before update on public.pages
for each row execute function public.set_updated_at();

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

-- BOOTSTRAP ADMIN:
-- After creating the first user in Supabase Authentication > Users,
-- run this once, replacing the UUID:
-- insert into public.profiles (id, role) values ('AUTH_USER_UUID_HERE', 'admin')
-- on conflict (id) do update set role = 'admin';
