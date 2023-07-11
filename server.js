//server.js

const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai'); // import OpenAI
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'https://app.buildfire.com', // replace with the origin of your mobile app
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.post('/api/message', async (req, res) => {
  const message = req.body.message;

  const configuration = new Configuration({
    organization: process.env.org-OPENAI_ORG_ID, // use the OpenAI Organization ID from the environment variable
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

  console.log(`Server is running on port ${port}`);
});


