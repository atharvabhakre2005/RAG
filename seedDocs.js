// seedDocs.js
import { addDoc } from "./services/vectorStore.js";

// Example debugging docs
await addDoc(
  "1",
  "In Python, ZeroDivisionError happens when dividing by 0. Fix by checking the denominator before division.",
  { lang: "python" }
);

await addDoc(
  "2",
  "In Java, ArithmeticException '/ by zero' occurs when dividing by 0. Fix by checking divisor before division.",
  { lang: "java" }
);

await addDoc(
  "3",
  "A NullPointerException in Java occurs when you try to call a method on a null object reference. Fix by checking for null before usage.",
  { lang: "java" }
);

console.log("✅ Seeded sample docs into ChromaDB");
process.exit(0);
