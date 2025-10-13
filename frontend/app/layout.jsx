import './globals.css';
import { Prompt } from 'next/font/google';
import Navbar from '@/components/Navbar';

const prompt = Prompt({ subsets: ['thai','latin'], weight: ['300','400','500','600','700'], variable: '--font-prompt' });

export const metadata = {
  title: 'CareerCompass',
  description: 'AI-powered career & learning path advisor',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={`${prompt.variable}`}>
      <body className="font-sans bg-soft text-ink antialiased">
        <Navbar/>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
