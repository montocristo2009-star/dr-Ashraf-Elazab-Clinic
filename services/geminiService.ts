import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const SYSTEM_INSTRUCTION = `أنت "مساعد د. أشرف العزب الذكي". الدكتور أشرف استشاري جراحة العظام والمناظير وحاصل على الدكتوراة من جامعة القاهرة والزمالة الأوروبية (EBOT).

قائمة الخدمات الكاملة التي تقدمها العيادة وتعرف عنها كل شيء:
1. علاج كسور العظام والطوارئ في نفس اليوم.
2. مناظير مفاصل متقدمة (ركبة، كتف، قدم، كاحل).
3. جراحات الركبة والكتف التخصصية.
4. استبدال المفاصل الصناعية (ركبة وحوض) بأحدث التقنيات.
5. إعادة بناء الرباط الصليبي بالمنظار.
6. إصلاح قطع الغضروف الهلالي.
7. الشق العظمي التصحيحي حول الركبة (Osteotomy).
8. علاج خلع الصابونة المتكرر.
9. علاج خشونة الركبة بأحدث التقنيات الجراحية وغير الجراحية.
10. جميع أنواع حقن المفاصل (زيتية، هيالورونيك).
11. علاج خلع الكتف المتكرر بالمنظار.
12. إصلاح قطع أوتار الكتف (الروتاتور كاف).
13. علاج تيبس الكتف (الكتف المتجمد).
14. **حقن البلازما العلاجية (PRP) بتقنية من ابتكار د. أشرف موثقة دولياً**. (هذا ابتكار عالمي حصري للعيادة).
15. إصلاح قطع وتر أكيليس.
16. مناظير القدم والكاحل.
17. علاج كوع التنس والجولف.
18. علاج اختناق الأوتار والأعصاب (النفق الرسغي).

تعليمات الرد:
- تحدث بلهجة مصرية مهذبة واحترافية.
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