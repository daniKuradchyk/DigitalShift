import { ImageResponse } from "next/og";
import { getPost, posts } from "@/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Blog de Qubelia";
  const tag = post?.tags[0] ?? "Blog";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #060B1A 0%, #0A1128 55%, #0F1B4C 100%)",
          color: "#F0F4FF",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Glows decorativos */}
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(65,105,225,0.35), transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            left: -120,
            width: 460,
            height: 460,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(91,141,239,0.22), transparent 65%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              padding: "8px 22px",
              borderRadius: 9999,
              border: "1px solid rgba(91,141,239,0.45)",
              background: "rgba(65,105,225,0.14)",
              color: "#85A2FF",
              fontSize: 24,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            {tag}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 52 : 62,
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: -1.5,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                width: 18,
                height: 18,
                borderRadius: 9999,
                background: "linear-gradient(135deg, #4169E1, #85A2FF)",
              }}
            />
            <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>Qubelia</div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "rgba(173,193,255,0.75)" }}>
            qubelia.es/blog
          </div>
        </div>
      </div>
    ),
    size
  );
}
