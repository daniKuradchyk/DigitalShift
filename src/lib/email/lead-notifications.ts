import { Resend } from "resend";
import { absoluteUrl } from "@/lib/urls";

export type LeadNotificationSource = "contact" | "free_audit";

export type LeadNotificationPayload = {
  source: LeadNotificationSource;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  budget?: string | null;
  objective?: string | null;
  /** true si el lead NO pudo guardarse en el CRM y este email es la única copia. */
  storageFailed?: boolean;
};

type CustomerEmailOptions = {
  attachment?: {
    filename: string;
    contentBase64: string;
  } | null;
};

function escapeHtml(value?: string | null) {
  return (value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeEmail(value?: string | null) {
  return value?.trim().toLowerCase() || "";
}

function splitRecipients(value?: string | null) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

async function sendViaResend(
  resend: Resend,
  payload: Parameters<typeof resend.emails.send>[0]
) {
  const result = await resend.emails.send(payload);

  if (result.error) {
    throw new Error(result.error.message || "Resend no pudo enviar el correo.");
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[email] resend accepted", {
      id: result.data?.id ?? null,
      to: payload.to,
      subject: payload.subject,
    });
  }

  return result;
}

function getSenderAddress() {
  return process.env.CONTACT_FROM ?? "Qubelia <onboarding@resend.dev>";
}

function getInternalRecipients() {
  const configured =
    process.env.LEAD_NOTIFICATION_TO ??
    process.env.CONTACT_TO ??
    process.env.ADMIN_EMAIL ??
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ??
    "";

  return splitRecipients(configured);
}

function getSupportEmail() {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hola@qubelia.es";
}

function getSupportPhone() {
  return process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+34 674 569 372";
}

function getCrmUrl() {
  const raw = process.env.QUBELIA_CRM_URL?.trim();
  return raw ? raw.replace(/\/+$/, "") : null;
}

function getLogoUrl() {
  return absoluteUrl("/brand/logo-qubelia-512-dark.png");
}

function sourceLabel(source: LeadNotificationSource) {
  return source === "free_audit" ? "Análisis gratuito" : "Formulario de contacto";
}

function customerSubject(source: LeadNotificationSource) {
  return source === "free_audit"
    ? "Hemos recibido tu análisis gratuito - Qubelia"
    : "Hemos recibido tu solicitud - Qubelia";
}

function customerTitle(source: LeadNotificationSource) {
  return source === "free_audit"
    ? "Hemos recibido tu análisis"
    : "Hemos recibido tu solicitud";
}

function customerIntro(source: LeadNotificationSource, name: string) {
  if (source === "free_audit") {
    return `Hola ${name}, hemos recibido correctamente tu análisis gratuito.`;
  }

  return `Hola ${name}, hemos recibido correctamente tu solicitud.`;
}

