import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050A14",
          color: "#F0F4FF",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#38BDF8",
          }}
        >
          <span>Qubelia</span>
          <span>España</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 860 }}>
          <div style={{ fontSize: 70, fontWeight: 800, lineHeight: 1.04 }}>
            Software, web y sistemas a medida para empresas B2B
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.35, color: "#A5B4CC" }}>
            Software a medida. Web a medida. Automatización e integraciones. CRM e intranet a medida.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 24,
            fontSize: 24,
            color: "#A5B4CC",
          }}
        >
          <span>Arquitectura clara</span>
          <span>SEO limpio</span>
          <span>Operativa real</span>
        </div>
      </div>
    ),
    size
  );
}
