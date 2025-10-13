'use client';
import { useEffect, useState } from 'react';

const MBTI_TYPES = [
  'INTJ','INTP','ENTJ','ENTP',
  'INFJ','INFP','ENFJ','ENFP',
  'ISTJ','ISFJ','ESTJ','ESFJ',
  'ISTP','ISFP','ESTP','ESFP'
];

function Section({ title, subtitle, children }) {
  return (
    <section className="card p-6 space-y-3">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {subtitle && <p className="text-slate-600">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export default function Tests(){
  // ---- MBTI ----
  const [mbti, setMbti] = useState('');
  const [showMbtiTest, setShowMbtiTest] = useState(false);

  // ---- MBTI mini test (10 ข้อแบบง่าย) ----
  const mbtiQuestions = [
    { id:1,  dim:'EI', q:'คุณชาร์จพลังจากการอยู่กับผู้คนมากกว่าลุยเดี่ยว', agreeSide:'E' },
    { id:2,  dim:'EI', q:'ชอบกิจกรรมที่คึกคัก แทนที่จะอยู่เงียบ ๆ คนเดียว', agreeSide:'E' },
    { id:3,  dim:'SN', q:'โฟกัส “ข้อเท็จจริง/รายละเอียด” มากกว่าไอเดียกว้าง ๆ', agreeSide:'S' },
    { id:4,  dim:'SN', q:'ชอบทดลองทำจริง มากกว่าคิดเชิงนามธรรม', agreeSide:'S' },
    { id:5,  dim:'TF', q:'เวลาตัดสินใจ คุณพึ่งเหตุผลมากกว่าความรู้สึก', agreeSide:'T' },
    { id:6,  dim:'TF', q:'คุณให้ความสำคัญกับความถูกต้องมากกว่าความเกรงใจ', agreeSide:'T' },
    { id:7,  dim:'JP', q:'ชอบวางแผนล่วงหน้าให้แน่นอน มากกว่าปรับไปตามสถานการณ์', agreeSide:'J' },
    { id:8,  dim:'JP', q:'ชอบปิดงานให้เสร็จเป็นระเบียบ มากกว่าปล่อยยืดหยุ่น', agreeSide:'J' },
    { id:9,  dim:'EI', q:'รู้สึก “อึดอัด” ถ้าต้องอยู่เงียบ ๆ ทั้งวัน', agreeSide:'E' },
    { id:10, dim:'SN', q:'สนใจ “สิ่งที่พิสูจน์ได้” มากกว่า “จินตนาการ”', agreeSide:'S' },
  ];
  const [mbtiAnswers, setMbtiAnswers] = useState({}); // {id: 1..5 (Likert)}
  function setLikert(id, val){ setMbtiAnswers(s => ({...s, [id]: val})); }

  function calcMBTI() {
    // map Likert 1..5 → agree ถ้า >=4, disagree ถ้า <=2, 3 = neutral (ไม่คิดคะแนน)
    const score = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };
    mbtiQuestions.forEach(q=>{
      const v = Number(mbtiAnswers[q.id] || 3);
      if (v === 3) return; // neutral
      const agree = v >= 4;
      const choose = agree ? q.agreeSide : opposite(q.agreeSide);
      score[choose]++;
    });
    const dimEI = (score.E >= score.I) ? 'E' : 'I';
    const dimSN = (score.S >= score.N) ? 'S' : 'N';
    const dimTF = (score.T >= score.F) ? 'T' : 'F';
    const dimJP = (score.J >= score.P) ? 'J' : 'P';
    return `${dimEI}${dimSN}${dimTF}${dimJP}`;
  }
  function opposite(x){
    const map = {E:'I', I:'E', S:'N', N:'S', T:'F', F:'T', J:'P', P:'J'};
    return map[x] || x;
  }

  // ---- Aptitude (1–5) ----
  const [aptitude, setAptitude] = useState({
    logic: 3, math: 3, creative: 3, communication: 3, teamwork: 3, perseverance: 3
  });
  function setApt(key, val){ setAptitude(a => ({...a, [key]: Number(val)})); }

  // ---- Basic Knowledge (0–10) ----
  const [basicScore, setBasicScore] = useState(5);

  // ---- Submit & Result ----
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  async function handleSubmit(){
    if(!token){ alert('กรุณาเข้าสู่ระบบก่อน'); return; }
    let finalMbti = mbti?.trim().toUpperCase();
    if(!finalMbti){
      // ใช้ผลจาก mini test
      finalMbti = calcMBTI();
    }

    setSaving(true);
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/tests/submit`, {
        method:'POST',
        headers: {
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          mbti: finalMbti,
          aptitude,
          basicScore: Number(basicScore)
        })
      });
      const data = await res.json();
      setResult(data);
      alert('บันทึกผลเรียบร้อย!');
    }catch(e){
      console.error(e);
      alert('บันทึกล้มเหลว');
    }finally{
      setSaving(false);
    }
  }

  return (
    <div className="container-p py-8 space-y-6">
      <h1 className="text-2xl font-semibold">แบบสอบถามเบื้องต้น</h1>

      {/* MBTI */}
      <Section
        title="MBTI"
        subtitle="ถ้ารู้ประเภทของตัวเองอยู่แล้ว เลือกได้เลย; ถ้าไม่รู้ ลองทำแบบทดสอบสั้น ๆ ด้านล่าง"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">เลือก MBTI (ถ้ารู้)</label>
            <select
              className="input"
              value={mbti}
              onChange={e=>setMbti(e.target.value)}
            >
              <option value="">— ยังไม่ทราบ MBTI —</option>
              {MBTI_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              className="btn-ghost"
              onClick={()=>setShowMbtiTest(s=>!s)}
            >
              {showMbtiTest ? 'ซ่อนแบบทดสอบ MBTI' : 'ทำแบบทดสอบ MBTI แบบสั้น'}
            </button>
          </div>
        </div>

        {showMbtiTest && (
          <div className="mt-4 space-y-3">
            {mbtiQuestions.map((q)=>(
              <div key={q.id} className="border rounded-xl p-3">
                <div className="font-medium">{q.id}. {q.q}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[1,2,3,4,5].map(v=>(
                    <label key={v} className={`px-3 py-1 rounded border cursor-pointer ${Number(mbtiAnswers[q.id])===v?'bg-brand-50 border-brand-400':'border-slate-200'}`}>
                      <input
                        type="radio"
                        name={`q${q.id}`}
                        className="mr-2"
                        onChange={()=>setLikert(q.id, v)}
                      />
                      {v===1?'ไม่เห็นด้วยมาก':v===3?'ปานกลาง':v===5?'เห็นด้วยมาก':v}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className="text-lg text-slate-600">
              * ระบบจะคำนวณ MBTI จากคำตอบข้างต้นอัตโนมัติ (ถ้าไม่กรอก MBTI เอง) — ผลลัพธ์: <span className="font-semibold">{calcMBTI()}</span>
            </div>
          </div>
        )}
      </Section>

      {/* Aptitude */}
      <Section
        title="แบบสอบถามความถนัด (Aptitude)"
        subtitle="ให้คะแนน 1–5 (1 = น้อยมาก, 5 = มาก)"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            ['logic','ตรรกะ/การวิเคราะห์'],
            ['math','คณิตศาสตร์/ปริมาณ'],
            ['creative','ความคิดสร้างสรรค์'],
            ['communication','การสื่อสาร/นำเสนอ'],
            ['teamwork','การทำงานเป็นทีม'],
            ['perseverance','ความพยายาม/วินัย']
          ].map(([key,label])=>(
            <div key={key}>
              <div className="label">{label}</div>
              <div className="mt-2 flex gap-2">
                {[1,2,3,4,5].map(v=>(
                  <button
                    key={v}
                    type="button"
                    className={`btn ${aptitude[key]===v?'bg-brand-500 text-white':'btn-ghost'}`}
                    onClick={()=>setApt(key, v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Basic Knowledge */}
      <Section
        title="Basic Knowledge"
        subtitle="พิมพ์ความรู้หรือทักษะที่คุณมี (คั่นด้วยเครื่องหมายจุลภาค , )"
      >
        <div className="max-w-xl">
          <label className="label">ตัวอย่าง: HTML, Calculus, Biology, Python, UX Design</label>
          <input
            type="text"
            className="input"
            value={basicScore}
            onChange={e => setBasicScore(e.target.value)}
            placeholder="พิมพ์หัวข้อความรู้ของคุณ เช่น HTML, CSS, calculus, biology"
          />
          <div className="mt-2 text-sm text-slate-600">
            * คุณสามารถกรอกได้หลายหัวข้อ โดยคั่นด้วยเครื่องหมายจุลภาค (,)
          </div>
        </div>
      </Section>

      <div className="flex gap-3">
        <button className="btn-primary" onClick={handleSubmit} disabled={saving}>
          {saving ? 'กำลังบันทึก...' : 'บันทึกผลแบบสอบถาม'}
        </button>
      </div>

      {result && (
        <section className="card p-4">
          <div className="font-medium">บันทึกแล้ว</div>
        </section>
      )}
    </div>
  );
}
