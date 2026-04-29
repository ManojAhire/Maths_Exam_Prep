const { GoogleGenerativeAI } = require('@google/generative-ai');

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

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, sectionContext, history } = req.body;

  try {
    if (!process.env.GEMINI_API_KEY) {
        return res.status(200).json({ text: "Hey! I'm ready to help, but you need to add your `GEMINI_API_KEY` to Vercel's Environment Variables first. Once that's done, I can be your real AI Math Tutor!" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `${SYSTEM_PROMPT}\n\nUser is currently reading Section: ${sectionContext || 'General'}\n\nUser Message: ${message}\n\nChat History: ${JSON.stringify(history || [])}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({ text });
  } catch (error) {
    console.error("AI Tutor Error:", error);
    res.status(500).json({ error: "Failed to communicate with AI Tutor" });
  }
};
