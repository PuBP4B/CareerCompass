import express from 'express';
import requireAuth from '../middlewares/requireAuth.js';
import OpenAI from 'openai';
import QuizAttempt from '../../models/QuizAttempt.js';

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/generate', requireAuth, async (req,res)=>{
  try{
    const { topic="javascript basics", num=10 } = req.body;
    const prompt = `Generate ${num} multiple-choice quiz questions on "${topic}".
Return JSON: [{id,text,choices:["A","B","C","D"],answerIndex}]
Keep difficulty: beginner-to-intermediate.`;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{role:'user', content:prompt}]
    });
    const text = completion.choices[0].message.content;
    let questions = [];
    try { questions = JSON.parse(text); } catch { return res.json({raw:text}); }
    res.json({questions});
  }catch(e){ res.status(500).json({error:e.message}); }
});

router.post('/submit', requireAuth, async (req,res)=>{
  try{
    const { topic, questions, answers } = req.body;
    let score = 0;
    questions.forEach((q,i)=>{ if(answers[i]===q.answerIndex) score++; });
    const attempt = await QuizAttempt.create({ userId:req.user.id, topic, questions, answers, score });
    res.json({score, total:questions.length, attemptId:attempt._id});
  }catch(e){ res.status(500).json({error:e.message}); }
});

export default router;
