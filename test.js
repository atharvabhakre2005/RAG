// test.js
import fs from "fs";

// ❌ Passing a number instead of a string/Buffer as filename
fs.readFile(12345, "utf-8", (err, data) => {
  if (err) {
    console.error("Error occurred:", err);
  } else {
    console.log("File content:", data);
  }
});
