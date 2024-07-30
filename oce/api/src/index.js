const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 8080;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Supported languages
const whitelist = [
  "python",
  "python2",
  "python3",
  "ruby",
  "javascript",
  "js",
  "node",
  "c",
  "cpp",
  "c++",
  "go",
];

// Route to handle code execution
app.post("/execute", (req, res) => {
  const { language, source } = req.body;

  if (!whitelist.includes(language)) {
    return res.json({
      code: "unsupported_language",
      message: `${language} is not supported by Piston`,
    });
  }

  const extension = getExtension(language);
  const filename = path.join("/tmp", `${Date.now()}.${extension}`);

  fs.writeFile(filename, source, (err) => {
    if (err) {
      return res.json({
        ran: false,
        output: `Error writing file: ${err.message}`,
      });
    }

    // Execute the code
    execCode(language, filename, res);
  });
});

// Function to get the file extension based on language
function getExtension(language) {
  switch (language) {
    case "go":
      return "go";
    case "javascript":
    case "js":
    case "node":
      return "js";
    // Add other language cases as needed
    default:
      return "code";
  }
}

// Function to execute the code
function execCode(language, filename, res) {
  const command = `../../docker/execute ${language} ${filename}`;
  exec(command, (error, stdout, stderr) => {
    const output = stdout || stderr;
    const ran = !error;

    res.json({
      ran,
      output: output.trim(),
    });
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
