
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  SURGICAL_SERVICES, 
  DOCTOR_NAME, 
  DOCTOR_SLOGAN,
  TRUST_MESSAGE,
  DOCTOR_IMAGE_URL,
  ACADEMIC_STATS,
  PHONE_CAIRO
} from '../constants';

const Home: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-50 overflow-hidden py-16">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-medical-green opacity-[0.03] -skew-x-12 translate-x-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-right z-10">
          <div className="animate-fade-in-up">
            <div className="inline-block px-4 py-1 rounded-full bg-medical-green/10 text-medical-green font-black text-xs uppercase tracking-widest mb-6">
              استشاري جراحة العظام والمناظير
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
  <div className="doctor-image-frame w-full max-w-md aspect-square bg-slate-200 p-2 border-4 border-white overflow-hidden rounded-[40px] shadow-2xl relative flex items-center justify-center">
    {!imgError ? (
      <img 
        src="https://raw.githubusercontent.com/montocristo2009-star/dr-Ashraf-Elazab-Clinic/5c7a4e111520e41218a05f93068b04e554bc89db/dr-ashraf.jpg.PNG"
        alt="دكتور أشرف العزب"
        className="w-full h-full object-cover rounded-[32px] block relative z-10"
        loading="eager"
        onError={() => setImgError(true)}
      />
    ) : (
      <div className="text-gray-500">Image failed to load</div>
    )}
  </div>
</div>
                <div className="flex flex-col items-center justify-center bg-medical-blue w-full h-full rounded-[32px]">
                   <span className="text-9xl">👨‍⚕️</span>
                   <p className="text-white/50 text-xs font-bold mt-4">Professional Profile</p>
                </div>
              )}
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-medical-green rounded-3xl -z-10 rotate-12"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ACADEMIC_STATS.map((stat, i) => (
              <div key={i} className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 text-center hover:bg-medical-blue group transition-all duration-500">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-4xl font-black text-medical-blue mb-2 group-hover:text-white">{stat.value}</div>
                <div className="text-sm font-black text-slate-400 group-hover:text-medical-green uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Surgical Services */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-medical-green font-black text-xs uppercase tracking-[0.3em] mb-4 block">Our Specialties</span>
          <h2 className="text-4xl md:text-5xl font-black text-medical-blue mb-16">الجراحات والمناظير المتطورة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-right">
            {SURGICAL_SERVICES.map(s => (
              <div key={s.id} className="bg-white p-12 rounded-[50px] shadow-sm hover:shadow-2xl transition-all border border-slate-100 group">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:bg-medical-green group-hover:text-white transition-all">
                  {s.icon}
                </div>
                <h3 className="text-2xl font-black text-medical-blue mb-4 leading-tight">{s.title}</h3>
                <p className="text-slate-500 font-bold text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-medical-blue text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-medical-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight">ابدأ رحلة التعافي اليوم <br/>بأمان تام</h2>
          <p className="text-2xl text-slate-400 mb-16 font-bold">"{TRUST_MESSAGE}"</p>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <Link to="/booking" className="btn-success text-white px-20 py-8 rounded-3xl font-black text-2xl shadow-2xl hover:scale-105 transition-all">
              احجز موعدك الآن
            </Link>
            <a href={`tel:${PHONE_CAIRO}`} className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-20 py-8 rounded-3xl font-black text-2xl hover:bg-white/20 transition-all">
              اتصل بنا هاتفياً
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
