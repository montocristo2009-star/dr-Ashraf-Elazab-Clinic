import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { DOCTOR_NAME, WHATSAPP_NUMBER } from '../constants';

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

    // إعداد رسالة الواتساب
    const message = `*حجز جديد من موقع العيادة* 🏥\n\n*الاسم:* ${name}\n*الهاتف:* ${phone}\n*التاريخ:* ${date}\n*ملاحظات:* ${notes || 'لا يوجد'}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setWhatsappLink(url);

    // إرسال الإيميل عبر EmailJS
    emailjs.send(
      'service_ob7bof9',      // Service ID
      'template_2gdxy0f',     // Template ID
      { name, phone, date, notes },
      'kzNfZr6zhZRc-n3Hv'     // Public Key
    ).then(() => {
      setStatus('success');
      // محاولة فتح الواتساب تلقائياً
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
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-6 py-2 bg-medical-green/10 text-medical-green rounded-full font-black text-sm uppercase tracking-widest mb-6">
            نظام الحجز الذكي المتكامل
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-medical-blue mb-6">
            حجز موعد مع الأستاذ الدكتور أشرف العزب
          </h1>
          <p className="text-lg text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed">
            استخدم هذا النموذج الذكي لتأكيد حجزك فوراً عبر البريد الإلكتروني وواتساب العيادة.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-2xl border border-slate-100 animate-fade-in-up">
          {status === 'success' ? (
            <div className="text-center py-12 space-y-8 animate-fade-in">
              <div className="text-8xl">✅</div>
              <h2 className="text-3xl font-black text-medical-blue">تم إرسال البيانات بنجاح!</h2>
              <p className="text-lg text-slate-600 font-bold leading-relaxed">
                تم إرسال نسخة من حجزك لقسم المواعيد بالعيادة. يرجى الضغط على الزر أدناه لإرسال رسالة التأكيد عبر واتساب في حال لم تفتح النافذة تلقائياً.
              </p>
              <div className="flex flex-col gap-4">
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-10 py-6 rounded-[30px] font-black text-2xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-4"
                >
                  <span>إرسال عبر واتساب الآن</span>
                  <span className="text-3xl">💬</span>
                </a>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-medical-blue font-black underline"
                >
                  حجز موعد آخر
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-black text-medical-blue mr-2">الاسم الكامل</label>
                  <input
                    name="name"
                    placeholder="اكتب اسمك الثلاثي"
                    required
                    className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-medical-green/20 text-lg font-bold"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-black text-medical-blue mr-2">رقم الهاتف</label>
                  <input
                    name="phone"
                    placeholder="01xxxxxxxxx"
                    required
                    type="tel"
                    className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-medical-green/20 text-lg font-bold"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-black text-medical-blue mr-2">التاريخ المفضل للزيارة</label>
                <input
                  name="date"
                  type="date"
                  required
                  className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-medical-green/20 text-lg font-bold"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-black text-medical-blue mr-2">ملاحظات إضافية (اختياري)</label>
                <textarea
                  name="notes"
                  placeholder="يرجى ذكر نبذة عن الحالة أو أي استفسار..."
                  className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-medical-green/20 text-lg font-bold h-40 resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl font-bold text-center border border-red-100">
                  حدث خطأ أثناء الإرسال. يرجى التأكد من اتصال الإنترنت أو المحاولة لاحقاً.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-6 bg-medical-green text-white font-black text-2xl rounded-[30px] hover:bg-medical-blue transition-all shadow-xl hover:shadow-medical-green/20 flex items-center justify-center gap-4 disabled:opacity-50 active:scale-95"
              >
                {status === 'submitting' ? (
                  <>
                    <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>جاري تأكيد الحجز...</span>
                  </>
                ) : (
                  <>
                    <span>تأكيد الحجز الآن</span>
                    <span className="text-3xl">📩</span>
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-12 p-8 bg-blue-50/50 rounded-[35px] border border-blue-100">
             <div className="flex items-start gap-4">
                <span className="text-3xl">💡</span>
                <div>
                   <h4 className="font-black text-medical-blue text-lg mb-2">تأكد من إرسال رسالة الواتساب</h4>
                   <p className="text-slate-600 font-bold leading-relaxed text-sm">
                      بعد الضغط على تأكيد، سيتم تحويلك لفتح محادثة واتساب العيادة. يرجى الضغط على زر "إرسال" داخل واتساب ليتم تفعيل حجزك فوراً مع السكرتارية.
                   </p>
                </div>
             </div>
          </div>
          
          <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-widest mt-8">
            جميع البيانات مشفرة وتخضع لسياسة الخصوصية الخاصة بعيادة {DOCTOR_NAME}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmartAssistant;