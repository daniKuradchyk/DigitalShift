import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  sendCustomerLeadAcknowledgement,
  sendInternalLeadNotification,
} from "@/lib/email/lead-notifications";

type Payload = {
  name: string;
  email: string;
  phone: string;
  objective: string;
  company?: string;
  budget?: string;
  website?: string;
  privacyAccepted?: boolean;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value: string) {
  return value.replace(/\D/g, "").length >= 7;
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
    return NextResponse.json({ ok: false, message: "Formato invalido" }, { status: 400 });
  }

  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = data.name?.trim();
  const email = data.email?.trim().toLowerCase();
  const phone = data.phone?.trim();
  const objective = data.objective?.trim();
  const company = data.company?.trim() || null;
  const budget = data.budget?.trim() || null;
  const privacyAccepted = data.privacyAccepted === true;

  if (!name || !email || !phone || !objective) {
    return NextResponse.json({ ok: false, message: "Faltan campos obligatorios" }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, message: "Email invalido" }, { status: 400 });
  }
  if (!isPhone(phone)) {
    return NextResponse.json({ ok: false, message: "Telefono invalido" }, { status: 400 });
  }
  if (!privacyAccepted) {
    return NextResponse.json(
      { ok: false, message: "Debes aceptar la politica de privacidad" },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("leads").insert([
      {
        nombre: name,
        email,
        telefono: phone,
        empresa: company,
        presupuesto: budget,
        mensaje: objective,
        estado: "nuevo",
        score: "medio",
        fuente: "web",
      },
    ]);

    if (error) throw error;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[contact] Supabase error:", message);
    return NextResponse.json(
      { ok: false, message: "Error al guardar el formulario" },
      { status: 500 }
    );
  }

  const emailPayload = {
    source: "contact" as const,
    name,
    email,
    phone,
    company,
    budget,
    objective,
  };

  const emailResults = await Promise.allSettled([
    sendInternalLeadNotification(emailPayload),
    sendCustomerLeadAcknowledgement(emailPayload),
  ]);

  for (const result of emailResults) {
    if (result.status === "rejected") {
      const message = result.reason instanceof Error ? result.reason.message : String(result.reason);
      console.error("[contact] Lead email error:", message);
    }
  }

  return NextResponse.json({ ok: true });
}
