import {supabase,backendReady} from '../assets/js/backend.js';

const app=document.getElementById('admin-app');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const state={posts:[],view:'dashboard',role:null};

function input(id,label,value,required){
 return '<label class="block text-xs font-bold">'+label+'<input id="'+id+'" '+(required?'required':'')+' value="'+esc(value)+'" class="w-full border rounded-lg p-3 mt-1 bg-transparent"></label>';
}
function val(id){return document.getElementById(id).value.trim()}

function login(){
 app.innerHTML='<main class="min-h-screen flex items-center justify-center px-4"><form id="login-form" class="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-6"><h1 class="text-2xl font-black mb-2">دخول لوحة التحكم</h1><p class="text-xs text-gray-500 mb-6">استخدم حساب المدير في Supabase Auth.</p><label class="block text-xs font-bold mb-1">البريد الإلكتروني</label><input id="email" type="email" required class="w-full border rounded-lg px-3 py-3 mb-4 bg-transparent"><label class="block text-xs font-bold mb-1">كلمة المرور</label><input id="password" type="password" required class="w-full border rounded-lg px-3 py-3 mb-4 bg-transparent"><button class="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-lg py-3 text-sm font-bold">تسجيل الدخول</button><p id="login-error" class="text-xs text-red-600 mt-3"></p></form></main>';
 document.getElementById('login-form').onsubmit=async e=>{
  e.preventDefault();
  const r=await supabase.auth.signInWithPassword({email:val('email'),password:document.getElementById('password').value});
  if(r.error)document.getElementById('login-error').textContent=r.error.message;else init();
 };
}

function shell(){
 app.innerHTML='<div class="min-h-screen"><header class="bg-gray-900 text-gray-200 border-b border-gray-800"><div class="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-3 items-center justify-between"><div><h1 class="text-xl font-black text-white">لوحة تحكم الأخبار</h1><p class="text-xs text-gray-400">إدارة المحتوى والإعدادات</p></div><div class="flex gap-2"><a href="../index.html" class="px-3 py-2 rounded-lg bg-gray-800 text-xs">عرض الموقع</a><button id="logout" class="px-3 py-2 rounded-lg bg-red-600 text-white text-xs">تسجيل الخروج</button></div></div></header><main class="max-w-7xl mx-auto px-4 py-6"><nav class="flex flex-wrap gap-2 mb-6"><button data-view="dashboard" class="admin-tab px-4 py-2 rounded-lg bg-brand-600 text-white text-xs font-bold">الرئيسية</button><button data-view="posts" class="admin-tab px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs font-bold">المقالات</button>'+(state.role==='admin'?'<button data-view="settings" class="admin-tab px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs font-bold">إعدادات الموقع</button>':'')+'</nav><section id="panel"></section></main></div>';
 document.querySelectorAll('.admin-tab').forEach(b=>b.onclick=()=>{state.view=b.dataset.view;render()});
 document.getElementById('logout').onclick=async()=>{await supabase.auth.signOut();location.reload()};
}

function dashboard(){
 const pub=state.posts.filter(p=>p.status==='published').length;
 document.getElementById('panel').innerHTML='<div class="grid grid-cols-1 sm:grid-cols-3 gap-4"><div class="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800"><b class="text-2xl">'+state.posts.length+'</b><p class="text-xs text-gray-500 mt-1">إجمالي المقالات</p></div><div class="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800"><b class="text-2xl">'+pub+'</b><p class="text-xs text-gray-500 mt-1">منشور</p></div><div class="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800"><b class="text-2xl">'+(state.posts.length-pub)+'</b><p class="text-xs text-gray-500 mt-1">مسودة/أرشيف</p></div></div><div class="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 mt-6"><h2 class="font-black mb-2">Backend</h2><p class="text-xs leading-6 text-gray-500">Supabase يدير قاعدة البيانات والمصادقة. GitHub Pages تبقى مسؤولة عن الواجهة العامة.</p></div>';
}

function posts(){
 let rows=state.posts.map(p=>'<tr class="border-b border-gray-100 dark:border-gray-800"><td class="p-3 font-bold">'+esc(p.title)+'</td><td class="p-3">'+esc(p.category)+'</td><td class="p-3">'+esc(p.status)+'</td><td class="p-3"><button data-edit="'+p.id+'" class="text-brand-600 font-bold">تعديل</button></td></tr>').join('');
 document.getElementById('panel').innerHTML='<div class="flex justify-between items-center mb-4"><h2 class="text-xl font-black">المقالات</h2><button id="new-post" class="bg-brand-600 text-white rounded-lg px-4 py-2 text-xs font-bold">+ مقال جديد</button></div><div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-auto"><table class="w-full text-right text-xs"><thead><tr class="border-b"><th class="p-3">العنوان</th><th class="p-3">القسم</th><th class="p-3">الحالة</th><th class="p-3">الإجراء</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
 document.getElementById('new-post').onclick=()=>editor(null);
 document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>editor(state.posts.find(p=>String(p.id)===String(b.dataset.edit))));
}

