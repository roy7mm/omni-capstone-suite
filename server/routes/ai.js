import express from 'express';
import { getAIShoppingRecommendation } from '../services/aiService.js';

const router = express.Router();

// POST general AI chat / product recommendations
router.post('/chat', async (req, res) => {
  const { message, context } = req.body;
  if (!message) {
    return res.status(400).json({ success: false, message: 'Message is required' });
  }

  const aiRes = await getAIShoppingRecommendation(message);
  res.json({
    success: true,
    reply: aiRes.recommendation,
    suggestedProductId: aiRes.suggestedProductId
  });
});

// GET AI Service Health Check
router.get('/health', (req, res) => {
  const hasGroq = !!process.env.GROQ_API_KEY;
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  res.json({
    success: true,
    status: "Operational",
    mode: (hasGroq || hasOpenAI) ? "Live API Connected" : "Smart Offline Engine Active",
    provider: hasGroq ? "Groq (Llama-3.3)" : hasOpenAI ? "OpenAI (GPT-4o)" : "Deterministic Heuristic Engine"
  });
});

export default router;