function renderEmailShell(input: {
  eyebrow: string;
  title: string;
  intro: string;
  bodyHtml: string;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  footerHtml?: string | null;
}) {
  const logoUrl = getLogoUrl();
  const ctaHtml =
    input.ctaLabel && input.ctaHref
      ? `
        <tr>
          <td style="padding: 0 32px 8px;">
            <a href="${escapeHtml(input.ctaHref)}" style="display:inline-block;background:#101014;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:13px 22px;border-radius:2px;">
              ${escapeHtml(input.ctaLabel)}
            </a>
          </td>
        </tr>
      `
      : "";

  const footerHtml = input.footerHtml
    ? `<tr><td style="padding: 8px 32px 32px; color:#63666D; font-size:13px; line-height:1.6;">${input.footerHtml}</td></tr>`
    : "";

  return `
    <!doctype html>
    <html lang="es">
      <body style="margin:0;padding:0;background:#F5F6F8;color:#101014;font-family:Arial,Helvetica,sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F6F8;padding:24px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#ffffff;border:1px solid #E4E6EA;border-radius:4px;overflow:hidden;">
                <tr>
                  <td style="padding:28px 32px;background:#101014;">
                    <img src="${escapeHtml(logoUrl)}" alt="Qubelia" style="display:block;height:36px;width:auto;max-width:200px;" />
                    <div style="margin-top:16px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.55);font-weight:600;">
                      ${escapeHtml(input.eyebrow)}
                    </div>
                    <div style="margin-top:10px;font-size:28px;line-height:1.2;font-weight:600;color:#ffffff;">
                      ${escapeHtml(input.title)}
                    </div>
                    <div style="margin-top:10px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.72);">
                      ${escapeHtml(input.intro)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 32px 20px;color:#3D4046;font-size:15px;line-height:1.7;">
                    ${input.bodyHtml}
                  </td>
                </tr>
                ${ctaHtml}
                ${footerHtml}
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function renderInternalLeadEmail(payload: LeadNotificationPayload) {
  const crmUrl = getCrmUrl();
  const details = [
    ["Fuente", sourceLabel(payload.source)],
    ["Nombre", payload.name],
    ["Email", payload.email],
    ["Teléfono", payload.phone || "No facilitado"],
    ["Empresa", payload.company || "No facilitada"],
    ["Presupuesto", payload.budget || "Sin rango"],
    ["Objetivo", payload.objective || "Sin detalle adicional"],
  ];

  const rows = details
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #E4E6EA;font-size:13px;font-weight:600;color:#63666D;width:160px;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #E4E6EA;font-size:14px;color:#101014;">${escapeHtml(value)}</td>
        </tr>
      `
    )
    .join("");

  const storageWarningHtml = payload.storageFailed
    ? `
      <div style="margin:0 0 18px;padding:14px 16px;border:1px solid #E8C9CB;background:#F7E4E5;border-radius:2px;color:#B4232B;font-size:14px;font-weight:600;">
        ⚠ Este lead NO se pudo guardar en el CRM (error de base de datos). Este correo es la única copia: registrarlo a mano.
      </div>
    `
    : "";

  return {
    subject: `${payload.storageFailed ? "⚠ " : ""}Nuevo lead - ${payload.name}`,
    text: [
      payload.storageFailed
        ? "AVISO: el lead NO se guardó en el CRM (error de base de datos). Este correo es la única copia."
        : "",
      "Nuevo lead recibido en Qubelia.",
      `Fuente: ${sourceLabel(payload.source)}`,
      `Nombre: ${payload.name}`,
      `Email: ${payload.email}`,
      `Teléfono: ${payload.phone || "No facilitado"}`,
      `Empresa: ${payload.company || "No facilitada"}`,
      `Presupuesto: ${payload.budget || "Sin rango"}`,
      `Objetivo: ${payload.objective || "Sin detalle adicional"}`,
      crmUrl ? `CRM: ${crmUrl}/admin/leads` : "",
    ]
      .filter(Boolean)
      .join("\n"),
    html: renderEmailShell({
      eyebrow: "Nuevo lead",
      title: "Ha entrado un nuevo lead",
      intro: "Se ha registrado una nueva solicitud comercial y ya está disponible para seguimiento.",
      bodyHtml: `
        ${storageWarningHtml}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ${rows}
        </table>
      `,
      ctaLabel: crmUrl ? "Abrir CRM" : null,
      ctaHref: crmUrl ? `${crmUrl}/admin/leads` : null,
      footerHtml:
        "Recomendación operativa: revisar el lead, asignar owner y programar el primer contacto cuanto antes.",
    }),
  };
}

