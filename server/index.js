const express = require('express');
const cors = require('cors');
const axios = require('axios');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 8000;

// Apply security headers using Helmet.js
app.use(helmet());

// Rate limiter middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Enhanced CORS policy
const corsOptions = {
    origin: 'http://localhost:5173', // restrict to your frontend's origin
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
    optionsSuccessStatus: 200 // some legacy browsers choke on 204
};
app.use(cors(corsOptions));

app.use(express.json());

app.post('/compile', async (req, res) => {
    const { code, language, input } = req.body;

    const langMap = {
        python: 'python3',
        c: 'c',
        cpp: 'cpp',
        java: 'java'
    };

    if (!langMap[language]) {
        return res.status(400).json({ error: 'Unsupported language' });
    }

    const data = {
        language: langMap[language],
        version: '*',
        files: [{ name: `main.${language}`, content: code }],
        stdin: input || ''
    };

    try {
        const response = await axios.post('https://emkc.org/api/v2/piston/execute', data, {
            headers: { 'Content-Type': 'application/json' }
        });
        res.send({ output: response.data.run.output });
    } catch (error) {
        console.error('Error during code compilation:', error.message);
        res.status(500).send({ error: 'Code execution failed', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
