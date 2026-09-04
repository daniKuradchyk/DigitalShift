import { AREAS } from "@/lib/locations";

/**
 * Mapa esquemático de España con las zonas donde trabaja Qubelia.
 * Silueta simplificada (estilizada, no cartográfica) + ciudades.
 * Trazo fino sobre fondo claro, acento azul en la zona activa.
 * Server Component.
 */

type Props = {
  /** Slug de la ciudad activa; resalta su punto. */
  activeSlug?: string;
  className?: string;
};

const ACCENT = "#2C4BC4";
const ACCENT_SOFT = "#B9C9FA";
const INK = "#101014";
const INK_SOFT = "#3D4046";
const INK_MUTED = "#63666D";
const INK_FAINT = "#9DA0A6";
const LINE = "#E4E6EA";
const LINE_STRONG = "#C9CCD3";

/* Coordenadas aproximadas dentro del viewBox 400x340 */
const CITY_POS: Record<string, { x: number; y: number; anchor?: "start" | "end" }> = {
  sevilla: { x: 105, y: 252 },
  madrid: { x: 183, y: 152 },
  barcelona: { x: 330, y: 103, anchor: "end" },
  valencia: { x: 267, y: 187, anchor: "end" },
  malaga: { x: 142, y: 283 },
  bilbao: { x: 207, y: 48 },
  zaragoza: { x: 256, y: 102, anchor: "end" },
  murcia: { x: 237, y: 244, anchor: "end" },
  alicante: { x: 263, y: 222, anchor: "end" },
  cordoba: { x: 132, y: 230 },
};

/* Silueta simplificada de la España peninsular */
const OUTLINE =
  "M40,78 L78,58 L120,46 L165,38 L205,36 L248,42 L292,50 L330,62 L346,88 " +
  "L336,108 L308,134 L281,168 L272,190 L266,222 L244,256 L206,282 L162,294 " +
  "L118,304 L88,290 L72,264 L88,254 L92,216 L78,200 L88,170 L72,150 L86,122 L60,96 Z";

export default function SpainMap({ activeSlug, className }: Props) {
  return (
    <svg
      viewBox="0 0 400 340"
      role="img"
      aria-label={`Mapa esquemático de España con las zonas donde trabaja Qubelia${
        activeSlug ? `, destacando ${AREAS.find((a) => a.slug === activeSlug)?.name ?? ""}` : ""
      }`}
      className={className}
    >
      {/* Silueta */}
      <path d={OUTLINE} fill="#F5F6F8" stroke={LINE_STRONG} strokeWidth="1" strokeLinejoin="round" />

      {/* Rejilla sutil recortada a la silueta */}
      <clipPath id="es-clip">
        <path d={OUTLINE} />
      </clipPath>
      <g clipPath="url(#es-clip)" stroke={LINE} strokeWidth="0.6">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={40 + i * 40} y1={0} x2={40 + i * 40} y2={340} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={40 + i * 40} x2={400} y2={40 + i * 40} />
        ))}
      </g>

      {/* Línea Sevilla (base) → ciudad activa */}
      {activeSlug && activeSlug !== "sevilla" && CITY_POS[activeSlug] ? (
        <line
          x1={CITY_POS.sevilla.x}
          y1={CITY_POS.sevilla.y}
          x2={CITY_POS[activeSlug].x}
          y2={CITY_POS[activeSlug].y}
          stroke={LINE_STRONG}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ) : null}

      {/* Ciudades */}
      {AREAS.map((area) => {
        const pos = CITY_POS[area.slug];
        if (!pos) return null;
        const isActive = area.slug === activeSlug;
        const isBase = area.slug === "sevilla";
        return (
          <g key={area.slug}>
            {isActive ? (
              <circle cx={pos.x} cy={pos.y} r="9" fill="none" stroke={ACCENT_SOFT} strokeWidth="1" />
            ) : null}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={isActive ? 4.5 : isBase ? 4 : 2.8}
              fill={isActive ? ACCENT : isBase ? INK : INK_FAINT}
            />
            <text
              x={pos.anchor === "end" ? pos.x - 8 : pos.x + 8}
              y={pos.y + 3.5}
              textAnchor={pos.anchor === "end" ? "end" : "start"}
              fontSize="9.5"
              fill={isActive ? ACCENT : isBase ? INK : INK_MUTED}
              fontWeight={isActive || isBase ? 600 : 400}
            >
              {area.name}
            </text>
          </g>
        );
      })}

      {/* Leyenda base */}
      <g>
        <circle cx={30} cy={322} r="3.5" fill={INK} />
        <text x={40} y={326} fontSize="9" fill={INK_SOFT}>
          Base: Sevilla · resto: presencial o remoto
        </text>
      </g>
    </svg>
  );
}
