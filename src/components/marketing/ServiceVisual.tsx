import type { ServiceSlug } from "@/content/services";

/**
 * Ilustraciones vectoriales por servicio. Generadas en código: nítidas a
 * cualquier densidad, 0 bytes de red y siempre alineadas con la paleta.
 * Server Component — composición plana y estática, sin animación.
 */

type Props = {
  slug: ServiceSlug;
  /** "R,G,B" del acento del servicio. */
  accentRgb: string;
  className?: string;
};

const INK = "#101014";
const INK_SOFT = "#3D4046";
const INK_MUTED = "#63666D";
const INK_FAINT = "#9DA0A6";
const LINE = "#E4E6EA";
const LINE_STRONG = "#C9CCD3";
const SURFACE = "#FFFFFF";
const PANEL = "#F5F6F8";

/* ── Software a medida — capas apiladas ─────────────────────────── */

const SOFTWARE_LAYERS = [
  { y: 30, index: "01", label: "interfaz — pantallas del equipo" },
  { y: 85, index: "02", label: "reglas de negocio — tu proceso" },
  { y: 140, index: "03", label: "datos — una sola fuente de verdad" },
] as const;

function SoftwareVisual({ accent }: { accent: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-label="Arquitectura por capas de un software a medida"
      className="h-full w-full"
    >
      {SOFTWARE_LAYERS.map(({ y, index, label }, i) => (
        <g key={label}>
          {i < SOFTWARE_LAYERS.length - 1 ? (
            <line x1={160} y1={y + 34} x2={160} y2={y + 55} stroke={LINE_STRONG} strokeWidth="1" />
          ) : null}
          <text x={30} y={y + 21} textAnchor="end" fontSize="10" fill={INK_FAINT}>
            {index}
          </text>
          <rect x={40} y={y} width={240} height={34} rx="2" fill={SURFACE} stroke={LINE} strokeWidth="1" />
          <rect x={40} y={y} width={3} height={34} fill={accent} />
          <text x={54} y={y + 21} fontSize="9.5" fill={INK_SOFT}>
            {label}
          </text>
          <rect x={228} y={y + 14} width={40} height={6} rx="1" fill={LINE} />
        </g>
      ))}
    </svg>
  );
}

/* ── Web a medida — wireframe + métricas ────────────────────────── */

const WEB_METRICS = [
  { x: 36, value: "98" },
  { x: 122, value: "100" },
  { x: 208, value: "96" },
] as const;

function WebVisual({ accent }: { accent: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-label="Web a medida con métricas de rendimiento altas"
      className="h-full w-full"
    >
      {/* Estructura de la página */}
      <rect x={36} y={18} width={248} height={100} rx="2" fill={SURFACE} stroke={LINE} strokeWidth="1" />
      <line x1={36} y1={42} x2={284} y2={42} stroke={LINE} strokeWidth="1" />
      <rect x={48} y={25} width={104} height={11} rx="1" fill={PANEL} />
      <text x={54} y={33.5} fontSize="7.5" fill={INK_MUTED}>
        qubelia.es
      </text>

      <rect x={48} y={56} width={116} height={9} rx="1" fill={INK} />
      <rect x={48} y={72} width={86} height={6} rx="1" fill={LINE} />
      <rect x={48} y={84} width={62} height={6} rx="1" fill={LINE} />
      <rect x={48} y={98} width={58} height={13} rx="2" fill={accent} />

      <rect x={190} y={56} width={82} height={55} rx="2" fill={PANEL} stroke={LINE} strokeWidth="1" />
      <rect x={200} y={68} width={44} height={5} rx="1" fill={LINE_STRONG} />
      <rect x={200} y={79} width={62} height={4} rx="1" fill={LINE} />
      <rect x={200} y={88} width={52} height={4} rx="1" fill={LINE} />

      {/* Métricas */}
      <line x1={36} y1={134} x2={284} y2={134} stroke={LINE} strokeWidth="1" />
      <rect x={36} y={147} width={18} height={2} fill={accent} />
      <text x={60} y={151} fontSize="7.5" fontWeight="600" letterSpacing="1.4" fill={INK_MUTED}>
        CORE WEB VITALS
      </text>
      {WEB_METRICS.map(({ x, value }) => (
        <text key={value} x={x} y={184} fontSize="26" fontWeight="600" letterSpacing="-1" fill={INK}>
          {value}
        </text>
      ))}
    </svg>
  );
}

