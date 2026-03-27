import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

const kpis = [
  { label: "+40%",  sub: "ventas en 6 meses",   color: "#22C55E", bg: "rgba(34,197,94,0.10)"  },
  { label: "8 sem", sub: "primer MVP en vivo",   color: "#38BDF8", bg: "rgba(56,189,248,0.10)" },
  { label: "×3",    sub: "leads cualificados",   color: "#A78BFA", bg: "rgba(167,139,250,0.10)"},
  { label: "24 h",  sub: "respuesta garantizada",color: "#FB923C", bg: "rgba(251,146,60,0.10)" },
];

const navItems = ["Inicio", "Servicios", "Clientes", "Blog"];
const tableRows = [
  { name: "Automatización RPA",  status: "Completado", pct: 100, color: "#22C55E" },
  { name: "Dashboard analítico", status: "En progreso", pct: 72,  color: "#38BDF8" },
  { name: "API ERP-CRM",         status: "En progreso", pct: 55,  color: "#38BDF8" },
  { name: "SEO técnico",         status: "Pendiente",   pct: 20,  color: "#94A3B8" },
];
const barData = [45, 62, 51, 78, 66, 89, 95];
const linePoints = [30, 48, 38, 62, 55, 74, 80, 70, 88, 92];

const clients = ["Santander", "Unicaja", "Accenture", "Soltel"];

