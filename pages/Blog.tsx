import React, { useState, useMemo, useEffect } from 'react';
import { BLOG_POSTS, DOCTOR_SECONDARY_IMAGE_URL, DOCTOR_NAME, DOCTOR_SLOGAN } from '../constants';
import { BlogPost } from '../types';

const Blog: React.FC = () => {
  // ... الحالات والمنطق ...

  return (
    <div className="py-32 bg-slate-50 min-h-screen font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 text-right">
        
        {/* Spotlight Header */}
        <section className="mb-24 bg-white rounded-[60px] p-8 md:p-16 shadow-xl border border-slate-100 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 animate-fade-in-up">
          <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 flex-shrink-0 group">
            <div className="absolute inset-0 bg-medical-green rounded-[40px] rotate-6 group-hover:rotate-0 transition-transform duration-500 shadow-lg"></div>
            <img 
              src={DOCTOR_SECONDARY_IMAGE_URL} 
              alt={DOCTOR_NAME} 
              className="relative z-10 w-full h-full object-cover rounded-[40px] shadow-2xl border-4 border-white"
            />
          </div>
          {/* النص ... */}
        </section>

        {/* كروت المقالات التي تظهر فيها الصورة ككاتب */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           {/* ... داخل الخريطة ... */}
           <img 
              src={DOCTOR_SECONDARY_IMAGE_URL} 
              alt={DOCTOR_NAME} 
              className="w-9 h-9 rounded-full object-cover ring-2 ring-medical-green" 
           />
        </div>
      </div>
    </div>
  );
};

export default Blog;
