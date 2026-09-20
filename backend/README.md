# Backend — Supabase Free

هذا المجلد يجهز طبقة Backend مجانية للمشروع بدون تغيير تصميم الواجهة الحالية.

- Supabase Postgres: الأخبار، التصنيفات، إعدادات الموقع والصفحات.
- Supabase Auth: دخول لوحة الإدارة بالبريد وكلمة المرور.
- Supabase Storage: صور المقالات والوسائط.
- GitHub Pages: الواجهة العامة الحالية تبقى Static.
- admin/: لوحة تحكم لإدارة المحتوى.

## الإعداد

1. أنشئ مشروعاً مجانياً في Supabase.
2. شغّل backend/supabase-schema.sql في SQL Editor.
3. أنشئ مستخدم Admin من Authentication > Users.
4. ضع Project URL و Publishable/Anon key في assets/js/backend-config.js.
5. افتح /admin/ وسجّل الدخول.

لا تضع Service Role Key أو أي مفتاح سري داخل GitHub Pages.