"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type ConsentPreferences = {
  analytics: boolean;
  decided: boolean;
};

type CookieConsentContextValue = {
  preferences: ConsentPreferences;
  hasNonEssentialCookies: boolean;
  shouldShowBanner: boolean;
  preferencesOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  setAnalytics: (accepted: boolean) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  mounted: boolean;
};

const STORAGE_KEY = "qubelia-cookie-consent";

// Cambia a true cuando añadas cookies no esenciales (por ejemplo, analítica) para mostrar el banner automáticamente.
const HAS_NON_ESSENTIAL_COOKIES = false;

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<ConsentPreferences>({ analytics: false, decided: false });
  const [mounted, setMounted] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      try {
        setPreferences(JSON.parse(stored));
      } catch {
        // Si hay un valor inválido en localStorage, se ignora y se usará el estado por defecto.
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && preferences.decided) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    }
  }, [preferences, mounted]);

  const acceptAll = () => {
    setPreferences({ analytics: true, decided: true });
    setPreferencesOpen(false);
  };

  const rejectAll = () => {
    setPreferences({ analytics: false, decided: true });
    setPreferencesOpen(false);
  };

  const setAnalytics = (accepted: boolean) => {
    setPreferences((prev) => ({ ...prev, analytics: accepted, decided: true }));
    setPreferencesOpen(false);
  };

  const openPreferences = () => setPreferencesOpen(true);
  const closePreferences = () => setPreferencesOpen(false);

  const shouldShowBanner = HAS_NON_ESSENTIAL_COOKIES && !preferences.decided;

  const value = useMemo(
    () => ({
      preferences,
      hasNonEssentialCookies: HAS_NON_ESSENTIAL_COOKIES,
      shouldShowBanner,
      preferencesOpen,
      acceptAll,
      rejectAll,
      setAnalytics,
      openPreferences,
      closePreferences,
      mounted,
    }),
    [preferences, preferencesOpen, shouldShowBanner, mounted]
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}
