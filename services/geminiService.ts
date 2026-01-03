
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateReflection = async (verse: string, reference: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a spiritual guide. Based on the Bible verse ${reference}: "${verse}", generate a deep spiritual reflection and three contemplative prompts for journaling.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reflection: {
              type: Type.STRING,
              description: "A 2-3 paragraph contemplative reflection on the verse."
            },
            prompts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Three specific questions to prompt personal reflection."
            }
          },
          required: ["reflection", "prompts"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating reflection:", error);
    return {
      reflection: "Take a moment to sit in silence with this word. Let its truth wash over your heart and mind as you consider its ancient wisdom and modern relevance.",
      prompts: [
        "How does this verse speak to your current circumstances?",
        "What part of your life is being called to change or find peace through this word?",
        "Write a prayer based on the promises found in this scripture."
      ]
    };
  }
};

export const fetchDailyVerse = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Select an inspiring, well-known Bible verse for daily meditation. Return the reference, the text (KJV or ESV style), and a short spiritual theme.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reference: { type: Type.STRING },
            text: { type: Type.STRING },
            theme: { type: Type.STRING }
          },
          required: ["reference", "text", "theme"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return {
      reference: "Psalm 23:1-3",
      text: "The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul.",
      theme: "Peace & Restoration"
    };
  }
};
