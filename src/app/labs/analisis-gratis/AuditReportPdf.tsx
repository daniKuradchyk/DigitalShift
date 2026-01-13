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
    padding: 30,
    fontSize: 10.5,
    fontFamily: "Helvetica",
    color: "#0f172a",
    lineHeight: 1.45,
    backgroundColor: "#ffffff",
  },
  headerBand: {
    height: 6,
    backgroundColor: "#4168e1",
    borderRadius: 5,
    marginBottom: 12,
  },
  header: {
    marginBottom: 12,
  },
  brandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
  },
  subtitle: {
    fontSize: 10,
    color: "#475569",
    marginTop: 4,
  },
  pillRow: {
    flexDirection: "row",
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
  },
  scorePanel: {
    marginTop: 8,
    borderRadius: 10,
    border: "1px solid #e2e8f0",
    backgroundColor: "#f8fafc",
    padding: 8,
  },
  scoreLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreLabel: {
    fontSize: 9,
    color: "#475569",
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
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
  scoreGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  scoreChip: {
    border: "1px solid #e2e8f0",
    borderRadius: 7,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginRight: 5,
    marginTop: 4,
    backgroundColor: "#ffffff",
  },
  scoreChipText: {
    fontSize: 8,
    color: "#1f2937",
  },
  sectionGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionCard: {
    width: "48%",
    border: "1px solid #e2e8f0",
    borderRadius: 9,
    padding: 7,
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
    borderRadius: 5,
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
    borderRadius: 7,
    padding: 5,
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
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#f8fafc",
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
