
import React, { useState, useEffect } from 'react';
import { editMedicalImage, generateMedicalVideo } from '../services/geminiService';

const MediaLab: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'edit' | 'video'>('edit');
  const [aspect, setAspect] = useState<'16:9' | '9:16'>('16:9');
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      const aistudio = (window as any).aistudio;
      if (aistudio) {
        const selected = await aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    if (isOpen) checkKey();
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleOpenKeySelector = async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio) {
      await aistudio.openSelectKey();
      setHasKey(true); 
    }
  };

  const processMedia = async () => {
    if (!image || !prompt) return;
    
    if (mode === 'video' && !hasKey) {
      await handleOpenKeySelector();
    }

    setIsLoading(true);
    try {
      const base64 = image.split(',')[1];
      if (mode === 'edit') {
        const edited = await editMedicalImage(base64, prompt);
        setResult(edited);
      } else {
        const video = await generateMedicalVideo(base64, prompt, aspect);
        setResult(video);
      }
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes('403') || err.message?.includes('permission') || err.message?.includes('Requested entity was not found')) {
        alert('حدث خطأ في صلاحيات مفتاح API. يرجى التأكد من اختيار مفتاح من مشروع مفعل به الدفع (Billing).');
        setHasKey(false);
      } else {
        alert('حدث خطأ أثناء المعالجة، يرجى المحاولة لاحقاً.');
      }
    }
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 w-16 h-16 bg-medical-green text-white rounded-[25px] flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-[1000]"
      >
        <span className="text-3xl">🔬</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[2000] bg-medical-blue/80 backdrop-blur-xl flex items-center justify-center p-6 font-cairo" dir="rtl">
      <div className="bg-white w-full max-w-5xl rounded-[60px] shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-3xl font-black text-medical-blue">المختبر الطبي الذكي</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">AI Visualization Lab v2.5</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-2xl">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-10 overflow-y-auto max-h-[85vh]">
          <div className="space-y-8">
            <div className="flex p-1.5 bg-slate-100 rounded-3xl">
              <button 
                onClick={() => setMode('edit')} 
                className={`flex-1 py-4 rounded-2xl font-black text-sm transition-all duration-500 ${mode === 'edit' ? 'bg-white shadow-xl text-medical-blue scale-[1.02]' : 'text-slate-400 hover:text-medical-blue'}`}
              >
                🖼️ تعديل صورة طبية
              </button>
              <button 
                onClick={() => setMode('video')} 
                className={`flex-1 py-4 rounded-2xl font-black text-sm transition-all duration-500 ${mode === 'video' ? 'bg-white shadow-xl text-medical-blue scale-[1.02]' : 'text-slate-400 hover:text-medical-blue'}`}
              >
                🎬 إنتاج فيديو (Veo)
              </button>
            </div>

            {mode === 'video' && !hasKey && (
              <div className="bg-blue-50 border border-blue-100 p-8 rounded-[40px] space-y-6 shadow-sm">
                <div className="flex items-center gap-4 text-blue-600 mb-2">
                  <span className="text-3xl">ℹ️</span>
                  <h3 className="font-black text-lg">متطلبات تفعيل تقنية Veo</h3>
                </div>
                
                <div className="space-y-4 text-blue-800/80 text-sm font-bold leading-relaxed">
                  <p>لإنتاج فيديوهات طبية عالية الجودة باستخدام نماذج Veo، يتطلب نظام Google السحابي استخدام مفتاح API من مشروع مفعل به نظام الدفع (Paid Billing Plan).</p>
                  
                  <div className="bg-white/50 p-6 rounded-2xl space-y-3">
                    <p className="text-blue-900">خطوات التفعيل:</p>
                    <ul className="list-decimal list-inside space-y-1">
                      <li>تأكد من أن مشروعك في Google Cloud مفعل به الدفع.</li>
                      <li>انقر على الزر أدناه لاختيار المفتاح الصحيح.</li>
                      <li>إذا واجهت "Entity not found"، فالسبب غالباً هو عدم تفعيل الفوترة.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <button 
                    onClick={handleOpenKeySelector} 
                    className="bg-blue-600 text-white px-8 py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 active:scale-95"
                  >
                    ربط مفتاح API مفعل 🔑
                  </button>
                  <a 
                    href="https://ai.google.dev/gemini-api/docs/billing" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-xs text-blue-600 font-black underline text-center hover:text-blue-800 transition-colors"
                  >
                    عرض وثائق تفعيل الفوترة (Billing Documentation)
                  </a>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <label className="block text-sm font-black text-slate-700 mr-2 flex items-center gap-2">
                <span>📁</span> ارفع صورة (أشعة أو توضيحية)
              </label>
              <div className="relative group">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full py-8 border-2 border-dashed border-slate-200 rounded-[30px] flex flex-col items-center justify-center gap-2 group-hover:border-medical-green group-hover:bg-green-50/30 transition-all">
                  <span className="text-3xl">📤</span>
                  <span className="text-xs font-black text-slate-400 group-hover:text-medical-green">اضغط هنا أو اسحب الملف</span>
                </div>
              </div>
              {image && (
                <div className="relative animate-fade-in">
                  <img src={image} alt="preview" className="h-48 w-full object-contain rounded-[30px] bg-slate-50 p-4 border border-slate-100 shadow-inner" />
                  <button onClick={() => setImage(null)} className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-red-50 text-red-500 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-black text-slate-700 mr-2 flex items-center gap-2">
                <span>✍️</span> صف التعديل المطلوب أو مشهد الفيديو
              </label>
              <textarea 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)} 
                className="w-full p-8 bg-slate-50 rounded-[40px] border border-slate-100 focus:ring-8 focus:ring-medical-green/5 outline-none text-lg font-bold h-40 resize-none shadow-inner" 
                placeholder="مثال: حول هذه الأشعة إلى مشهد ثلاثي الأبعاد يوضح مفصل الركبة أثناء الحركة..." 
              />
            </div>

            {mode === 'video' && (
              <div className="space-y-4 bg-slate-50 p-6 rounded-[35px] border border-slate-100">
                <label className="block text-sm font-black text-slate-700 mb-4 mr-2">أبعاد الفيديو (Aspect Ratio)</label>
                <div className="flex gap-4">
                  <button onClick={() => setAspect('16:9')} className={`flex-1 py-4 rounded-2xl text-sm font-black transition-all ${aspect === '16:9' ? 'bg-medical-blue text-white shadow-xl' : 'bg-white text-slate-400 border border-slate-200'}`}>أفقي (16:9)</button>
                  <button onClick={() => setAspect('9:16')} className={`flex-1 py-4 rounded-2xl text-sm font-black transition-all ${aspect === '9:16' ? 'bg-medical-blue text-white shadow-xl' : 'bg-white text-slate-400 border border-slate-200'}`}>رأسي (9:16)</button>
                </div>
              </div>
            )}

            <button 
              onClick={processMedia} 
              disabled={isLoading || !image || !prompt} 
              className="w-full py-8 bg-medical-blue text-white rounded-[40px] font-black text-2xl hover:bg-medical-green transition-all shadow-2xl hover:shadow-green-200 disabled:opacity-50 flex items-center justify-center gap-6 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>جاري المعالجة (قد يستغرق الفيديو بضع دقائق)...</span>
                </>
              ) : (
                <><span>بدء المعالجة الذكية</span><span className="text-3xl">✨</span></>
              )}
            </button>
          </div>

          <div className="flex flex-col items-center justify-center bg-slate-50 rounded-[60px] border-2 border-dashed border-slate-200 p-10 min-h-[500px] relative overflow-hidden group">
            <div className="absolute inset-0 bg-medical-green/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {result ? (
              <div className="w-full space-y-8 animate-fade-in relative z-10">
                <div className="flex items-center justify-between px-4">
                   <h4 className="font-black text-medical-green text-xl">✨ النتيجة النهائية</h4>
                   <span className="bg-white px-4 py-1.5 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 shadow-sm">AI Generated Content</span>
                </div>
                <div className="bg-white p-4 rounded-[45px] shadow-2xl border-4 border-white">
                  {mode === 'edit' ? (
                    <img src={result} alt="Result" className="w-full rounded-[35px]" />
                  ) : (
                    <video src={result} controls className="w-full rounded-[35px]" />
                  )}
                </div>
                <a 
                  href={result} 
                  download={`dr-elazab-ai-${mode}-${Date.now()}`} 
                  className="flex items-center justify-center gap-3 w-full py-5 bg-white border-2 border-slate-100 rounded-3xl text-sm font-black text-medical-blue hover:bg-medical-blue hover:text-white hover:border-medical-blue transition-all shadow-sm"
                >
                  <span>تحميل الملف النهائي</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                </a>
              </div>
            ) : (
              <div className="text-center space-y-6 relative z-10">
                <div className="relative">
                  <span className="text-9xl block opacity-10">🧬</span>
                  {isLoading && <div className="absolute inset-0 flex items-center justify-center"><div className="w-24 h-24 border-8 border-medical-green border-t-transparent rounded-full animate-spin"></div></div>}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-300">في انتظار طلبك...</h3>
                  <p className="text-slate-400 font-bold max-w-xs mx-auto mt-4">سيتم عرض مخرجات الذكاء الاصطناعي هنا فور اكتمال المعالجة.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaLab;
