'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchMe } from '@/lib/auth';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchMe().then(setUser);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="text-blue-600 font-semibold text-lg tracking-wide mb-4">
          AI • MBTI • Learning Path
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          ค้นหาเส้นทางการเรียน & อาชีพ <br />
          ที่เหมาะกับคุณด้วย <span className="text-blue-600">AI</span>
        </h1>
        <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
          ทำแบบสอบถามความถนัด/MBTI, รับคำแนะนำอาชีพ, วางแผนทักษะ และฝึกทำ Quiz เพื่อประเมินความเข้าใจ
        </p>

        {!user && (
          <div className="flex justify-center gap-4 mb-16">
            <Link href="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
              สมัครใช้งานฟรี
            </Link>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-24">
        {[
          { title: 'แบบสอบถาม', desc: 'MBTI • Aptitude • Basic Knowledge', link: '/tests' },
          { title: 'AI แนะนำอาชีพ', desc: 'Top careers + เหตุผล + ทักษะที่ต้องเรียน', link: '/career' },
          { title: 'Learning Path', desc: 'Roadmap ทักษะตามอาชีพ', link: '/path' },
          { title: 'Quiz ฝึกทำ', desc: 'สุ่มโจทย์ใหม่ทุกครั้ง • เก็บสถิติ', link: '/quiz' },
        ].map((f, i) => (
          <Link
            key={i}
            href={f.link}
            className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-lg hover:border-blue-400 transition-all"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-800">{f.title}</h3>
            <p className="text-gray-600 mb-4">{f.desc}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">เริ่มเลย</button>
          </Link>
        ))}
      </section>
    </main>
  );
}
