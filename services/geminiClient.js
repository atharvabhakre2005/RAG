import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Initialize SDK with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use gemini-2.5-flash as default
const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.5-flash";

export async function sendToAI(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const resp = await model.generateContent(prompt);
    const text = resp.response.text();

    return { text };
  } catch (err) {
    console.error("Gemini generateContent error:", err);
    return { error: err.message };
  }
}

export async function embed(text) {
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

    const resp = await model.embedContent(text);
    return resp.embedding.values;
  } catch (err) {
    console.error("Embedding error:", err);
    return [];
  }
}
