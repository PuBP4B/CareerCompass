// backend/src/routes/ai.js
import express from 'express';
import requireAuth from '../middlewares/requireAuth.js';
import TestResult from '../../models/TestResult.js';
import OpenAI from 'openai';

const router = express.Router();

// 🟢 ฟังก์ชันนี้จะอ่าน OPENAI_API_KEY ตอนถูกเรียกจริง
function getOpenAI() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY not set');
  return new OpenAI({ apiKey: key });
}

router.post('/recommend', requireAuth, async (req,res)=>{
  try{
    const latest = await TestResult.findOne({userId:req.user.id}).sort({createdAt:-1});
    const input = req.body?.extra || {};
    const prompt = `You are a career advisor. Recommend 3 suitable careers with reasons and required skills.
User MBTI: ${latest?.mbti||'unknown'}
Aptitude: ${JSON.stringify(latest?.aptitude||{})}
Basic knowledge score: ${latest?.basicScore||0}
User extra: ${JSON.stringify(input)}
Return JSON: {recommendations:[{title, reasons[], skills[]}]} `;

    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{role:'user', content:prompt}]
    });
    const text = completion.choices[0].message.content;
    try { res.json(JSON.parse(text)); } catch { res.json({raw:text}); }
  }catch(e){ res.status(500).json({error:e.message}); }
});

export default router;
