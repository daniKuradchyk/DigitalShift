import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

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

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRole) throw new Error("Missing Supabase env");
  return createClient(url, serviceRole, { auth: { persistSession: false } });
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

  // A) Guardar lead en Supabase
  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("leads").insert([{
      nombre: name,
      email,
      telefono: phone,
      empresa: data.company ?? null,
      presupuesto: data.budget ?? null,
      mensaje: objective,
      estado: "nuevo",
      score: "medio",
      fuente: "web",
    }]);
    if (error) throw error;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[contact] Supabase error:", message);
    return NextResponse.json({ ok: false, message: "Error al guardar el formulario" }, { status: 500 });
  }

  // B) Notificación por email (no bloqueante — el lead ya está guardado)
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
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      subject,
      text: lines.join("\n"),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[contact] Resend error:", message);
    // El lead ya está guardado en Supabase — devolvemos ok igualmente
  }

  return NextResponse.json({ ok: true });
}
