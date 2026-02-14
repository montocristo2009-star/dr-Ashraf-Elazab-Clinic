import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  SURGICAL_SERVICES, 
  DOCTOR_NAME, 
  DOCTOR_SLOGAN,
  DOCTOR_IMAGE_URL,
  PHONE_CAIRO,
  PHONE_MANSOURA,
  MANSOURA_MAP_URL,
  CAIRO_MAP_URL
} from '../constants';

const Home: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center bg-white overflow-hidden py-24">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-medical-blue/[0.02] -skew-x-12 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-medical-green/[0.02] rounded-full blur-[120px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-right z-10">
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-1 bg-medical-green rounded-full"></div>
               <span className="text-medical-green font-black text-[11px] uppercase tracking-[0.4em]">International Orthopedic Expert</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-medical-blue mb-8 leading-[1.1]">
              نُعيد لك <br/><span className="text-medical-green">حُرية الحركة</span> <br/>بابتكار عالمي
            </h1>
            <p className="text-xl text-slate-500 font-bold mb-10 leading-relaxed max-w-xl">
              استشاري جراحة العظام والمناظير - دكتوراة جامعة القاهرة وزميل البورد الأوروبي. نطبق أحدث التقنيات الجراحية والبيولوجية الموثقة دولياً لعلاجك.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/booking" className="btn-primary text-white px-12 py-6 rounded-[30px] font-black text-xl transition-all hover:scale-105 shadow-2xl">
                احجز موعدك الآن
              </Link>
              <Link to="/ai-assistant" className="bg-white text-medical-blue border-2 border-slate-100 px-12 py-6 rounded-[30px] font-black text-xl hover:bg-slate-50 transition-all shadow-xl">
                المساعد الذكي ✨
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center animate-fade-in-up">
            <div className="relative w-full max-w-lg">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-medical-green/10 rounded-full blur-3xl"></div>
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-medical-blue/10 rounded-full blur-3xl"></div>
               <div className="doctor-image-frame p-2 bg-white border border-slate-100 shadow-[0_50px_100px_-20px_rgba(30,58,90,0.15)] overflow-hidden rounded-[80px] relative z-10">
                 {!imgError ? (
                   <img src={DOCTOR_IMAGE_URL} alt={DOCTOR_NAME} className="w-full h-full object-cover rounded-[72px]" onError={() => setImgError(true)} />
                 ) : (
                   <div className="flex flex-col items-center justify-center bg-medical-blue aspect-square rounded-[72px] text-white">
                      <span className="text-8xl">👨‍⚕️</span>
                      <p className="mt-4 font-black">أ.د. أشرف العزب</p>
                   </div>
                 )}
               </div>
               <div className="absolute top-1/4 -right-12 bg-white p-6 rounded-[35px] shadow-2xl border border-slate-50 flex items-center gap-4 animate-bounce duration-[3000ms] z-20">
                  <span className="text-3xl">🇪🇺</span>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-medical-green uppercase tracking-widest">Board Certified</p>
                    <p className="text-sm font-black text-medical-blue">زميل البورد الأوروبي</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Spotlight - Moving it up for visibility */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-12 bg-medical-blue rounded-[70px] text-white relative overflow-hidden group border-4 border-medical-green/20">
             <div className="absolute top-0 right-0 w-64 h-64 bg-medical-green/10 rounded-full blur-[100px]"></div>
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-right">
                   <div className="inline-block px-4 py-1.5 bg-medical-green text-white rounded-xl text-[10px] font-black uppercase tracking-widest mb-6">International Patent / Innovation</div>
                   <h3 className="text-4xl font-black mb-6 leading-tight">حقن البلازما العلاجية <br/><span className="text-medical-green">بتقنية من ابتكارنا موثقة دولياً</span></h3>
                   <p className="text-slate-300 font-bold text-lg leading-relaxed mb-8">
                      ننفرد بتقديم تقنية متطورة في حقن البلازما الغنية بالصفائح تم ابتكارها وتوثيقها دولياً، لضمان أعلى تركيز وفعالية في التئام الأنسجة وعلاج الخشونة دون تدخل جراحي تقليدي.
                   </p>
                   <Link to="/booking" className="inline-flex items-center gap-4 bg-medical-green text-white px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all">
                      استفسر عن هذه التقنية
                   </Link>
                </div>
                <div className="flex justify-center">
                   <div className="w-80 h-80 bg-white/5 rounded-full flex items-center justify-center border-2 border-white/10 relative">
                      <div className="absolute inset-0 border-4 border-medical-green/30 rounded-full animate-ping opacity-20"></div>
                      <div className="text-center">
                         <span className="text-9xl block mb-4">🧪</span>
                         <span className="text-[10px] font-black uppercase tracking-[0.4em] text-medical-green">World-Class Standard</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-slate-50/50" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-medical-green font-black text-[11px] uppercase tracking-[0.4em] mb-4 block">Our Specialized Services</span>
            <h2 className="text-5xl md:text-6xl font-black text-medical-blue mb-8">خدماتنا والعمليات الجراحية</h2>
            <div className="w-20 h-1.5 bg-medical-green mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {SURGICAL_SERVICES.map(s => (
              <div key={s.id} className="bg-white p-10 rounded-[50px] shadow-sm hover:shadow-2xl transition-all border border-slate-100 group flex flex-col text-right hover:border-medical-green duration-500 relative overflow-hidden h-full">
                <div className="w-16 h-16 bg-slate-50 rounded-[20px] flex items-center justify-center text-3xl group-hover:bg-medical-green group-hover:text-white transition-all shadow-inner mb-6">
                  {s.icon}
                </div>
                <h3 className="text-xl font-black text-medical-blue mb-4 group-hover:text-medical-green transition-colors leading-tight">
                  {s.title}
                </h3>
                <p className="text-slate-500 font-bold text-sm leading-relaxed mb-8 flex-grow">{s.description}</p>
                <Link to="/booking" className="text-medical-blue font-black text-xs flex items-center gap-2 group-hover:translate-x-[-10px] transition-transform">
                   <span>احجز الآن</span>
                   <span className="text-lg">←</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-medical-green font-black text-[11px] uppercase tracking-[0.4em] mb-4 block">Our Locations</span>
            <h2 className="text-5xl font-black text-medical-blue">فروع العيادة</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              { name: "فرع القاهرة", area: "التجمع الخامس", addr: "عيادات CMC - خلف المستشفى الجوي التخصصي", phone: PHONE_CAIRO, map: CAIRO_MAP_URL, icon: "🏙️" },
              { name: "فرع المنصورة", area: "وسط المدينة", addr: "ميدان المحطة - برج اللؤلؤة", phone: PHONE_MANSOURA, map: MANSOURA_MAP_URL, icon: "🏛️" }
            ].map((loc, i) => (
              <div key={i} className="bg-slate-50 p-12 rounded-[70px] shadow-sm hover:shadow-2xl transition-all border border-slate-100 flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-white rounded-[35px] flex items-center justify-center text-5xl mb-8 group-hover:scale-110 transition-transform shadow-sm">{loc.icon}</div>
                <h3 className="text-3xl font-black mb-2 text-medical-blue">{loc.name}</h3>
                <p className="text-medical-green font-black text-xs uppercase tracking-widest mb-6">{loc.area}</p>
                <p className="text-lg font-bold mb-10 text-slate-500 max-w-sm leading-relaxed">{loc.addr}</p>
                <div className="bg-white px-8 py-5 rounded-3xl mb-12 flex flex-col items-center shadow-inner border border-slate-100">
                   <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">اتصل للحجز</span>
                   <p className="text-2xl font-black text-medical-blue tracking-tighter">{loc.phone}</p>
                </div>
                <a href={loc.map} target="_blank" rel="noreferrer" className="bg-medical-blue text-white px-12 py-6 rounded-[30px] font-black text-lg shadow-xl hover:bg-medical-green transition-all w-full flex items-center justify-center gap-3">
                   <span>فتح في خرائط جوجل 📍</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;