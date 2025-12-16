import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { BASE_URL, SITE_NAME, SITE_TAGLINE, openGraphImage, titleTemplate } from "@/lib/seo";
import InteractiveBackground from "@/components/common/InteractiveBackground";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: titleTemplate(),
  description: "Transformación digital y software a medida. MVPs en semanas, IA y automatización. Productos gratuitos en Qubelia Labs.",
  openGraph: {
    title: SITE_NAME,
    description: "Transformación digital para pymes y emprendedores: desarrollo a medida, MVPs, IA e integraciones.",
    url: "/",
    siteName: SITE_NAME,
    images: openGraphImage(),
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "Software a medida, MVPs en semanas e IA. Productos gratuitos en Qubelia Labs.",
    images: openGraphImage()[0].url,
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = organizationJsonLd({ name: SITE_NAME, url: BASE_URL, logoUrl: "/favicon.ico", sameAs: [] });
  const site = websiteJsonLd({ name: `${SITE_NAME} · ${SITE_TAGLINE}`, url: BASE_URL });

  return (
    <html lang="es" className={inter.variable}>
      <head>
        {/* Evita el auto-darkening de Safari/iOS que invierte los colores del texto */}
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="antialiased bg-white text-slate-900 selection:bg-brand-700 selection:text-white">
        <InteractiveBackground />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 bg-white text-slate-900 px-3 py-2 rounded-md shadow"
        >
          Saltar al contenido
        </a>
        {children}
        <SpeedInsights />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }} />
      </body>
    </html>
  );
}
