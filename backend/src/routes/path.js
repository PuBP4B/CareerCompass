import express from 'express';
import requireAuth from '../middlewares/requireAuth.js';

const router = express.Router();

router.get('/roadmap', requireAuth, (req,res)=>{
  res.json({
    skills: [
      {id:'s1', name:'Programming Basics', steps:['Variables','Loops','Functions']},
      {id:'s2', name:'Web Fundamentals', steps:['HTML','CSS','JS']}
    ]
  });
});

router.get('/courses', requireAuth, (req,res)=>{
  const skills = (req.query.skills||'').split(',').filter(Boolean);
  res.json({
    courses: skills.map((s,i)=>({ id: `c${i+1}`, title: `Course for ${s}`, provider: 'Mock', url: 'https://example.com'}))
  });
});

export default router;
