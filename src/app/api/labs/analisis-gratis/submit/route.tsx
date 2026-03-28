import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { createHash } from "crypto";
import { readFileSync } from "fs";
import { join } from "path";
import AuditReportPdf from "@/app/labs/analisis-gratis/AuditReportPdf";
import { auditSubmissionSchema, calculateAuditResult, type AuditSubmission } from "@/lib/labs/audit";

const RATE_WINDOW_MS = 5 * 60 * 1000;
const RATE_MAX = 10;
const rateLimit = new Map<string, { count: number; resetAt: number }>();

const verticalLabel: Record<string, string> = {
  local: "Pyme local",
  ecommerce: "E-commerce",
  despacho: "Despacho profesional",
  clinica: "Clinica / Salud",
  restaurante: "Restauracion",
  saas: "SaaS / Tech",
  inmobiliaria: "Inmobiliaria",
  educacion: "Educacion",
};

const goalLabel: Record<string, string> = {
  "captar-leads": "Captar leads",
  "vender-mas": "Vender mas",
  "ahorrar-tiempo": "Ahorrar tiempo",
  "reducir-errores": "Reducir errores",
  "mejorar-control": "Mejorar control",
  "escalar": "Escalar el negocio",
  "digitalizar": "Digitalizar procesos",
};

function getIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function rateLimitKey(ip: string) {
  return createHash("sha256").update(ip).digest("hex");
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  for (const [key, entry] of rateLimit.entries()) {
    if (entry.resetAt < now) rateLimit.delete(key);
  }
  const key = rateLimitKey(ip);
  const entry = rateLimit.get(key);
  if (!entry || entry.resetAt < now) {
    rateLimit.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_MAX) return false;
  entry.count += 1;
  return true;
}

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRole) {
    throw new Error("Missing Supabase env");
  }
  return createClient(url, serviceRole, {
    auth: { persistSession: false },
  });
}

function scoreToLeadScore(total: number): "alto" | "medio" | "bajo" {
  if (total >= 70) return "alto";
  if (total >= 45) return "medio";
  return "bajo";
}

function isLeadScore(value: string | null | undefined): value is "alto" | "medio" | "bajo" {
  return value === "alto" || value === "medio" || value === "bajo";
}

function maxLeadScore(current: string | null | undefined, next: "alto" | "medio" | "bajo"): "alto" | "medio" | "bajo" {
  const rank = { bajo: 1, medio: 2, alto: 3 } as const;
  if (!isLeadScore(current)) return next;
  return rank[current] >= rank[next] ? current : next;
}

