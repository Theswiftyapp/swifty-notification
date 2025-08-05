const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/send-notification', async (req, res) => {
  const message = req.body;

  if (!message.to || !message.title || !message.body) {
    return res.status(400).json({ error: 'Missing required fields: to, title, or body' });
  }

  try {
    const response = await axios.post('https://exp.host/--/api/v2/push/send', message, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    res.status(200).json({
      success: true,
      expoResponse: response.data,
    });
  } catch (error) {
    console.error('Expo push error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Notification microservice running on port ${PORT}`);
});
