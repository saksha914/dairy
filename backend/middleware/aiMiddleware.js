const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API_KEY}`);
// console.log(genAI);

exports.suggest = async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContentStream(prompt);
    const response = await result.response;
    let text = await response.text();
    text = text.replace(/\n/g, '                ');

    res.status(200).json({ text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ message: "Failed to generate content", error: error.message });
  }
};
