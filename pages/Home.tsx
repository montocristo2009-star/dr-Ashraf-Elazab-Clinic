
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  SURGICAL_SERVICES, 
  NON_SURGICAL_SERVICES,
  DOCTOR_NAME, 
  DOCTOR_SLOGAN,
  TRUST_MESSAGE,
  DOCTOR_IMAGE_URL,
  REVIEWS,
  ACADEMIC_STATS,
  PHONE_CAIRO
} from '../constants';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-50 overflow-hidden py-16">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-medical-green opacity-[0.03] -skew-x-12 translate-x-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-right z-10">
          <div className="animate-fade-in-up">
            <div className="inline-block px-4 py-1 rounded-full bg-medical-green/10 text-medical-green font-black text-xs uppercase tracking-widest mb-6">
              نخبة جراحة العظام في مصر
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-medical-blue mb-6 leading-[1.15]">
              نُعيد لك <br/><span className="text-medical-green">حُرية الحركة</span> <br/>بدقة عالمية
            </h1>
            <p className="text-3xl text-medical-blue font-bold mb-4">{DOCTOR_NAME}</p>
            <p className="text-xl text-slate-500 font-medium mb-8 italic">{DOCTOR_SLOGAN}</p>
            <div className="flex flex-wrap gap-6">
              <Link to="/booking" className="btn-primary text-white px-12 py-5 rounded-2xl font-black text-xl transition-all hover:scale-105">
                احجز موعدك الآن
              </Link>
              <Link to="/ai-assistant" className="bg-medical-green text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-medical-blue transition-all shadow-xl">
                المساعد الذكي ✨
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center animate-fade-in-up lg:justify-end">
            <div className="doctor-image-frame w-full max-w-md aspect-square bg-white p-3 border-4 border-white overflow-hidden rounded-[40px]">
              <img 
                src={DOCTOR_IMAGE_URL} 
                alt={DOCTOR_NAME} 
                className="w-full h-full object-cover rounded-[32px]" 
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Smart Clinic Promotion */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-50 rounded-[60px] p-12 md:p-20 relative border border-slate-100 flex flex-col lg:flex-row items-center gap-16">
             <div className="lg:w-1/2 text-right">
                <span className="text-medical-green font-black text-xs uppercase tracking-[0.4em] mb-4 block">Smart Medical Care</span>
                <h2 className="text-4xl md:text-5xl font-black text-medical-blue mb-8 leading-tight">استخدم تقنياتنا <br/>الذكية قبل زيارتك</h2>
                <p className="text-lg text-slate-500 font-bold mb-10 leading-relaxed">
                  وفرنا لك نظاماً متكاملاً من الذكاء الاصطناعي ليرافقك في رحلة علاجك. تحدث مع مساعدنا الصوتي، أو استفسر كتابياً عن أي معلومة طبية، أو شاهد فيديوهات توضيحية لحالتك.
                </p>
                <Link to="/ai-assistant" className="inline-block bg-medical-blue text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-medical-green transition-all shadow-2xl">
                   دخول العيادة الذكية 🤖
                </Link>
             </div>
             <div className="lg:w-1/2 relative flex justify-center">
                <div className="w-64 h-64 bg-medical-green rounded-full flex items-center justify-center text-8xl shadow-2xl animate-pulse">🤖</div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-medical-blue rounded-3xl -translate-y-1/2 translate-x-1/2 flex items-center justify-center text-4xl shadow-xl">🎙️</div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-3xl translate-y-1/2 -translate-x-1/2 flex items-center justify-center text-4xl shadow-xl border border-slate-100">🔬</div>
             </div>
          </div>
        </div>
      </section>

      {/* Academic Stats */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {ACADEMIC_STATS.map((stat, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-slate-100 group hover:bg-medical-blue transition-all duration-500">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-4xl font-black text-medical-blue mb-2 group-hover:text-white">{stat.value}</div>
                <div className="text-sm font-black text-slate-400 group-hover:text-medical-green uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services and CTA below */}
      <section id="surgical-services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-medical-blue mb-4">العمليات الجراحية والمناظير</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-right mt-16">
            {SURGICAL_SERVICES.map(s => (
              <div key={s.id} className="bg-slate-50 p-10 rounded-[40px] shadow-sm hover:shadow-2xl transition-all border border-slate-100 group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:bg-medical-blue group-hover:text-white transition-all">
                  {s.icon}
                </div>
                <h3 className="text-xl font-black text-medical-blue mb-4">{s.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-medical-blue text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">ابدأ رحلة التعافي اليوم</h2>
          <p className="text-xl text-slate-400 mb-12 font-medium">"{TRUST_MESSAGE}"</p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link to="/booking" className="btn-success text-white px-16 py-6 rounded-2xl font-black text-2xl shadow-2xl hover:scale-105 transition-all">
              احجز موعد كشف
            </Link>
            <a href={`tel:${PHONE_CAIRO}`} className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-16 py-6 rounded-2xl font-black text-2xl hover:bg-white/20 transition-all">
              تحدث إلينا مباشرة
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
