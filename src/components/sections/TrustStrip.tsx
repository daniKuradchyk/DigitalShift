import React from "react";
import Container from "@/components/common/Container";

export default function TrustStrip() {
  const tools = [
    { name: "Google Analytics 4", abbr: "GA4" },
    { name: "Google Search Console", abbr: "GSC" },
    { name: "Lighthouse", abbr: "LH" },
    { name: "Figma", abbr: "Figma" },
    { name: "Vercel", abbr: "Vercel" },
  ];
  return (
    <section aria-labelledby="tools-title" className="py-6 border-y border-slate-200 bg-white/70 backdrop-blur">
      <h2 id="tools-title" className="sr-only">Herramientas de trabajo</h2>
      <Container>
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1" aria-label="Herramientas líderes">
          {tools.map((t) => (
            <span key={t.abbr} className="relative inline-flex items-center justify-center rounded-full px-[1px] py-[1px] bg-gradient-to-r from-brand-600 via-emerald-600 to-brand-600 shrink-0">
              <span className="rounded-full bg-white px-3 py-1 text-sm text-slate-700">{t.abbr}</span>
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}