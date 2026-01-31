
import React, { useState } from 'react';
import { 
  ACADEMIC_CREDENTIALS,
  FELLOWSHIPS_DETAILED,
  INTERNATIONAL_MEMBERSHIPS,
  RESEARCH_INFO,
  ACADEMIC_STATS,
  DOCTOR_NAME,
  TRUST_MESSAGE,
  DOCTOR_IMAGE_URL 
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
              استشاري جراحة العظام والمناظير وجراحات تعديل الاستقامة وجراحات الكسور . خبير دولي في جراحات استبدال المفاصل وجراحات المناظير المتقدمة.
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
                    src={DOCTOR_IMAGE_URL} 
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

        {/* Fellowships Section */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-medical-blue mb-4">الزمالات والخبرات الدولية</h2>
            <p className="text-slate-500 font-bold">تخصص دقيق في المفاصل الصناعية وترميم الكسور من أرقى جامعات العالم</p>
            <div className="w-20 h-1.5 bg-medical-green mx-auto rounded-full mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FELLOWSHIPS_DETAILED.map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-[45px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform shadow-inner">
                  {f.icon}
                </div>
                <h4 className="text-xl font-black text-medical-blue mb-2 leading-tight">{f.title}</h4>
                <p className="text-xs font-black text-medical-green uppercase tracking-widest mb-4">{f.subtitle}</p>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{f.description}</p>
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
              <div key={i} className={`flex flex-col md:flex-row items-center gap-12 p-12 rounded-[60px] border-2 transition-all ${
                cred.type === 'phd' ? 'bg-medical-blue text-white border-medical-blue shadow-2xl scale-[1.02]' : 'bg-slate-50 border-slate-100 text-medical-blue'
              }`}>
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shadow-lg ${cred.type === 'phd' ? 'bg-white/10' : 'bg-white'}`}>
                  {cred.icon}
                </div>
                <div className="text-center md:text-right flex-grow">
                   <p className={`text-[10px] font-black uppercase tracking-[0.4em] mb-3 ${cred.type === 'phd' ? 'text-medical-green' : 'text-slate-400'}`}>{cred.title}</p>
                   <h3 className="text-3xl font-black mb-4">{cred.degree}</h3>
                   <p className={`text-lg leading-relaxed max-w-4xl ml-auto ${cred.type === 'phd' ? 'text-slate-400 font-bold' : 'text-slate-500 font-bold'}`}>
                     {cred.description}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Memberships Grid */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-medical-blue mb-4">العضويات المهنية الدولية والمحلية</h2>
            <div className="w-20 h-1.5 bg-medical-green mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INTERNATIONAL_MEMBERSHIPS.map((m, i) => (
              <div key={i} className="flex items-center justify-between p-8 bg-slate-50 rounded-[35px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <span className="text-2xl group-hover:scale-125 transition-transform">{m.icon}</span>
                  <div className="text-right">
                    <h5 className="font-black text-medical-blue text-sm">{m.title}</h5>
                    <span className="text-[10px] font-black text-medical-green uppercase tracking-widest">{m.code}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Research Info */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 mb-24">
           <section className="bg-white border-4 border-slate-50 p-16 rounded-[70px] shadow-xl relative overflow-hidden">
              <h3 className="text-3xl font-black mb-10 text-medical-blue flex items-center gap-6">
                <span>🔬</span> الخبرة الأكاديمية والبحثية
              </h3>
              <ul className="space-y-8">
                {RESEARCH_INFO.map((info, i) => (
                  <li key={i} className="flex gap-6 items-start border-b border-slate-100 pb-6 last:border-0">
                    <span className="text-medical-green text-2xl">●</span>
                    <p className="font-bold text-lg leading-relaxed text-slate-600">{info}</p>
                  </li>
                ))}
              </ul>
           </section>
        </div>
      </div>
    </div>
  );
};

export default About;
