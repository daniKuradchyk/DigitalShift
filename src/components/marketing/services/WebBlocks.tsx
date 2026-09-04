/**
 * WebBlocks — bloques exclusivos para /servicios/web-a-medida.
 * Tema visual: performance-as-design. Lighthouse, comparativas técnicas,
 * stack visible. Todo Server Component.
 */

const LABEL = "text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]";

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
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="animate-fade-up lg:col-span-4">
        <p className={LABEL}>Métricas reales · no sintéticas</p>
        <p className="mt-4 text-base leading-relaxed text-[#3D4046]">
          Los Core Web Vitals son lo que Google mide para decidir si tu web
          posiciona. Una plantilla WordPress típica falla en los cuatro.
          Una web a medida no debería.
        </p>

        <div className="mt-8 grid grid-cols-2 divide-x divide-[#E4E6EA] border border-[#E4E6EA]">
          <div className="bg-white p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
              Qubelia
            </div>
            <div className="mt-1.5 text-3xl font-semibold tracking-tight tabular-nums text-[#101014]">
              98<span className="text-base font-normal text-[#9DA0A6]">/100</span>
            </div>
          </div>
          <div className="bg-[#F5F6F8] p-4">
            <div className={LABEL}>Plantilla</div>
            <div className="mt-1.5 text-3xl font-semibold tracking-tight tabular-nums text-[#63666D]">
              38<span className="text-base font-normal text-[#9DA0A6]">/100</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8">
        <ul className="divide-y divide-[#E4E6EA] border-y border-[#E4E6EA]">
          {metrics.map((m, i) => (
            <li
              key={m.name}
              className="animate-fade-up py-5"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-semibold text-[#101014]">{m.name}</span>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[#63666D]">
                    objetivo {m.target}
                  </span>
                </div>
                <div className="flex items-baseline gap-3 text-xs tabular-nums">
                  <span className="font-semibold text-brand-600">{m.ours}</span>
                  <span className="text-[#63666D]">vs {m.theirs}</span>
                </div>
              </div>
              <div className="h-1.5 w-full bg-[#E4E6EA]">
                <div className="h-full bg-brand-600" style={{ width: `${m.pct}%` }} />
              </div>
            </li>
          ))}
        </ul>
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
    <div className="grid grid-cols-1 gap-px border border-[#E4E6EA] bg-[#E4E6EA] md:grid-cols-2">
      {groups.map((g, i) => (
        <div
          key={g.label}
          className="animate-fade-up bg-white p-6 sm:p-8"
          style={{ animationDelay: `${i * 70}ms` }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
            {g.label}
          </p>
          <ul className="mt-4 divide-y divide-[#E4E6EA]">
            {g.items.map((it) => (
              <li
                key={it}
                className="py-2.5 text-sm leading-relaxed text-[#3D4046] first:pt-0 last:pb-0"
              >
                {it}
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
    <div className="overflow-x-auto border border-[#E4E6EA]">
      <div className="min-w-[560px]">
        <div className="grid grid-cols-12 border-b border-[#E4E6EA] bg-[#F5F6F8]">
          <div className="col-span-4 px-4 py-3 sm:px-5">
            <span className={LABEL}>Eje</span>
          </div>
          <div className="col-span-4 px-4 py-3 sm:px-5">
            <span className={LABEL}>Plantilla / WordPress</span>
          </div>
          <div className="col-span-4 px-4 py-3 sm:px-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
              Web a medida
            </span>
          </div>
        </div>

        <ul className="divide-y divide-[#E4E6EA]">
          {rows.map((r, i) => (
            <li
              key={r.axis}
              className="grid animate-fade-up grid-cols-12"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="col-span-4 px-4 py-4 sm:px-5 sm:py-5">
                <span className="text-[13px] font-medium text-[#101014] sm:text-sm">
                  {r.axis}
                </span>
              </div>
              <div className="col-span-4 px-4 py-4 sm:px-5 sm:py-5">
                <span className="text-[13px] leading-relaxed text-[#63666D] sm:text-sm">
                  {r.theirs}
                </span>
              </div>
              <div className="col-span-4 bg-[#F5F6F8] px-4 py-4 sm:px-5 sm:py-5">
                <span className="text-[13px] leading-relaxed text-[#3D4046] sm:text-sm">
                  {r.ours}
                </span>
              </div>
            </li>
          ))}
        </ul>
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
    <ul className="grid grid-cols-1 border-t border-[#E4E6EA] md:grid-cols-2 md:gap-x-12">
      {items.map((it, i) => (
        <li
          key={it}
          className="flex animate-fade-up gap-4 border-b border-[#E4E6EA] py-4"
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <span className="mt-0.5 shrink-0 text-[11px] font-medium tabular-nums text-[#9DA0A6]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-sm leading-relaxed text-[#3D4046]">{it}</span>
        </li>
      ))}
    </ul>
  );
}
