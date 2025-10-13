export default function Footer(){
  return (
    <footer className="mt-auto border-t">
      <div className="container-p py-6 text-xs text-slate-500">
        © {new Date().getFullYear()} CareerCompass — Built with Next.js & Tailwind
      </div>
    </footer>
  );
}
