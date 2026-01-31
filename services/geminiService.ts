
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const SYSTEM_INSTRUCTION = `أنت "مساعد د. أشرف العزب الذكي". الدكتور أشرف استشاري جراحة العظام والمناظير وحاصل على الدكتوراة من جامعة القاهرة والزمالة الأوروبية (EBOT).

تخصصات دقيقة إضافية يجب أن تعرفها وتجيب بناءً عليها:
1. استبدال المفاصل (Arthroplasty): تغيير مفصل الركبة، الحوض، والكتف.
2. علاج الكسور والتشوهات (Fracture repair & Realignment).
3. علاج الألم التداخلي (Interventional Pain Management):
    - حقن البلازما (PRP) للمفاصل والأوتار والكتف.
    - التردد الحراري (Radiofrequency ablation) لعلاج آلام الظهر والمفاصل.
    - الحقن الجيلاتيني (Hyaluronic acid) للركبة.
    - حقن الكورتيزون الموضعي.
4. التدريس الأكاديمي: الدكتور يقوم بتدريس جراحات المفاصل الصناعية والأطراف المتطورة.

تعليمات الرد:
- تحدث بلهجة مصرية مهذبة واحترافية.
- لا تصف أدوية إطلاقاً.
- أكد دائماً على أهمية الكشف السريري.
- إذا سأل المريض عن حقن البلازما أو التردد الحراري، اشرح له الفوائد بناءً على التخصصات المذكورة أعلاه.
- الفروع: (القاهرة: التجمع الخامس، المنصورة: ميدان المحطة، السنبلاوين: أرض المحلج).`;

export const getMedicalAdvice = async (history: ChatMessage[], useSearch = false, useMaps = false) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    let modelName = 'gemini-3-pro-preview'; 
    const tools: any[] = [];
    
    if (useSearch) tools.push({ googleSearch: {} });
    if (useMaps) {
      modelName = 'gemini-2.5-flash';
      tools.push({ googleMaps: {} });
    }

    const formattedContents = history
      .filter((m, index) => !(index === 0 && m.role === 'model'))
      .map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

    if (formattedContents.length === 0) {
      return { text: "أهلاً بك في عيادة د. أشرف العزب، كيف يمكنني مساعدتك طبياً اليوم؟", grounding: [] };
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: tools.length > 0 ? tools : undefined,
        temperature: 0.7,
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");

    return {
      text: text,
      grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error: any) {
    console.error("Gemini Critical Error:", error);
    return { 
      text: "عذراً، واجهت مشكلة في معالجة طلبك حالياً. يمكنك تكرار السؤال أو الاتصال بالعيادة مباشرة للحصول على إجابة فورية من الفريق الطبي.", 
      grounding: [] 
    };
  }
};

export const editMedicalImage = async (base64Data: string, prompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType: 'image/png' } },
          { text: `As a professional medical imaging assistant, modify this clinical image based on: ${prompt}. Maintain anatomical accuracy.` }
        ]
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (err) {
    console.error("Image Edit Error:", err);
    return null;
  }
};

export const generateMedicalVideo = async (base64Image: string, prompt: string, aspectRatio: '16:9' | '9:16') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: `Medical visualization: ${prompt}. Ensure professional healthcare aesthetics.`,
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
