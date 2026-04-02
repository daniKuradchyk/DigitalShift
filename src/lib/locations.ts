export const AREAS = [{ slug: "sevilla", name: "Sevilla" }] as const;

export function getArea(slug: string) {
  return AREAS.find((area) => area.slug === slug);
}
