import React, { useState } from 'react';
import { SURGERY_GALLERY, DOCTOR_NAME } from '../constants';

const SurgicalGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  // التصفية لعرض صور العمليات الحقيقية فقط
  const surgicalImages = SURGERY_GALLERY.filter(img => img.category === 'كواليس العمليات');

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // صورة بديلة احترافية لغرفة عمليات عظام ومناظير
    e.currentTarget.src = "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800";
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-4 py-1 rounded-full bg-medical-blue/10 text-medical-blue font-black text-xs uppercase tracking-widest mb-6">
            Real Surgical Excellence
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-medical-blue mb-8 leading-tight">
            المعرض الجراحي <br/><span className="text-medical-green">التخصص والاحتراف</span>
          </h1>
          <p className="text-xl text-slate-500 font-bold max-w-3xl mx-auto italic leading-relaxed">
            "صور حقيقية توثق دقة الإجراءات الجراحية وتجهيزات غرف العمليات الحديثة."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {surgicalImages.map((img, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedImage(img)}
              className="group relative bg-white rounded-[50px] overflow-hidden aspect-video cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-700 border-8 border-white"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 text-right">
                <span className="text-medical-green font-black text-[10px] uppercase tracking-[0.3em] mb-3">Professional Surgery</span>
                <h3 className="text-white text-xl font-black leading-tight">{img.title}</h3>
                <div className="w-12 h-1 bg-medical-green rounded-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="fixed inset-0 z-[3000] bg-medical-blue/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10" onClick={() => setSelectedImage(null)}>
            <div className="max-w-6xl w-full flex flex-col items-center animate-fade-in" onClick={e => e.stopPropagation()}>
              <div className="relative w-full">
                 <button onClick={() => setSelectedImage(null)} className="absolute -top-16 left-0 md:left-auto md:right-0 bg-white/20 text-white p-5 rounded-full hover:bg-red-500 transition-all shadow-xl">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
                 </button>
                 <div className="bg-white p-2 rounded-[50px] shadow-2xl border-8 border-white/5">
                   <img 
                    src={selectedImage.url} 
                    alt={selectedImage.title} 
                    className="max-h-[80vh] w-full object-contain mx-auto rounded-[40px]" 
                    onError={handleImageError}
                   />
                 </div>
              </div>
              <div className="mt-10 text-center bg-white/10 backdrop-blur-sm px-10 py-6 rounded-[30px]">
                <h2 className="text-3xl font-black text-white">{selectedImage.title}</h2>
                <p className="text-medical-green font-black text-sm uppercase tracking-widest mt-2">جراحات أ.د. أشرف العزب</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurgicalGallery;