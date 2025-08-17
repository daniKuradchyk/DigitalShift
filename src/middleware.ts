import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = new URL(request.url);

  // Redirige www → apex
  if (url.hostname.startsWith("www.")) {
    url.hostname = url.hostname.replace(/^www\./, "");
    return NextResponse.redirect(url, 301);
  }

  // Limpia parámetros de tracking comunes para canónico limpio
  const paramsToStrip = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","gclid","fbclid"];
  let changed = false;
  for (const p of paramsToStrip) {
    if (url.searchParams.has(p)) { url.searchParams.delete(p); changed = true; }
  }
  if (changed) return NextResponse.redirect(url, 301);

  return NextResponse.next();
}