/* ── Automatización — nodos y flujo ─────────────────────────────── */

const AUTOMATION_EDGES = [
  "M86,52 C120,52 130,100 140,100",
  "M86,100 L140,100",
  "M86,148 C120,148 130,100 140,100",
  "M180,100 C210,100 220,64 250,64",
  "M180,100 C210,100 220,136 250,136",
];

const AUTOMATION_NODES = [
  { x: 60, y: 52, label: "ERP" },
  { x: 60, y: 100, label: "Form" },
  { x: 60, y: 148, label: "Email" },
  { x: 276, y: 64, label: "CRM" },
  { x: 276, y: 136, label: "Panel" },
] as const;

function AutomationVisual({ accent }: { accent: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-label="Flujos automáticos conectando sistemas de la empresa"
      className="h-full w-full"
    >
      {AUTOMATION_EDGES.map((d) => (
        <path key={d} d={d} fill="none" stroke={LINE_STRONG} strokeWidth="1" />
      ))}

      {AUTOMATION_NODES.map(({ x, y, label }) => (
        <g key={label}>
          <rect x={x - 26} y={y - 12} width={52} height={24} rx="2" fill={SURFACE} stroke={LINE} strokeWidth="1" />
          <text x={x} y={y + 3.5} textAnchor="middle" fontSize="9" fill={INK_SOFT}>
            {label}
          </text>
        </g>
      ))}

      {/* Hub central */}
      <rect x={140} y={84} width={40} height={32} rx="2" fill={accent} />
      <text x={160} y={104} textAnchor="middle" fontSize="9" fontWeight="600" fill="#FFFFFF">
        flujo
      </text>

      <line x1={38} y1={172} x2={282} y2={172} stroke={LINE} strokeWidth="1" />
      <text x={38} y={188} fontSize="7.5" fontWeight="600" letterSpacing="1.4" fill={INK_MUTED}>
        LOGS · ALERTAS · REINTENTOS
      </text>
    </svg>
  );
}

/* ── CRM a medida — tablero por etapas ──────────────────────────── */

const CRM_COLUMNS = [
  { x: 38, label: "ENTRADA", cards: [58, 88, 118] },
  { x: 127, label: "EN CURSO", cards: [58, 88] },
  { x: 216, label: "CERRADO", cards: [58] },
] as const;

function CrmVisual({ accent }: { accent: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-label="Tablero CRM a medida con etapas del proceso comercial"
      className="h-full w-full"
    >
      {CRM_COLUMNS.map(({ x, label, cards }) => (
        <g key={label}>
          <text x={x} y={36} fontSize="7.5" fontWeight="600" letterSpacing="1.2" fill={INK_MUTED}>
            {label}
          </text>
          <rect x={x} y={44} width={66} height={124} rx="2" fill={PANEL} stroke={LINE} strokeWidth="1" />
          {cards.map((cy, i) => (
            <g key={cy}>
              <rect x={x + 7} y={cy} width={52} height={24} rx="2" fill={SURFACE} stroke={LINE} strokeWidth="1" />
              {i === 0 ? <rect x={x + 7} y={cy} width={2.5} height={24} fill={accent} /> : null}
              <rect x={x + 14} y={cy + 7} width={30} height={4} rx="1" fill={LINE_STRONG} />
              <rect x={x + 14} y={cy + 15} width={20} height={3} rx="1" fill={LINE} />
            </g>
          ))}
        </g>
      ))}

      <line x1={38} y1={180} x2={282} y2={180} stroke={LINE} strokeWidth="1" />
      <text x={38} y={194} fontSize="7.5" fontWeight="600" letterSpacing="1.2" fill={INK_MUTED}>
        ROLES · PERMISOS · TRAZABILIDAD
      </text>
    </svg>
  );
}

export default function ServiceVisual({ slug, accentRgb, className }: Props) {
  const accent = `rgb(${accentRgb})`;

  const visual =
    slug === "software-a-medida" ? <SoftwareVisual accent={accent} /> :
    slug === "web-a-medida" ? <WebVisual accent={accent} /> :
    slug === "automatizacion-integraciones" ? <AutomationVisual accent={accent} /> :
    <CrmVisual accent={accent} />;

  return (
    <div
      className={`relative overflow-hidden rounded-[4px] border border-[#E4E6EA] bg-[#F5F6F8] ${className ?? ""}`}
    >
      {visual}
    </div>
  );
}
