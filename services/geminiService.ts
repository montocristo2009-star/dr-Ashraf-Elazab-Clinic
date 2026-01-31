
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// تعليمات برمجية مكثفة تشمل كافة المواضيع والآراء لضمان دقة الرد
const SYSTEM_INSTRUCTION = `أنت "مساعد د. أشرف العزب الذكي". الدكتور أشرف استشاري جراحة العظام والمناظير وحاصل على الدكتوراة من جامعة القاهرة والزمالة الأوروبية (EBOT).

معلومات حيوية عن العيادة يجب أن تعرفها وتجيب بناءً عليها:
المقالات الطبية الـ 10 المتاحة في موقعنا:
1. إعادة بناء الرباط الصليبي (الدقة التشريحية).
2. إصلاح الغضروف الهلالي (خياطة الغضروف).
3. خلع الكتف المتكرر (عملية لاتارجيه).
4. قطع أوتار الكتف (المناظير الحديثة).
5. الطب التجديدي (حقن البلازما PRP).
6. إصلاح وتر أكيلس (التدخل المحدود 2 سم).
7. المفاصل الصناعية (استبدال مفصل الركبة).
8. التعافي بعد جراحة المناظير (التأهيل).
9. إصابات الرباط الجانبي (العلاج التحفظي).
10. خلع الصابونة المتكرر (إعادة بناء MPFL).

آراء المرضى (10 شهادات نجاح):
- كابتن أحمد علي (رباط صليبي - عودة للملاعب في 6 شهور).
- أ/ منى محمود (تغيير مفصل - مشي من ثاني يوم).
- أ/ إبراهيم حسن (خلع كتف متكرر - ثبات كامل).
- أ/ سارة يوسف (حقن بلازما PRP - نتائج ممتازة).
- الحاج محمد القاضي، أ/ رامي كمال، أ/ نادية السيد، م/ عادل سليمان، أ/ سامح فريد، أ/ ليلى عبدالرحمن.

تعليمات الرد:
- تحدث بلهجة مصرية مهذبة واحترافية.
- لا تصف أدوية إطلاقاً.
- أكد دائماً على أهمية الكشف السريري.
- إذا سألك المريض عن رأي الناس، اذكر له بعض قصص النجاح المذكورة أعلاه.
- إذا سألك عن الفروع: (القاهرة: التجمع الخامس، المنصورة: ميدان المحطة، السنبلاوين: أرض المحلج).`;

export const getMedicalAdvice = async (history: ChatMessage[], useSearch = false, useMaps = false) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // استخدام نموذج Pro للمهام الطبية لضمان أعلى دقة في الإجابة
    let modelName = 'gemini-3-pro-preview'; 
    const tools: any[] = [];
    
    if (useSearch) tools.push({ googleSearch: {} });
    if (useMaps) {
      modelName = 'gemini-2.5-flash'; // الخرائط مدعومة في فئة 2.5
      tools.push({ googleMaps: {} });
    }

    // تنسيق التاريخ لضمان البدء برسالة 'user' كما يتطلب Gemini
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
        temperature: 0.7, // توازن بين الإبداع والدقة الطبية
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
      text: "عذراً، واجهت مشكلة في معالجة طلبك حالياً. يمكنك تكرار السؤال أو الاتصال بالعيادة مباشرة عبر الأرقام الموضحة في الموقع للحصول على إجابة فورية من الفريق الطبي.", 
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
