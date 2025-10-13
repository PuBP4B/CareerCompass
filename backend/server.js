// ต้อง import env ก่อน import routes อื่น ๆ
import './src/bootstrap/env.js';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './src/routes/auth.js';
import testRoutes from './src/routes/tests.js';
import aiRoutes from './src/routes/ai.js';
import quizRoutes from './src/routes/quiz.js';
import pathRoutes from './src/routes/path.js';

// ไม่ต้อง dotenv.config() ซ้ำในไฟล์นี้แล้ว
const app = express();
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log('✅ MongoDB connected'))
  .catch(err=>console.error('Mongo connect error:', err.message));

app.use('/auth', authRoutes);
app.use('/tests', testRoutes);
app.use('/ai', aiRoutes);
app.use('/quiz', quizRoutes);
app.use('/path', pathRoutes);

app.get('/', (req,res)=>res.send('CareerCompass API ready'));
const port = process.env.PORT || 4000;
app.listen(port, ()=>console.log('🚀 API listening on http://localhost:'+port));
