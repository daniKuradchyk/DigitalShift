/**
 * Configuración centralizada de datos de contacto.
 * TODO: añadir NEXT_PUBLIC_CONTACT_EMAIL=hola@qubelia.es en .env.local y .env.production
 * cuando el buzón corporativo esté operativo.
 */

export const CONTACT = {
  // TODO: reemplazar fallback por email corporativo cuando esté listo
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hola@qubelia.es",
  phone: "+34 674 569 372",
  phoneHref: "tel:+34674569372",
  phoneHours: "Lun–Vie · 9:00–18:00",
  address: "Sevilla, España",
  addressFull: "Calle Torrelodones 84B, 41016 Sevilla, España",
  postalCode: "41016",
  city: "Sevilla",
  country: "ES",
  linkedin: "https://www.linkedin.com/company/qubelia",
  instagram: "https://www.instagram.com/qubelia.tech",
} as const;
