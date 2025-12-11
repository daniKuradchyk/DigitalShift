import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY?? "re_E28hzTNS_PoizQ9cNavtKhFFtyJjSEqN5");

const CONTACT_TO = process.env.CONTACT_TO ?? "daniil.kuradchyk@gmail.com";
const CONTACT_FROM = process.env.CONTACT_FROM ?? "daniil.kuradchyk@gmail.com";

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
    return NextResponse.json({ ok: false, message: "Formato inválido" }, { status: 400 });
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
    return NextResponse.json({ ok: false, message: "Email inválido" }, { status: 400 });
  }
  if (!isPhone(phone)) {
    return NextResponse.json({ ok: false, message: "Teléfono inválido" }, { status: 400 });
  }

  // A) Log mínimo viable (puedes quitarlo en prod)
  console.log("[contact] lead:", JSON.stringify(data));

  // B) Envío real con Resend
  try {
    const subject = `Nuevo lead web — ${name}`;
    const lines = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Teléfono: ${phone}`,
      `Empresa: ${data.company ?? "-"}`,
      `Presupuesto: ${data.budget ?? "-"}`,
      `Objetivo: ${objective}`,
    ];
    await resend.emails.send({
      from: `onboarding@resend.dev`, // Debe ser dominio verificado en Resend
      to: [CONTACT_TO],              // así puedes responder directo al cliente
      subject,
      text: lines.join("\n"),
    });
  } catch (err: any) {
    console.error("Resend error:", err?.message || err);
    // Errores comunes:
    // - 422: "from domain not verified" -> verifica qubelia.com en Resend y usa CONTACT_FROM del dominio verificado
    return NextResponse.json({ ok: false, message: "No se pudo enviar el email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
