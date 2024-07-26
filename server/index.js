// index.js
const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post("/compile", async (req, res) => {
    const { code, language, input } = req.body;

    const langMap = {
        python: "python3",
        c: "c",
        cpp: "cpp",
        java: "java"
    };

    const data = {
        language: langMap[language],
        version: "*",
        files: [
            {
                name: `main.${language}`,
                content: code
            }
        ],
        stdin: input
    };

    console.log("Received request:", data); // Add this line

    try {
        const response = await Axios.post('https://emkc.org/api/v2/piston/execute', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Received response from Piston API:", response.data); // Add this line
        res.send({ output: response.data.run.output });
    } catch (error) {
        console.error("Error during code compilation:", error.message);
        res.status(500).send({ error: "Code execution failed", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
