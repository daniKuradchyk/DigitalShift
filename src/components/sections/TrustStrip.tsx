import React from "react";
import Container from "@/components/common/Container";

export default function TrustStrip() {
  const tools = [
    { name: "Next.js", abbr: "Next" },
    { name: "Supabase", abbr: "Supabase" },
    { name: "NestJS", abbr: "NestJS" },
    { name: "PostgreSQL", abbr: "Postgres" },
    { name: "Vercel", abbr: "Vercel" },
    { name: "Docker", abbr: "Docker" },
    { name: "Google Analytics 4", abbr: "GA4" },
    { name: "OpenAI", abbr: "OpenAI" },
  ];
  return (
    <section aria-labelledby="tools-title" className="py-6 border-y border-brand-100 bg-white/70 backdrop-blur">
      <h2 id="tools-title" className="sr-only">Tecnologías que usamos</h2>
      <Container>
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1" aria-label="Tecnologías líderes">
          {tools.map((t) => (
            <span
              key={t.abbr}
              className="relative inline-flex items-center justify-center rounded-full px-[1px] py-[1px] bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700 shrink-0"
              aria-label={t.name}
              title={t.name}
            >
              <span className="rounded-full bg-white px-3 py-1 text-sm text-slate-700">{t.abbr}</span>
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
