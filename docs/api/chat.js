const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { message } = req.body;

      const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: message,
        max_tokens: 150
      });

      res.status(200).json({ response: completion.data.choices[0].text.trim() });
    } catch (error) {
      res.status(500).json({ error: 'Failed to process request' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
