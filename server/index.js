// Load environment variables from a .env file into process.env
require('dotenv').config();

// Import necessary modules
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const winston = require('winston');

// Create an instance of an Express application
const app = express();
const PORT = process.env.PORT || 8000; // Set the port from environment variables or default to 8000
const PISTON_API_URL = process.env.PISTON_API_URL; // URL of the Piston API for code execution
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL; // Client origin URL for CORS

/**
 * Configure Winston logger for logging errors and information
 * - Logs errors to error.log
 * - Logs all messages to combined.log
 * - Logs to console in non-production environments
 */
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to error.log
        new winston.transports.File({ filename: 'combined.log' }) // Log all messages to combined.log
    ]
});

// Add console transport in non-production environments
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

/**
 * Apply security headers using Helmet.js
 * - Sets various HTTP headers to secure the app
 * - Configures Content Security Policy (CSP) and Referrer Policy
 */
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"], // Allow resources only from the same origin
            scriptSrc: ["'self'", "'unsafe-inline'"], // Allow inline scripts
            styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles
            imgSrc: ["'self'", "data:"] // Allow images from the same origin and data URIs
        }
    },
    referrerPolicy: { policy: 'no-referrer' } // Do not send the Referer header
}));

/**
 * Rate limiter middleware to limit the number of requests per IP
 * - Limits each IP to 100 requests per 15 minutes
 * - Sends a message when rate limit is exceeded
 */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.' // Message sent when rate limit is exceeded
});
app.use(limiter);

/**
 * Enhanced CORS policy to restrict access to specific origins
 * - Only allows requests from the client origin URL
 * - Allows GET and POST methods
 * - Allows specific headers: Content-Type and Authorization
 */
const corsOptions = {
    origin: CLIENT_ORIGIN_URL, // Allow only the client origin URL
    methods: 'GET,POST', // Allow only GET and POST methods
    allowedHeaders: 'Content-Type,Authorization', // Allow only specific headers
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));

// Middleware to parse incoming JSON requests
app.use(express.json());

/**
 * Route to handle code compilation requests
 * - Validates inputs: code (string, non-empty), language (string, non-empty, one of python, c, cpp, java, javascript), input (optional string)
 * - Sends the code to Piston API for execution
 * - Returns the output or error response
 */
app.post('/compile', [
    body('code').isString().notEmpty(), // Validate 'code' field: must be a non-empty string
    body('language').isString().notEmpty().isIn(['python', 'c', 'cpp', 'java', 'javascript']), // Validate 'language' field: must be a non-empty string and one of the specified values
    body('input').optional().isString() // Validate 'input' field: optional, must be a string if provided
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return validation errors if any
    }

    const { code, language, input } = req.body; // Destructure validated inputs

    // Map provided language to Piston API supported language
    const langMap = {
        python: 'python3',
        c: 'c',
        cpp: 'cpp',
        java: 'java',
        javascript: 'javascript' // Add JavaScript mapping
    };

    // Create the payload for the Piston API
    const data = {
        language: langMap[language],
        version: '*',
        files: [{ name: `main.${language}`, content: code }],
        stdin: input || ''
    };

    try {
        // Send the code to Piston API for execution
        const response = await axios.post(PISTON_API_URL, data, {
            headers: { 'Content-Type': 'application/json' }
        });
        res.send({ output: response.data.run.output }); // Send the output back to the client
    } catch (error) {
        // Log the error and send error response to the client
        logger.error('Error during code compilation:', { message: error.message, stack: error.stack });
        res.status(500).send({ error: 'Code execution failed', details: error.message });
    }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
