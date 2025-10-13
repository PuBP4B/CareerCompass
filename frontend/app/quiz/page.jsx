'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function Quiz(){
  const [topic,setTopic]=useState('javascript basics');
  const [qs,setQs]=useState([]);
  const [ans,setAns]=useState({});
  const [score,setScore]=useState(null);

  async function gen(){
    const r = await api('/quiz/generate',{method:'POST', body:JSON.stringify({topic, num:10})});
    setQs(r.questions||[]);
    setAns({});
    setScore(null);
  }
  async function submit(){
    const answers = qs.map((_,i)=> Number(ans[i]||-1));
    const r = await api('/quiz/submit',{method:'POST', body:JSON.stringify({topic, questions:qs, answers})});
    setScore(`${r.score}/${r.total}`);
  }
  useEffect(()=>{ gen(); },[]);
  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-2 items-center">
        <input className="border p-2 rounded w-80" value={topic} onChange={e=>setTopic(e.target.value)} />
        <button className="btn" onClick={gen}>Regenerate</button>
      </div>
      {qs.map((q,i)=>(
        <div key={q.id||i} className="card">
          <div className="font-medium">{i+1}. {q.text}</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {q.choices.map((c,idx)=>(
              <label key={idx} className={`border rounded p-2 cursor-pointer ${ans[i]==idx?'bg-blue-50 border-blue-400':''}`}>
                <input type="radio" name={`q${i}`} className="mr-2"
                  onChange={()=>setAns(a=>({...a,[i]:idx}))}/>
                {c}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button className="btn" onClick={submit}>Submit</button>
      {score && <div className="text-lg font-bold">Score: {score}</div>}
    </div>
  );
}
