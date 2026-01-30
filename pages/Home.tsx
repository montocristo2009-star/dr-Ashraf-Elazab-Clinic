
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
  // Fix: Missing import for PHONE_CAIRO used in the CTA section
  PHONE_CAIRO
} from '../constants';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-slate-50 overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-right">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-black text-medical-blue mb-6 leading-tight">
              نُعيد لك <br/><span className="text-medical-green">حُرية الحركة</span>
            </h1>
            <p className="text-3xl text-medical-blue font-bold mb-4">{DOCTOR_NAME}</p>
            <p className="text-xl text-slate-500 font-medium mb-8 italic">{DOCTOR_SLOGAN}</p>
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed mb-10">
              استشاري جراحة العظام والمناظير - دكتوراة جامعة القاهرة وزميل البورد الأوروبي. متخصص في جراحات الركبة والكتف والمفاصل الصناعية الدقيقة.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/booking" className="bg-medical-blue text-white px-12 py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-medical-green transition-all">
                احجز موعدك الآن
              </Link>
              <Link to="/about" className="bg-white text-medical-blue border border-slate-200 px-12 py-5 rounded-2xl font-black text-xl hover:border-medical-blue transition-all">
                عن الدكتور
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center animate-fade-in-up">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src={DOCTOR_IMAGE_URL} 
                alt={DOCTOR_NAME} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                    // Fallback in case the user forgets to upload the image
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/40 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {ACADEMIC_STATS.map((stat, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-medical-blue transition-all duration-500">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-4xl font-black text-medical-blue mb-2 group-hover:text-white">{stat.value}</div>
                <div className="text-sm font-black text-slate-400 group-hover:text-medical-green uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-px bg-slate-100 max-w-7xl mx-auto"></div>

      {/* Surgical Services Section */}
      <section id="surgical-services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-medical-green font-black text-xs uppercase tracking-[0.3em] mb-4 block">Advanced Surgery</span>
          <h2 className="text-4xl font-black text-medical-blue mb-4">العمليات الجراحية والمناظير</h2>
          <p className="text-slate-500 mb-16 font-bold max-w-2xl mx-auto">نستخدم أحدث تقنيات المناظير والتدخل المحدود لضمان أقل ألم ممكن وسرعة تعافي استثنائية.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-right">
            {SURGICAL_SERVICES.map(s => (
              <div key={s.id} className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-2xl transition-all border border-slate-100 group">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:bg-medical-blue group-hover:text-white transition-all">
                  {s.icon}
                </div>
                <h3 className="text-xl font-black text-medical-blue mb-4">{s.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Non-Surgical Services Section */}
      <section id="non-surgical-services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-medical-green font-black text-xs uppercase tracking-[0.3em] mb-4 block">Regenerative Medicine</span>
          <h2 className="text-4xl font-black text-medical-blue mb-4">العلاجات غير الجراحية</h2>
          <p className="text-slate-500 mb-16 font-bold max-w-2xl mx-auto">حلول متطورة تعتمد على الطب التجديدي لعلاج الخشونة والآلام المزمنة بدون الحاجة لمشرط الجراح.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
            {NON_SURGICAL_SERVICES.map(s => (
              <div key={s.id} className="bg-slate-50 p-10 rounded-[40px] shadow-sm hover:shadow-2xl transition-all border border-slate-100 group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:bg-medical-green group-hover:text-white transition-all">
                  {s.icon}
                </div>
                <h3 className="text-xl font-black text-medical-blue mb-4">{s.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-slate-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 text-right relative z-10">
          <h2 className="text-4xl font-black text-medical-blue mb-16 text-center">شهادات المرضى</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-white p-12 rounded-[50px] border border-slate-100 italic relative group hover:scale-[1.02] transition-transform">
                <span className="absolute -top-4 -right-4 text-8xl text-medical-green/10 select-none">“</span>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed relative z-10">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-medical-blue text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg group-hover:bg-medical-green transition-colors">
                    {review.patientName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-medical-blue">{review.patientName}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{review.source} • {review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-medical-blue text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-medical-green/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">جاهز لاستعادة صحة عظامك؟</h2>
          <p className="text-xl text-slate-400 mb-12 font-medium">"{TRUST_MESSAGE}"</p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link to="/booking" className="bg-medical-green text-white px-16 py-6 rounded-2xl font-black text-2xl shadow-2xl hover:bg-white hover:text-medical-blue transition-all transform hover:-translate-y-2">
              احجز موعد كشف
            </Link>
            <a href={`tel:${PHONE_CAIRO}`} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-16 py-6 rounded-2xl font-black text-2xl hover:bg-white/20 transition-all">
              اتصل بنا
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
