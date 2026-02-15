import React from 'react';
import { REVIEWS, DOCTOR_NAME, DOCTOR_INTERNAL_PAGE_URL } from '../constants';
import { Link } from 'react-router-dom';

const Testimonials: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-40 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-24 animate-fade-in-up flex flex-col items-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40 mb-10 group">
             <div className="absolute inset-0 bg-medical-green rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
             <img 
               src={DOCTOR_INTERNAL_PAGE_URL} 
               alt={DOCTOR_NAME} 
               className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white shadow-2xl"
             />
          </div>
          <span className="text-medical-green font-black text-xs uppercase tracking-[0.5em] mb-6 block">Patient Feedback</span>
          <h1 className="text-5xl md:text-7xl font-black text-medical-blue mb-8 leading-tight">
            ماذا يقول <br/><span className="text-medical-green">مرضانا؟</span>
          </h1>
          <p className="text-xl text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed">
            نعتز بثقتكم، وهي الدافع لنا دائماً لتقديم أعلى مستويات الرعاية الطبية والجراحية.
          </p>
          <div className="w-20 h-1.5 bg-medical-green mx-auto rounded-full mt-10"></div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 group flex flex-col h-full animate-fade-in-up">
              <div className="flex items-center justify-between mb-8">
                <div className="flex text-yellow-400 text-xl gap-0.5">
                  {[...Array(review.rating)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${review.source === 'Facebook' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                  {review.source}
                </div>
              </div>
              
              <div className="relative mb-8 flex-grow">
                <p className="relative z-10 text-slate-600 text-lg leading-relaxed font-bold italic pr-2">
                  "{review.text}"
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-50">
                <div className="w-12 h-12 bg-medical-blue text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg group-hover:bg-medical-green transition-all">
                  {review.patientName.charAt(0)}
                </div>
                <div className="text-right">
                  <p className="font-black text-medical-blue text-lg leading-none">{review.patientName}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in-up">
          <h2 className="text-3xl font-black text-medical-blue mb-8">استعد صحتك وحركتك اليوم</h2>
          <Link to="/booking" className="inline-flex items-center gap-4 bg-medical-blue text-white px-12 py-6 rounded-[30px] font-black text-xl shadow-2xl hover:bg-medical-green transition-all transform hover:-translate-y-2">
            <span>احجز موعدك الآن</span>
            <span className="text-2xl">←</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
