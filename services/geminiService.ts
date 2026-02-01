import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const SYSTEM_INSTRUCTION = `أنت "مساعد د. أشرف العزب الذكي". الدكتور أشرف استشاري جراحة العظام والمناظير وحاصل على الدكتوراة من جامعة القاهرة والزمالة الأوروبية (EBOT).

الخبرات الدولية والزمالات المرموقة التي يجب أن تذكرها بفخر:
1. زمالة جامعة جنيف (سويسرا) في علاج وترميم الكسور المعقدة.
2. زمالة جامعة هايدلبرج (ألمانيا) في جراحات المفاصل الصناعية.
3. زمالة جامعة سيول (كوريا الجنوبية) في الأطراف الصناعية المتقدمة.

العضويات الدولية: SICOT, AO Trauma, ISAKOS, AAOS, ESSKA.

تعليمات الرد:
- تحدث بلهجة مصرية مهذبة واحترافية.
- لا تصف أدوية إطلاقاً.
- أكد دائماً على أهمية الكشف السريري.
- الفروع: القاهرة (التجمع)، المنصورة (ميدان المحطة)، السنبلاوين (أرض المحلج).`;

export const getMedicalAdvice = async (history: ChatMessage[], useSearch = false, useMaps = false) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // استخدام الموديل الأنسب حسب نوع المهمة
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
        thinkingConfig: { thinkingBudget: 0 } // تعطيل التفكير لسرعة الاستجابة في الشات
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

export const editMedicalImage = async (base64Image: string, prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: prompt },
      ],
    },
  });

  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  }
  throw new Error("No image generated");
};

export const generateMedicalVideo = async (base64Image: string, prompt: string, aspectRatio: '16:9' | '9:16' = '16:9'): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    image: { imageBytes: base64Image, mimeType: 'image/jpeg' },
    config: { numberOfVideos: 1, resolution: '720p', aspectRatio: aspectRatio }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  const fetchResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  const blob = await fetchResponse.blob();
  return URL.createObjectURL(blob);
};
