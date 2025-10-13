// frontend/components/Navbar.jsx
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchMe, clearToken } from '@/lib/auth';

export default function Navbar(){
  const [user, setUser] = useState(null);

  async function refreshUser(){
    const u = await fetchMe();
    setUser(u);
  }

  useEffect(() => {
    // ครั้งแรก
    refreshUser();

    // ฟังสัญญาณว่ามีการ login/logout
    function handleAuthChanged(){ refreshUser(); }
    window.addEventListener('auth-changed', handleAuthChanged);

    // เผื่อหลายแท็บ
    function handleStorage(e){
      if (e.key === 'token') refreshUser();
    }
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('auth-changed', handleAuthChanged);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  function handleLogout(){
    clearToken(); // จะยิง event แล้ว refresh เอง
    // อยากเด้งกลับหน้าหลักด้วยก็ได้
    window.location.href = '/';
  }

  return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="container-p h-14 flex items-center justify-between">
        {!user ? (
          <Link href="/" className="font-semibold">CareerCompass</Link>
        ) : (
          <Link href="/dashboard" className="font-semibold">CareerCompass</Link>
        )}
        {!user ? (
          <nav className="flex items-center gap-3 text-sm">
            <Link href="/login" className="btn-ghost">Login</Link>
            <Link href="/register" className="btn-primary">Register</Link>
          </nav>
        ) : (
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-sm">
              สวัสดี, <span className="font-medium">{user.name}</span>
            </div>
            <button className="btn-ghost" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}
