import React from "react";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { AuditReport, AuditScores } from "@/lib/labs/audit";

type AuditReportPdfProps = {
  report: AuditReport;
  scores: AuditScores;
  verticalLabel: string;
  goalLabel: string;
};

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 10.2,
    fontFamily: "Helvetica",
    color: "#0f172a",
    lineHeight: 1.45,
    backgroundColor: "#f8fafc",
  },
  headerBand: {
    height: 8,
    backgroundColor: "#0e1d4a",
    borderRadius: 6,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  brand: {
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#1c3994",
  },
  meta: {
    fontSize: 8.5,
    color: "#64748b",
  },
  heroCard: {
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    padding: 12,
    marginBottom: 10,
  },
  eyebrow: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 1.6,
    color: "#64748b",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 3,
  },
  subtitle: {
    fontSize: 10,
    color: "#475569",
    marginTop: 3,
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },
  pill: {
    backgroundColor: "#eef2ff",
    color: "#1e3a8a",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 9,
    fontSize: 8,
    marginRight: 4,
    marginBottom: 4,
  },
  scorePanel: {
    marginTop: 10,
    borderRadius: 10,
    border: "1px solid #e2e8f0",
    backgroundColor: "#f8fafc",
    padding: 10,
  },
  scoreLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreLabel: {
    fontSize: 8.5,
    color: "#475569",
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
  },
  scoreBadge: {
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  badgeLabel: {
    fontSize: 7,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  badgeValue: {
    fontSize: 9,
    fontWeight: "bold",
  },
  scoreBarTrack: {
    height: 5,
    borderRadius: 999,
    backgroundColor: "#e2e8f0",
    marginTop: 4,
  },
  scoreBarFill: {
    height: 5,
    borderRadius: 999,
    backgroundColor: "#4168e1",
  },
  scoreBreakdown: {
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    padding: 10,
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 1.4,
    color: "#64748b",
    marginBottom: 4,
  },
  scoreRow: {
    marginTop: 6,
  },
  scoreRowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreRowLabel: {
    fontSize: 8.5,
    color: "#1f2937",
  },
  scoreRowValue: {
    fontSize: 8.5,
    color: "#475569",
  },
  scoreRowTrack: {
    height: 4,
    borderRadius: 999,
    backgroundColor: "#e2e8f0",
    marginTop: 3,
  },
  scoreRowFill: {
    height: 4,
    borderRadius: 999,
    backgroundColor: "#4168e1",
  },
  sectionGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionCard: {
    width: "48%",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    padding: 8,
    backgroundColor: "#ffffff",
  },
  cardTitle: {
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#1e293b",
    marginBottom: 3,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#1e293b",
    marginBottom: 5,
    backgroundColor: "#eef2ff",
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 6,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bullet: {
    width: 8,
    color: "#4168e1",
  },
  bulletText: {
    flex: 1,
  },
  roadmapRow: {
    marginBottom: 4,
    paddingLeft: 6,
  },
  roadmapTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#1e293b",
  },
  matrixGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  matrixCard: {
    width: "48%",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: 6,
    marginBottom: 6,
    backgroundColor: "#ffffff",
  },
  matrixLabel: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#475569",
    marginBottom: 3,
  },
  contactBox: {
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  contactIntro: {
    fontSize: 9,
    color: "#475569",
    marginBottom: 4,
  },
  contactLine: {
    fontSize: 9,
    color: "#1f2937",
    marginBottom: 3,
  },
  contactLabel: {
    fontWeight: "bold",
    color: "#0f172a",
  },
  contactValue: {
    color: "#0f172a",
  },
  footer: {
    marginTop: 8,
    paddingTop: 6,
    borderTop: "1px solid #e2e8f0",
    fontSize: 8.5,
    color: "#64748b",
  },
});

type ScoreTier = {
  label: string;
  color: string;
  background: string;
  border: string;
};

function getScoreTier(total: number): ScoreTier {
  if (total >= 75) {
    return { label: "Avanzado", color: "#15803d", background: "#ecfdf3", border: "#bbf7d0" };
  }
  if (total >= 55) {
    return { label: "En progreso", color: "#1d4ed8", background: "#eff6ff", border: "#bfdbfe" };
  }
  return { label: "Base", color: "#b45309", background: "#fffbeb", border: "#fde68a" };
}

function BulletList({ items }: { items: string[] }) {
  return (
    <View>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <Text style={styles.bullet}>-</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.scoreRow}>
      <View style={styles.scoreRowHeader}>
        <Text style={styles.scoreRowLabel}>{label}</Text>
        <Text style={styles.scoreRowValue}>{value}/100</Text>
      </View>
      <View style={styles.scoreRowTrack}>
        <View style={[styles.scoreRowFill, { width: `${value}%` }]} />
      </View>
    </View>
  );
}

