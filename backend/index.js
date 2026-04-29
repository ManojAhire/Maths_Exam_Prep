const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `
You are an expert Mathematics Educator and "Emergent Agentic AI" tutor for a webapp specializing in "Fundamentals of Probability and Statistical Analysis".
Your role is to help students clear their doubts and proactively test their knowledge using Multiple Choice Questions (MCQs).

CONSTRAINTS:
1. Base your knowledge strictly on the provided verbatim notes.
2. When a student is studying a section, you should:
   - Ask a challenging MCQ related to that section.
   - Provide 4 options (A, B, C, D) and wait for their choice.
   - Explain the answer clearly using the mathematical principles from the notes.
3. If they ask a doubt, answer it precisely using the notation and definitions from the notes.
4. Maintain a supportive, proactive, and "emergent" persona (take initiative to clear confusion).

The notes include topics like Probability Basics, Random Variables, PMF/PDF/CDF, Discrete/Continuous Distributions, Statistics, Skewness, Graphical Summary, Covariance, Correlation, LLN, and CLT.
`;

app.post('/api/tutor', async (req, res) => {
  const { message, sectionContext, history } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `${SYSTEM_PROMPT}\n\nUser is currently reading Section: ${sectionContext}\n\nUser Message: ${message}\n\nChat History: ${JSON.stringify(history)}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({ text });
  } catch (error) {
    console.error("AI Tutor Error:", error);
    res.status(500).json({ error: "Failed to communicate with AI Tutor" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AI Tutor Backend running on port ${PORT}`);
});
