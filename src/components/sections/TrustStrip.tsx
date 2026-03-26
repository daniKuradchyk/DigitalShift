export default function TrustStrip() {
  const tools = [
    { name: "Next.js" },
    { name: "Supabase" },
    { name: "NestJS" },
    { name: "PostgreSQL" },
    { name: "Vercel" },
    { name: "Docker" },
    { name: "Google Analytics 4" },
    { name: "OpenAI" },
    { name: "TypeScript" },
    { name: "React" },
  ];

  const doubled = [...tools, ...tools];

  return (
    <section
      aria-labelledby="tools-title"
      className="relative py-6 overflow-hidden border-y border-slate-200/60 dark:border-sky-500/8 bg-slate-50/80 dark:bg-[rgba(5,10,25,0.5)]"
    >
      <h2 id="tools-title" className="sr-only">Tecnologías que usamos</h2>

      {/* Fade masks — adapt to bg via CSS var */}
      <div className="marquee-fade-left pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10" />
      <div className="marquee-fade-right pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10" />

      <div className="marquee-container" aria-hidden>
        <div className="marquee-track">
          {doubled.map((t, i) => (
            <span
              key={`${t.name}-${i}`}
              className="inline-flex items-center mx-2 shrink-0 rounded-full border border-slate-200 dark:border-sky-500/12 px-4 py-1.5 text-sm font-medium text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-sky-400 hover:border-slate-300 dark:hover:border-sky-500/25 transition-colors bg-white dark:bg-[rgba(56,189,248,0.03)]"
            >
              {t.name}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-5 text-center text-[10px] uppercase tracking-[0.22em] text-slate-400 dark:text-slate-600 font-medium">
        Stack tecnológico probado en producción
      </p>
    </section>
  );
}
