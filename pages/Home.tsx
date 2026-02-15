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
      {/* باقي الأقسام ... */}
    </div>
  );
};

export default Home;