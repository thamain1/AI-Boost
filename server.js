// server.js

const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai'); // import OpenAI
require('dotenv').config()

const app = express();
// CORS configuration with preflight support
const corsOptions = {
  origin: 'http://localhost', // replace with your client's URI
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false
};

app.options('*', cors(corsOptions)); // preflight request for any route
app.use(cors(corsOptions)); // use the cors middleware for all routes

app.use(express.json());

app.use(cors());
app.use(express.json());

app.post('/api/message', async (req, res) => {
    const message = req.body.message;

    const configuration = new Configuration({
        organization: process.env.org-nCmaFqaxIjwLeONFJ8jFy0HB, // use the OpenAI Organization ID from the environment variable
        apiKey: process.env.OPENAI_API_KEY, // use the OpenAI API Key from the environment variable
    });
    const openai = new OpenAIApi(configuration);

    try {
        const prompt = {
            "engine": "text-davinci-002",
            "prompt": message,
            "max_tokens": 60
        };

        const aiRes = await openai.createCompletion(prompt); // use the OpenAI API client to generate a completion

        const aiMessage = aiRes.data.choices[0].text.trim();

        res.json({ message: aiMessage });
    } catch (error) {
        console.log('Error:', error.message);
        return res.status(500).json({ error: 'Failed to chat with OpenAI API' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
