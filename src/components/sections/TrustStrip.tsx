const tools = [
  "Next.js", "React", "TypeScript", "NestJS",
  "PostgreSQL", "Supabase", "Docker", "Vercel",
  "OpenAI", "Google Analytics 4",
];

export default function TrustStrip() {
  return (
    <section
      aria-labelledby="tools-title"
      className="relative py-8 border-y border-slate-200/60 dark:border-sky-500/8 bg-slate-50/80 dark:bg-[rgba(5,10,25,0.5)]"
    >
      <h2 id="tools-title" className="sr-only">Tecnologías que usamos</h2>

      <div className="flex flex-wrap justify-center gap-2 px-4">
        {tools.map((name) => (
          <span
            key={name}
            className="inline-flex items-center rounded-full border border-slate-200 dark:border-sky-500/12 px-4 py-1.5 text-sm font-medium text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-sky-400 hover:border-slate-300 dark:hover:border-sky-500/25 transition-colors bg-white dark:bg-[rgba(56,189,248,0.03)]"
          >
            {name}
          </span>
        ))}
      </div>

      <p className="mt-5 text-center text-[10px] uppercase tracking-[0.22em] text-slate-400 dark:text-slate-600 font-medium">
        Stack tecnológico probado en producción
      </p>
    </section>
  );
}
