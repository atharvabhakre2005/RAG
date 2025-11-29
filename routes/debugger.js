import express from "express";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { buildPrompt } from "../utils/promptBuilder.js";
import * as vectorStore from "../services/vectorStore.js";
import { sendToAI } from "../services/geminiClient.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
const artifactsDir = path.join(process.cwd(), "artifacts");
if (!fs.existsSync(artifactsDir)) fs.mkdirSync(artifactsDir);

// ✅ Existing route — runs a file
router.post("/run-and-debug", async (req, res) => {
  // ... your current /run-and-debug logic (unchanged)
});

// ✅ New route — integrates with compiler
router.post("/debug-compiler", async (req, res) => {
  try {
    const { code, language = "javascript", runtimeOutput = "", errorLogs = "" } = req.body;

    if (!code && !errorLogs) {
      return res.status(400).json({ error: "Provide at least code or errorLogs" });
    }

    let retrieved = [];
    try {
      retrieved = await vectorStore.querySimilarDocs(code + "\n" + errorLogs, 3);
    } catch (dbErr) {
      console.warn("⚠️ ChromaDB not available or empty, skipping retrieval.");
    }

    const prompt = buildPrompt({
      code,
      errorLogs,
      language,
      runtimeOutput,
      retrieved
    });

    const geminiResp = await sendToAI(prompt);

    const requestId = uuidv4();
    fs.writeFileSync(
      path.join(artifactsDir, `${requestId}.json`),
      JSON.stringify({ input: req.body, retrieved, geminiResp }, null, 2)
    );

    res.json({ requestId, retrievedCount: retrieved.length, result: geminiResp });
  } catch (err) {
    console.error("Debugger error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
