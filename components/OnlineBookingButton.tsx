import React, { useState } from 'react';

const OnlineBookingButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');

  const ONLINE_NUMBER = '01277048240';
  const BRANCH_NAME = 'كشف أونلاين (Zoom/Meet)';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ترميز البيانات بالكامل لتجنب مشاكل واتساب
    const message =
      `مرحباً دكتور أشرف,%0A` +
      `الاسم: ${encodeURIComponent(name)}%0A` +
      `رقم الهاتف: ${encodeURIComponent(phone)}%0A` +
      `العيادة: ${encodeURIComponent(BRANCH_NAME)}%0A` +
      `سبب الزيارة أو الشكوى: ${encodeURIComponent(service)}`;

    const whatsappURL = `https://wa.me/${ONLINE_NUMBER}?text=${message}`;

    window.open(whatsappURL, '_blank');

    // إعادة تعيين النموذج وإغلاق popup
    setName('');
    setPhone('');
    setService('');
    setOpen(false);
  };

  return (
    <>
      {/* الزر العائم */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full px-6 py-4 shadow-xl z-50 font-bold hover:bg-green-600 transition"
      >
        💻 احجز كشف أونلاين
      </button>

      {/* نموذج Popup */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-2xl shadow-2xl p-6 z-50 animate-fade-in">
          <h2 className="text-lg font-bold text-medical-blue mb-4 text-center">حجز كشف أونلاين</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              placeholder="الاسم بالكامل"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-medical-lightBlue/30"
            />
            <input
              required
              type="tel"
              placeholder="رقم الهاتف"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-medical-lightBlue/30"
            />
            <textarea
              placeholder="سبب الزيارة أو الشكوى"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-medical-lightBlue/30 resize-none h-20"
            />
            <button
              type="submit"
              className="w-full bg-medical-blue text-white py-2 rounded-xl font-bold hover:bg-medical-lightBlue transition"
            >
              إرسال
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default OnlineBookingButton;