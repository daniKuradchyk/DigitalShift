"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/common/Button";
import { useCookieConsent } from "./CookieConsentProvider";

export default function CookieBanner() {
  const {
    hasNonEssentialCookies,
    shouldShowBanner,
    preferencesOpen,
    acceptAll,
    rejectAll,
    openPreferences,
    closePreferences,
    mounted,
  } = useCookieConsent();

  // Si no hay cookies no esenciales configuradas, el banner solo se muestra si el usuario abre "Configurar cookies" desde el footer.
  const shouldRender = (hasNonEssentialCookies && shouldShowBanner) || preferencesOpen;

  if (!mounted || !shouldRender) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 px-4">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-[4px] border border-[#C9CCD3] bg-white p-4 shadow-[0_2px_12px_rgba(16,16,20,0.10)] sm:flex-row sm:items-center sm:gap-4 sm:p-5">
        <div className="flex-1 space-y-2 text-sm text-[#3D4046]">
          <p className="font-semibold text-[#101014]">Cookies en qubelia.es</p>
          {hasNonEssentialCookies ? (
            <p>
              Usamos cookies técnicas necesarias y, si lo consientes, cookies no esenciales para analítica. Puedes aceptarlas o rechazarlas ahora o
              configurarlas más tarde desde el enlace “Configurar cookies”.
            </p>
          ) : (
            <p>
              Actualmente solo utilizamos cookies técnicas imprescindibles para que la web funcione correctamente. No instalamos cookies de analítica o
              publicitarias.
            </p>
          )}
          <p>
            Más información en la{" "}
            <Link
              className="font-medium text-[#101014] underline decoration-[#C9CCD3] underline-offset-4 hover:decoration-brand-600"
              href="/legal/cookies"
            >
              Política de cookies
            </Link>
            .
          </p>
        </div>

        {hasNonEssentialCookies ? (
          <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-3">
            <Button type="button" variant="ghost" size="sm" onClick={rejectAll}>
              Rechazar todas
            </Button>
            <Button type="button" variant="primary" size="sm" onClick={acceptAll}>
              Aceptar todas
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={openPreferences}>
              Configurar
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-3">
            <Button type="button" variant="primary" size="sm" onClick={closePreferences}>
              Cerrar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
