
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const SYSTEM_INSTRUCTION = `أنت "مساعد د. أشرف العزب الذكي". الدكتور أشرف استشاري جراحة العظام والمناظير وحاصل على الدكتوراة من جامعة القاهرة والزمالة الأوروبية (EBOT).
    معلومات عن خدمات العيادة:
    1. متخصص في جراحات الركبة والمناظير والرباط الصليبي وإصلاح الغضروف الهلالي.
    2. يستخدم تقنيات التدخل المحدود الحديثة لإصلاح وتر أكيلس بفتحة 2 سم.
    3. يعالج خلع الكتف المتكرر (Bankart & Latarjet) وتوصيل أوتار الكتف بالمنظار.
    4. يعالج الخشونة بالحقن الجيلاتيني والتردد الحراري وحقن البلازما (PRP).
    5. خبير في علاج حالات عدم التئام الكسور والكسور المعقدة والمفاصل الصناعية.
    الخلفية العلمية: دكتوراة جامعة القاهرة، ألمانيا، جنيف، كوريا، والبورد الأوروبي.
    تعليمات الرد: تحدث بلغة مهنية محترمة (عامية مصرية مهذبة). لا تستخدم كلمة "سبيد بريدج" إطلاقاً. ممنوع كتابة أي أدوية. أكد دائماً على أهمية الكشف السريري.`;

export const getMedicalAdvice = async (history: ChatMessage[], useSearch = false, useMaps = false) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    let modelName = 'gemini-3-flash-preview';
    const tools: any[] = [];
    
    if (useSearch) tools.push({ googleSearch: {} });
    if (useMaps) {
      modelName = 'gemini-2.5-flash';
      tools.push({ googleMaps: {} });
    }

    // Gemini API REQUIRES the conversation to start with a 'user' message.
    // We skip the initial 'model' greeting if it's the first element.
    const formattedContents = history
      .filter((m, index) => !(index === 0 && m.role === 'model'))
      .map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

    if (formattedContents.length === 0) {
      return { text: "أهلاً بك، كيف يمكنني مساعدتك اليوم؟", grounding: [] };
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: tools.length > 0 ? tools : undefined,
      }
    });

    return {
      text: response.text || "عذراً، لم أستطع معالجة الرد بشكل صحيح.",
      grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error: any) {
    console.error("Gemini API Error Details:", error);
    // Return a more descriptive error if needed for debugging
    return { 
      text: "أعتذر منك، حدث خطأ تقني في الاتصال بالمساعد الذكي. يرجى المحاولة مرة أخرى أو التواصل مع العيادة هاتفياً.", 
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
        { text: `As a professional medical assistant, modify this medical image based on: ${prompt}. Focus on clarity and professional medical aesthetics.` }
      ]
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  return null;
};

export const generateMedicalVideo = async (base64Image: string, prompt: string, aspectRatio: '16:9' | '9:16') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: `Animate this medical illustration showing: ${prompt}. Professional, high-quality medical visualization.`,
    image: {
      imageBytes: base64Image,
      mimeType: 'image/png',
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: aspectRatio
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};
