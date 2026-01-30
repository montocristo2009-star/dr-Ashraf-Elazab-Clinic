
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
  ACADEMIC_STATS
} from '../constants';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-slate-50 overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-right">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-black text-medical-blue mb-6 leading-tight">
              نُعيد لك <br/><span className="text-medical-green">حُرية الحركة</span>
            </h1>
            <p className="text-3xl text-medical-blue font-bold mb-4">{DOCTOR_NAME}</p>
            <p className="text-xl text-slate-500 font-medium mb-8 italic">{DOCTOR_SLOGAN}</p>
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed mb-10">
              استشاري جراحة العظام والمناظير - دكتوراة جامعة القاهرة وزميل البورد الأوروبي. متخصص في جراحات الركبة والكتف والمفاصل الصناعية.
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
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src={DOCTOR_IMAGE_URL} 
                alt={DOCTOR_NAME} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/40 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {ACADEMIC_STATS.map((stat, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-black text-medical-blue mb-2">{stat.value}</div>
                <div className="text-sm font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Surgical Services */}
      <section id="surgical-services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-medical-blue mb-4">العمليات الجراحية والمناظير</h2>
          <p className="text-slate-500 mb-16 font-bold">نستخدم أحدث تقنيات المناظير والتدخل المحدود لضمان تعافي أسرع.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-right">
            {SURGICAL_SERVICES.map(s => (
              <div key={s.id} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100">
                <div className="text-4xl mb-6">{s.icon}</div>
                <h3 className="text-xl font-black text-medical-blue mb-4">{s.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Non-Surgical Services */}
      <section id="non-surgical-services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-medical-blue mb-4">العلاجات غير الجراحية</h2>
          <p className="text-slate-500 mb-16 font-bold">حلول متطورة لعلاج الخشونة والآلام المزمنة بدون تدخل جراحي.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
            {NON_SURGICAL_SERVICES.map(s => (
              <div key={s.id} className="bg-slate-50 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100">
                <div className="text-4xl mb-6">{s.icon}</div>
                <h3 className="text-xl font-black text-medical-blue mb-4">{s.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-right">
          <h2 className="text-4xl font-black text-medical-blue mb-16 text-center">شهادات المرضى</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-white p-10 rounded-3xl border border-slate-100 italic">
                <p className="text-slate-600 text-lg mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-medical-blue text-white rounded-full flex items-center justify-center font-black">
                    {review.patientName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-medical-blue">{review.patientName}</p>
                    <p className="text-xs text-slate-400">{review.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-medical-blue text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-8 leading-tight">جاهز لاستعادة صحة عظامك؟</h2>
          <p className="text-xl text-slate-400 mb-10 font-medium">"{TRUST_MESSAGE}"</p>
          <Link to="/booking" className="inline-block bg-medical-green text-white px-16 py-6 rounded-2xl font-black text-2xl shadow-2xl hover:bg-white hover:text-medical-blue transition-all">
            احجز الآن
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
