# Backend — Supabase Free

هذا المجلد يجهز طبقة Backend مجانية للمشروع مع فصل واضح بين الواجهة العامة وصلاحيات الإدارة.

## حماية صلاحيات الإدارة

تم اعتماد **RBAC** بسيط وآمن:

- `admin`: إدارة كاملة للمقالات والتصنيفات والصفحات والوسائط وإعدادات الموقع وإدارة الأدوار.
- `editor`: إدارة المحتوى التحريري والوسائط فقط، ولا يستطيع تغيير إعدادات الموقع أو أدوار المستخدمين.
- المستخدم المصادق عليه بدون سجل في `profiles`: **مرفوض من لوحة الإدارة**.
- الزائر العام يستطيع قراءة المحتوى المنشور فقط.
- صلاحيات قاعدة البيانات محمية بواسطة **Supabase RLS**، وليست مجرد حماية في JavaScript.
- لا يمكن للمستخدم رفع نفسه إلى `admin` من المتصفح.

## الإعداد

1. أنشئ مشروعاً في Supabase.
2. شغّل `backend/supabase-schema.sql` كاملاً في SQL Editor.
3. أنشئ أول مستخدم من **Authentication → Users**.
4. انسخ UUID الخاص بالمستخدم من Supabase.
5. نفّذ في SQL Editor:

```sql
insert into public.profiles (id, role)
values ('AUTH_USER_UUID_HERE', 'admin')
on conflict (id) do update set role = 'admin';
```

6. ضع **Project URL** و **Publishable/Anon key** فقط في `assets/js/backend-config.js`.
7. افتح `/admin/` وسجّل الدخول.

### مهم جداً

لا تضع أبداً **service_role / secret key** داخل GitHub أو GitHub Pages أو JavaScript المتصفح.

حتى لو عرف شخص ما قيمة Publishable/Anon key، فإن RLS هو الذي يمنعه من تنفيذ عمليات الإدارة بدون الدور المناسب.

### تحقق سريع

بعد تسجيل الدخول:

- حساب `admin` يرى إعدادات الموقع ويمكنه إدارة المحتوى.
- حساب `editor` لا يرى إعدادات الموقع.
- الحساب غير الموجود في `profiles` لا يدخل لوحة الإدارة.
- الوصول المباشر إلى Supabase API لا يتجاوز سياسات RLS.

## الملفات

- `backend/supabase-schema.sql`: الجداول وRLS والأدوار.
- `assets/js/backend.js`: عميل Supabase للواجهة العامة.
- `assets/js/backend-config.js`: إعدادات الاتصال العامة فقط.
- `admin/`: لوحة الإدارة.