function editor(p){
 const x=p?{...p,read_time:p.read_time||p.readTime||'5 دقائق'}:{title:'',slug:'',category:'تقنية',excerpt:'',content:'',image:'',author:'فريق التحرير',read_time:'5 دقائق',featured:false,status:'draft',seo_title:'',seo_description:''};
 document.getElementById('panel').innerHTML='<div class="flex justify-between items-center mb-4"><h2 class="text-xl font-black">'+(p?'تعديل المقال':'مقال جديد')+'</h2><button id="back" class="text-xs text-gray-500">رجوع</button></div><form id="post-form" class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-4">'+input('title','العنوان',x.title,true)+input('slug','الرابط المختصر',x.slug,true)+input('category','القسم',x.category,true)+input('author','الكاتب',x.author,true)+input('image','رابط الصورة',x.image,false)+input('read_time','مدة القراءة',x.read_time,false)+'<label class="block text-xs font-bold">المقتطف<textarea id="excerpt" class="w-full border rounded-lg p-3 mt-1 bg-transparent" rows="3">'+esc(x.excerpt)+'</textarea></label><label class="block text-xs font-bold">المحتوى<textarea id="content" class="w-full border rounded-lg p-3 mt-1 bg-transparent" rows="12">'+esc(x.content)+'</textarea></label><div class="grid grid-cols-1 md:grid-cols-3 gap-4">'+input('seo_title','SEO Title',x.seo_title,false)+input('seo_description','SEO Description',x.seo_description,false)+'<label class="text-xs font-bold">الحالة<select id="status" class="w-full border rounded-lg p-3 mt-1 bg-transparent"><option '+(x.status==='draft'?'selected':'')+'>draft</option><option '+(x.status==='published'?'selected':'')+'>published</option><option '+(x.status==='archived'?'selected':'')+'>archived</option></select></label></div><label class="flex gap-2 items-center text-xs font-bold"><input id="featured" type="checkbox" '+(x.featured?'checked':'')+'> خبر بارز</label><div class="flex gap-2"><button class="bg-brand-600 text-white rounded-lg px-5 py-3 text-xs font-bold">حفظ</button>'+(p?'<button type="button" id="delete-post" class="bg-red-600 text-white rounded-lg px-5 py-3 text-xs font-bold">حذف</button>':'')+'</div><p id="form-msg" class="text-xs"></p></form>';
 document.getElementById('back').onclick=()=>{state.view='posts';render()};
 document.getElementById('post-form').onsubmit=async e=>{
  e.preventDefault();
  const payload={title:val('title'),slug:val('slug'),category:val('category'),author:val('author'),image:val('image'),read_time:val('read_time'),excerpt:val('excerpt'),content:val('content'),seo_title:val('seo_title'),seo_description:val('seo_description'),status:val('status'),featured:document.getElementById('featured').checked,published_at:val('status')==='published'?(p&&p.published_at?p.published_at:new Date().toISOString()):null};
  const r=p?await supabase.from('posts').update(payload).eq('id',p.id):await supabase.from('posts').insert(payload);
  if(r.error){document.getElementById('form-msg').textContent=r.error.message;return}
  await loadPosts();state.view='posts';render();
 };
 if(p)document.getElementById('delete-post').onclick=async()=>{if(!confirm('حذف المقال؟'))return;const r=await supabase.from('posts').delete().eq('id',p.id);if(r.error)alert(r.error.message);else{await loadPosts();state.view='posts';render()}};
}

async function settings(){
 const r=await supabase.from('site_settings').select('*').eq('id',1).maybeSingle();
 const d=r.data||{};
 document.getElementById('panel').innerHTML='<h2 class="text-xl font-black mb-4">إعدادات الموقع</h2><form id="settings-form" class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-4">'+input('site_name','اسم الموقع',d.site_name||'مدونة الأخبار اليومية',true)+input('tagline','الشعار',d.tagline||'البوابة الإخبارية الشاملة',false)+input('logo_text','حرف الشعار',d.logo_text||'م',false)+'<label class="block text-xs font-bold">الوصف<textarea id="description" rows="4" class="w-full border rounded-lg p-3 mt-1 bg-transparent">'+esc(d.description||'')+'</textarea></label><button class="bg-brand-600 text-white rounded-lg px-5 py-3 text-xs font-bold">حفظ الإعدادات</button></form>';
 document.getElementById('settings-form').onsubmit=async e=>{e.preventDefault();const r2=await supabase.from('site_settings').upsert({id:1,site_name:val('site_name'),tagline:val('tagline'),logo_text:val('logo_text'),description:val('description')});if(r2.error)alert(r2.error.message);else alert('تم الحفظ')};
}

function render(){if(state.view==='settings'&&state.role!=='admin'){state.view='dashboard'}if(state.view==='dashboard')dashboard();else if(state.view==='posts')posts();else settings()}
async function loadPosts(){const r=await supabase.from('posts').select('*').order('created_at',{ascending:false});if(r.error)throw r.error;state.posts=r.data||[]}
async function init(){
 if(!backendReady){app.innerHTML='<main class="min-h-screen flex items-center justify-center p-6"><div class="max-w-xl bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl"><h1 class="text-xl font-black mb-3">Backend غير مُفعّل</h1><p class="text-sm leading-7 text-gray-500">عدّل assets/js/backend-config.js وأضف Project URL وPublishable/Anon Key ثم اجعل enabled=true.</p></div></main>';return}
 const s=await supabase.auth.getSession();
 if(!s.data.session){login();return}
 const profile=await supabase.from('profiles').select('role').eq('id',s.data.session.user.id).maybeSingle();
 if(profile.error||!profile.data||!['admin','editor'].includes(profile.data.role)){
  await supabase.auth.signOut();
  app.innerHTML='<main class="min-h-screen flex items-center justify-center p-6"><div class="max-w-xl bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-red-200"><h1 class="text-xl font-black mb-3">لا توجد صلاحيات إدارة</h1><p class="text-sm leading-7 text-gray-500">هذا الحساب مصادق عليه، لكنه غير مُسجّل كمدير أو محرر في جدول profiles.</p></div></main>';return;
 }
 state.role=profile.data.role;
 shell();await loadPosts();render();
}
init();
