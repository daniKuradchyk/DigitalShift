export const AREAS = [
  { slug: "sevilla", name: "Sevilla" },
  { slug: "madrid", name: "Madrid" },
  { slug: "barcelona", name: "Barcelona" },
  { slug: "valencia", name: "Valencia" },
  { slug: "malaga", name: "Málaga" },
  { slug: "bilbao", name: "Bilbao" },
  { slug: "zaragoza", name: "Zaragoza" },
  { slug: "murcia", name: "Murcia" },
  { slug: "alicante", name: "Alicante" },
  { slug: "cordoba", name: "Córdoba" },
] as const;

export function getArea(slug: string) {
  return AREAS.find((area) => area.slug === slug);
}
