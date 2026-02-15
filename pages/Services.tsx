
import React from 'react';
import { SURGICAL_SERVICES, DOCTOR_NAME } from '../constants';

export default function Services() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 animate-fade-in-up">
          <span className="text-medical-green font-black text-xs uppercase tracking-[0.5em] mb-4 block">Surgical Excellence</span>
          <h1 className="text-5xl font-black text-medical-blue mb-6">التخصصات الجراحية والخدمات</h1>
          <p className="text-xl text-slate-500 font-bold max-w-3xl mx-auto leading-relaxed">
            نقدم رعاية طبية متكاملة في جراحة العظام والمناظير باستخدام أحدث التقنيات العالمية لضمان أفضل النتائج لمرضانا.
          </p>
          <div className="w-20 h-1.5 bg-medical-green mx-auto rounded-full mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SURGICAL_SERVICES.map((service) => {
            const isInnovation = service.id === 'prp-innov';
            return (
              <div 
                key={service.id} 
                className={`p-10 rounded-[50px] border transition-all duration-500 group relative overflow-hidden flex flex-col h-full
                  ${isInnovation 
                    ? 'bg-medical-blue text-white border-medical-green shadow-[0_20px_50px_rgba(75,164,114,0.3)] ring-4 ring-medical-green/20' 
                    : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-2xl'}`}
              >
                {isInnovation && (
                  <div className="absolute top-6 left-6 bg-medical-green text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                    International Innovation ✨
                  </div>
                )}
                
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-8 shadow-sm transition-all transform group-hover:rotate-6
                  ${isInnovation ? 'bg-white text-medical-blue' : 'bg-white group-hover:bg-medical-blue group-hover:text-white'}`}>
                  {service.icon}
                </div>
                
                <h3 className={`text-2xl font-black mb-4 leading-tight transition-colors 
                  ${isInnovation ? 'text-medical-green' : 'text-medical-blue group-hover:text-medical-green'}`}>
                  {service.title}
                </h3>
                
                <p className={`font-bold leading-relaxed mb-8 flex-grow 
                  ${isInnovation ? 'text-white/80' : 'text-slate-500'}`}>
                  {service.description}
                </p>
                
                <div className={`flex items-center gap-2 font-black text-sm transition-all
                  ${isInnovation ? 'text-medical-green' : 'text-medical-blue opacity-0 group-hover:opacity-100'}`}>
                  <span>احجز استشارة تخصصية</span>
                  <span className="text-xl">←</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Specialized PRP Feature Banner */}
        <div className="mt-32 bg-slate-900 rounded-[60px] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-medical-green/10 rounded-full blur-3xl"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="text-right">
              <span className="text-medical-green font-black text-xs uppercase tracking-[0.4em] mb-4 block">Exclusive Breakthrough</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8">حقن البلازما العلاجية <br/><span className="text-medical-green">بتقنية د. أشرف العزب</span></h2>
              <p className="text-white/60 text-lg font-bold mb-10 leading-relaxed">
                تقنية حصرية موثقة دولياً تعتمد على تركيز بيولوجي فائق للصفائح الدموية لتحفيز الأنسجة على الشفاء الذاتي في وقت قياسي وبدقة متناهية.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-white font-bold"><span className="text-medical-green">✓</span> توثيق دولي في الأبحاث العلمية</li>
                <li className="flex items-center gap-3 text-white font-bold"><span className="text-medical-green">✓</span> نتائج شفاء أسرع بنسبة 40%</li>
                <li className="flex items-center gap-3 text-white font-bold"><span className="text-medical-green">✓</span>  بديل آمن وفعال في حالات الخشونة المبكرة والتهاب الاوتار</li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-sm aspect-square bg-white/5 rounded-[50px] border border-white/10 flex items-center justify-center text-[150px] shadow-2xl">
                🧪
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
