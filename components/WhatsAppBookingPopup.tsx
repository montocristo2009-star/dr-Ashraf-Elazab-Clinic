import React, { useState } from 'react';
import { PHONE_CAIRO, PHONE_MANSOURA, PHONE_SENBELLAWEIN } from '../constants';

const WhatsAppBookingPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('cairo');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');

  const getBranchPhone = () => {
    if (selectedBranch === 'mansoura') return PHONE_MANSOURA;
    if (selectedBranch === 'sinbellawein') return PHONE_SENBELLAWEIN;
    return PHONE_CAIRO;
  };

  const getBranchName = () => {
    if (selectedBranch === 'mansoura') return 'المنصورة';
    if (selectedBranch === 'sinbellawein') return 'السنبلاوين';
    return 'القاهرة';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = encodeURIComponent(
      `مرحباً دكتور أشرف،\n` +
      `الاسم: ${name}\n` +
      `رقم الهاتف: ${phone}\n` +
      `العيادة: ${getBranchName()}\n` +
      `سبب الزيارة أو الشكوى: ${service}`
    );

    const whatsappURL = `https://wa.me/201027470066?text=${message}`;
    window.open(whatsappURL, '_blank');

    // اغلاق البوب اب وتنظيف النموذج
    setIsOpen(false);
    setName('');
    setPhone('');
    setService('');
    setSelectedBranch('cairo');
  };

  return (
    <>
      {/* زر الحجز العائم */}
      <div
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#25D366',
          color: 'white',
          padding: '14px 22px',
          borderRadius: '50px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          zIndex: 9999,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        💬 احجز عبر واتساب
      </div>

      {/* نافذة البوب اب */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '350px',
            maxWidth: '90%',
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid #ddd',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 9999,
          }}
        >
          <div
            onClick={() => setIsOpen(false)}
            style={{ float: 'right', cursor: 'pointer', fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}
          >
            ✖
          </div>
          <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>احجز موعدك الآن</h3>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="الاسم"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
              type="tel"
              placeholder="رقم الهاتف"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <select
              required
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            >
              <option value="cairo">فرع القاهرة (التجمع الخامس)</option>
              <option value="mansoura">فرع المنصورة</option>
              <option value="sinbellawein">فرع السنبلاوين</option>
            </select>
            <textarea
              placeholder="سبب الزيارة أو الشكوى"
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              style={{ width: '100%', padding: '10px', height: '80px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', resize: 'none' }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#25D366',
                color: 'white',
                padding: '12px',
                borderRadius: '5px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              إرسال عبر واتساب
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default WhatsAppBookingPopup;