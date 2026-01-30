
import React, { useState, useRef, useEffect } from 'react';
import { getMedicalAdvice, ChatMessage } from '../services/geminiService';
import { DOCTOR_NAME, DOCTOR_SLOGAN } from '../constants';

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<(ChatMessage & { grounding?: any[] })[]>([
    { role: 'model', text: `أهلاً بك! أنا المساعد الذكي لـ ${DOCTOR_NAME}. كيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن أماكن الفروع أو أحدث أخبار جراحة العظام.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const useSearch = input.includes('أخبار') || input.includes('جديد') || input.includes('متى');
    const useMaps = input.includes('فرع') || input.includes('عنوان') || input.includes('موقع') || input.includes('مكان');

    const result = await getMedicalAdvice(messages.map(m => ({role: m.role, text: m.text})).concat(userMsg), useSearch, useMaps);
    
    setMessages(prev => [...prev, { role: 'model', text: result.text, grounding: result.grounding }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] font-cairo" dir="rtl">
      <div className={`absolute bottom-20 right-0 w-[350px] md:w-[450px] max-h-[650px] bg-white rounded-[40px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden transition-all duration-500 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
        <div className="bg-medical-blue p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-medical-green rounded-2xl flex items-center justify-center text-2xl shadow-lg animate-pulse">🤖</div>
            <div>
              <h3 className="font-black text-lg leading-none">المساعد الذكي</h3>
              <p className="text-[10px] text-medical-green font-black uppercase tracking-widest mt-1">مدعوم بالذكاء الاصطناعي</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50 min-h-[400px]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] p-4 rounded-[25px] text-sm font-bold shadow-sm leading-relaxed ${m.role === 'user' ? 'bg-medical-blue text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'}`}>
                {m.text}
                {m.grounding && m.grounding.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100 text-[10px]">
                    <p className="mb-2 font-black text-medical-green uppercase tracking-widest">المصادر الموثقة:</p>
                    <div className="flex flex-wrap gap-2">
                      {m.grounding.map((chunk, idx) => (
                        <a key={idx} href={chunk.web?.uri || chunk.maps?.uri} target="_blank" rel="noopener noreferrer" className="bg-slate-50 px-2 py-1 rounded border border-slate-200 text-blue-600 hover:bg-blue-50 transition-colors line-clamp-1 max-w-[150px]">
                          {chunk.web?.title || chunk.maps?.title || 'رابط المصدر'}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && <div className="flex justify-end"><div className="bg-white p-4 rounded-[25px] rounded-tl-none border border-slate-100 flex gap-1"><span className="w-2 h-2 bg-medical-green rounded-full animate-bounce"></span><span className="w-2 h-2 bg-medical-green rounded-full animate-bounce [animation-delay:0.2s]"></span><span className="w-2 h-2 bg-medical-green rounded-full animate-bounce [animation-delay:0.4s]"></span></div></div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="اكتب سؤالك هنا..." className="flex-grow bg-slate-100 px-6 py-4 rounded-[20px] outline-none text-sm font-bold focus:ring-2 ring-medical-green/20 transition-all" />
            <button onClick={handleSend} disabled={isLoading || !input.trim()} className="w-12 h-12 bg-medical-blue text-white rounded-[20px] flex items-center justify-center hover:bg-medical-green transition-all shadow-lg disabled:opacity-50">
              <svg className="w-6 h-6 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>
      </div>
      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-medical-blue text-white rounded-[25px] flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-medical-green transition-all group relative">
        <span className="text-3xl group-hover:rotate-12 transition-transform">🤖</span>
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-4 border-white animate-pulse"></span>
      </button>
    </div>
  );
};

export default AIChatWidget;
