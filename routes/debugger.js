import express from "express";
import fs from "fs";
import path from "path";
import { buildPrompt } from "../utils/promptBuilder.js";
import * as vectorStore from "../services/vectorStore.js";
import { sendToAI } from "../services/geminiClient.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
const artifactsDir = path.join(process.cwd(), "artifacts");

// Ensure artifacts directory exists
if (!fs.existsSync(artifactsDir)) fs.mkdirSync(artifactsDir);


// ------------------------------------------------------
// ✅ 1) Existing Route — Keep your old logic here
// ------------------------------------------------------
router.post("/run-and-debug", async (req, res) => {
  res.json({ message: "Your old /run-and-debug logic stays here." });
});


// ------------------------------------------------------
// ✅ 2) NEW AI Debugger Route (with Auto Code Fix)
// ------------------------------------------------------
router.post("/debug-compiler", async (req, res) => {
  try {
    let {
      filePath,
      code,
      language = "javascript",
      runtimeOutput = "",
      errorLogs = "",
      shouldApplyFix = false
    } = req.body;


    // ------------------------------------------------------
    // 🔹 2.1 Read code from file if filePath provided
    // ------------------------------------------------------
    if (filePath) {
      const absolutePath = path.resolve(process.cwd(), filePath);

      if (!fs.existsSync(absolutePath)) {
        return res.status(400).json({ error: `File not found: ${absolutePath}` });
      }

      code = fs.readFileSync(absolutePath, "utf-8");
    }

    // Validation
    if (!code && !errorLogs) {
      return res.status(400).json({
        error: "Provide at least code, or filePath, or errorLogs"
      });
    }


    // ------------------------------------------------------
    // 🔹 2.2 RAG — Retrieve similar debugging examples
    // ------------------------------------------------------
    let retrieved = [];
    try {
      retrieved = await vectorStore.querySimilarDocs(code + "\n" + errorLogs, 3);
    } catch (err) {
      console.warn("⚠️ ChromaDB not reachable → Skipping retrieval.");
    }


    // ------------------------------------------------------
    // 🔹 2.3 Build Prompt for Gemini
    // ------------------------------------------------------
    const prompt = buildPrompt({
      code,
      errorLogs,
      language,
      runtimeOutput,
      retrieved
    });


    // ------------------------------------------------------
    // 🔹 2.4 Send request to Gemini
    // ------------------------------------------------------
    const geminiResp = await sendToAI(prompt);


    // ------------------------------------------------------
    // 🔹 2.5 Save artifact for logging/history
    // ------------------------------------------------------
    const requestId = uuidv4();

    fs.writeFileSync(
      path.join(artifactsDir, `${requestId}.json`),
      JSON.stringify({ input: req.body, retrieved, geminiResp }, null, 2)
    );


    // ------------------------------------------------------
    // 🔹 2.6 Apply Fix (Optional)
    // ------------------------------------------------------
    let fixApplied = false;

    if (shouldApplyFix && geminiResp.correctedCode && filePath) {
      const absolutePath = path.resolve(process.cwd(), filePath);

      // Backup original file
      fs.writeFileSync(absolutePath + ".bak", code);

      // Write corrected version
      fs.writeFileSync(absolutePath, geminiResp.correctedCode);

      fixApplied = true;
    }


    // ------------------------------------------------------
    // 🔹 2.7 Final Response
    // ------------------------------------------------------
    return res.json({
      requestId,
      retrievedCount: retrieved.length,
      fixApplied,
      result: geminiResp
    });

  } catch (err) {
    console.error("Debugger error:", err);
    res.status(500).json({ error: err.message });
  }
});


export default router;
