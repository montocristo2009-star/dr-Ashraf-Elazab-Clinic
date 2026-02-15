import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  SURGICAL_SERVICES, 
  DOCTOR_NAME, 
  DOCTOR_SLOGAN,
  DOCTOR_IMAGE_URL,
  DOCTOR_SECONDARY_IMAGE_URL,
  ACADEMIC_STATS,
  PHONE_CAIRO,
  PHONE_MANSOURA,
  MANSOURA_MAP_URL,
  CAIRO_MAP_URL,
  TRUST_MESSAGE
} from '../constants';

const Home: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col min-h-screen font-cairo" dir="rtl">
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
              {DOCTOR_NAME} - استشاري جراحة العظام والمناظير - دكتوراة جامعة القاهرة وزميل البورد الأوروبي. نطبق أحدث التقنيات الجراحية والبيولوجية الموثقة دولياً.
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

      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {ACADEMIC_STATS.map((stat, i) => (
              <div key={i} className="bg-white p-10 rounded-[45px] shadow-sm hover:shadow-xl transition-all border border-slate-100 text-center group">
                <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform">{stat.icon}</span>
                <p className="text-4xl font-black text-medical-blue mb-2">{stat.value}</p>
                <p className="text-slate-400 font-black text-xs uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-medical-green font-black text-xs uppercase tracking-[0.5em] mb-4 block">Our Specialties</span>
            <h2 className="text-5xl font-black text-medical-blue mb-6">التخصصات الجراحية المتقدمة</h2>
            <div className="w-20 h-1.5 bg-medical-green mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SURGICAL_SERVICES.slice(0, 6).map((service) => (
              <div key={service.id} className="p-10 rounded-[45px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm group-hover:bg-medical-blue group-hover:text-white transition-all">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black text-medical-blue mb-4 leading-tight">{service.title}</h3>
                <p className="text-slate-500 font-bold leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
             <Link to="/booking" className="text-medical-green font-black text-lg underline hover:text-medical-blue transition-colors">عرض جميع التخصصات والحجز ←</Link>
          </div>
        </div>
      </section>

      {/* Meet the Doctor Mini-Section */}
      <section className="py-32 bg-medical-blue overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-white rotate-12"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="order-2 lg:order-1 text-right">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8">التخصص الدقيق يختصر الطريق</h2>
              <p className="text-white/70 text-xl font-bold mb-10 leading-relaxed">
                نحن لا نعالج الأعراض فقط، بل نبحث عن جذور المشكلة باستخدام أحدث ما توصل إليه العلم في جراحات المناظير والطب التجديدي.
              </p>
              <div className="space-y-6">
                 {[
                   "دكتوراة جراحة العظام والمناظير - جامعة القاهرة",
                   "زميل المجلس الأوروبي لجراحة العظام والكسور",
                   "خبير حقن البلازما والطب التجديدي الموثق دولياً"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-4 text-white font-black text-lg">
                      <span className="text-medical-green">✓</span>
                      <span>{item}</span>
                   </div>
                 ))}
              </div>
              <Link to="/about" className="inline-block mt-12 bg-white text-medical-blue px-10 py-5 rounded-2xl font-black hover:bg-medical-green hover:text-white transition-all">السيرة الذاتية الكاملة</Link>
           </div>
           <div className="order-1 lg:order-2">
              <div className="relative">
                 <div className="absolute -inset-4 bg-medical-green/20 rounded-[60px] blur-2xl"></div>
                 <img src={DOCTOR_SECONDARY_IMAGE_URL} alt={DOCTOR_NAME} className="relative z-10 w-full h-auto rounded-[60px] shadow-2xl border-8 border-white/10" />
              </div>
           </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-medical-blue mb-4">فروع العيادة</h2>
            <p className="text-slate-500 font-bold">نسعد باستقبالكم في ثلاثة فروع مجهزة بأحدث التقنيات</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white rounded-[50px] overflow-hidden shadow-xl border border-slate-100 hover:-translate-y-2 transition-transform duration-500">
               <div className="p-10">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-black text-medical-blue">فرع القاهرة</h3>
                    <span className="bg-medical-blue/5 text-medical-blue px-4 py-1 rounded-full text-[10px] font-black uppercase">Main Branch</span>
                  </div>
                  <p className="text-slate-500 font-bold mb-6">التجمع الخامس - عيادات روفيدا - الدور الثاني</p>
                  <a href={CAIRO_MAP_URL} target="_blank" rel="noreferrer" className="text-medical-green font-black underline flex items-center gap-2 group">
                    <span>عرض الموقع على الخريطة</span>
                    <span className="group-hover:translate-x-1 transition-transform">📍</span>
                  </a>
               </div>
            </div>
            <div className="bg-white rounded-[50px] overflow-hidden shadow-xl border border-slate-100 hover:-translate-y-2 transition-transform duration-500">
               <div className="p-10">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-black text-medical-blue">فرع المنصورة</h3>
                    <span className="bg-medical-blue/5 text-medical-blue px-4 py-1 rounded-full text-[10px] font-black uppercase">Delta Branch</span>
                  </div>
                  <p className="text-slate-500 font-bold mb-6">ميدان المحطة - فوق صيدلية مصر</p>
                  <a href={MANSOURA_MAP_URL} target="_blank" rel="noreferrer" className="text-medical-green font-black underline flex items-center gap-2 group">
                    <span>عرض الموقع على الخريطة</span>
                    <span className="group-hover:translate-x-1 transition-transform">📍</span>
                  </a>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-medical-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-medical-green opacity-5 -skew-y-6 translate-y-24"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
           <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">جاهز لاستعادة <br/>صحة عظامك؟</h2>
           <p className="text-white/60 text-xl font-bold mb-12 max-w-2xl mx-auto leading-relaxed">نحن نؤمن بأن كل مريض يستحق الرعاية الأفضل. ابدأ رحلة التعافي اليوم مع الأستاذ الدكتور أشرف العزب.</p>
           <Link to="/booking" className="inline-block bg-medical-green text-white px-16 py-6 rounded-[35px] font-black text-2xl shadow-2xl hover:bg-white hover:text-medical-blue transition-all transform hover:-translate-y-2">
              احجز موعدك الآن 🦴
           </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
