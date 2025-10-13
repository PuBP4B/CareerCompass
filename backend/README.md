# CareerCompass Backend

## ใช้ MongoDB Atlas (แนะนำ)
1) คัดลอก `.env.example` เป็น `.env` และใส่ค่า `MONGO_URI` ที่ได้จาก Atlas (ปล่อย IP 0.0.0.0/0 ชั่วคราวเพื่อทดสอบ)
2) ใส่ `OPENAI_API_KEY` และแก้ `JWT_SECRET`
3) รัน:
```bash
npm install
npm run dev
```

## ใช้ MongoDB Local (ผ่าน Docker)
```bash
docker compose up -d
# แล้วตั้งค่า .env:
# MONGO_URI=mongodb://root:example@localhost:27017/careercompass?authSource=admin
npm install
npm run dev
```

## Endpoints
- POST /auth/register, POST /auth/login
- POST /tests/submit, GET /tests/latest
- POST /ai/recommend
- POST /quiz/generate, POST /quiz/submit
- GET  /path/roadmap, GET /path/courses
