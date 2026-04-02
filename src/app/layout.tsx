import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import InteractiveBackground from "@/components/common/InteractiveBackground";
import { CookieConsentProvider } from "@/components/cookies/CookieConsentProvider";
import CookieBanner from "@/components/cookies/CookieBanner";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { BASE_URL, SITE_NAME, SITE_TAGLINE, openGraphImage, titleTemplate } from "@/lib/seo";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], display: "swap", variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: titleTemplate(),
  description:
    "Qubelia desarrolla software a medida, web a medida, automatización e integraciones, y CRM o intranet a medida para empresas B2B.",
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: SITE_NAME,
    description:
      "Software a medida, web a medida, automatización e integraciones y CRM o intranet a medida para empresas B2B.",
    url: BASE_URL,
    siteName: SITE_NAME,
    images: openGraphImage(),
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Software a medida, web a medida, automatización e integraciones y CRM o intranet a medida para empresas B2B.",
    images: openGraphImage(),
  },
  alternates: { canonical: BASE_URL },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = organizationJsonLd({
    name: SITE_NAME,
    url: BASE_URL,
    logoUrl: `${BASE_URL}/favicon.ico`,
    sameAs: [],
  });
  const site = websiteJsonLd({ name: `${SITE_NAME} | ${SITE_TAGLINE}`, url: BASE_URL });

  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#eef4fb" />
      </head>
      <body className="antialiased">
        <CookieConsentProvider>
          <InteractiveBackground />
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 rounded-md bg-white px-3 py-2 text-slate-900 shadow"
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
