import React, { useState, useMemo, useEffect } from 'react';
import { BLOG_POSTS, DOCTOR_IMAGE_URL, DOCTOR_NAME, DOCTOR_SLOGAN } from '../constants';
import { BlogPost } from '../types';

const POSTS_PER_PAGE = 6;

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const cats = BLOG_POSTS.map(post => post.category);
    return ['الكل', ...Array.from(new Set(cats))];
  }, []);

  const filteredPosts = useMemo(() => {
    let result = BLOG_POSTS;
    if (selectedCategory !== 'الكل') {
      result = result.filter(post => post.category === selectedCategory);
    }
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      result = result.filter((post) => {
        return (
          post.title.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          post.date.toLowerCase().includes(query) ||
          post.summary.toLowerCase().includes(query)
        );
      });
    }
    return result;
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="py-32 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 text-right">
        
        {/* Doctor Spotlight Header */}
        <section className="mb-24 bg-white rounded-[60px] p-8 md:p-16 shadow-xl border border-slate-100 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 animate-fade-in-up">
          <div className="absolute top-0 left-0 w-64 h-64 bg-medical-green/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          
          <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 flex-shrink-0 group">
            <div className="absolute inset-0 bg-medical-green rounded-[40px] rotate-6 group-hover:rotate-0 transition-transform duration-500"></div>
            <img 
              src={DOCTOR_IMAGE_URL} 
              alt={DOCTOR_NAME} 
              className="relative z-10 w-full h-full object-cover rounded-[40px] shadow-2xl border-4 border-white"
              onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800"; }}
            />
          </div>

          <div className="relative z-10 text-center lg:text-right flex-grow">
            <span className="text-medical-green font-black text-xs uppercase tracking-[0.4em] mb-4 block">Author & Expert</span>
            <h1 className="text-4xl md:text-5xl font-black text-medical-blue mb-4">المدونة الطبية للدكتور أشرف العزب</h1>
            <p className="text-xl text-slate-500 font-bold mb-6 italic">{DOCTOR_SLOGAN}</p>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed font-medium">
              مرحباً بكم في مساحتي التثقيفية. هنا أشارككم أحدث التطورات العالمية في جراحة العظام والمناظير، مع نصائح عملية للوقاية من الإصابات الرياضية والتعافي السليم. هدفنا دائماً هو "التخصص الدقيق الذي يختصر طريق العلاج".
            </p>
          </div>
        </section>

        <div className="mb-16">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group mb-12">
            <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-medical-green transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text"
              placeholder="ابحث عن مقال طبي..."
              className="w-full bg-white border-2 border-slate-100 rounded-[30px] py-5 pr-16 pl-8 text-lg font-bold text-medical-blue focus:border-medical-green focus:ring-0 outline-none transition-all shadow-sm hover:shadow-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-3 rounded-full font-black text-sm transition-all duration-300 border-2 ${
                  selectedCategory === cat 
                  ? 'bg-medical-blue text-white border-medical-blue shadow-lg scale-105' 
                  : 'bg-white text-slate-400 border-slate-100 hover:border-medical-green hover:text-medical-green'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        {paginatedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {paginatedPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-[45px] shadow-sm border border-slate-100 overflow-hidden flex flex-col hover:shadow-2xl transition-all h-full group animate-fade-in-up">
                  <div className="h-56 relative overflow-hidden bg-slate-200">
                    <img 
                      src={post.imageUrl || `https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800`} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/60 to-transparent"></div>
                    <div className="absolute bottom-6 right-8">
                       <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm p-2 pr-5 rounded-full shadow-lg">
                          <img 
                            src={DOCTOR_IMAGE_URL} 
                            alt={DOCTOR_NAME} 
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-medical-green" 
                            onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800"; }}
                          />
                          <div className="flex flex-col">
                             <span className="text-[10px] font-black text-medical-blue leading-none">{DOCTOR_NAME}</span>
                             <span className="text-[7px] text-slate-500 font-bold uppercase">استشاري جراحة العظام</span>
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="p-10 pt-10 flex flex-col h-full">
                    <span className="text-[10px] font-black text-medical-green uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full w-fit mb-4">{post.category}</span>
                    <h2 className="text-2xl font-black text-medical-blue mb-6 leading-tight group-hover:text-medical-green transition-colors">{post.title}</h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-10 line-clamp-3 font-medium">{post.summary}</p>
                    <div className="mt-auto">
                      <button 
                        onClick={() => setSelectedPost(post)}
                        className="bg-slate-50 text-medical-blue px-8 py-4 rounded-2xl font-black text-xs hover:bg-medical-blue hover:text-white transition-all w-full text-center border border-slate-100"
                      >
                        تفاصيل المقال
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-4">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-medical-blue disabled:opacity-30 disabled:cursor-not-allowed hover:border-medical-green transition-all"
                >
                  <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
                </button>
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-14 h-14 rounded-2xl font-black transition-all ${currentPage === i + 1 ? 'bg-medical-blue text-white shadow-lg scale-110' : 'bg-white text-slate-400 border-2 border-slate-100'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-medical-blue disabled:opacity-30 disabled:cursor-not-allowed hover:border-medical-green transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 bg-white rounded-[60px] border-2 border-dashed border-slate-100">
             <div className="text-6xl mb-6 opacity-20">🔍</div>
             <h3 className="text-2xl font-black text-medical-blue mb-2">لا توجد مقالات تطابق هذا البحث</h3>
             <button onClick={() => {setSearchQuery(''); setSelectedCategory('الكل');}} className="mt-8 text-medical-green font-black underline">عرض جميع المقالات</button>
          </div>
        )}

        {/* Modal Overlay */}
        {selectedPost && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6 bg-medical-blue/80 backdrop-blur-md">
            <div className="bg-white w-full max-w-3xl rounded-[60px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col relative animate-fade-in-up">
              <button onClick={() => setSelectedPost(null)} className="absolute top-8 left-8 p-4 bg-white/80 backdrop-blur-sm rounded-full hover:bg-red-50 transition-all z-20 shadow-lg">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
              <div className="overflow-y-auto">
                <div className="h-72 relative">
                  <img src={selectedPost.imageUrl || `https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200`} alt={selectedPost.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                </div>
                <div className="p-12 -mt-20 relative z-10">
                  <span className="text-xs font-black text-medical-green uppercase tracking-widest bg-green-50 px-4 py-1 rounded-full">{selectedPost.category}</span>
                  <h2 className="text-4xl font-black text-medical-blue mt-6 leading-tight">{selectedPost.title}</h2>
                  
                  <div className="flex items-center gap-4 mt-8 mb-12 bg-slate-50 p-4 rounded-3xl w-fit">
                    <img 
                      src={DOCTOR_IMAGE_URL} 
                      alt={DOCTOR_NAME} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-medical-green" 
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800"; }}
                    />
                    <div>
                        <p className="text-sm font-black text-medical-blue">{DOCTOR_NAME}</p>
                        <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">كاتب المقال • {selectedPost.date}</p>
                    </div>
                  </div>

                  <div className="prose prose-slate max-w-none">
                    <div className="text-slate-700 text-xl leading-relaxed whitespace-pre-line font-medium border-r-4 border-medical-green pr-8">
                      {selectedPost.content}
                    </div>
                  </div>
                  
                  <div className="mt-16 pt-10 border-t border-slate-100 flex justify-center">
                    <button onClick={() => setSelectedPost(null)} className="bg-medical-blue text-white px-16 py-5 rounded-3xl font-black hover:bg-medical-green transition-all shadow-xl">إغلاق المقال</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
