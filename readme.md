🚀 AI-Debugger – Project Setup & Usage Guide

This project is a Node.js-based application that includes routing, services, utilities, and additional data folders such as artifacts and chroma-data.
Follow this guide to set up and run the project smoothly.

📦 1. Prerequisites

Before running the project, make sure you have:

Node.js (v16+ recommended)

NPM or Yarn

Git (optional)

Check using:

node -v
npm -v

📁 2. Project Structure
AI-DEBUGGER/
│── artifacts/        # Generated output files
│── chroma-data/      # Database / vector-store files
│── node_modules/     
│── routes/           # API routes
│── services/         # Service layer logic
│── utils/            # Helpers & utilities
│── .env              # Environment variables (NOT in Git)
│── package.json      
│── server.js         # Main server entry
│── seedDocs.js       # Script to seed initial documents
│── test.js           # Testing script

⚙️ 3. Install Dependencies

Run:

npm install


This will install all required packages listed in package.json.

🔑 4. Configure Environment Variables

Create a .env file in the project root:

PORT=5000
DB_PATH=./chroma-data
API_KEY=your-key-here


(Your actual variables may differ — adjust accordingly.)

🧪 5. Seed Initial Data (Optional)

If your project uses seedDocs.js, run:

node seedDocs.js


This will populate required data into chroma-data/ or any data store you use.

🚀 6. Start the Server

To run the backend:

node server.js


OR if you prefer npm start:

npm start


The server should now run on:

http://localhost:5000

🔍 7. Testing

You may run:

node test.js


Use this for verifying endpoints or internal logic.

🗂️ 8. Useful Scripts

If you want, you can add these to your package.json:

"scripts": {
  "start": "node server.js",
  "seed": "node seedDocs.js",
  "test": "node test.js"
}


Then run:

npm run seed
npm run test

🛠️ 9. Development Tips

Always keep .env out of Git (already in .gitignore)

Do not commit node_modules/

artifacts/ and chroma-data/ are generated → no need to push them

🔒 10. Troubleshooting
❗ Port Already in Use

Run:

npx kill-port 5000

❗ Modules not found

Run:

npm install

❗ Permission errors (Linux/Mac)

Use:

sudo npm install

🤝 Contributing

Feel free to fork the repository and submit pull requests.

📜 License

This project is licensed under the MIT License.