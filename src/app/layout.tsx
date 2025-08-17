import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { BASE_URL, SITE_NAME, SITE_TAGLINE, openGraphImage, titleTemplate } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: titleTemplate(),
  description: "Diseño, copy y SEO para convertir visitas en clientes. Solicita propuesta.",
  openGraph: {
    title: SITE_NAME,
    description: "Diseño, copy y SEO para convertir visitas en clientes.",
    url: "/",
    siteName: SITE_NAME,
    images: openGraphImage(),
    locale: "es_ES",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = organizationJsonLd({ name: SITE_NAME, url: BASE_URL, logoUrl: "/favicon.ico", sameAs: [] });
  const site = websiteJsonLd({ name: `${SITE_NAME} · ${SITE_TAGLINE}`, url: BASE_URL });

  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
        <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 bg-white text-slate-900 px-3 py-2 rounded-md shadow">Saltar al contenido</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }} />
      </body>
    </html>
  );
}