function renderCustomerLeadEmail(
  payload: LeadNotificationPayload,
  options?: CustomerEmailOptions
) {
  const supportEmail = getSupportEmail();
  const supportPhone = getSupportPhone();
  const siteUrl = absoluteUrl("/");
  const attachmentLine =
    options?.attachment && payload.source === "free_audit"
      ? "<p style=\"margin:0 0 16px;\">Adjuntamos tu informe en PDF para que puedas revisarlo con calma.</p>"
      : "";

  const bodyHtml = `
    <p style="margin:0 0 16px;">${escapeHtml(customerIntro(payload.source, payload.name))}</p>
    <p style="margin:0 0 16px;">Nuestro equipo va a revisar la información y nos pondremos en contacto contigo lo antes posible.</p>
    ${attachmentLine}
    <div style="margin:24px 0;padding:18px 20px;border:1px solid #E4E6EA;background:#F5F6F8;border-radius:2px;">
      <div style="font-size:12px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#2C4BC4;">Qué puedes esperar ahora</div>
      <ul style="margin:12px 0 0 18px;padding:0;color:#3D4046;">
        <li style="margin:0 0 8px;">Revisión inicial de tu solicitud por parte del equipo de Qubelia.</li>
        <li style="margin:0 0 8px;">Contacto para aclarar alcance, prioridad y siguiente paso.</li>
        <li style="margin:0;">Si encaja, propuesta de trabajo o siguiente conversación comercial.</li>
      </ul>
    </div>
    <p style="margin:0 0 8px;">Si necesitas ampliar contexto, puedes responder directamente a este correo.</p>
    <p style="margin:0;"><strong>Email:</strong> ${escapeHtml(supportEmail)}<br /><strong>Teléfono:</strong> ${escapeHtml(supportPhone)}</p>
  `;

  return {
    subject: customerSubject(payload.source),
    text: [
      customerIntro(payload.source, payload.name),
      "Hemos recibido tu solicitud correctamente.",
      "Nuestro equipo revisará la información y te contactaremos lo antes posible.",
      options?.attachment && payload.source === "free_audit"
        ? "Adjuntamos tu informe en PDF."
        : "",
      `Contacto: ${supportEmail} | ${supportPhone}`,
      `Web: ${siteUrl}`,
    ]
      .filter(Boolean)
      .join("\n"),
    html: renderEmailShell({
      eyebrow: "Solicitud recibida",
      title: customerTitle(payload.source),
      intro: customerIntro(payload.source, payload.name),
      bodyHtml,
      ctaLabel: "Visitar Qubelia",
      ctaHref: siteUrl,
      footerHtml:
        "Este es un correo transaccional relacionado con una solicitud iniciada por ti en Qubelia.",
    }),
  };
}

export async function sendInternalLeadNotification(payload: LeadNotificationPayload) {
  const resend = getResendClient();
  const recipients = getInternalRecipients();
  if (!resend || recipients.length === 0) {
    console.warn(
      `[email] Notificación interna omitida: ${!resend ? "falta RESEND_API_KEY" : "sin destinatarios (LEAD_NOTIFICATION_TO/CONTACT_TO)"}`
    );
    return false;
  }

  const content = renderInternalLeadEmail(payload);

  await sendViaResend(resend, {
    from: getSenderAddress(),
    to: recipients,
    subject: content.subject,
    text: content.text,
    html: content.html,
    replyTo: normalizeEmail(payload.email) || undefined,
  });

  return true;
}

export async function sendCustomerLeadAcknowledgement(
  payload: LeadNotificationPayload,
  options?: CustomerEmailOptions
) {
  const resend = getResendClient();
  const recipient = normalizeEmail(payload.email);
  if (!resend || !recipient) {
    console.warn(
      `[email] Acuse al cliente omitido: ${!resend ? "falta RESEND_API_KEY" : "email de cliente vacío"}`
    );
    return false;
  }

  const content = renderCustomerLeadEmail(payload, options);

  await sendViaResend(resend, {
    from: getSenderAddress(),
    to: [recipient],
    subject: content.subject,
    text: content.text,
    html: content.html,
    attachments: options?.attachment
      ? [
          {
            filename: options.attachment.filename,
            content: options.attachment.contentBase64,
          },
        ]
      : undefined,
    replyTo: getSupportEmail(),
  });

  return true;
}
