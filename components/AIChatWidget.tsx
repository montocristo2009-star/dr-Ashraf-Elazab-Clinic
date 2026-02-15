import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMedicalAdvice, ChatMessage } from '../services/geminiService';
import { DOCTOR_NAME, DOCTOR_TERTIARY_IMAGE_URL } from '../constants';

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<(ChatMessage & { grounding?: any[] })[]>([
    { role: 'model', text: `أهلاً بك! أنا المساعد الذكي لـ ${DOCTOR_NAME}. يسعدني الرد على استفساراتك الطبية حول جراحات العظام والمناظير أو تزويدك بمعلومات عن فروعنا.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { if (isOpen) scrollToBottom(); }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // ذكاء اصطناعي لتحديد متى نستخدم أدوات البحث أو الخرائط
    const useSearch = input.length > 10 || input.includes('أخبار') || input.includes('جديد');
    const useMaps = input.includes('فرع') || input.includes('عنوان') || input.includes('أين') || input.includes('مكان');

    try {
      const result = await getMedicalAdvice(
        messages.map(m => ({role: m.role, text: m.text})).concat(userMsg), 
        useSearch, 
        useMaps
      );
      setMessages(prev => [...prev, { role: 'model', text: result.text, grounding: result.grounding }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "عذراً، واجهت عطلاً مؤقتاً. يمكنك إعادة المحاولة." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] font-cairo" dir="rtl">
      <div className={`absolute bottom-20 right-0 w-[350px] md:w-[480px] max-h-[700px] bg-white rounded-[40px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden transition-all duration-500 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
        {/* Chat Header */}
        <div className="bg-medical-blue p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden p-0.5 border-2 border-medical-green">
              <img 
                src={DOCTOR_TERTIARY_IMAGE_URL} 
                alt="Assistant Avatar" 
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800"; }}
              />
              {isLoading && <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-4 border-medical-blue animate-ping"></span>}
            </div>
            <div>
              <h3 className="font-black text-lg leading-none">مساعد د. أشرف الذكي</h3>
              <p className="text-[10px] text-medical-green font-black uppercase tracking-widest mt-1">تكنولوجيا Gemini 3 Pro</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform p-2 bg-white/10 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Quick Booking CTA Banner */}
        <div className="px-6 py-4 bg-medical-green/5 border-b border-slate-100 flex justify-between items-center group">
           <div className="flex items-center gap-3">
              <span className="text-xl">🦴</span>
              <p className="text-[11px] font-black text-medical-blue">هل تود تأكيد حجزك مباشرة؟</p>
           </div>
           <Link 
              to="/booking" 
              onClick={() => setIsOpen(false)} 
              className="bg-medical-green text-white px-5 py-2 rounded-xl text-[10px] font-black hover:bg-medical-blue transition-all shadow-lg shadow-medical-green/20"
           >
              احجز الآن
           </Link>
        </div>

        {/* Messages Container */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50 min-h-[400px]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] p-5 rounded-[30px] text-sm font-bold shadow-sm leading-relaxed transition-all ${m.role === 'user' ? 'bg-medical-blue text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'}`}>
                <div className="whitespace-pre-line">{m.text}</div>
                {m.grounding && m.grounding.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-[9px] font-black text-medical-green uppercase mb-3">المصادر الموثقة:</p>
                    <div className="flex flex-wrap gap-2">
                      {m.grounding.map((chunk, idx) => (
                        <a key={idx} href={chunk.web?.uri || chunk.maps?.uri} target="_blank" rel="noopener noreferrer" className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-blue-600 text-[10px] hover:bg-blue-50 transition-all truncate max-w-[140px]">
                          {chunk.web?.title || chunk.maps?.title || 'زيارة المصدر'}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-end">
              <div className="bg-white p-5 rounded-[30px] rounded-tl-none border border-slate-100 flex gap-2">
                <span className="w-2.5 h-2.5 bg-medical-green rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2.5 h-2.5 bg-medical-green rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2.5 h-2.5 bg-medical-green rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-5 bg-white border-t border-slate-100">
          <div className="flex gap-3">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && handleSend()} 
              placeholder="اكتب استفسارك الطبي هنا..." 
              className="flex-grow bg-slate-100 px-6 py-4 rounded-[25px] outline-none text-sm font-bold focus:ring-2 ring-medical-green/20 transition-all border border-transparent focus:bg-white focus:border-slate-200 shadow-inner" 
            />
            <button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()} 
              className="w-14 h-14 bg-medical-blue text-white rounded-full flex items-center justify-center hover:bg-medical-green transition-all shadow-xl disabled:opacity-30 active:scale-90"
            >
              <svg className="w-6 h-6 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>
      </div>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`w-16 h-16 rounded-[25px] flex items-center justify-center shadow-2xl transition-all group relative overflow-hidden ${isOpen ? 'bg-red-500 rotate-90' : 'bg-medical-blue hover:bg-medical-green hover:scale-110'}`}
      >
        {isOpen ? (
          <span className="text-3xl text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
          </span>
        ) : (
          <img 
            src={DOCTOR_TERTIARY_IMAGE_URL} 
            alt="AI Assistant" 
            className="w-full h-full object-cover scale-150"
            onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800"; }}
          />
        )}
        {!isOpen && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-4 border-white animate-pulse z-20"></span>}
      </button>
    </div>
  );
};

export default AIChatWidget;
