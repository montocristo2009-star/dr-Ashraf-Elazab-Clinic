
import React, { useState, useRef, useEffect } from 'react';
import { DOCTOR_NAME, DOCTOR_INTERNAL_PAGE_URL } from '../constants';
import { getMedicalAdvice, ChatMessage } from '../services/geminiService';

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `مرحباً بك! أنا مساعد ${DOCTOR_NAME} الذكي. كيف يمكنني مساعدتك بخصوص صحة العظام والمفاصل اليوم؟` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    try {
      const result = await getMedicalAdvice([...messages, userMsg]);
      setMessages(prev => [...prev, { role: 'model', text: result.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "عذراً، حدث خطأ ما." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] font-cairo" dir="rtl">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[320px] md:w-[400px] h-[500px] bg-white rounded-[40px] shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-fade-in-up">
          <div className="bg-medical-blue p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/20">
                <img src={DOCTOR_INTERNAL_PAGE_URL} alt="AI Assistant" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-black text-sm">{DOCTOR_NAME}</h3>
                <p className="text-[10px] text-medical-green font-bold">مساعدك الطبي متصل</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-bold shadow-sm ${msg.role === 'user' ? 'bg-white text-slate-800 rounded-br-none' : 'bg-medical-blue text-white rounded-bl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-end">
                <div className="bg-medical-blue/10 p-4 rounded-3xl flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-medical-blue rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-medical-blue rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-medical-blue rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="اكتب استفسارك هنا..." className="flex-1 bg-slate-50 border-none rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-medical-blue/20" />
            <button onClick={handleSend} className="w-12 h-12 bg-medical-blue text-white rounded-2xl flex items-center justify-center hover:bg-medical-green transition-all shadow-lg active:scale-95">
              <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
            </button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className={`w-16 h-16 rounded-[25px] flex items-center justify-center shadow-2xl transition-all duration-500 overflow-hidden group border-4 border-white ${isOpen ? 'bg-medical-green rotate-90' : 'bg-medical-blue'}`}>
        {isOpen ? (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
        ) : (
          <div className="relative w-full h-full">
            <img src={DOCTOR_INTERNAL_PAGE_URL} alt="AI Assistant" className="w-full h-full object-cover scale-150 transition-transform group-hover:scale-[1.7]" />
            <div className="absolute inset-0 bg-medical-blue/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-white text-2xl">💬</span>
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default AIChatWidget;
