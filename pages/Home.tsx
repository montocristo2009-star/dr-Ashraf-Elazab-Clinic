
import React, { useState } from 'react';
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
import { Service } from '../types';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className={`glass-card p-10 rounded-[50px] shadow-sm transition-all duration-700 flex flex-col h-full group ${isExpanded ? 'ring-2 ring-medical-green shadow-2xl bg-white scale-[1.02]' : 'hover:shadow-2xl hover:-translate-y-3'}`}>
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-medical-green/10 blur-3xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-1000"></div>
        <div className="relative text-5xl bg-slate-50 w-24 h-24 flex items-center justify-center rounded-[35px] group-hover:bg-medical-blue group-hover:text-white transition-all duration-700 shadow-inner group-hover:rotate-12">
          {service.icon}
        </div>
      </div>
      
      <h3 className="text-2xl font-black text-medical-blue mb-4 leading-tight group-hover:text-medical-green transition-colors">{service.title}</h3>
      <p className="text-slate-500 text-lg mb-8 flex-grow leading-relaxed font-medium">
        {service.description}
      </p>
      
      {isExpanded && (
        <div className="pt-8 border-t border-slate-100 text-slate-600 text-sm leading-relaxed animate-fade-in-up bg-slate-50/50 p-6 rounded-[35px] mb-8 font-bold border-2 border-dashed border-medical-green/20">
          استشاري جراحة العظام والمناظير أ.د. أشرف العزب يطبق أحدث المعايير الدولية في {service.title}، باستخدام تقنيات التدخل المحدود لضمان أقل ألم ممكن وسرعة العودة للحياة الطبيعية.
        </div>
      )}
      
      <button 
        onClick={() => setIsExpanded(!isExpanded)} 
        className="mt-auto group/btn flex items-center gap-4 self-start"
      >
        <div className="w-12 h-12 rounded-2xl bg-medical-accent flex items-center justify-center group-hover/btn:bg-medical-green group-hover/btn:text-white transition-all shadow-sm">
          <svg className={`w-6 h-6 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
        </div>
        <span className="text-medical-blue font-black text-xs uppercase tracking-widest group-hover/btn:text-medical-green transition-colors">
          {isExpanded ? 'إغلاق التفاصيل' : 'استعراض التفاصيل'}
        </span>
      </button>
    </div>
  );
};

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'surgical' | 'non-surgical'>('surgical');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-white pt-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-medical-green/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-medical-blue/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-right">
          <div className="animate-fade-in-up order-2 lg:order-1">
            <div className="inline-block px-8 py-3 bg-medical-blue/5 text-medical-blue rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-12 border border-medical-blue/10 backdrop-blur-md">
              World-Class Orthopedic Care
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-medical-blue mb-10 leading-[1.05] tracking-tighter">
              نُعيد لك <br/><span className="text-medical-green">حُرية الحركة</span>
            </h1>
            <div className="mb-12 border-r-8 border-medical-green pr-8 py-2">
              <p className="text-4xl md:text-5xl text-medical-blue font-black mb-4">
                {DOCTOR_NAME}
              </p>
              <p className="text-xl text-slate-400 font-bold italic">
                {DOCTOR_SLOGAN}
              </p>
            </div>
            <p className="text-2xl text-slate-500 max-w-xl leading-relaxed mb-16 font-medium">
              استشاري جراحة العظام والمناظير - دكتوراة جامعة القاهرة وزميل البورد الأوروبي. متخصص في جراحات الركبة والكتف والمفاصل الصناعية وفق المعايير الدولية.
            </p>
            <div className="flex flex-wrap gap-8">
              <Link to="/booking" className="bg-medical-blue text-white px-16 py-8 rounded-[40px] font-black text-2xl shadow-2xl hover:bg-medical-green transition-all transform hover:-translate-y-2 active:scale-95">
                احجز موعدك الآن
              </Link>
              <Link to="/about" className="bg-white text-medical-blue border-2 border-slate-100 px-16 py-8 rounded-[40px] font-black text-2xl hover:border-medical-blue transition-all shadow-sm flex items-center gap-4 group">
                <span>تعرف على الدكتور</span>
                <span className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xs group-hover:scale-110 transition-transform">🎓</span>
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center order-1 lg:order-2 animate-fade-in-up">
            <div className="relative w-full max-w-[580px] aspect-[4/5] doctor-portrait-frame overflow-hidden bg-slate-100 group shadow-[0_80px_160px_-40px_rgba(15,23,42,0.3)]">
              <img 
                src={DOCTOR_IMAGE_URL} 
                alt={DOCTOR_NAME} 
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[6000ms]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/60 via-transparent to-transparent"></div>
            </div>
            <div className="absolute -bottom-16 -right-16 bg-white p-12 rounded-[60px] shadow-2xl border border-slate-100 hidden md:block max-w-[280px]">
               <p className="text-medical-green text-xs font-black uppercase tracking-[0.3em] mb-4">Core Value</p>
               <p className="text-2xl font-black text-medical-blue leading-tight mb-4">"{TRUST_MESSAGE}"</p>
               <div className="flex gap-1 text-yellow-400">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {ACADEMIC_STATS.concat([{label: "سنوات خبرة", value: "20+", icon: "👨‍⚕️"}]).map((stat, i) => (
              <div key={i} className="text-center group p-8 rounded-[40px] hover:bg-slate-50 transition-all">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-all">{stat.icon}</div>
                <div className="text-4xl font-black text-medical-blue mb-1">{stat.value}</div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-48 bg-medical-accent/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-medical-green/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <span className="text-medical-green font-black text-xs uppercase tracking-[0.6em] mb-10 block">Premium Specializations</span>
          <h2 className="text-7xl font-black text-medical-blue mb-28 tracking-tight">التخصصات الطبية الدقيقة</h2>
          
          <div className="flex justify-center mb-28 p-4 bg-white/60 backdrop-blur-2xl rounded-[50px] shadow-2xl border border-white w-fit mx-auto">
            <button 
              onClick={() => setActiveTab('surgical')} 
              className={`px-20 py-7 rounded-[40px] font-black text-xl transition-all duration-700 ${activeTab === 'surgical' ? 'bg-medical-blue text-white shadow-2xl scale-110' : 'text-slate-400 hover:text-medical-blue'}`}
            >
              الجراحات والمناظير
            </button>
            <button 
              onClick={() => setActiveTab('non-surgical')} 
              className={`px-20 py-7 rounded-[40px] font-black text-xl transition-all duration-700 ${activeTab === 'non-surgical' ? 'bg-medical-blue text-white shadow-2xl scale-110' : 'text-slate-400 hover:text-medical-blue'}`}
            >
              العلاجات التحفظية
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14 text-right">
            {(activeTab === 'surgical' ? SURGICAL_SERVICES : NON_SURGICAL_SERVICES).map(s => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-40 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 text-right relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-2xl">
              <span className="text-medical-green font-black text-xs uppercase tracking-[0.5em] mb-6 block">Our Patients' Trust</span>
              <h2 className="text-6xl font-black text-medical-blue mb-8">شهادات المرضى</h2>
              <p className="text-slate-400 font-bold text-xl leading-relaxed">قصص نجاح واقعية ومراجعات موثقة تعكس التزامنا بأعلى معايير الأمان الطبي والنتائج الملموسة.</p>
            </div>
            <Link to="/testimonials" className="bg-medical-blue text-white px-12 py-6 rounded-[30px] font-black text-lg shadow-xl hover:bg-medical-green transition-all">عرض جميع الشهادات 🌟</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {REVIEWS.slice(0, 4).map((review) => (
              <div key={review.id} className="bg-slate-50 p-10 rounded-[50px] border border-slate-100 hover:shadow-2xl transition-all group hover:-translate-y-2 flex flex-col h-full">
                <div className="flex text-yellow-400 mb-8 text-xl">
                  {[...Array(review.rating)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-slate-600 text-lg leading-relaxed mb-10 font-medium italic flex-grow leading-[1.7]">"{review.text}"</p>
                <div className="flex items-center gap-6 pt-6 border-t border-slate-200">
                  <div className="w-14 h-14 bg-medical-blue text-white rounded-2xl flex items-center justify-center font-black text-xl uppercase">
                    {review.patientName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-medical-blue text-lg">{review.patientName}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{review.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-40 bg-medical-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-medical-green rounded-full blur-[150px]"></div>
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-[150px]"></div>
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-12 leading-tight">جاهز لاستعادة <br/><span className="text-medical-green">صحة عظامك؟</span></h2>
          <p className="text-white/60 text-2xl mb-16 font-bold max-w-2xl mx-auto">
            لا تتردد في طلب المشورة الطبية من الأستاذ الدكتور أشرف العزب. خبرتنا العالمية بين يديك.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <Link to="/booking" className="bg-medical-green text-white px-20 py-8 rounded-[40px] font-black text-2xl shadow-2xl hover:bg-white hover:text-medical-blue transition-all transform hover:-translate-y-2">
              حجز كشف عيادة
            </Link>
            <a href="tel:01027470066" className="bg-white/10 text-white border border-white/20 px-20 py-8 rounded-[40px] font-black text-2xl hover:bg-white/20 transition-all backdrop-blur-md">
              اتصل بنا 📞
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
