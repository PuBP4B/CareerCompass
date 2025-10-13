import express from 'express';
import requireAuth from '../middlewares/requireAuth.js';
import TestResult from '../../models/TestResult.js';

const router = express.Router();

router.post('/submit', requireAuth, async (req,res)=>{
  try{
    const { mbti, aptitude, basicScore } = req.body;
    const saved = await TestResult.create({ userId: req.user.id, mbti, aptitude, basicScore });
    res.json(saved);
  }catch(e){ res.status(500).json({error:e.message}); }
});

router.get('/latest', requireAuth, async (req,res)=>{
  try{
    const latest = await TestResult.findOne({userId:req.user.id}).sort({createdAt:-1});
    res.json(latest||{});
  }catch(e){ res.status(500).json({error:e.message}); }
});

export default router;
