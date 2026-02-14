import React, { useState } from 'react';
import { SURGERY_GALLERY, DOCTOR_NAME } from '../constants';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('بوسترات طبية');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const categories = ['الكل', 'بوسترات طبية', 'كواليس العمليات'];

  const filteredImages = filter === 'الكل' 
    ? SURGERY_GALLERY 
    : SURGERY_GALLERY.filter(img => img.category === filter);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // في حالة فشل التحميل، نعرض صورة طبية احترافية عامة في العظام بدلاً من صور القلب
    e.currentTarget.src = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800";
    e.currentTarget.classList.add('opacity-40');
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-4 py-1 rounded-full bg-medical-green/10 text-medical-green font-black text-xs uppercase tracking-widest mb-6">
            Expert Visualization
          </div>
          <h1 className="text-5xl font-black text-medical-blue mb-6">المكتبة الطبية والبوسترات</h1>
          <p className="text-lg text-slate-500 font-bold max-w-2xl mx-auto italic">
            "نُبسط لك المعلومات الطبية لنضمن لك وعياً كاملاً بحالتك الصحية."
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-10 py-4 rounded-2xl font-black text-sm transition-all duration-300 ${
                filter === cat 
                ? 'bg-medical-blue text-white shadow-2xl scale-105' 
                : 'bg-white text-slate-400 border border-slate-200 hover:text-medical-green hover:border-medical-green shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredImages.map((img, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedImage(img)}
              className={`group relative bg-white rounded-[40px] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 ${img.category === 'بوسترات طبية' ? 'aspect-[3/4.5]' : 'aspect-square'}`}
            >
              <div className="w-full h-full relative">
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  onError={handleImageError}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/90 via-medical-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 text-right">
                  <span className="text-medical-green font-black text-[10px] uppercase tracking-[0.3em] mb-3">{img.category}</span>
                  <h3 className="text-white text-xl font-black leading-tight mb-4">{img.title}</h3>
                  <div className="w-12 h-1 bg-medical-green rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 z-[3000] bg-medical-blue/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10" onClick={() => setSelectedImage(null)}>
            <div className="max-w-5xl w-full flex flex-col items-center animate-fade-in" onClick={e => e.stopPropagation()}>
              <div className="relative w-full">
                 <button onClick={() => setSelectedImage(null)} className="absolute -top-16 left-0 md:left-auto md:right-0 bg-white/20 text-white p-5 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-xl backdrop-blur-md">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
                 </button>
                 <div className="bg-white p-2 rounded-[40px] shadow-2xl overflow-hidden border-8 border-white/5">
                   <img 
                    src={selectedImage.url} 
                    alt={selectedImage.title} 
                    className="max-h-[80vh] w-full object-contain mx-auto" 
                    onError={handleImageError}
                   />
                 </div>
              </div>
              <div className="mt-10 text-center bg-white/10 backdrop-blur-sm px-10 py-6 rounded-[30px] border border-white/10">
                <h2 className="text-2xl md:text-3xl font-black text-white">{selectedImage.title}</h2>
                <div className="flex items-center justify-center gap-4 mt-3">
                  <span className="text-medical-green font-black text-sm uppercase tracking-widest">{selectedImage.category}</span>
                  <span className="text-white/20">|</span>
                  <p className="text-white/60 font-bold text-sm">عيادة {DOCTOR_NAME}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;