"use client";

import React from "react";
import Link from "next/link";
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
      <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:flex-row sm:items-center sm:gap-4 sm:p-5">
        <div className="flex-1 space-y-2 text-sm text-slate-800">
          <p className="font-semibold text-slate-900">Cookies en qubelia.es</p>
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
            <Link className="underline" href="/legal/cookies">
              Política de cookies
            </Link>
            .
          </p>
        </div>

        {hasNonEssentialCookies ? (
          <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-3">
            <button
              type="button"
              onClick={rejectAll}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Rechazar todas
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Aceptar todas
            </button>
            <button
              type="button"
              onClick={openPreferences}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Configurar
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-3">
            <button
              type="button"
              onClick={closePreferences}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
