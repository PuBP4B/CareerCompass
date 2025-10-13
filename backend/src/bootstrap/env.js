// backend/src/bootstrap/env.js
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// โหลดไฟล์ .env จากรากโปรเจกต์ backend
dotenv.config({ path: path.join(__dirname, '../../.env') });

// debug (แสดงผลว่าพบคีย์ไหม)
console.log('DEBUG OPENAI:', process.env.OPENAI_API_KEY ? '✅ FOUND' : '❌ MISSING');
