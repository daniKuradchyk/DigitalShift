import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY ?? "re_KS22b3gU_Pm3zXp9CGmsyveB1JqidifZk");

const CONTACT_TO = process.env.CONTACT_TO ?? "daniil.kuradchyk@gmail.com";
const CONTACT_FROM = process.env.CONTACT_FROM ?? "onboarding@resend.dev";

type Payload = {
  name: string;
  email: string;
  phone: string;
  objective: string;
  company?: string;
  budget?: string;
  website?: string; // honeypot anti-spam
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isPhone(v: string) {
  return v.replace(/\D/g, "").length >= 7;
}

export async function POST(request: Request) {
  const data = (await request.json().catch(() => null)) as Payload | null;
  if (!data) {
    return NextResponse.json({ ok: false, message: "Formato invÇ­lido" }, { status: 400 });
  }

  // Honeypot: si viene relleno, tratamos como bot pero devolvemos ok
  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = data.name?.trim();
  const email = data.email?.trim();
  const phone = data.phone?.trim();
  const objective = data.objective?.trim();

  if (!name || !email || !phone || !objective) {
    return NextResponse.json({ ok: false, message: "Faltan campos obligatorios" }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, message: "Email invÇ­lido" }, { status: 400 });
  }
  if (!isPhone(phone)) {
    return NextResponse.json({ ok: false, message: "TelÇ¸fono invÇ­lido" }, { status: 400 });
  }

  // A) Log mÇðnimo viable (puedes quitarlo en prod)
  console.log("[contact] lead:", JSON.stringify(data));

  // B) EnvÇðo real con Resend
  try {
    const subject = `Nuevo lead web ƒ?" ${name}`;
    const lines = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      `TelÇ¸fono: ${phone}`,
      `Empresa: ${data.company ?? "-"}`,
      `Presupuesto: ${data.budget ?? "-"}`,
      `Objetivo: ${objective}`,
    ];
    await resend.emails.send({
      from: CONTACT_FROM, // Debe ser dominio verificado en Resend
      to: [CONTACT_TO],   // asÇð puedes responder directo al cliente
      subject,
      text: lines.join("\n"),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Resend error:", message);
    // Errores comunes:
    // - 422: "from domain not verified" -> verifica qubelia.com en Resend y usa CONTACT_FROM del dominio verificado
    return NextResponse.json({ ok: false, message: "No se pudo enviar el email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
