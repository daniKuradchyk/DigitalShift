import React from "react";
import { Document, Page, StyleSheet, Text, View, Image } from "@react-pdf/renderer";
import type { AuditReport, AuditScores } from "@/lib/labs/audit";

type Props = {
  report: AuditReport;
  scores: AuditScores;
  verticalLabel: string;
  goalLabel: string;
  logoSrc?: string;
};

// ── Color palette ─────────────────────────────────────────────────────────────
const C = {
  navy:      "#090f1f",
  navyMid:   "#111d3a",
  navyLight: "#1a2f5e",
  blue:      "#2563eb",
  sky:       "#0ea5e9",
  skyLight:  "#e0f2fe",
  skyDim:    "rgba(14,165,233,0.15)",
  emerald:   "#059669",
  emeraldLt: "#d1fae5",
  amber:     "#d97706",
  amberLt:   "#fef3c7",
  red:       "#dc2626",
  redLt:     "#fee2e2",
  violet:    "#7c3aed",
  violetLt:  "#ede9fe",
  slate50:   "#f8fafc",
  slate100:  "#f1f5f9",
  slate200:  "#e2e8f0",
  slate300:  "#cbd5e1",
  slate400:  "#94a3b8",
  slate500:  "#64748b",
  slate600:  "#475569",
  slate700:  "#334155",
  slate800:  "#1e293b",
  slate900:  "#0f172a",
  white:     "#ffffff",
};

