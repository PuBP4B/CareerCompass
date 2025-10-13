export default function Page({ title, subtitle, actions, children }) {
  return (
    <>
      <div className="container-p py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{title}</h1>
            {subtitle && <p className="text-slate-600 mt-1">{subtitle}</p>}
          </div>
          {actions}
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </>
  );
}