export default function AuditReportPdf({ report, scores, verticalLabel, goalLabel }: AuditReportPdfProps) {
  const generatedOn = new Date().toLocaleDateString("es-ES");
  const tier = getScoreTier(scores.total);
  const scoreRows = [
    { label: "Captacion", value: scores.acquisition },
    { label: "Web", value: scores.web },
    { label: "Ventas", value: scores.sales },
    { label: "Operaciones", value: scores.operations },
    { label: "Datos", value: scores.data },
    { label: "Finanzas", value: scores.finance },
    { label: "Riesgos", value: scores.risk },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBand} />
        <View style={styles.headerRow}>
          <Text style={styles.brand}>Qubelia Labs</Text>
          <Text style={styles.meta}>Generado {generatedOn}</Text>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Diagnostico ejecutivo</Text>
          <Text style={styles.title}>Analisis gratuito de tu negocio</Text>
          <Text style={styles.subtitle}>Perfil: {verticalLabel} / Objetivo: {goalLabel}</Text>
          <View style={styles.pillRow}>
            <Text style={styles.pill}>Informe inmediato</Text>
            <Text style={styles.pill}>Sin registro obligatorio</Text>
            <Text style={styles.pill}>PDF incluido</Text>
          </View>
          <View style={styles.scorePanel}>
            <View style={styles.scoreLine}>
             
              <View style={[styles.scoreBadge, { backgroundColor: tier.background, borderColor: tier.border }]}>
                <Text style={[styles.badgeLabel, { color: tier.color }]}>Nivel</Text>
                <Text style={[styles.badgeValue, { color: tier.color }]}>{tier.label}</Text>
              </View>
            </View>
            <View style={styles.scoreBarTrack}>
              <View style={[styles.scoreBarFill, { width: `${scores.total}%` }]} />
            </View>
          </View>
        </View>

        <View style={styles.scoreBreakdown}>
          <Text style={styles.sectionLabel}>Score por area</Text>
          {scoreRows.map((row) => (
            <ScoreRow key={row.label} label={row.label} value={row.value} />
          ))}
        </View>

        <View style={styles.sectionGrid}>
          <View style={styles.sectionCard}>
            <Text style={styles.cardTitle}>Resumen ejecutivo</Text>
            <BulletList items={report.summary} />
          </View>
          <View style={styles.sectionCard}>
            <Text style={styles.cardTitle}>Prioridades detectadas</Text>
            <BulletList items={report.weakPoints} />
          </View>
        </View>

        <View style={styles.sectionGrid}>
          <View style={styles.sectionCard}>
            <Text style={styles.cardTitle}>Quick wins (7 dias)</Text>
            <BulletList items={report.quickWins} />
          </View>
          <View style={styles.sectionCard}>
            <Text style={styles.cardTitle}>Roadmap (30-90 dias)</Text>
            {report.roadmap.map((phase) => (
              <View key={phase.title} style={styles.roadmapRow}>
                <Text style={styles.roadmapTitle}>{phase.title}</Text>
                <Text>{phase.goal}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.footer}>Qubelia Labs - Informe generado automaticamente para uso interno.</Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.headerBand} />
        <View style={styles.headerRow}>
          <Text style={styles.brand}>Qubelia Labs</Text>
          <Text style={styles.meta}>Detalle del informe</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Matriz impacto vs esfuerzo</Text>
          <View style={styles.matrixGrid}>
            {report.impactMatrix.map((group) => (
              <View key={group.label} style={styles.matrixCard}>
                <Text style={styles.matrixLabel}>{group.label}</Text>
                <BulletList items={group.items} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contacto profesional</Text>
          <View style={styles.contactBox}>
            <Text style={styles.contactIntro}>Si quieres revisar el plan o agendar una llamada, contactanos:</Text>
            <Text style={styles.contactLine}>
              <Text style={styles.contactLabel}>Email: </Text>
              <Text style={styles.contactValue}>daniil.kuradchyk@gmail.com</Text>
            </Text>
            <Text style={styles.contactLine}>
              <Text style={styles.contactLabel}>Telefono: </Text>
              <Text style={styles.contactValue}>+34 674 569 372</Text>
            </Text>
            <Text style={styles.contactLine}>
              <Text style={styles.contactLabel}>Web: </Text>
              <Text style={styles.contactValue}>https://qubelia.es</Text>
            </Text>
            <Text style={styles.contactLine}>
              <Text style={styles.contactLabel}>Direccion: </Text>
              <Text style={styles.contactValue}>Calle Torrelodones 84B, 41016 Sevilla, Sevilla, Espana</Text>
            </Text>
            <Text style={styles.contactLine}>
              <Text style={styles.contactLabel}>NIF: </Text>
              <Text style={styles.contactValue}>30865688X</Text>
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>Qubelia Labs - Informe generado automaticamente para uso interno.</Text>
      </Page>
    </Document>
  );
}
