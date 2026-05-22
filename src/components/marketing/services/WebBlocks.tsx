/**
 * WebBlocks — bloques exclusivos para /servicios/web-a-medida.
 * Tema visual: performance-as-design. Lighthouse, comparativas técnicas,
 * stack visible. Todo Server Component.
 */

/* ────────────────────────────────────────────────────────────────
   LIGHTHOUSE PANEL — métrica grande con barras y diff
   ──────────────────────────────────────────────────────────────── */
export function WebLighthousePanel() {
  const metrics = [
    { name: "LCP",  target: "<2.5s",  ours: "1.2s",  theirs: "4.8s", pct: 96 },
    { name: "INP",  target: "<200ms", ours: "98ms",  theirs: "420ms", pct: 92 },
    { name: "CLS",  target: "<0.1",   ours: "0.02",  theirs: "0.31",  pct: 98 },
    { name: "TTFB", target: "<800ms", ours: "180ms", theirs: "1.4s",  pct: 90 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
      <div className="lg:col-span-4 animate-fade-up">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.18em] mb-3"
          style={{ color: "var(--accent-light)" }}
        >
          Métricas reales · no sintéticas
        </p>
        <p
          className="text-base leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Los Core Web Vitals son lo que Google mide para decidir si tu web
          posiciona. Una plantilla WordPress típica falla en los cuatro.
          Una web a medida no debería.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div
            className="rounded-lg border p-3"
            style={{
              background: "rgba(91,141,239,0.06)",
              borderColor: "rgba(91,141,239,0.2)",
            }}
          >
            <div className="font-mono text-[10px] uppercase tracking-wider text-blue-300">
              Qubelia
            </div>
            <div className="text-2xl font-black tracking-tight mt-1" style={{ color: "var(--text-primary)" }}>
              98<span className="text-blue-300/60 text-base">/100</span>
            </div>
          </div>
          <div
            className="rounded-lg border p-3"
            style={{
              background: "rgba(173,193,255,0.02)",
              borderColor: "rgba(173,193,255,0.12)",
            }}
          >
            <div
              className="font-mono text-[10px] uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Plantilla
            </div>
            <div
              className="text-2xl font-black tracking-tight mt-1"
              style={{ color: "var(--text-muted)" }}
            >
              38<span className="text-base">/100</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-5">
        {metrics.map((m, i) => (
          <div
            key={m.name}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-baseline justify-between mb-2">
              <div className="flex items-baseline gap-3">
                <span className="font-mono font-bold text-blue-300 text-sm">
                  {m.name}
                </span>
                <span
                  className="font-mono text-[10px] uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  objetivo {m.target}
                </span>
              </div>
              <div className="flex items-baseline gap-3 font-mono text-xs tabular-nums">
                <span className="text-blue-300 font-bold">{m.ours}</span>
                <span style={{ color: "var(--text-muted)" }}>vs {m.theirs}</span>
              </div>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: "rgba(91,141,239,0.08)" }}
            >
              <div
                className="h-full rounded-full bar-grow"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(91,141,239,0.7), rgba(133,162,255,0.5))",
                  ["--bar-w" as never]: `${m.pct}%`,
                  animationDelay: `${300 + i * 100}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   STACK SNAPSHOT — bloque tipo "ficha técnica"
   ──────────────────────────────────────────────────────────────── */
export function WebStackSnapshot() {
  const groups: Array<{ label: string; items: string[] }> = [
    {
      label: "Render",
      items: ["Next.js 15 · App Router", "React Server Components", "Edge runtime opcional"],
    },
    {
      label: "SEO técnico",
      items: ["Schema.org · structured data", "Sitemap dinámico", "Open Graph · Twitter cards"],
    },
    {
      label: "Performance",
      items: ["AVIF/WebP responsive", "Critical CSS inline", "Preload de fuentes"],
    },
    {
      label: "Operación",
      items: ["GA4 · GTM · server-side", "Lighthouse CI", "Sentry · analítica privada"],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px overflow-hidden rounded-xl border"
      style={{
        background: "rgba(91,141,239,0.08)",
        borderColor: "rgba(91,141,239,0.15)",
      }}
    >
      {groups.map((g, i) => (
        <div
          key={g.label}
          className="p-6 sm:p-7 animate-fade-up"
          style={{ background: "var(--bg-page)", animationDelay: `${i * 80}ms` }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300 mb-3">
            {g.label}
          </p>
          <ul className="space-y-2">
            {g.items.map((it) => (
              <li
                key={it}
                className="text-sm leading-relaxed flex gap-2.5"
                style={{ color: "var(--text-secondary)" }}
              >
                <span
                  className="mt-2 h-1 w-1.5 shrink-0 rounded-full"
                  style={{ background: "rgba(91,141,239,0.55)" }}
                  aria-hidden
                />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   VS COMPARISON — Web a medida vs WordPress/plantilla
   ──────────────────────────────────────────────────────────────── */
export function WebVsTemplate() {
  const rows: Array<{ axis: string; theirs: string; ours: string }> = [
    {
      axis: "Tiempo de carga",
      theirs: "3–6s con plugins acumulados",
      ours: "<1.5s en LCP, sin cache milagrosa",
    },
    {
      axis: "SEO técnico",
      theirs: "Plugins parchean lo justo",
      ours: "Schema, sitemap, OG y headers nativos",
    },
    {
      axis: "Mantenimiento",
      theirs: "Actualizar 12 plugins cada mes",
      ours: "Una sola base, sin dependencias frágiles",
    },
    {
      axis: "Customización real",
      theirs: "Hasta donde el tema lo permita",
      ours: "Cualquier integración o flujo necesario",
    },
    {
      axis: "Coste a 3 años",
      theirs: "Hosting + plugins + parches + rehacer",
      ours: "Mayor de entrada, menor en total",
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border"
      style={{ borderColor: "rgba(91,141,239,0.15)" }}
    >
      <div className="grid grid-cols-12 gap-px"
        style={{ background: "rgba(91,141,239,0.12)" }}
      >
        <div
          className="col-span-4 px-4 py-3"
          style={{ background: "var(--bg-page)" }}
        >
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--text-muted)" }}
          >
            Eje
          </span>
        </div>
        <div
          className="col-span-4 px-4 py-3"
          style={{ background: "var(--bg-page)" }}
        >
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--text-muted)" }}
          >
            Plantilla / WordPress
          </span>
        </div>
        <div
          className="col-span-4 px-4 py-3"
          style={{ background: "rgba(91,141,239,0.08)" }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300">
            Web a medida
          </span>
        </div>

        {rows.map((r, i) => (
          <div key={r.axis} className="contents">
            <div
              className="col-span-4 px-4 py-4 animate-fade-up"
              style={{ background: "var(--bg-page)", animationDelay: `${i * 70}ms` }}
            >
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {r.axis}
              </span>
            </div>
            <div
              className="col-span-4 px-4 py-4 animate-fade-up"
              style={{ background: "var(--bg-page)", animationDelay: `${i * 70 + 30}ms` }}
            >
              <span
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {r.theirs}
              </span>
            </div>
            <div
              className="col-span-4 px-4 py-4 animate-fade-up"
              style={{ background: "rgba(91,141,239,0.04)", animationDelay: `${i * 70 + 60}ms` }}
            >
              <span
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {r.ours}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   SEO TECH CHECKLIST — qué auditamos para que Google posicione
   ──────────────────────────────────────────────────────────────── */
export function WebSeoChecklist() {
  const items = [
    "URLs limpias con jerarquía semántica (no /page?id=42)",
    "H1 único por página, H2/H3 con keywords reales",
    "Schema.org en cada tipo de contenido (Organization, Service, FAQ, Article)",
    "Sitemap.xml dinámico con prioridades reales por URL",
    "Robots.txt configurado con directivas para crawlers que importan",
    "Canonical correcto en cada ruta (sin duplicados)",
    "Open Graph y Twitter Card por tipo de contenido",
    "Imágenes con alt descriptivo, no nombres genéricos tipo IMG_1234",
    "Internal linking pensado (no widget de 'posts populares' azaroso)",
    "Velocidad como variable de ranking — Core Web Vitals dentro de umbral",
  ];

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
      {items.map((it, i) => (
        <li
          key={it}
          className="flex gap-3 text-sm leading-relaxed animate-fade-up"
          style={{ color: "var(--text-secondary)", animationDelay: `${i * 50}ms` }}
        >
          <span
            className="mt-1.5 font-mono text-[10px] tabular-nums shrink-0 text-blue-300"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
