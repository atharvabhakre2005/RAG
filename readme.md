🚀 AI Debugger – Automatic Code Fixing with Gemini 2.5 Flash + RAG + ChromaDB

An advanced AI-powered debugging engine that analyzes code, runtime output, and error logs, retrieves similar issues using Vector Search (ChromaDB), and generates structured debugging responses using Google Gemini 2.5 Flash.

This project supports:

✔️ Retrieval-Augmented Debugging (RAG)
✔️ JSON-structured AI responses
✔️ Automatic artifact logging
✔️ Code-execution + debugging
✔️ Full REST API
✔️ Local vector store using ChromaDB
✔️ Works with any language (Python, JS, C, Java, etc.)

📌 Features
🔍 1. Intelligent Debugging

Send code + runtime logs → get:

root cause analysis

corrected code snippet

explanation

test cases

knowledge-base evidence

🧠 2. RAG (Retrieval Augmented Generation)

ChromaDB stores past issues → similar debugging examples are retrieved and added as context.

⚙️ 3. Google Gemini 2.5 Flash Support

Uses:

gemini-2.5-flash (main model)

text-embedding-004 (embeddings)

🗂 4. Artifact Storage

Every debug request saved in:

/artifacts/<uuid>.json


Useful for analytics or debugging history.

💾 5. Modular Code Design

Separate modules for:

AI Client

ChromaDB Vector Store

Prompt Builder

Debugger Routes

Seed Script

📁 Project Structure
AI-Debugger/
│── artifacts/               # Saved debug sessions
│── routes/
│   └── debugger.js          # Debug API routes
│── services/
│   ├── geminiClient.js      # Gemini API wrapper
│   ├── vectorStore.js       # ChromaDB interface
│── utils/
│   └── promptBuilder.js     # RAG + debugging prompt
│── seedDocs.js              # Seeds ChromaDB with examples
│── server.js                # Main Express server
│── test.js                  # Example buggy code
│── .env                     # API keys + config
│── package.json
└── README.md                # You are reading this 🙂

🛠 Installation
1️⃣ Clone the Repository
git clone https://github.com/<your-username>/ai-debugger.git
cd ai-debugger

2️⃣ Install Dependencies
npm install

🔧 Environment Setup

Create a .env file:

GEMINI_API_KEY=YOUR_API_KEY_HERE
GEMINI_MODEL=gemini-2.5-flash
PORT=8080

💽 Start ChromaDB (Vector Database)

The debugger uses ChromaDB on port 8000.

Option 1 — Docker (Recommended)
docker run -p 8000:8000 chromadb/chroma

Option 2 — Local install (pip)
pip install chromadb
chroma run --host localhost --port 8000

📥 Seed Sample Debugging Docs
node seedDocs.js


Expected output:

✅ Seeded sample docs into ChromaDB

▶️ Start the Server
node server.js


Output:

✅ AI Debugger running at http://localhost:8080

🔌 API Usage
🔹 POST /debug/debug-compiler

Send code, logs, runtime output, etc.

Example Request
{
  "language": "javascript",
  "filePath": "src/utils/mathUtils.js",
  "functionName": "divide",
  "code": "console.log(1/0)",
  "errorLogs": "Output is Infinity",
  "runtimeOutput": ""
}

Example Response
{
  "requestId": "a1b2c3d4",
  "retrievedCount": 3,
  "result": {
    "summary": "...",
    "fix": "...",
    "explanation": "...",
    "steps": [...],
    "fromKnowledgeBase": [...]
  }
}

🧪 Example Buggy Script

test.js

import fs from "fs";

fs.readFile(12345, "utf-8", (err, data) => {
  if (err) console.error("Error occurred:", err);
  else console.log("File content:", data);
});


Run:

node test.js


Then send error logs + code to the debugger API.

📦 Artifacts

Every debugging session is saved:

/artifacts/<uuid>.json


Includes:

original request

retrieved documents

Gemini response

Perfect for:

analytics

training

audits

🛡 Troubleshooting
❗ 1. Gemini model not found

Fix: use correct model name

gemini-2.5-flash


and update .env.

❗ 2. ChromaDB connection refused

Check if Chroma is running:

curl http://localhost:8000


If not → start Docker/pip server.

❗ 3. "Embedding error"

Check you are using:

text-embedding-004

❗ 4. ".env not loading"

Ensure:

import dotenv from "dotenv";
dotenv.config();


exists at the top of server.js and geminiClient.js.

🤝 Contributing

Pull requests are welcome!

Please follow:

Meaningful commit messages

Clean modular code

No secrets in commits

Add meaningful test cases

⭐ Future Enhancements (Optional)

Web UI (React + Tailwind)

Streaming Gemini responses

Auto-run code sandbox

Multi-language execution

GitHub plugin integration

RAG categories (JS/Python/Java)

If you want any of these, tell me — I can generate full implementation.