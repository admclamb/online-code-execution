const express = require("express");
const cors = require("cors");
const Axios = require("axios");
require('dotenv').config();  // Add this line
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const JD_CLIENT_ID = process.env.JD_CLIENT_ID;
const JD_CLIENT_SECRET = process.env.JD_CLIENT_SECRET;

app.post("/compile", async (req, res) => {
    const { code, language, input } = req.body;

    const langMap = {
        python: "python3",
        c: "c",
        cpp: "cpp14",
        java: "java"
    };

    const data = {
        clientId: JD_CLIENT_ID,
        clientSecret: JD_CLIENT_SECRET,
        script: code,
        stdin: input,
        language: langMap[language],
        versionIndex: "0"
    };

    try {
        const response = await Axios.post('https://api.jdoodle.com/v1/execute', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        res.send({ output: response.data.output });
    } catch (error) {
        console.error("Error during code compilation:", error.message);
        res.status(500).send({ error: "Code execution failed", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
