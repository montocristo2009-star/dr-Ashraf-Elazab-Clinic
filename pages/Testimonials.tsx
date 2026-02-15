import React from 'react';
import { REVIEWS, DOCTOR_NAME, DOCTOR_TERTIARY_IMAGE_URL } from '../constants';
// ... التضمينات ...

const Testimonials: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-40 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 animate-fade-in-up flex flex-col items-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40 mb-10 group">
             <img 
               src={DOCTOR_TERTIARY_IMAGE_URL} 
               alt={DOCTOR_NAME} 
               className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white shadow-2xl"
             />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-medical-blue mb-8 leading-tight">
            ماذا يقول <br/><span className="text-medical-green">مرضانا؟</span>
          </h1>
        </div>
        {/* ... التقييمات ... */}
      </div>
    </div>
  );
};

export default Testimonials;
