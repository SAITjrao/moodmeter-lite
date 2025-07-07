require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// DEBUG: confirm key loaded
console.log('OPENAI_API_KEY is', !!process.env.OPENAI_API_KEY);

app.post('/analyze', async (req, res) => {
  const { text } = req.body;
  console.log('Received text:', text);

  if (!process.env.OPENAI_API_KEY) {
    console.error('Missing API key!');
    return res.status(500).json({ error: 'Server missing API key' });
  }

  try {
    const payload = {
      model: 'gpt-4.1',
      messages: [
        { role: 'system', content: 'You are a sentiment analyzer. Respond ONLY in JSON with this format: {"sentiment": "Positive|Neutral|Negative", "justification": "...", "suggestion": "..."}',
        { role: 'user', content: text }
      ]
    };
    console.log('Calling OpenAI with:', JSON.stringify(payload));
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      payload,
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const analysis = response.data.choices[0].message.content.trim();
    console.log('OpenAI responded with:', analysis);
    res.json({ analysis });
  } catch (err) {
    console.error('OpenAI API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to analyze text' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