export default function Hero() {
  const w = 200;
  const h = 60;
  const pts = linePoints.map((v, i) => `${(i / (linePoints.length - 1)) * w},${h - (v / 100) * h}`).join(" ");
  const areaPath = `M0,${h} L${pts.split(" ").join(" L")} L${w},${h} Z`;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* ── Background ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">

        {/* Light-mode: dominant gradient sweep from top */}
        <div
          className="absolute inset-0 dark:opacity-0"
          style={{
            background:
              "radial-gradient(ellipse 110% 70% at 50% -10%, rgba(99,102,241,0.28) 0%, rgba(56,189,248,0.16) 40%, transparent 72%)",
          }}
        />

        {/* Light-mode: secondary side blobs */}
        <div
          className="absolute inset-0 dark:opacity-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at -5% 60%, rgba(129,140,248,0.18), transparent 65%), radial-gradient(ellipse 45% 50% at 105% 50%, rgba(56,189,248,0.14), transparent 60%)",
          }}
        />

        {/* Light-mode: noise / texture overlay */}
        <div
          className="absolute inset-0 dark:opacity-0"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
            opacity: 0.4,
          }}
        />

        {/* Dark-mode: centered radial glow */}
        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[900px] rounded-full opacity-0 dark:opacity-100"
          style={{ background: "radial-gradient(ellipse, rgba(56,189,248,0.12) 0%, rgba(99,102,241,0.07) 40%, transparent 70%)" }}
        />

        {/* Top glow line */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent 5%, rgba(99,102,241,0.6) 50%, transparent 95%)" }}
        />

        {/* Light: corner accent blobs */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-30 dark:opacity-15 blur-3xl" style={{ background: "rgba(99,102,241,0.35)" }} />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-25 dark:opacity-12 blur-3xl" style={{ background: "rgba(56,189,248,0.35)" }} />

        {/* Bottom fade to page */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#EEF2FF] dark:from-[#050A14] to-transparent" />
      </div>

      <Container className="relative z-10 flex flex-col items-center">

        {/* ── Center text block ── */}
        <div className="text-center max-w-3xl space-y-7">

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-indigo-400/30 bg-white/70 dark:bg-indigo-500/10 dark:border-indigo-500/25 px-4 py-1.5 shadow-sm shadow-indigo-200/40 dark:shadow-none backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute animate-ping rounded-full bg-emerald-400 opacity-75 h-full w-full" />
              <span className="relative rounded-full bg-emerald-400 h-2 w-2" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-indigo-700 dark:text-indigo-300">
              Qubelia · Consultoría tecnológica desde Sevilla
            </span>
          </div>

          {/* H1 */}
          <h1
            id="hero-title"
            className="text-5xl font-black tracking-tight leading-[1.05] text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
          >
            Digitaliza tu empresa,
            <br />
            <span className="gradient-text">crece de verdad</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            MVPs en 8 semanas, IA aplicada y software a medida. Equipo senior con resultados medibles — no promesas.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
            <Button as="a" href="/#contacto" variant="shine" size="lg">
              Agenda diagnóstico gratis
            </Button>
            <Button as="a" variant="ghost" href="/labs" size="lg">
              Ver herramientas gratis →
            </Button>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-600">Sin compromiso · Respuesta en 24 h · Tu código, siempre tuyo</p>

          {/* Client logos */}
          <div className="flex flex-col items-center gap-3 pt-2">
            <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-slate-400 dark:text-slate-600">
              Con la confianza de
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {clients.map((c) => (
                <span
                  key={c}
                  className="text-sm font-bold text-slate-400 dark:text-slate-700 hover:text-indigo-500 dark:hover:text-slate-400 transition-colors duration-200 cursor-default tracking-wide"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Dashboard Mockup ── */}
        <div className="relative mt-16 w-full max-w-5xl mx-auto">

          {/* Glow beneath mockup */}
          <div
            aria-hidden
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 h-24 w-3/4 rounded-full blur-3xl opacity-30 dark:opacity-50"
            style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.5), rgba(56,189,248,0.4))" }}
          />

          {/* Outer gradient border */}
          <div
            className="relative rounded-2xl p-[1.5px]"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.55) 0%, rgba(56,189,248,0.30) 50%, rgba(99,102,241,0.45) 100%)",
            }}
          >
            {/* Inner shadow ring in light mode */}
            <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#060C1A] shadow-[0_24px_80px_-16px_rgba(99,102,241,0.30),0_8px_32px_-8px_rgba(56,189,248,0.15)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.65)]">

              {/* Chrome bar */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100 dark:border-white/[0.07] bg-slate-50/80 dark:bg-white/[0.03]">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <div className="ml-4 flex-1 flex items-center rounded-full bg-slate-200/60 dark:bg-white/[0.06] px-3 py-1 max-w-xs">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">qubelia.es/dashboard</span>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute animate-ping rounded-full bg-emerald-400 opacity-60 h-full w-full" />
                    <span className="relative rounded-full bg-emerald-400 h-1.5 w-1.5" />
                  </span>
                  <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 tracking-widest">LIVE</span>
                </div>
              </div>

              {/* Dashboard body */}
              <div className="flex" style={{ height: 340 }}>

                {/* Sidebar */}
                <div className="hidden sm:flex flex-col w-44 border-r border-slate-100 dark:border-white/[0.06] p-4 gap-1 shrink-0 bg-slate-50/60 dark:bg-white/[0.02]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-6 w-6 rounded-lg bg-indigo-500/15 dark:bg-sky-500/20 flex items-center justify-center">
                      <span className="text-indigo-600 dark:text-sky-400 text-[10px] font-bold">Q</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Qubelia</span>
                  </div>
                  {navItems.map((item, i) => (
                    <div
                      key={item}
                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] font-medium transition-colors ${
                        i === 0
                          ? "bg-indigo-50 dark:bg-sky-500/10 text-indigo-600 dark:text-sky-400"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      <div className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-indigo-500" : "bg-slate-300 dark:bg-slate-700"}`} />
                      {item}
                    </div>
                  ))}
                  <div className="mt-auto pt-4 border-t border-slate-200/60 dark:border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-sky-500/20 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-indigo-600 dark:text-sky-400">DK</span>
                      </div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">Admin</span>
                    </div>
                  </div>
                </div>

                {/* Main panel */}
                <div className="flex-1 p-5 overflow-hidden bg-white/60 dark:bg-transparent">
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-100">Panel de negocio</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Actualizado hace 2 min · Q2 2026</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold">
                        ↑ 18% este mes
                      </span>
                    </div>
                  </div>

                  {/* KPI row */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
                    {kpis.map((k) => (
                      <div
                        key={k.label}
                        className="rounded-xl border border-slate-200/70 dark:border-white/[0.06] p-2.5"
                        style={{ background: k.bg }}
                      >
                        <p className="text-lg font-extrabold leading-none" style={{ color: k.color }}>{k.label}</p>
                        <p className="text-[8px] text-slate-500 dark:text-slate-400 mt-1 leading-tight">{k.sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* Charts row */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {/* Bar chart */}
                    <div className="rounded-xl border border-slate-200/70 dark:border-white/[0.06] p-3 bg-slate-50/80 dark:bg-white/[0.02]">
                      <p className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 mb-2">Ingresos mensuales</p>
                      <div className="flex items-end gap-1 h-10">
                        {barData.map((v, i) => (
                          <div key={i} className="flex-1 rounded-sm origin-bottom" style={{
                            height: `${v}%`,
                            background: i === barData.length - 1
                              ? "linear-gradient(180deg, #6366F1, #38BDF8)"
                              : "rgba(99,102,241,0.18)",
                            animation: `barGrow 0.6s ease-out ${i * 60}ms both`,
                          }} />
                        ))}
                      </div>
                    </div>

                    {/* Line chart */}
                    <div className="rounded-xl border border-slate-200/70 dark:border-white/[0.06] p-3 bg-slate-50/80 dark:bg-white/[0.02]">
                      <p className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 mb-2">Conversión de leads</p>
                      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-10" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(99,102,241,0.25)" />
                            <stop offset="100%" stopColor="rgba(99,102,241,0)" />
                          </linearGradient>
                        </defs>
                        <path d={areaPath} fill="url(#lineGrad)" />
                        <polyline
                          points={pts}
                          fill="none"
                          stroke="#6366F1"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="rounded-xl border border-slate-200/70 dark:border-white/[0.06] overflow-hidden bg-slate-50/80 dark:bg-white/[0.02]">
                    <div className="grid grid-cols-3 px-3 py-1.5 border-b border-slate-200/60 dark:border-white/[0.06] bg-slate-100/60 dark:bg-white/[0.02]">
                      {["Proyecto", "Estado", "Progreso"].map((h) => (
                        <span key={h} className="text-[8px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">{h}</span>
                      ))}
                    </div>
                    {tableRows.map((row) => (
                      <div key={row.name} className="grid grid-cols-3 items-center px-3 py-1.5 border-b border-slate-100/60 dark:border-white/[0.04] last:border-0">
                        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 truncate">{row.name}</span>
                        <span className="text-[9px] font-medium" style={{ color: row.color }}>{row.status}</span>
                        <div className="flex items-center gap-1.5">
                          <div className="flex-1 h-1 rounded-full bg-slate-200 dark:bg-white/[0.08]">
                            <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.color }} />
                          </div>
                          <span className="text-[8px] text-slate-400 dark:text-slate-500 tabular-nums">{row.pct}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
