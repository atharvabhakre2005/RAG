export function buildPrompt({ 
  code, 
  errorLogs, 
  language, 
  runtimeOutput, 
  retrieved, 
  filePath,
  functionName
}) {
  let context = "";

  if (retrieved && retrieved.length > 0) {
    context = `You have access to some similar past issues and fixes:\n\n`;
    retrieved.forEach((r, i) => {
      context += `Doc ${i + 1}:\n${r.doc}\nMetadata: ${JSON.stringify(r.metadata)}\n\n`;
    });
  } else {
    context = `⚠️ No relevant documentation or past fixes were found in the knowledge base.\n
Rely entirely on your reasoning, the provided code, error logs, and runtime output.\n\n`;
  }

  return `
You are an AI Debugger.
Language: ${language}
File: ${filePath || "N/A"}
Function: ${functionName || "N/A"}

Error Logs:
${errorLogs || "N/A"}

Code:
${code || "N/A"}

Runtime Output:
${runtimeOutput || "N/A"}

${context}

Now do the following:
1. Summarize the root cause of the issue.
2. Provide a corrected version of the code (only the relevant snippet).
3. Explain the fix clearly.
4. Suggest a few test cases to validate the fix.

Return response in structured JSON with keys:
{ "summary": ..., "fix": ..., "explanation": ..., "steps": [...], "fromKnowledgeBase": ... }
  `;
}
