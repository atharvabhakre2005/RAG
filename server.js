import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import debuggerRoute from "./routes/debugger.js";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "2mb" }));
app.use("/debug", debuggerRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`✅ AI Debugger running at http://localhost:${port}`);
});
