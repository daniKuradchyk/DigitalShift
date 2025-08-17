export const AREAS = [
  { slug: "sevilla", name: "Sevilla" },
  // Puedes añadir más ciudades/provincias aquí
  { slug: "espana", name: "España" },
] as const;

export function getArea(slug: string) {
  return AREAS.find((a) => a.slug === slug);
}
