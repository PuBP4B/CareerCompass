import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Page from '@/components/Page';
import Link from 'next/link';

const Card = ({ title, desc, href }) => (
  <div className="card p-5 flex flex-col">
    <div className="text-lg font-medium">{title}</div>
    <p className="text-slate-600 mt-1 flex-1">{desc}</p>
    <Link href={href} className="btn-primary w-fit mt-4">ไปต่อ</Link>
  </div>
);

export default function Dashboard(){
  return (
    <>
      <Page title="Dashboard" subtitle="จัดการการเรียนรู้และคำแนะนำทั้งหมดของคุณ">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Card title="แบบสอบถาม" desc="MBTI, Aptitude, Basic Knowledge" href="/tests" />
          <Card title="AI แนะนำอาชีพ" desc="รับ 3 อาชีพที่เหมาะ พร้อมเหตุผล & ทักษะ" href="/recommendation" />
          <Card title="Learning Path" desc="Roadmap ทักษะที่ต้องเรียนตามอาชีพ" href="/learning-path" />
          <Card title="Quiz ฝึกทำ" desc="โจทย์สุ่มใหม่ทุกครั้ง เก็บคะแนนความคืบหน้า" href="/quiz" />
          <Card title="คอร์ส/Resource" desc="ลิงก์คอร์สและแหล่งเรียนรู้ตามสกิล" href="/courses" />
        </div>
      </Page>
      <Footer/>
    </>
  );
}
