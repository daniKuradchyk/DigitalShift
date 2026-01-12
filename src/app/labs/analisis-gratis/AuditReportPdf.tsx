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
    padding: 36,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#0f172a",
    lineHeight: 1.45,
    backgroundColor: "#ffffff",
  },
  headerBand: {
    height: 8,
    backgroundColor: "#4168e1",
    borderRadius: 6,
    marginBottom: 14,
  },
  header: {
    marginBottom: 16,
  },
  brandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#1c3994",
  },
  meta: {
    fontSize: 9,
    color: "#64748b",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 6,
  },
  subtitle: {
    fontSize: 11,
    color: "#475569",
    marginTop: 4,
  },
  pillRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  pill: {
    backgroundColor: "#eef2ff",
    color: "#1e3a8a",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 9,
    marginRight: 6,
  },
  scorePanel: {
    marginTop: 10,
    borderRadius: 12,
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
    fontSize: 10,
    color: "#475569",
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
  },
  scoreBarTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "#e2e8f0",
    marginTop: 6,
  },
  scoreBarFill: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "#4168e1",
  },
  scoreGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },
  scoreChip: {
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginRight: 6,
    marginTop: 6,
    backgroundColor: "#ffffff",
  },
  scoreChipText: {
    fontSize: 9,
    color: "#1f2937",
  },
  sectionGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionCard: {
    width: "48%",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    padding: 8,
    backgroundColor: "#ffffff",
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#1e293b",
    marginBottom: 4,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#1e293b",
    marginBottom: 6,
    backgroundColor: "#eef2ff",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bullet: {
    width: 10,
    color: "#4168e1",
  },
  bulletText: {
    flex: 1,
  },
  roadmapRow: {
    marginBottom: 6,
    paddingLeft: 6,
  },
  roadmapTitle: {
    fontSize: 10,
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
    marginBottom: 8,
    backgroundColor: "#ffffff",
  },
  matrixLabel: {
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#475569",
    marginBottom: 4,
  },
  ctaBox: {
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#f8fafc",
  },
  ctaLine: {
    fontSize: 9,
    color: "#1f2937",
    marginBottom: 4,
  },
  ctaLink: {
    color: "#1c3994",
  },
  footer: {
    marginTop: 10,
    paddingTop: 8,
    borderTop: "1px solid #e2e8f0",
    fontSize: 9,
    color: "#64748b",
  },
});

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

export default function AuditReportPdf({ report, scores, verticalLabel, goalLabel }: AuditReportPdfProps) {
  const generatedOn = new Date().toLocaleDateString("es-ES");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBand} />
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <Text style={styles.brand}>Qubelia Labs</Text>
            <Text style={styles.meta}>Generado {generatedOn}</Text>
          </View>
          <Text style={styles.title}>Analisis gratuito de tu negocio</Text>
          <Text style={styles.subtitle}>Perfil: {verticalLabel} / Objetivo: {goalLabel}</Text>
          <View style={styles.pillRow}>
            <Text style={styles.pill}>Informe inmediato</Text>
            <Text style={styles.pill}>Sin registro obligatorio</Text>
          </View>
          <View style={styles.scorePanel}>
            <View style={styles.scoreLine}>
              <Text style={styles.scoreLabel}>Score total</Text>
              <Text style={styles.scoreValue}>{scores.total}/100</Text>
            </View>
            <View style={styles.scoreBarTrack}>
              <View style={[styles.scoreBarFill, { width: `${scores.total}%` }]} />
            </View>
            <View style={styles.scoreGrid}>
              <View style={styles.scoreChip}><Text style={styles.scoreChipText}>Captacion {scores.acquisition}/100</Text></View>
              <View style={styles.scoreChip}><Text style={styles.scoreChipText}>Web {scores.web}/100</Text></View>
              <View style={styles.scoreChip}><Text style={styles.scoreChipText}>Ventas {scores.sales}/100</Text></View>
              <View style={styles.scoreChip}><Text style={styles.scoreChipText}>Operaciones {scores.operations}/100</Text></View>
              <View style={styles.scoreChip}><Text style={styles.scoreChipText}>Datos {scores.data}/100</Text></View>
              <View style={styles.scoreChip}><Text style={styles.scoreChipText}>Riesgos {scores.risk}/100</Text></View>
            </View>
          </View>
        </View>

        <View style={styles.sectionGrid}>
          <View style={styles.sectionCard}>
            <Text style={styles.cardTitle}>Resumen ejecutivo</Text>
            <BulletList items={report.summary} />
          </View>
          <View style={styles.sectionCard}>
            <Text style={styles.cardTitle}>Puntos flojos detectados</Text>
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
          <Text style={styles.sectionTitle}>Siguiente paso</Text>
          <View style={styles.ctaBox}>
            <Text style={styles.ctaLine}>
              Agendar diagnostico gratis: <Text style={styles.ctaLink}>https://qubelia.es/#contacto</Text>
            </Text>
            <Text style={styles.ctaLine}>
              Hablar por DM / Contactar: <Text style={styles.ctaLink}>https://qubelia.es/#contacto</Text>
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>Qubelia Labs - Informe generado automaticamente para uso interno.</Text>
      </Page>
    </Document>
  );
}
