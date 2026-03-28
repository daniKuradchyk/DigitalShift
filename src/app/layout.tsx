import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { BASE_URL, SITE_NAME, SITE_TAGLINE, openGraphImage, titleTemplate } from "@/lib/seo";
import { absoluteUrl } from "@/lib/urls";
import InteractiveBackground from "@/components/common/InteractiveBackground";
import { CookieConsentProvider } from "@/components/cookies/CookieConsentProvider";
import CookieBanner from "@/components/cookies/CookieBanner";

const geist = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], display: "swap", variable: "--font-geist-mono" });
const SITE_ORIGIN = "https://qubelia.es";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN), // Ensures absolute URLs (incluye <link rel="icon">) apuntan a https://qubelia.es
  title: titleTemplate(),
  description: "Software a medida, automatización de procesos e integraciones ERP/CRM para empresas. Equipo técnico en Sevilla.",
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" }, // <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png">
      { url: "/favicon.ico" }, // <link rel="icon" href="/favicon.ico">
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }], // <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png">
  },
  openGraph: {
    title: SITE_NAME,
    description: "Software a medida, automatización de procesos e integraciones ERP/CRM para empresas. Equipo técnico en Sevilla con entregas claras y resultados medibles.",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    images: openGraphImage(),
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "Software a medida, automatización e integraciones ERP/CRM para empresas. Equipo técnico en Sevilla.",
    images: openGraphImage(),
  },
  alternates: { canonical: absoluteUrl("/") },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = organizationJsonLd({ name: SITE_NAME, url: absoluteUrl("/"), logoUrl: absoluteUrl("/favicon.ico"), sameAs: [] });
  const site = websiteJsonLd({ name: `${SITE_NAME} | ${SITE_TAGLINE}`, url: absoluteUrl("/") });

  return (
    <html lang="es" className={`dark ${geist.variable} ${geistMono.variable}`}>
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#050A14" />
      </head>
      <body className="antialiased">
        <CookieConsentProvider>
          <InteractiveBackground />
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 bg-white text-slate-900 px-3 py-2 rounded-md shadow"
          >
            Saltar al contenido
          </a>
          {children}
          <CookieBanner />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }} />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