// ── Styles ────────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    padding: 0,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: C.slate900,
    backgroundColor: C.slate50,
  },

  // ── Header ──
  header: {
    backgroundColor: C.navy,
    paddingHorizontal: 30,
    paddingTop: 14,
    paddingBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoImg: {
    width: 110,
    height: 30,
    objectFit: "contain",
    objectPositionX: "left",
    objectPositionY: "center",
  },
  brandText: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    letterSpacing: 1,
  },
  brandSub: {
    fontSize: 6.5,
    color: "rgba(255,255,255,0.40)",
    letterSpacing: 2.5,
    marginTop: 2,
    textTransform: "uppercase",
  },
  headerRight: { alignItems: "flex-end" },
  headerDate: { fontSize: 7.5, color: "rgba(255,255,255,0.50)", marginBottom: 2 },
  headerPage: { fontSize: 6.5, color: "rgba(255,255,255,0.28)", letterSpacing: 1.5 },
  accentStripe: {
    flexDirection: "row",
    marginTop: 10,
    gap: 2,
    height: 2.5,
  },
  accentSky:    { flex: 3, backgroundColor: C.sky,     borderRadius: 1 },
  accentViolet: { flex: 1, backgroundColor: C.violet,  borderRadius: 1 },
  accentEmerald:{ flex: 0.5, backgroundColor: C.emerald, borderRadius: 1 },

  // ── Hero strip (Page 1 only) ──
  heroStrip: {
    backgroundColor: C.navyMid,
    paddingHorizontal: 30,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    borderBottom: `1px solid rgba(14,165,233,0.15)`,
  },
  heroLeft: { flex: 1, paddingRight: 20, justifyContent: "center" },
  heroReportBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 8,
  },
  heroReportDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.sky },
  heroReportLabel: {
    fontSize: 6.5,
    color: "rgba(255,255,255,0.40)",
    textTransform: "uppercase",
    letterSpacing: 2.5,
  },
  heroTitle: {
    fontSize: 19,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    lineHeight: 1.2,
    marginBottom: 10,
  },
  heroPillRow: { flexDirection: "row", gap: 5, flexWrap: "wrap", marginBottom: 12 },
  heroPill: {
    backgroundColor: "rgba(14,165,233,0.15)",
    color: C.sky,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 99,
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    border: "0.5px solid rgba(14,165,233,0.30)",
  },
  heroMetaRow: { flexDirection: "row", gap: 16 },
  heroMetaItem: { flexDirection: "row", gap: 5, alignItems: "center" },
  heroMetaDot: { width: 3, height: 3, borderRadius: 2, backgroundColor: C.sky },
  heroMetaLabel: { fontSize: 7, color: "rgba(255,255,255,0.40)" },
  heroMetaValue: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: "rgba(255,255,255,0.90)" },

  heroRight: {
    width: 145,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(14,165,233,0.20)",
  },
  heroScoreLabel: {
    fontSize: 6.5,
    color: "rgba(255,255,255,0.40)",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 6,
  },
  heroScore: {
    fontSize: 56,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    textAlign: "center",
    lineHeight: 1,
  },
  heroScoreOf: {
    fontSize: 12,
    color: "rgba(255,255,255,0.28)",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 1,
  },
  heroScoreBarTrack: {
    height: 5,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 99,
    width: "100%",
    overflow: "hidden",
    marginBottom: 10,
  },
  heroScoreBarFill: { height: 5, borderRadius: 99 },
  heroTierBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
    alignSelf: "center",
  },
  heroTierText: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  // ── Body ──
  body: { paddingHorizontal: 30, paddingTop: 14, paddingBottom: 16 },

  // ── Section header ──
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 7,
  },
  sectionAccent: { width: 3, height: 15, borderRadius: 2 },
  sectionTitle: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: C.slate800,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },

  // ── Executive summary card ──
  summaryCard: {
    backgroundColor: C.white,
    borderRadius: 8,
    padding: 12,
    border: `1px solid ${C.slate200}`,
    marginBottom: 10,
  },
  summaryRow: { flexDirection: "row", marginBottom: 5, gap: 8 },
  summaryLine: { width: 2, backgroundColor: C.sky, borderRadius: 1, flexShrink: 0 },
  summaryText: { flex: 1, fontSize: 8, color: C.slate600, lineHeight: 1.55 },

  // ── Score grid ──
  scoresCard: {
    backgroundColor: C.white,
    borderRadius: 8,
    padding: 12,
    border: `1px solid ${C.slate200}`,
  },
  scoreGrid: { flexDirection: "row", flexWrap: "wrap" },
  scoreItem: { width: "50%", paddingRight: 8, paddingBottom: 8 },
  scoreItemInner: {
    backgroundColor: C.slate50,
    borderRadius: 6,
    padding: 8,
    border: `1px solid ${C.slate100}`,
  },
  scoreItemTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 5,
  },
  scoreItemLabel: { fontSize: 7.5, color: C.slate500, flex: 1, lineHeight: 1.3 },
  scoreItemVal: { fontSize: 13, fontFamily: "Helvetica-Bold" },
  scoreTrack: {
    height: 5,
    backgroundColor: C.slate200,
    borderRadius: 99,
    overflow: "hidden",
    marginBottom: 4,
  },
  scoreFill: { height: 5, borderRadius: 99 },
  benchRow: { flexDirection: "row", justifyContent: "flex-end" },
  benchText: { fontSize: 6, color: C.slate300 },

  // ── Two-col layout ──
  twoCol: { flexDirection: "row", gap: 8, marginBottom: 8 },
  card: {
    flex: 1,
    backgroundColor: C.white,
    borderRadius: 8,
    padding: 10,
    border: `1px solid ${C.slate200}`,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingBottom: 6,
    borderBottom: `1px solid ${C.slate100}`,
    gap: 6,
  },
  cardTitleDot: { width: 6, height: 6, borderRadius: 3 },
  cardTitle: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: C.slate700,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  fullCard: {
    backgroundColor: C.white,
    borderRadius: 8,
    padding: 12,
    border: `1px solid ${C.slate200}`,
    marginBottom: 8,
  },

  // ── Bullet list ──
  bulletRow: { flexDirection: "row", marginBottom: 4, gap: 6 },
  bulletDot: {
    width: 5,
    height: 5,
    borderRadius: 99,
    marginTop: 2.5,
    flexShrink: 0,
  },
  bulletText: { flex: 1, fontSize: 7.5, color: C.slate600, lineHeight: 1.5 },

  // ── Weak points ──
  weakRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
    gap: 6,
  },
  weakNumCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  weakNumText: { fontSize: 7, fontFamily: "Helvetica-Bold", color: C.white },
  severityBadge: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    flexShrink: 0,
    marginTop: 1,
  },
  severityText: {
    fontSize: 6,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  weakText: { flex: 1, fontSize: 7.5, color: C.slate600, lineHeight: 1.45 },

  // ── Quick wins ──
  winRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 7,
    gap: 8,
  },
  winNum: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: C.sky,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  winNumText: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.white },
  winContent: { flex: 1 },
  winText: { fontSize: 8, color: C.slate700, lineHeight: 1.4, marginBottom: 4 },
  winMeta: { flexDirection: "row", gap: 5 },
  winTag: {
    fontSize: 6.5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: "Helvetica-Bold",
  },

  // ── Roadmap ──
  roadmapPhase: { marginBottom: 7 },
  phaseHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  phaseNumBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  phaseNumText: { fontSize: 9, fontFamily: "Helvetica-Bold", color: C.white },
  phaseTitleCol: { flex: 1 },
  phaseTitle: { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: C.slate800 },
  phaseGoal: { fontSize: 7, color: C.slate400, marginTop: 1 },
  phaseTasks: {
    marginLeft: 30,
    padding: 8,
    backgroundColor: C.slate50,
    borderRadius: 6,
    border: `1px solid ${C.slate100}`,
  },
  phaseTask: { flexDirection: "row", gap: 5, marginBottom: 3 },
  phaseTaskDot: {
    width: 4,
    height: 4,
    borderRadius: 99,
    backgroundColor: C.slate300,
    marginTop: 3.5,
    flexShrink: 0,
  },
  phaseTaskText: { flex: 1, fontSize: 7, color: C.slate600, lineHeight: 1.45 },

  // ── Opportunities ──
  oppCard: {
    borderRadius: 9,
    marginBottom: 9,
    overflow: "hidden",
    border: `1px solid ${C.slate200}`,
  },
  oppHeader: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  oppIdx: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginRight: 8,
  },
  oppIdxText: { fontSize: 8, fontFamily: "Helvetica-Bold", color: "rgba(255,255,255,0.80)" },
  oppTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    flex: 1,
    paddingRight: 8,
  },
  oppTimeBadge: {
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 99,
    border: "0.5px solid rgba(255,255,255,0.15)",
  },
  oppTime: { fontSize: 7, color: "rgba(255,255,255,0.80)", fontFamily: "Helvetica-Bold" },
  oppBody: {
    backgroundColor: C.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  oppDesc: {
    fontSize: 7.5,
    color: C.slate600,
    lineHeight: 1.55,
    marginBottom: 8,
  },
  oppImpactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingTop: 7,
    borderTop: `1px solid ${C.slate100}`,
  },
  oppImpactLabel: {
    fontSize: 6.5,
    color: C.slate400,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  oppImpactValue: { fontSize: 8, fontFamily: "Helvetica-Bold" },

  // ── Impact matrix ──
  matrixGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  matrixCard: {
    width: "47%",
    borderRadius: 7,
    padding: 9,
  },
  matrixLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 6,
  },
  matrixDot: { width: 7, height: 7, borderRadius: 99 },
  matrixLabel: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  // ── CTA ──
  ctaBox: {
    backgroundColor: C.navyMid,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 8,
    border: "1px solid rgba(14,165,233,0.20)",
  },
  ctaTopBar: { height: 3, backgroundColor: C.sky },
  ctaInner: { padding: 18 },
  ctaTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    marginBottom: 5,
  },
  ctaSub: {
    fontSize: 8,
    color: "rgba(255,255,255,0.60)",
    lineHeight: 1.65,
    marginBottom: 14,
  },
  ctaDivider: { height: 1, backgroundColor: "rgba(255,255,255,0.08)", marginBottom: 14 },
  ctaGrid: { flexDirection: "row", gap: 14 },
  ctaItem: { flex: 1 },
  ctaItemLabel: {
    fontSize: 6,
    color: "rgba(255,255,255,0.35)",
    textTransform: "uppercase",
    letterSpacing: 1.8,
    marginBottom: 2,
  },
  ctaItemValue: { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: C.white },

  // ── Footer ──
  footer: {
    marginHorizontal: 30,
    paddingTop: 7,
    paddingBottom: 12,
    borderTop: `1px solid ${C.slate200}`,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: { fontSize: 6.5, color: C.slate400 },
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function scoreColor(v: number): string {
  if (v >= 65) return C.emerald;
  if (v >= 45) return C.sky;
  return C.amber;
}

function getTierInfo(total: number): { label: string; bg: string; color: string } {
  if (total >= 65) return { label: "Nivel avanzado",        bg: C.emeraldLt, color: C.emerald };
  if (total >= 45) return { label: "En desarrollo",          bg: C.skyLight,  color: C.blue };
  return               { label: "Base — alto potencial", bg: C.amberLt,   color: C.amber };
}

// ── Sub-components ────────────────────────────────────────────────────────────

function PageHeader({
  logoSrc,
  rightTop,
  rightBottom,
  page,
}: {
  logoSrc?: string;
  rightTop: string;
  rightBottom: string;
  page: string;
}) {
  return (
    <View style={s.header}>
      <View style={s.headerRow}>
        <View>
          {logoSrc ? (
            <Image src={logoSrc} style={s.logoImg} />
          ) : (
            <>
              <Text style={s.brandText}>QUBELIA</Text>
              <Text style={s.brandSub}>Digital Consulting · Sevilla</Text>
            </>
          )}
        </View>
        <View style={s.headerRight}>
          <Text style={s.headerDate}>{rightTop}</Text>
          <Text style={s.headerPage}>{rightBottom}  ·  {page}</Text>
        </View>
      </View>
      <View style={s.accentStripe}>
        <View style={s.accentSky} />
        <View style={s.accentViolet} />
        <View style={s.accentEmerald} />
      </View>
    </View>
  );
}

function SectionHeader({ color, title }: { color: string; title: string }) {
  return (
    <View style={s.sectionHeader}>
      <View style={[s.sectionAccent, { backgroundColor: color }]} />
      <Text style={s.sectionTitle}>{title}</Text>
    </View>
  );
}

function CardTitleRow({ color, title }: { color: string; title: string }) {
  return (
    <View style={s.cardTitleRow}>
      <View style={[s.cardTitleDot, { backgroundColor: color }]} />
      <Text style={s.cardTitle}>{title}</Text>
    </View>
  );
}

function BulletItem({ text, color = C.sky }: { text: string; color?: string }) {
  return (
    <View style={s.bulletRow}>
      <View style={[s.bulletDot, { backgroundColor: color }]} />
      <Text style={s.bulletText}>{text}</Text>
    </View>
  );
}

function ScoreAreaBar({
  label,
  value,
  benchmark,
}: {
  label: string;
  value: number;
  benchmark: number;
}) {
  const color = scoreColor(value);
  return (
    <View style={s.scoreItem}>
      <View style={s.scoreItemInner}>
        <View style={s.scoreItemTop}>
          <Text style={s.scoreItemLabel}>{label}</Text>
          <Text style={[s.scoreItemVal, { color }]}>{value}</Text>
        </View>
        <View style={s.scoreTrack}>
          <View style={[s.scoreFill, { backgroundColor: color, width: `${value}%` }]} />
        </View>
        <View style={s.benchRow}>
          <Text style={s.benchText}>Sector: {benchmark}</Text>
        </View>
      </View>
    </View>
  );
}

function WeakPointRow({
  text,
  severity,
  index,
}: {
  text: string;
  severity: string;
  index: number;
}) {
  const cfg =
    {
      critical: { bg: C.redLt,    color: C.red,    label: "Crítico", circleBg: C.red },
      high:     { bg: C.amberLt,  color: C.amber,  label: "Alto",    circleBg: C.amber },
      medium:   { bg: C.slate100, color: C.slate500, label: "Medio", circleBg: C.slate400 },
    }[severity] ?? { bg: C.slate100, color: C.slate500, label: "Medio", circleBg: C.slate400 };

  return (
    <View style={s.weakRow}>
      <View style={[s.weakNumCircle, { backgroundColor: cfg.circleBg }]}>
        <Text style={s.weakNumText}>{index + 1}</Text>
      </View>
      <View style={[s.severityBadge, { backgroundColor: cfg.bg }]}>
        <Text style={[s.severityText, { color: cfg.color }]}>{cfg.label}</Text>
      </View>
      <Text style={s.weakText}>{text}</Text>
    </View>
  );
}

function QuickWinRow({
  win,
  index,
}: {
  win: { text: string; timeframe: string; effort: string; impact: string };
  index: number;
}) {
  const effortColor = win.effort === "low"  ? C.emerald : C.amber;
  const effortLabel = win.effort === "low"  ? "Fácil"   : "Medio";
  const impactColor = win.impact === "high" ? C.blue    : C.slate500;
  const impactLabel = win.impact === "high" ? "Alto impacto" : "Imp. medio";
  return (
    <View style={s.winRow}>
      <View style={s.winNum}>
        <Text style={s.winNumText}>{index + 1}</Text>
      </View>
      <View style={s.winContent}>
        <Text style={s.winText}>{win.text}</Text>
        <View style={s.winMeta}>
          <Text style={[s.winTag, { backgroundColor: C.slate100, color: C.slate500 }]}>
            {win.timeframe}
          </Text>
          <Text
            style={[s.winTag, { backgroundColor: `${effortColor}22`, color: effortColor }]}
          >
            {effortLabel}
          </Text>
          <Text
            style={[s.winTag, { backgroundColor: `${impactColor}22`, color: impactColor }]}
          >
            {impactLabel}
          </Text>
        </View>
      </View>
    </View>
  );
}

// ── Document ─────────────────────────────────────────────────────────────────

export default function AuditReportPdf({
  report,
  scores,
  verticalLabel,
  goalLabel,
  logoSrc,
}: Props) {
  const today = new Date().toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const tier = getTierInfo(scores.total);
  const scoreBarColor = scoreColor(scores.total);

  const scoreAreas = [
    { label: "Presencia Digital",      value: scores.digital,     bench: report.benchmarks["digital"]     ?? 40 },
    { label: "Marketing / Captacion",  value: scores.acquisition, bench: report.benchmarks["acquisition"] ?? 40 },
    { label: "Ventas y Pipeline",      value: scores.sales,       bench: report.benchmarks["sales"]       ?? 45 },
    { label: "Operaciones",            value: scores.operations,  bench: report.benchmarks["operations"]  ?? 48 },
    { label: "Clientes / Retencion",   value: scores.customers,   bench: report.benchmarks["customers"]   ?? 42 },
    { label: "Datos e Inteligencia",   value: scores.data,        bench: report.benchmarks["data"]        ?? 32 },
    { label: "Finanzas",               value: scores.finance,     bench: report.benchmarks["finance"]     ?? 38 },
    { label: "Seguridad",              value: scores.risk,        bench: report.benchmarks["risk"]        ?? 30 },
  ];

  const phaseColors   = [C.amber, C.sky, C.emerald];
  const oppBgColors   = [C.navyLight, "#1a3050", "#162840"];
  const oppAccents    = [C.sky, C.violet, C.emerald];

  const matrixColorMap = {
    green: { bg: C.emeraldLt, text: C.emerald },
    blue:  { bg: C.skyLight,  text: C.blue },
    amber: { bg: C.amberLt,   text: C.amber },
    red:   { bg: C.redLt,     text: C.red },
  };

  return (
    <Document>

      {/* ═══════════════════════════════════════════════════════════════════
          PAGE 1 — Cover, score hero, and area breakdown
      ═════════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={s.page}>

        <PageHeader
          logoSrc={logoSrc}
          rightTop={`Generado el ${today}`}
          rightBottom="DIAGNÓSTICO GRATUITO"
          page="1 / 3"
        />

        {/* ── Hero strip ── */}
        <View style={s.heroStrip}>
          <View style={s.heroLeft}>
            <View style={s.heroReportBadge}>
              <View style={s.heroReportDot} />
              <Text style={s.heroReportLabel}>Diagnóstico ejecutivo de negocio</Text>
            </View>
            <Text style={s.heroTitle}>{"Análisis gratuito\nde tu negocio"}</Text>
            <View style={s.heroPillRow}>
              <Text style={s.heroPill}>8 áreas analizadas</Text>
              <Text style={s.heroPill}>Benchmark sectorial</Text>
              <Text style={s.heroPill}>Plan 90 días</Text>
              <Text style={s.heroPill}>Oportunidades con ROI</Text>
            </View>
            <View style={s.heroMetaRow}>
              <View style={s.heroMetaItem}>
                <View style={s.heroMetaDot} />
                <Text style={s.heroMetaLabel}>Sector:</Text>
                <Text style={s.heroMetaValue}>{verticalLabel}</Text>
              </View>
              <View style={s.heroMetaItem}>
                <View style={s.heroMetaDot} />
                <Text style={s.heroMetaLabel}>Objetivo:</Text>
                <Text style={s.heroMetaValue}>{goalLabel}</Text>
              </View>
            </View>
          </View>

          <View style={s.heroRight}>
            <Text style={s.heroScoreLabel}>Puntuación global</Text>
            <Text style={[s.heroScore, { color: scoreBarColor }]}>{scores.total}</Text>
            <Text style={s.heroScoreOf}>/100</Text>
            <View style={s.heroScoreBarTrack}>
              <View
                style={[
                  s.heroScoreBarFill,
                  { backgroundColor: scoreBarColor, width: `${scores.total}%` },
                ]}
              />
            </View>
            <View style={[s.heroTierBadge, { backgroundColor: `${scoreBarColor}22` }]}>
              <Text style={[s.heroTierText, { color: scoreBarColor }]}>{tier.label}</Text>
            </View>
          </View>
        </View>

        {/* ── Body ── */}
        <View style={s.body}>

          {/* Executive summary */}
          <View style={s.summaryCard}>
            <SectionHeader color={C.sky} title="Resumen ejecutivo" />
            {report.summary.map((line, i) => (
              <View key={i} style={s.summaryRow}>
                <View style={s.summaryLine} />
                <Text style={s.summaryText}>{line}</Text>
              </View>
            ))}
          </View>

          {/* Score areas */}
          <View style={s.scoresCard}>
            <SectionHeader color={C.blue} title="Puntuación por área — vs media del sector" />
            <View style={s.scoreGrid}>
              {scoreAreas.map((a) => (
                <ScoreAreaBar
                  key={a.label}
                  label={a.label}
                  value={a.value}
                  benchmark={a.bench}
                />
              ))}
            </View>
          </View>

        </View>

        {/* Footer */}
        <View style={s.footer}>
          <Text style={s.footerText}>
            Qubelia Labs · qubelia.es · Confidencial — solo para uso del cliente
          </Text>
          <Text style={s.footerText}>Página 1 de 3</Text>
        </View>
      </Page>

      {/* ═══════════════════════════════════════════════════════════════════
          PAGE 2 — Gaps, quick wins & roadmap
      ═════════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={s.page}>

        <PageHeader
          logoSrc={logoSrc}
          rightTop="Brechas, acciones y hoja de ruta"
          rightBottom="DIAGNÓSTICO GRATUITO"
          page="2 / 3"
        />

        <View style={s.body}>

          <View style={s.twoCol}>

            {/* Strengths */}
            <View style={[s.card, { flex: 0.9 }]}>
              <CardTitleRow color={C.emerald} title="Puntos fuertes" />
              {report.strengths.length > 0
                ? report.strengths.map((t, i) => (
                    <BulletItem key={i} text={t} color={C.emerald} />
                  ))
                : <BulletItem
                    text="Con los ajustes identificados, el negocio tiene potencial significativo de mejora en todos los frentes."
                    color={C.emerald}
                  />}
            </View>

            {/* Weak points */}
            <View style={[s.card, { flex: 1.1 }]}>
              <CardTitleRow color={C.red} title="Brechas por prioridad" />
              {report.weakPoints.slice(0, 6).map((w, i) => (
                <WeakPointRow key={i} text={w.text} severity={w.severity} index={i} />
              ))}
            </View>

          </View>

          {/* Quick wins */}
          <View style={s.fullCard}>
            <SectionHeader color={C.sky} title="Quick wins — Acciones para esta semana" />
            {report.quickWins.map((w, i) => (
              <QuickWinRow key={i} win={w} index={i} />
            ))}
          </View>

          {/* Roadmap */}
          <View style={s.fullCard}>
            <SectionHeader color={C.violet} title="Hoja de ruta — 90 días" />
            {report.roadmap.map((phase, pi) => (
              <View key={pi} style={[s.roadmapPhase, { marginBottom: pi < report.roadmap.length - 1 ? 7 : 0 }]}>
                <View style={s.phaseHeaderRow}>
                  <View style={[s.phaseNumBadge, { backgroundColor: phaseColors[pi % 3] }]}>
                    <Text style={s.phaseNumText}>{pi + 1}</Text>
                  </View>
                  <View style={s.phaseTitleCol}>
                    <Text style={s.phaseTitle}>{phase.title}</Text>
                    <Text style={s.phaseGoal}>{phase.goal}</Text>
                  </View>
                </View>
                <View style={s.phaseTasks}>
                  {phase.tasks.map((task, ti) => (
                    <View key={ti} style={[s.phaseTask, { marginBottom: ti < phase.tasks.length - 1 ? 3 : 0 }]}>
                      <View style={s.phaseTaskDot} />
                      <Text style={s.phaseTaskText}>{task}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>
            Qubelia Labs · qubelia.es · Confidencial — solo para uso del cliente
          </Text>
          <Text style={s.footerText}>Página 2 de 3</Text>
        </View>
      </Page>

      {/* ═══════════════════════════════════════════════════════════════════
          PAGE 3 — Opportunities, impact matrix & CTA
      ═════════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={s.page}>

        <PageHeader
          logoSrc={logoSrc}
          rightTop="Oportunidades y plan de acción"
          rightBottom="DIAGNÓSTICO GRATUITO"
          page="3 / 3"
        />

        <View style={s.body}>

          {/* Strategic opportunities */}
          <SectionHeader color={C.emerald} title="Top 3 oportunidades estratégicas" />
          {report.opportunities.map((opp, i) => (
            <View
              key={i}
              style={[s.oppCard, { marginBottom: i < report.opportunities.length - 1 ? 9 : 12 }]}
            >
              <View style={[s.oppHeader, { backgroundColor: oppBgColors[i % 3] }]}>
                <View style={s.oppIdx}>
                  <Text style={s.oppIdxText}>{i + 1}</Text>
                </View>
                <Text style={s.oppTitle}>{opp.title}</Text>
                <View style={s.oppTimeBadge}>
                  <Text style={[s.oppTime, { color: oppAccents[i % 3] }]}>{opp.timeframe}</Text>
                </View>
              </View>
              <View style={s.oppBody}>
                <Text style={s.oppDesc}>{opp.description}</Text>
                <View style={s.oppImpactRow}>
                  <Text style={s.oppImpactLabel}>Impacto estimado:</Text>
                  <Text style={[s.oppImpactValue, { color: oppAccents[i % 3] }]}>
                    {opp.estimatedImpact}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {/* Impact matrix */}
          <View style={s.fullCard}>
            <SectionHeader color={C.amber} title="Matriz impacto vs esfuerzo" />
            <View style={s.matrixGrid}>
              {report.impactMatrix.map((group) => {
                const colors =
                  matrixColorMap[group.color as keyof typeof matrixColorMap] ??
                  matrixColorMap.blue;
                return (
                  <View
                    key={group.label}
                    style={[s.matrixCard, { backgroundColor: colors.bg }]}
                  >
                    <View style={s.matrixLabelRow}>
                      <View style={[s.matrixDot, { backgroundColor: colors.text }]} />
                      <Text style={[s.matrixLabel, { color: colors.text }]}>
                        {group.label}
                      </Text>
                    </View>
                    {group.items.map((item, i) => (
                      <BulletItem key={i} text={item} color={colors.text} />
                    ))}
                  </View>
                );
              })}
            </View>
          </View>

          {/* CTA */}
          <View style={s.ctaBox}>
            <View style={s.ctaTopBar} />
            <View style={s.ctaInner}>
              <Text style={s.ctaTitle}>¿Listo para pasar a la acción?</Text>
              <Text style={s.ctaSub}>
                {"Nuestro equipo revisa tu caso en 45 minutos y te entrega un plan concreto sin compromiso.\n"}
                {scores.total < 45
                  ? "Tu negocio tiene un potencial enorme sin explotar — los cambios son claros y rápidos de implementar."
                  : scores.total < 65
                  ? "Estás más cerca de donde quieres estar de lo que crees. El plan está claro — ejecutarlo es el siguiente paso."
                  : "Base sólida. El siguiente nivel requiere sistemas, datos e IA bien integrados para escalar sin fricción."}
              </Text>
              <View style={s.ctaDivider} />
              <View style={s.ctaGrid}>
                <View style={s.ctaItem}>
                  <Text style={s.ctaItemLabel}>Email</Text>
                  <Text style={s.ctaItemValue}>daniil.kuradchyk@gmail.com</Text>
                </View>
                <View style={s.ctaItem}>
                  <Text style={s.ctaItemLabel}>Teléfono</Text>
                  <Text style={s.ctaItemValue}>+34 674 569 372</Text>
                </View>
                <View style={s.ctaItem}>
                  <Text style={s.ctaItemLabel}>Web</Text>
                  <Text style={s.ctaItemValue}>qubelia.es</Text>
                </View>
                <View style={s.ctaItem}>
                  <Text style={s.ctaItemLabel}>Ubicación</Text>
                  <Text style={s.ctaItemValue}>Sevilla · España · Remoto</Text>
                </View>
              </View>
            </View>
          </View>

        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>
            Informe confidencial generado automáticamente por Qubelia Labs en base al cuestionario de diagnóstico.
          </Text>
          <Text style={s.footerText}>Página 3 de 3</Text>
        </View>
      </Page>

    </Document>
  );
}
