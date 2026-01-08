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
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#0f172a",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
  },
  brand: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#4168e1",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 6,
  },
  subtitle: {
    fontSize: 11,
    color: "#475569",
    marginTop: 6,
  },
  scoreRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scoreBadge: {
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 10,
    color: "#1e3a8a",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 6,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bullet: {
    width: 10,
  },
  bulletText: {
    flex: 1,
  },
  roadmapRow: {
    marginBottom: 6,
  },
  label: {
    fontWeight: "bold",
  },
});

function BulletList({ items }: { items: string[] }) {
  return (
    <View>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export default function AuditReportPdf({ report, scores, verticalLabel, goalLabel }: AuditReportPdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>Qubelia Labs</Text>
          <Text style={styles.title}>Analisis gratuito de tu negocio</Text>
          <Text style={styles.subtitle}>
            Perfil: {verticalLabel} · Objetivo: {goalLabel}
          </Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreBadge}>Score total: {scores.total}/100</Text>
            <Text>Captacion {scores.acquisition}/100 · Web {scores.web}/100 · Ventas {scores.sales}/100</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen ejecutivo</Text>
          <BulletList items={report.summary} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Puntos flojos detectados</Text>
          <BulletList items={report.weakPoints} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick wins (7 dias)</Text>
          <BulletList items={report.quickWins} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Roadmap (30-90 dias)</Text>
          {report.roadmap.map((phase) => (
            <View key={phase.title} style={styles.roadmapRow}>
              <Text style={styles.label}>{phase.title}</Text>
              <Text>{phase.goal}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Matriz impacto vs esfuerzo</Text>
          {report.impactMatrix.map((group) => (
            <View key={group.label} style={styles.roadmapRow}>
              <Text style={styles.label}>{group.label}</Text>
              <BulletList items={group.items} />
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

