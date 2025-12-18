
import { GoogleGenAI } from "@google/genai";
import { ExpenseItem } from "./types";

// Always use the direct process.env.API_KEY reference in the constructor as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartSummary = async (items: ExpenseItem[]): Promise<string> => {
  if (items.length === 0) return "No data available to summarize.";

  // Fix: Property 'description' does not exist on type 'ExpenseItem'. 
  // Removed the non-existent property reference to ensure successful compilation.
  const dataStr = items.map(i => `${i.date}: Amount ৳${i.amount}`).join('\n');
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following expense data for the Pro VC Office and provide a 2-sentence formal administrative summary:\n\n${dataStr}`,
      config: {
        systemInstruction: "You are a professional administrative assistant for a university Pro Vice-Chancellor's office.",
      },
    });

    // Directly accessing the .text property from the GenerateContentResponse object.
    return response.text || "Summary unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating smart summary.";
  }
};
