import React, { useState } from 'react';
import { SURGERY_GALLERY, DOCTOR_NAME } from '../constants';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('الكل');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const categories = ['الكل', ...Array.from(new Set(SURGERY_GALLERY.map(img => img.category)))];

  const filteredImages = filter === 'الكل' 
    ? SURGERY_GALLERY 
    : SURGERY_GALLERY.filter(img => img.category === filter);

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-medical-green font-black text-xs uppercase tracking-widest mb-4 block">Surgical Excellence</span>
          <h1 className="text-5xl font-black text-medical-blue mb-6">كواليس النجاح</h1>
          <p className="text-lg text-slate-500 font-bold max-w-2xl mx-auto italic">
            "جولة بصرية حقيقية من داخل غرف العمليات والعيادة، توثق دقة العمل والتجهيزات الحديثة للأستاذ الدكتور أشرف العزب."
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full font-black text-xs transition-all ${
                filter === cat 
                ? 'bg-medical-blue text-white shadow-lg scale-105' 
                : 'bg-white text-slate-400 border border-slate-100 hover:text-medical-green hover:border-medical-green'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((img, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedImage(img)}
              className="group relative bg-white rounded-[40px] overflow-hidden aspect-square cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 text-right">
                <span className="text-medical-green font-black text-[10px] uppercase tracking-widest mb-2">{img.category}</span>
                <h3 className="text-white text-lg font-black">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="fixed inset-0 z-[3000] bg-medical-blue/90 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setSelectedImage(null)}>
            <div className="max-w-5xl w-full flex flex-col items-center animate-fade-in" onClick={e => e.stopPropagation()}>
              <div className="relative w-full">
                 <button onClick={() => setSelectedImage(null)} className="absolute -top-16 left-0 bg-white/20 text-white p-4 rounded-full hover:bg-white/40 transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
                 </button>
                 <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title} 
                  className="max-h-[75vh] mx-auto object-contain rounded-[40px] shadow-2xl border-4 border-white/10" 
                />
              </div>
              <div className="mt-8 text-center">
                <h2 className="text-2xl font-black text-white">{selectedImage.title}</h2>
                <p className="text-medical-green font-bold mt-2 italic">بواسطة {DOCTOR_NAME}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
