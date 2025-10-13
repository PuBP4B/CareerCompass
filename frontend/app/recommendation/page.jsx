'use client';
import { useState } from 'react';
import { api } from '@/lib/api';

export default function Recommendation(){
  const [data,setData]=useState(null);
  async function getRec(){
    const r = await api('/ai/recommend',{ method:'POST', body: JSON.stringify({}) });
    setData(r);
  }
  return (
    <div className="p-6 space-y-3">
      <h1 className="text-xl font-bold">AI Career Recommendation</h1>
      <button className="btn" onClick={getRec}>Generate</button>
      {data && <pre className="bg-gray-100 p-3 rounded">{JSON.stringify(data,null,2)}</pre>}
    </div>
  );
}
