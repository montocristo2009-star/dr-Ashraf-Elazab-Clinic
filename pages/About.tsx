import React, { useState } from 'react';
import { 
  ACADEMIC_CREDENTIALS,
  FELLOWSHIPS_DETAILED,
  ACADEMIC_STATS,
  DOCTOR_NAME,
  TRUST_MESSAGE,
  DOCTOR_INTERNAL_PAGE_URL 
} from '../constants';

export default function About() {
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
                    src={DOCTOR_INTERNAL_PAGE_URL} 
                    alt={DOCTOR_NAME} 
                    className="w-full h-full object-cover rounded-[50px] shadow-inner"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center bg-medical-blue w-full h-full rounded-[50px]">
                     <span className="text-8xl">👨‍⚕️</span>
                     <p className="text-white/30 text-xs mt-6">Consultant Orthopedic Surgeon</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Fellowships Section */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-medical-blue mb-4">الزمالات والخبرات الدولية</h2>
            <div className="w-20 h-1.5 bg-medical-green mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FELLOWSHIPS_DETAILED.map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-[45px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h4 className="text-xl font-black text-medical-blue mb-2">{f.title}</h4>
                <p className="text-xs font-black text-medical-green uppercase tracking-widest mb-4">{f.subtitle}</p>
                <p className="text-slate-500 text-sm font-medium">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Academic Credentials */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-medical-blue mb-4">الاعتمادات الأكاديمية</h2>
            <div className="w-20 h-1.5 bg-medical-green mx-auto rounded-full"></div>
          </div>
          <div className="space-y-8">
            {ACADEMIC_CREDENTIALS.map((cred, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-12 p-12 rounded-[60px] border-2 ${cred.type === 'phd' ? 'bg-medical-blue text-white border-medical-blue' : 'bg-slate-50 border-slate-100 text-medical-blue'}`}>
                <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl bg-white/10 shadow-lg">
                  {cred.icon}
                </div>
                <div className="text-right">
                   <p className="text-xs font-black uppercase tracking-widest mb-2 opacity-60">{cred.title}</p>
                   <h3 className="text-3xl font-black mb-4">{cred.degree}</h3>
                   <p className="text-lg opacity-80">{cred.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
