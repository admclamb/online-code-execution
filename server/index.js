const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = 'YOUR_API_KEY';

app.post("/compile", async (req, res) => {
    const { code, language, input } = req.body;

    const langMap = {
        python: "python",
        c: "c",
        cpp: "cpp",
        java: "java"
    };

    const data = {
        prompt: `${code}\n${input}`,
        max_tokens: 100,
        temperature: 0,
        top_p: 1,
        n: 1,
        stop: ["\n"]
    };

    try {
        const response = await Axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        });
        res.send({ output: response.data.choices[0].text });
    } catch (error) {
        console.error("Error during code compilation:", error.message);
        res.status(500).send({ error: "Code execution failed", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
