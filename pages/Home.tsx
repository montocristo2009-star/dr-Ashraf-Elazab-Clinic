
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
        {/* Decorative elements */}
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
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed mb-10">
              استشاري جراحة العظام والمناظير - دكتوراة جامعة القاهرة وزميل البورد الأوروبي. نستخدم أحدث ما توصل إليه العلم في جراحات الركبة والكتف وإصابات الملاعب.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/booking" className="btn-primary text-white px-12 py-5 rounded-2xl font-black text-xl transition-all hover:scale-105">
                احجز موعدك الآن
              </Link>
              <Link to="/about" className="bg-white text-medical-blue border-2 border-slate-200 px-12 py-5 rounded-2xl font-black text-xl hover:border-medical-blue transition-all">
                السيرة الذاتية
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center animate-fade-in-up lg:justify-end">
            <div className="doctor-image-frame w-full max-w-md aspect-square bg-white p-3 border-4 border-white">
              <img 
                src={DOCTOR_IMAGE_URL} 
                alt={DOCTOR_NAME} 
                className="w-full h-full object-cover rounded-[32px]" 
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800";
                }}
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-50 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-medical-green rounded-full flex items-center justify-center text-white text-2xl">🏆</div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">خبرة أكثر من</p>
                    <p className="text-xl font-black text-medical-blue leading-none">20 عاماً</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {ACADEMIC_STATS.map((stat, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-medical-blue transition-all duration-500 hover:-translate-y-2">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-4xl font-black text-medical-blue mb-2 group-hover:text-white">{stat.value}</div>
                <div className="text-sm font-black text-slate-400 group-hover:text-medical-green uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Surgical Services Section */}
      <section id="surgical-services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-medical-green font-black text-xs uppercase tracking-[0.3em] mb-4 block">Advanced Surgery</span>
          <h2 className="text-4xl font-black text-medical-blue mb-4">العمليات الجراحية والمناظير</h2>
          <p className="text-slate-500 mb-16 font-bold max-w-2xl mx-auto">نستخدم تقنيات "التدخل المحدود" (Minimal Invasive) لضمان أسرع وقت للتعافي والعودة للحياة الطبيعية.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-right">
            {SURGICAL_SERVICES.map(s => (
              <div key={s.id} className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-2xl transition-all border border-slate-100 group hover:border-medical-green">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:btn-primary group-hover:text-white transition-all">
                  {s.icon}
                </div>
                <h3 className="text-xl font-black text-medical-blue mb-4">{s.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Non-Surgical Section */}
      <section id="non-surgical-services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-medical-green font-black text-xs uppercase tracking-[0.3em] mb-4 block">Regenerative Medicine</span>
          <h2 className="text-4xl font-black text-medical-blue mb-4">العلاجات غير الجراحية</h2>
          <p className="text-slate-500 mb-16 font-bold max-w-2xl mx-auto">نقدم حلولاً متطورة في الطب التجديدي لعلاج الخشونة والتهابات الأوتار بدون جراحة.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
            {NON_SURGICAL_SERVICES.map(s => (
              <div key={s.id} className="bg-slate-50 p-10 rounded-[40px] shadow-sm hover:shadow-2xl transition-all border border-slate-100 group hover:border-medical-green">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:btn-success group-hover:text-white transition-all">
                  {s.icon}
                </div>
                <h3 className="text-xl font-black text-medical-blue mb-4">{s.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-medical-blue text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-medical-green/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
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
