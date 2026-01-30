
import React from 'react';
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
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Intro Section - Branding */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32 border-b border-slate-100 pb-20">
          <div className="animate-fade-in-up text-right order-2 lg:order-1">
            <span className="text-medical-green font-black text-xs uppercase tracking-[0.3em] mb-4 block">Medical Academic Profile</span>
            <h1 className="text-5xl md:text-6xl font-black text-medical-blue mb-4 leading-tight">
              {DOCTOR_NAME}
            </h1>
            <p className="text-lg text-medical-green font-black mb-8 italic">
              "{TRUST_MESSAGE}"
            </p>
            <p className="text-xl text-slate-600 font-bold mb-10 leading-relaxed max-w-xl">
              استشاري جراحة العظام والمناظير. مسيرة أكاديمية دولية تمتد من جامعة القاهرة وصولاً إلى البورد الأوروبي وزمالات كبرى المراكز العالمية في ألمانيا وسويسرا وكوريا.
            </p>
            
            {/* Academic Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
               {ACADEMIC_STATS.map((stat, i) => (
                 <div key={i} className="flex flex-col p-6 bg-slate-50 rounded-[30px] border border-slate-100 text-center hover:bg-white hover:shadow-xl transition-all">
                    <span className="text-3xl mb-2">{stat.icon}</span>
                    <span className="text-2xl font-black text-medical-blue">{stat.value}</span>
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">{stat.label}</span>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-medical-blue/5 rounded-[60px] rotate-3 transition-transform group-hover:rotate-0"></div>
              <div className="bg-white p-4 rounded-[60px] shadow-2xl relative z-10 border border-slate-50">
                <img 
                  src={DOCTOR_IMAGE_URL} 
                  alt={DOCTOR_NAME} 
                  className="w-full aspect-[4/5] object-cover rounded-[50px] transition-all duration-1000 shadow-inner"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 1. Core Credentials (PhD & Board) */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-medical-blue mb-4">المؤهلات العلمية الرئيسية</h2>
            <div className="w-20 h-1 bg-medical-green mx-auto rounded-full"></div>
          </div>
          
          <div className="space-y-8">
            {ACADEMIC_CREDENTIALS.map((cred, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-10 p-12 rounded-[50px] border-2 transition-all ${
                cred.type === 'phd' ? 'bg-medical-blue text-white border-medical-blue shadow-2xl scale-[1.02]' : 'bg-slate-50 border-medical-green text-medical-blue'
              }`}>
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shadow-inner ${cred.type === 'phd' ? 'bg-white/10' : 'bg-white'}`}>
                  {cred.icon}
                </div>
                <div className="text-center md:text-right flex-grow">
                   <p className={`text-sm font-black uppercase tracking-[0.3em] mb-3 ${cred.type === 'phd' ? 'text-medical-green' : 'text-slate-400'}`}>{cred.title}</p>
                   <h3 className="text-3xl font-black mb-4">{cred.degree}</h3>
                   <p className={`text-lg leading-relaxed max-w-3xl ml-auto ${cred.type === 'phd' ? 'text-slate-400 font-bold' : 'text-slate-500 font-bold'}`}>
                     {cred.description}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fellowships detailed and other sections remain the same for stability */}
        <section className="mb-24 py-20 bg-slate-50 rounded-[80px] px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-medical-blue mb-4">الزمالات الدولية والتدريب المتقدم</h2>
            <p className="text-slate-500 font-bold">خبرات عالمية مجمعة من أرقى المراكز الطبية في أوروبا وآسيا.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {FELLOWSHIPS_DETAILED.map((f, i) => (
              <div key={i} className="bg-white p-10 rounded-[50px] shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h4 className="text-xl font-black text-medical-blue mb-4">{f.title}</h4>
                <p className="text-slate-500 font-bold leading-relaxed">{f.details}</p>
                <div className="mt-6 pt-6 border-t border-slate-50 text-xs font-black text-medical-green tracking-widest uppercase">{f.country}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
           <section className="bg-medical-blue text-white p-12 rounded-[60px] shadow-2xl">
              <h3 className="text-3xl font-black mb-10 text-medical-green flex items-center gap-4">
                <span>🔬</span> الأبحاث والنشر الدولي
              </h3>
              <ul className="space-y-6">
                {RESEARCH_INFO.map((info, i) => (
                  <li key={i} className="flex gap-4 items-start border-b border-white/10 pb-4 last:border-0">
                    <span className="text-medical-green">●</span>
                    <p className="font-bold leading-relaxed">{info}</p>
                  </li>
                ))}
              </ul>
           </section>

           <section className="bg-white p-12 rounded-[60px] shadow-sm border border-slate-100">
              <h3 className="text-3xl font-black mb-10 text-medical-blue flex items-center gap-4">
                <span>🌐</span> العضويات الدولية
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {INTERNATIONAL_MEMBERSHIPS.map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="font-black text-sm text-medical-blue">{m.title}</span>
                    <span className="text-[10px] font-black text-medical-green bg-white px-3 py-1 rounded-full shadow-sm">{m.code}</span>
                  </div>
                ))}
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default About;
