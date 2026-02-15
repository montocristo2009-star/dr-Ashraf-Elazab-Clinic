
import React, { useState, useMemo } from 'react';
import { BLOG_POSTS, DOCTOR_INTERNAL_PAGE_URL, DOCTOR_NAME } from '../constants';
import { BlogPost } from '../types';

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const cats = ['الكل', ...new Set(BLOG_POSTS.map(post => post.category))];
    return cats;
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = activeCategory === 'الكل' || post.category === activeCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="py-32 bg-slate-50 min-h-screen font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 text-right">
        
        {/* Spotlight Header */}
        <section className="mb-24 bg-white rounded-[60px] p-8 md:p-16 shadow-xl border border-slate-100 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 animate-fade-in-up">
          <div className="absolute top-0 left-0 w-64 h-64 bg-medical-green/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 flex-shrink-0 group">
            <div className="absolute inset-0 bg-medical-green rounded-[40px] rotate-6 group-hover:rotate-0 transition-transform duration-500 shadow-lg"></div>
            <img 
              src={DOCTOR_INTERNAL_PAGE_URL} 
              alt={DOCTOR_NAME} 
              className="relative z-10 w-full h-full object-cover rounded-[40px] shadow-2xl border-4 border-white"
            />
          </div>
          <div className="relative z-10 flex-grow text-center lg:text-right">
            <span className="text-medical-green font-black text-xs uppercase tracking-[0.4em] mb-4 block">Medical Insights Lab</span>
            <h1 className="text-4xl md:text-5xl font-black text-medical-blue mb-6">المدونة الطبية للدكتور أشرف</h1>
            <p className="text-xl text-slate-500 font-bold mb-8 max-w-2xl leading-relaxed">
              مقالات تعليمية ومعلومات طبية موثقة حول أحدث تقنيات جراحة العظام والمناظير والمفاصل الصناعية.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
               <div className="relative flex-grow">
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="ابحث في المواضيع الطبية..." 
                   className="w-full px-8 py-5 bg-slate-50 rounded-2xl border-none focus:ring-4 focus:ring-medical-green/10 font-bold text-lg"
                 />
                 <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
               </div>
            </div>
          </div>
        </section>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-4 mb-16 justify-center lg:justify-start">
           {categories.map(cat => (
             <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-4 rounded-2xl font-black text-sm transition-all ${activeCategory === cat ? 'bg-medical-blue text-white shadow-xl scale-105' : 'bg-white text-slate-400 border border-slate-100 hover:text-medical-green'}`}
             >
               {cat}
             </button>
           ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-[50px] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col group animate-fade-in-up">
              <div className="relative h-64 overflow-hidden">
                <img src={post.imageUrl || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black text-medical-blue shadow-lg uppercase tracking-widest">
                  {post.category}
                </div>
              </div>
              <div className="p-10 flex-grow flex flex-col">
                <div className="flex items-center gap-3 mb-6 text-slate-400 text-xs font-black uppercase tracking-widest">
                   <span>{post.date}</span>
                   <span>•</span>
                   <span>بواسطة {DOCTOR_NAME}</span>
                </div>
                <h3 className="text-2xl font-black text-medical-blue mb-6 leading-tight group-hover:text-medical-green transition-colors">{post.title}</h3>
                <p className="text-slate-500 font-bold leading-relaxed mb-8 line-clamp-3">{post.summary}</p>
                
                <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <img src={DOCTOR_INTERNAL_PAGE_URL} alt={DOCTOR_NAME} className="w-9 h-9 rounded-full object-cover ring-2 ring-medical-green" />
                     <span className="text-[10px] font-black text-medical-blue uppercase tracking-widest">مقال موثق</span>
                   </div>
                   <button className="text-medical-green font-black text-sm hover:underline flex items-center gap-2">
                     <span>اقرأ المزيد</span>
                     <span>←</span>
                   </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
