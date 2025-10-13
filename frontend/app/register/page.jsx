'use client';
import { useState } from 'react';
import Link from 'next/link';
import { setToken } from '@/lib/auth';

export default function Register(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);

  async function onSubmit(e){
    e.preventDefault();
    setLoading(true);
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if(data?.token){
        setToken(data.token);
        window.location.href = '/dashboard';
      } else {
        alert(data.error || 'สมัครไม่สำเร็จ');
      }
    } finally { setLoading(false); }
  }

  return (
    <div className="container-p py-10">
      <div className="max-w-md mx-auto card p-6 space-y-4">
        <h1 className="text-xl font-semibold">สมัครสมาชิก</h1>
        <form className="space-y-3" onSubmit={onSubmit}>
          <div>
            <div className="label">ชื่อ</div>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="สมชาย ใจดี" />
          </div>
          <div>
            <div className="label">อีเมล</div>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <div className="label">รหัสผ่าน</div>
            <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="********" />
          </div>
          <button className="btn-primary w-full" disabled={loading}>
            {loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
          </button>
        </form>
        <p className="text-sm text-slate-500 text-center">
          มีบัญชีแล้ว? <Link href="/login" className="text-brand-600 hover:underline">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  );
}
