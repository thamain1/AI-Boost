// server.js

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/message', async (req, res) => {
  const message = req.body.message;

  const prompt = {
    "model": "text-davinci-002",
    "prompt": message,
    "max_tokens": 60
  };

  const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(prompt)
  });

  if (!response.ok) {
    return res.status(500).json({ error: 'Failed to chat with OpenAI API' });
  }

  const data = await response.json();
  const aiMessage = data.choices[0].text.trim();

  res.json({ message: aiMessage });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
