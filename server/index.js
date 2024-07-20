const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const JD_CLIENT_ID = '4265ce8f2c88f6b303c2abafa62c72f8';
const JD_CLIENT_SECRET = 'd6d9528068a2ead17267c856e49a92c0f34dc3f730c0427588fe6c052265a30e';

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
