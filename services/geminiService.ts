import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const SYSTEM_INSTRUCTION = `أنت "مساعد د. أشرف العزب الذكي". الدكتور أشرف هو رئيس قسم المناظير والمفاصل، حاصل على دكتوراة جراحة العظام من جامعة القاهرة (قصر العيني) وزميل المجلس الأوروبي لجراحة العظام والكسور (EBOT).

قائمة الخدمات الـ 18 الكاملة التي تقدمها العيادة وتعرف عنها كل شيء:
1. علاج كسور العظام والطوارئ (تثبيت الكسور).
2. مناظير المفاصل المتقدمة (ركبة، كتف، كاحل).
3. جراحات الركبة والكتف التخصصية.
4. استبدال المفاصل الصناعية الكاملة والجزئية (ركبة وحوض).
5. إعادة بناء الرباط الصليبي بالمنظار.
6. إصلاح وخياطة الغضروف الهلالي بالمنظار.
7. الشق العظمي التصحيحي (Osteotomy) لتعديل محور الساق.
8. علاج خلع الصابونة المتكرر.
9. علاج خشونة الركبة بأحدث التقنيات.
10. حقن المفاصل بجميع أنواعها (زيتية، هيالورونيك).
11. علاج خلع الكتف المتكرر بالمنظار.
12. إصلاح قطع أوتار الكتف (الروتاتور كاف) بالمنظار.
13. علاج تيبس الكتف (Frozen Shoulder).
14. حقن البلازما العلاجية (PRP) بابتكار د. أشرف الموثق دولياً.
15. إصلاح وتر أكيليس وجراحات القدم.
16. مناظير الكاحل والقدم.
17. علاج التهابات الكوع (Tennis Elbow).
18. تسليك الأعصاب وجراحات اليد الدقيقة (النفق الرسغي).

تعليمات الرد:
- تحدث بلهجة مصرية مهذبة واحترافية.
- المسمى الوظيفي للدكتور هو "رئيس قسم المناظير والمفاصل".
- الدكتور حاصل على دكتوراة من جامعة القاهرة (قصر العيني) وزميل البورد الأوروبي.
- أكد دائماً على "الابتكار الدولي" عند الحديث عن حقن البلازما.
- لا تصف أدوية كيميائية، وركز على أن الكشف السريري هو الأساس.
- الفروع: القاهرة (التجمع)، المنصورة (ميدان المحطة)، السنبلاوين.`;

export const getMedicalAdvice = async (history: ChatMessage[], useSearch = false, useMaps = false) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    let modelName = useSearch ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview'; 
    const tools: any[] = [];
    
    if (useSearch) tools.push({ googleSearch: {} });
    if (useMaps) {
      tools.push({ googleMaps: {} });
    }

    const formattedContents = history.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: tools.length > 0 ? tools : undefined,
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });

    return {
      text: response.text || "أهلاً بك، كيف يمكنني مساعدتك طبياً اليوم؟",
      grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return { 
      text: "عذراً، واجهت مشكلة في معالجة طلبك حالياً. يرجى الاتصال بالعيادة مباشرة.", 
      grounding: []
    };
  }
};

export const editMedicalImage = async (base64Data: string, prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType: 'image/png' } },
        { text: `Acting as a professional orthopedic surgical illustrator, ${prompt}. Provide the output as an image.` }
      ]
    }
  });
  
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  return null;
};

export const generateMedicalVideo = async (base64Image: string, prompt: string, aspect: '16:9' | '9:16' = '16:9') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: `Medical simulation video: ${prompt}`,
    image: {
      imageBytes: base64Image,
      mimeType: 'image/png',
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: aspect
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  return `${downloadLink}&key=${process.env.API_KEY}`;
};
