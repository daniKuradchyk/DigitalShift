import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";
import { irpfFeedbackSchema, type IrpfFeedbackPayload } from "@/lib/labs/irpfFeedback";

const RATE_WINDOW_MS = 5 * 60 * 1000;
const RATE_MAX = 15;
const rateLimit = new Map<string, { count: number; resetAt: number }>();

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

export async function POST(request: Request) {
  if (!checkRateLimit(getIp(request))) {
    return NextResponse.json({ ok: false, message: "Demasiadas solicitudes. Intentalo mas tarde." }, { status: 429 });
  }

  const payload = (await request.json().catch(() => null)) as IrpfFeedbackPayload | null;
  if (!payload) {
    return NextResponse.json({ ok: false, message: "Formato invalido" }, { status: 400 });
  }

  const parsed = irpfFeedbackSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: parsed.error.issues[0]?.message ?? "Datos invalidos" }, { status: 400 });
  }

  const data = parsed.data;
  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  try {
    const supabase = getSupabase();
    const { data: row, error } = await supabase
      .from("irpf_feedback")
      .insert({
        category: data.category,
        step: data.step ?? null,
        details: data.details,
        name: data.name || null,
        email: data.email || null,
        consent: data.consent ?? false,
        page: data.page || null,
        source: "labs",
        user_agent: request.headers.get("user-agent") ?? null,
      })
      .select("id")
      .single();
    if (error) throw error;

    return NextResponse.json({ ok: true, id: row?.id ?? null });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("IRPF feedback insert error:", message);
    return NextResponse.json({ ok: false, message: "No se pudo guardar el feedback" }, { status: 500 });
  }
}
