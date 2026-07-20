import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import GoogleTagManagerLoader from "@/components/analytics/GoogleTagManagerLoader";
import LazyBackground from "@/components/common/LazyBackground";
import LazyCookieBanner from "@/components/cookies/LazyCookieBanner";
import { CookieConsentProvider } from "@/components/cookies/CookieConsentProvider";
import { organizationJsonLd, professionalServiceJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { BASE_URL, SITE_NAME, SITE_TAGLINE, openGraphImage, titleTemplate } from "@/lib/seo";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: titleTemplate(),
  description:
    "Ingeniería de software, web, automatización y sistemas internos a medida para empresas B2B españolas. Con IA cuando aporta, sin IA cuando no.",
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
      "Ingeniería B2B en España. Software, web, automatización y sistemas internos a medida — con IA cuando aporta, sin IA cuando no.",
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
      "Ingeniería B2B en España. Software, web, automatización y sistemas internos a medida — con IA cuando aporta, sin IA cuando no.",
    images: openGraphImage(),
  },
  alternates: { canonical: BASE_URL },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const socialLinks = [
    "https://www.linkedin.com/company/qubelia",
    "https://www.instagram.com/qubelia.tech",
    "https://github.com/daniKuradchyk",
  ];
  const org = organizationJsonLd({
    name: SITE_NAME,
    url: BASE_URL,
    logoUrl: `${BASE_URL}/brand/logo-qubelia-512.png`,
    sameAs: socialLinks,
  });
  const professionalService = professionalServiceJsonLd({
    name: SITE_NAME,
    url: BASE_URL,
    logoUrl: `${BASE_URL}/brand/logo-qubelia-512.png`,
    telephone: "+34 674 569 372",
    address: {
      streetAddress: "Calle Torrelodones 84B",
      addressLocality: "Sevilla",
      postalCode: "41016",
      addressRegion: "Andalucía",
      addressCountry: "ES",
    },
    sameAs: socialLinks,
  });
  const site = websiteJsonLd({ name: `${SITE_NAME} | ${SITE_TAGLINE}`, url: BASE_URL });

  return (
    <html lang="es" className={`dark ${geist.variable}`}>
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#060B1A" />
      </head>
      <body className="antialiased">
        <CookieConsentProvider>
          <GoogleTagManagerLoader />
          <LazyBackground />
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 rounded-md bg-brand-500/10 px-3 py-2 shadow"
            style={{ color: "var(--text-primary)" }}
          >
            Saltar al contenido
          </a>
          {children}
          <LazyCookieBanner />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }} />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
