"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export default function GoogleTagManagerLoader() {
  const warnedRef = useRef(false);
  const { mounted, preferences } = useCookieConsent();
  const shouldLoad = Boolean(gtmId) && mounted && preferences.analytics;

  useEffect(() => {
    if (process.env.NODE_ENV !== "development" || gtmId || warnedRef.current) {
      return;
    }

    console.warn("[analytics] NEXT_PUBLIC_GTM_ID is not set. Google Tag Manager will not load.");
    warnedRef.current = true;
  }, []);

  useLayoutEffect(() => {
    if (!shouldLoad || typeof window === "undefined" || Array.isArray(window.dataLayer)) {
      return;
    }

    window.dataLayer = [];
  }, [shouldLoad]);

  if (!shouldLoad || !gtmId) {
    return null;
  }

  return <GoogleTagManager gtmId={gtmId} />;
}