function buildAuditLeadContext(submission: AuditSubmission, report: ReturnType<typeof calculateAuditResult>) {
  const quickWins = report.report.quickWins?.slice(0, 2).map((item) => item.text).join(" | ") ?? "";
  const summary = report.report.summary?.slice(0, 2).join(" ") ?? "";
  const nextDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const contactName = submission.contact.contactName?.trim();
  const companyName = submission.contact.companyName?.trim();
  const email = submission.contact.email?.trim().toLowerCase() ?? "";
  const website = submission.contact.website?.trim();

  const leadMessage = [
    `Analisis gratuito (${verticalLabel[submission.vertical] ?? submission.vertical} · ${goalLabel[submission.goal] ?? submission.goal}).`,
    `Score total ${report.scores.total}/100.`,
    website ? `Web: ${website}.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const note = [
    `Analisis gratuito enviado el ${new Date().toLocaleDateString("es-ES")}.`,
    summary,
    quickWins ? `Quick wins: ${quickWins}.` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  return {
    email,
    contactName: contactName || companyName || email,
    companyName: companyName || null,
    phone: submission.contact.phone?.trim() || null,
    leadMessage,
    note,
    nextDate,
    score: scoreToLeadScore(report.scores.total),
  };
}

async function syncLeadFromAudit(
  supabase: ReturnType<typeof getSupabase>,
  submission: AuditSubmission,
  report: ReturnType<typeof calculateAuditResult>
) {
  const context = buildAuditLeadContext(submission, report);
  if (!context.email) return false;

  const { data: existing, error: existingError } = await supabase
    .from("leads")
    .select("id, nombre, telefono, empresa, mensaje, score, fuente, notas")
    .eq("email", context.email)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingError) throw existingError;

  if (existing?.id) {
    const mergedNotes = [existing.notas, context.note].filter(Boolean).join("\n\n");
    const { error } = await supabase
      .from("leads")
      .update({
        telefono: existing.telefono || context.phone,
        empresa: existing.empresa || context.companyName,
        mensaje: existing.mensaje || context.leadMessage,
        score: maxLeadScore(existing.score, context.score),
        notas: mergedNotes,
        proximo_paso: "Revisar analisis gratuito y contactar",
        fecha_proximo_paso: context.nextDate,
      })
      .eq("id", existing.id);

    if (error) throw error;
    return true;
  }

  const { error } = await supabase.from("leads").insert([{
    nombre: context.contactName,
    email: context.email,
    telefono: context.phone,
    empresa: context.companyName,
    presupuesto: null,
    mensaje: context.leadMessage,
    estado: "nuevo",
    score: context.score,
    fuente: "analisis-gratis",
    notas: context.note,
    proximo_paso: "Revisar analisis gratuito y contactar",
    fecha_proximo_paso: context.nextDate,
  }]);

  if (error) throw error;
  return true;
}

async function maybeSendEmail(submission: AuditSubmission, report: ReturnType<typeof calculateAuditResult>) {
  const enabled = process.env.LABS_AUDIT_EMAIL_ENABLED === "true";
  const apiKey = process.env.RESEND_API_KEY;
  if (!enabled || !apiKey) return false;
  if (!submission.contact.email || !submission.contact.consent) return false;

  const resend = new Resend(apiKey);
  const from = process.env.LABS_AUDIT_EMAIL_FROM ?? process.env.CONTACT_FROM ?? "onboarding@resend.dev";
  const to = submission.contact.email;

  try {
    let logoSrc: string | undefined;
    try {
      const logoPath = join(process.cwd(), "public", "brand", "logo-qubelia-512-dark.png");
      const logoB64 = readFileSync(logoPath).toString("base64");
      logoSrc = `data:image/png;base64,${logoB64}`;
    } catch { /* logo is optional */ }

    const renderer = await import("@react-pdf/renderer");
    const buffer = await renderer.renderToBuffer(
      <AuditReportPdf
        report={report.report}
        scores={report.scores}
        verticalLabel={verticalLabel[submission.vertical] ?? submission.vertical}
        goalLabel={goalLabel[submission.goal] ?? submission.goal}
        logoSrc={logoSrc}
      />
    );

    await resend.emails.send({
      from,
      to: [to],
      subject: "Tu analisis gratuito - Qubelia Labs",
      text: "Adjuntamos tu informe en PDF. Si quieres revisar el plan o agendar una llamada, responde a este email.",
      attachments: [
        {
          filename: "analisis-qubelia.pdf",
          content: buffer.toString("base64"),
        },
      ],
    });
    return true;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Audit email error:", message);
    return false;
  }
}

export async function POST(request: Request) {
  if (!checkRateLimit(getIp(request))) {
    return NextResponse.json({ ok: false, message: "Demasiadas solicitudes. Intentalo mas tarde." }, { status: 429 });
  }

  const payload = (await request.json().catch(() => null)) as AuditSubmission | null;
  if (!payload) {
    return NextResponse.json({ ok: false, message: "Formato invalido" }, { status: 400 });
  }

  const parsed = auditSubmissionSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: parsed.error.issues[0]?.message ?? "Datos invalidos" }, { status: 400 });
  }

  const submission = parsed.data;
  const answers = {
    vertical: submission.vertical,
    goal: submission.goal,
    companySize: submission.companySize,
    yearsInBusiness: submission.yearsInBusiness,
    digital: submission.digital,
    marketing: submission.marketing,
    sales: submission.sales,
    operations: submission.operations,
    customers: submission.customers,
    data: submission.data,
    finance: submission.finance,
    risk: submission.risk,
  };
  const report = calculateAuditResult(answers);

  let id: string | null = null;
  let insertFailed = false;
  let leadSynced = false;

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("free_audit_submissions")
      .insert({
        vertical: submission.vertical,
        goal: submission.goal,
        answers,
        scores: report.scores,
        report: report.report,
        company_name: submission.contact.companyName || null,
        contact_name: submission.contact.contactName || null,
        email: submission.contact.email || null,
        website: submission.contact.website || null,
        phone: submission.contact.phone || null,
        consent: submission.contact.consent ?? false,
        source: "labs",
        user_agent: request.headers.get("user-agent") ?? null,
      })
      .select("id")
      .single();
    if (error) throw error;
    id = data?.id ?? null;

    try {
      leadSynced = await syncLeadFromAudit(supabase, submission, report);
    } catch (leadError) {
      const message = leadError instanceof Error ? leadError.message : String(leadError);
      console.error("Audit CRM sync error:", message);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Audit insert error:", message);
    insertFailed = true;
  }

  if (insertFailed) {
    return NextResponse.json({ ok: false, message: "No se pudo guardar el informe" }, { status: 500 });
  }

  const emailSent = await maybeSendEmail(submission, report);

  return NextResponse.json({
    ok: true,
    id,
    report: report.report,
    scores: report.scores,
    emailSent,
    leadSynced,
  });
}
