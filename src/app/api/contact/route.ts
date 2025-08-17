import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json().catch(() => null);
  if (!data || !data.name || !data.email || !data.objective) {
    return NextResponse.json({ ok: false, message: "Faltan campos obligatorios" }, { status: 400 });
  }
  // TODO: Enviar email o guardar en tu backend.
  return NextResponse.json({ ok: true });
}