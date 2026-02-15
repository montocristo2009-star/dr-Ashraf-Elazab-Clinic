import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { DOCTOR_NAME, WHATSAPP_NUMBER, DOCTOR_INTERNAL_PAGE_URL } from '../constants';

const SmartAssistant: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [whatsappLink, setWhatsappLink] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
    const date = (form.elements.namedItem('date') as HTMLInputElement).value;
    const notes = (form.elements.namedItem('notes') as HTMLTextAreaElement).value;

    const message = `*حجز جديد من موقع العيادة* 🏥\n\n*الاسم:* ${name}\n*الهاتف:* ${phone}\n*التاريخ:* ${date}\n*ملاحظات:* ${notes || 'لا يوجد'}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setWhatsappLink(url);

    emailjs.send('service_ob7bof9', 'template_2gdxy0f', { name, phone, date, notes }, 'kzNfZr6zhZRc-n3Hv')
      .then(() => {
        setStatus('success');
        setTimeout(() => {
          const win = window.open(url, '_blank');
          if (win) win.focus();
        }, 500);
        form.reset();
      }).catch((err) => {
        console.error('EmailJS Error:', err);
        setStatus('error');
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 font-cairo" dir="rtl">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up flex flex-col items-center">
          <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-xl border-4 border-white mb-6">
             <img src={DOCTOR_INTERNAL_PAGE_URL} alt={DOCTOR_NAME} className="w-full h-full object-cover" />
          </div>
          <div className="inline-block px-6 py-2 bg-medical-green/10 text-medical-green rounded-full font-black text-sm uppercase tracking-widest mb-6">
            نظام الحجز الذكي المتكامل
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-medical-blue mb-6">
            حجز موعد مع {DOCTOR_NAME}
          </h1>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-2xl border border-slate-100 animate-fade-in-up">
          {status === 'success' ? (
            <div className="text-center py-12 space-y-8 animate-fade-in">
              <div className="text-8xl">✅</div>
              <h2 className="text-3xl font-black text-medical-blue">تم إرسال البيانات بنجاح!</h2>
              <p className="text-lg text-slate-600 font-bold leading-relaxed">يرجى الضغط على الزر أدناه لإرسال رسالة التأكيد عبر واتساب.</p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-10 py-6 rounded-[30px] font-black text-2xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-4">
                <span>إرسال عبر واتساب الآن</span>
                <span className="text-3xl">💬</span>
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
                <div className="space-y-3">
                  <label className="text-sm font-black text-medical-blue mr-2">الاسم الكامل</label>
                  <input name="name" placeholder="اكتب اسمك الثلاثي" required className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-medical-green/20 text-lg font-bold" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-black text-medical-blue mr-2">رقم الهاتف</label>
                  <input name="phone" placeholder="01xxxxxxxxx" required type="tel" className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-medical-green/20 text-lg font-bold" />
                </div>
              </div>
              <div className="space-y-3 text-right">
                <label className="text-sm font-black text-medical-blue mr-2">التاريخ المفضل للزيارة</label>
                <input name="date" type="date" required className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-medical-green/20 text-lg font-bold" />
              </div>
              <div className="space-y-3 text-right">
                <label className="text-sm font-black text-medical-blue mr-2">ملاحظات إضافية</label>
                <textarea name="notes" placeholder="يرجى ذكر نبذة عن الحالة..." className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-medical-green/20 text-lg font-bold h-40 resize-none" />
              </div>
              <button type="submit" disabled={status === 'submitting'} className="w-full py-6 bg-medical-green text-white font-black text-2xl rounded-[30px] hover:bg-medical-blue transition-all shadow-xl disabled:opacity-50">
                {status === 'submitting' ? 'جاري التأكيد...' : 'تأكيد الحجز الآن 📩'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartAssistant;
