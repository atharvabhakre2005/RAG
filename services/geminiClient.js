import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function sendToAI(prompt) {
  const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-1.5-flash" });
  const resp = await model.generateContent(prompt);
  const text = resp.response.text();
  return { text };
}

export async function embed(text) {
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
  const resp = await model.embedContent(text);
  return resp.embedding.values;
}
