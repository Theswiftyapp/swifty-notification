const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    return res.status(200).json({
      success: true,
      expoResponse: response.data,
    });
  } catch (error) {
    console.error('Expo push error:', error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
}
