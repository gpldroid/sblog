import {createClient} from 'https://esm.sh/@supabase/supabase-js@2';
import {BACKEND} from './backend-config.js';

export const backendReady=Boolean(BACKEND.enabled&&BACKEND.url&&BACKEND.anonKey);
export const supabase=backendReady?createClient(BACKEND.url,BACKEND.anonKey,{auth:{persistSession:true,autoRefreshToken:true}}):null;

export async function getPublishedPosts(){
  if(!backendReady)return null;
  const {data,error}=await supabase.from('posts').select('*').eq('status','published').order('published_at',{ascending:false});
  if(error)throw error;
  return (data||[]).map(normalizePost);
}

export async function getSettings(){
  if(!backendReady)return null;
  const {data,error}=await supabase.from('site_settings').select('*').eq('id',1).maybeSingle();
  if(error)throw error;
  return data;
}

export function normalizePost(p){
  return {
    id:p.id,slug:p.slug,title:p.title,category:p.category||'عام',
    date:p.published_at?new Date(p.published_at).toLocaleDateString('ar-MA',{year:'numeric',month:'long',day:'numeric'}):'',
    readTime:p.read_time||'5 دقائق',author:p.author||'فريق التحرير',
    image:p.image||'',featured:Boolean(p.featured),views:Number(p.views||0),
    excerpt:p.excerpt||'',content:p.content||'',status:p.status||'published',
    seoTitle:p.seo_title||'',seoDescription:p.seo_description||''
  };
}
