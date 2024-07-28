require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const winston = require('winston');

const app = express();
const PORT = process.env.PORT || 8000;
const PISTON_API_URL = process.env.PISTON_API_URL;

// Configure Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

// Apply security headers using Helmet.js
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:"]
        }
    },
    referrerPolicy: { policy: 'no-referrer' }
}));

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

app.post('/compile', [
    body('code').isString().notEmpty(),
    body('language').isString().notEmpty().isIn(['python', 'c', 'cpp', 'java']),
    body('input').optional().isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { code, language, input } = req.body;

    const langMap = {
        python: 'python3',
        c: 'c',
        cpp: 'cpp',
        java: 'java'
    };

    const data = {
        language: langMap[language],
        version: '*',
        files: [{ name: `main.${language}`, content: code }],
        stdin: input || ''
    };

    try {
        const response = await axios.post(PISTON_API_URL, data, {
            headers: { 'Content-Type': 'application/json' }
        });
        res.send({ output: response.data.run.output });
    } catch (error) {
        logger.error('Error during code compilation:', { message: error.message, stack: error.stack });
        res.status(500).send({ error: 'Code execution failed', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
