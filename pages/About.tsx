import React, { useState } from 'react';
import { 
  ACADEMIC_CREDENTIALS,
  FELLOWSHIPS_DETAILED,
  INTERNATIONAL_MEMBERSHIPS,
  RESEARCH_INFO,
  ACADEMIC_STATS,
  DOCTOR_NAME,
  TRUST_MESSAGE,
  DOCTOR_SECONDARY_IMAGE_URL 
} from '../constants';

const About: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Intro Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="animate-fade-in-up text-right order-2 lg:order-1">
            <span className="text-medical-green font-black text-xs uppercase tracking-[0.3em] mb-4 block">Medical Academic Profile</span>
            <h1 className="text-5xl md:text-6xl font-black text-medical-blue mb-4 leading-tight">
              {DOCTOR_NAME}
            </h1>
            <p className="text-xl text-medical-green font-black mb-8 italic">
              "{TRUST_MESSAGE}"
            </p>
            <p className="text-xl text-slate-600 font-bold mb-12 leading-relaxed max-w-xl">
              استشاري جراحة العظام والمناظير بمستشفيات جامعة القاهرة. خبير دولي في جراحات استبدال المفاصل وتدريس الأطراف الصناعية المتقدمة.
            </p>
            
            <div className="grid grid-cols-3 gap-6">
               {ACADEMIC_STATS.map((stat, i) => (
                 <div key={i} className="flex flex-col p-6 bg-slate-50 rounded-[35px] border border-slate-100 text-center hover:bg-white hover:shadow-xl transition-all">
                    <span className="text-3xl mb-3">{stat.icon}</span>
                    <span className="text-2xl font-black text-medical-blue">{stat.value}</span>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{stat.label}</span>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-medical-green rounded-[60px] rotate-6 transition-transform group-hover:rotate-0 -z-10"></div>
              <div className="bg-white p-4 rounded-[60px] shadow-2xl relative z-10 border border-slate-50 aspect-[4/5] overflow-hidden flex items-center justify-center">
                {!imgError ? (
                  <img 
                    src={DOCTOR_SECONDARY_IMAGE_URL} 
                    alt={DOCTOR_NAME} 
                    className="w-full h-full object-cover rounded-[50px] shadow-inner"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center bg-medical-blue w-full h-full rounded-[50px]">
                     <span className="text-9xl">👨‍⚕️</span>
                     <p className="text-white/30 text-xs mt-6">Consultant Orthopedic Surgeon</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        {/* باقي السيرة الذاتية ... */}
      </div>
    </div>
  );
};

export default About;