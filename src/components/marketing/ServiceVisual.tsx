import type { ServiceSlug } from "@/content/services";

/**
 * Ilustraciones vectoriales por servicio. Generadas en código: nítidas a
 * cualquier densidad, 0 bytes de red y siempre alineadas con la paleta.
 * Server Component — animación solo con SMIL/CSS.
 */

type Props = {
  slug: ServiceSlug;
  /** "R,G,B" del acento del servicio. */
  accentRgb: string;
  className?: string;
};

const MONO = "ui-monospace, monospace";

function SoftwareVisual({ a }: { a: string }) {
  const layer = (y: number, label: string, w: number, opacity: number) => (
    <g key={label}>
      <rect x={40} y={y} width={w} height={34} rx={8} fill={`rgba(${a},${0.05 * opacity})`} stroke={`rgba(${a},${0.28 * opacity})`} strokeWidth="1" />
      <circle cx={56} cy={y + 17} r={3.5} fill={`rgba(${a},${0.6 * opacity})`} />
      <text x={70} y={y + 21} fontFamily={MONO} fontSize="10" fill={`rgba(240,244,255,${0.6 * opacity})`}>{label}</text>
      <rect x={w - 26} y={y + 12} width={44} height={10} rx={5} fill={`rgba(${a},${0.14 * opacity})`} />
    </g>
  );

  return (
    <svg viewBox="0 0 320 200" role="img" aria-label="Arquitectura por capas de un software a medida" className="h-full w-full">
      {layer(28, "interfaz — pantallas del equipo", 240, 1)}
      {layer(83, "reglas de negocio — tu proceso", 240, 0.9)}
      {layer(138, "datos — una sola fuente de verdad", 240, 0.8)}
      {/* Conectores verticales con pulso */}
      {[62, 117].map((y) => (
        <g key={y}>
          <line x1={160} y1={y} x2={160} y2={y + 21} stroke={`rgba(${a},0.35)`} strokeWidth="1.5" strokeDasharray="3 3" />
          <circle r="2.5" fill={`rgba(${a},0.9)`}>
            <animateMotion dur="2.4s" repeatCount="indefinite" path={`M160,${y} L160,${y + 21}`} />
          </circle>
        </g>
      ))}
    </svg>
  );
}

function WebVisual({ a }: { a: string }) {
  const gauge = (cx: number, value: string) => {
    const r = 15;
    const c = 2 * Math.PI * r;
    return (
      <g key={cx}>
        <circle cx={cx} cy={158} r={r} fill="none" stroke={`rgba(${a},0.12)`} strokeWidth="3" />
        <circle
          cx={cx} cy={158} r={r} fill="none" stroke={`rgba(${a},0.75)`} strokeWidth="3"
          strokeLinecap="round" strokeDasharray={`${c * 0.96} ${c}`} transform={`rotate(-90 ${cx} 158)`}
        >
          <animate attributeName="stroke-dasharray" from={`0 ${c}`} to={`${c * 0.96} ${c}`} dur="1.4s" fill="freeze" />
        </circle>
        <text x={cx} y={162} textAnchor="middle" fontFamily={MONO} fontSize="10" fontWeight="700" fill="rgba(240,244,255,0.85)">{value}</text>
      </g>
    );
  };

  return (
    <svg viewBox="0 0 320 200" role="img" aria-label="Web a medida con métricas de rendimiento altas" className="h-full w-full">
      {/* Ventana de navegador */}
      <rect x={36} y={20} width={248} height={104} rx={10} fill={`rgba(${a},0.04)`} stroke={`rgba(${a},0.28)`} strokeWidth="1" />
      <line x1={36} y1={44} x2={284} y2={44} stroke={`rgba(${a},0.2)`} strokeWidth="1" />
      {[52, 64, 76].map((x) => <circle key={x} cx={x} cy={32} r={3} fill={`rgba(${a},0.35)`} />)}
      <rect x={92} y={26} width={120} height={12} rx={6} fill={`rgba(${a},0.1)`} />
      <text x={100} y={35} fontFamily={MONO} fontSize="8" fill="rgba(240,244,255,0.5)">qubelia.es</text>
      {/* Layout interior: hero + dos columnas */}
      <rect x={50} y={56} width={130} height={12} rx={4} fill="rgba(240,244,255,0.35)" />
      <rect x={50} y={74} width={90} height={7} rx={3.5} fill={`rgba(${a},0.35)`} />
      <rect x={50} y={94} width={72} height={18} rx={6} fill={`rgba(${a},0.55)`} />
      <rect x={196} y={56} width={74} height={56} rx={6} fill={`rgba(${a},0.1)`} stroke={`rgba(${a},0.2)`} strokeWidth="1" />
      {/* Medidores tipo Core Web Vitals */}
      {gauge(92, "98")}
      {gauge(160, "100")}
      {gauge(228, "96")}
      <text x={160} y={192} textAnchor="middle" fontFamily={MONO} fontSize="8" fill="rgba(173,193,255,0.5)">CORE WEB VITALS</text>
    </svg>
  );
}

function AutomationVisual({ a }: { a: string }) {
  const node = (x: number, y: number, label: string) => (
    <g key={label}>
      <rect x={x - 26} y={y - 12} width={52} height={24} rx={7} fill={`rgba(${a},0.06)`} stroke={`rgba(${a},0.3)`} strokeWidth="1" />
      <text x={x} y={y + 3.5} textAnchor="middle" fontFamily={MONO} fontSize="9" fill="rgba(240,244,255,0.7)">{label}</text>
    </g>
  );
  const edge = (d: string, delay: number) => (
    <g key={d}>
      <path d={d} fill="none" stroke={`rgba(${a},0.3)`} strokeWidth="1.2" />
      <circle r="2.6" fill={`rgba(${a},0.95)`}>
        <animateMotion dur="2.8s" begin={`${delay}s`} repeatCount="indefinite" path={d} />
      </circle>
    </g>
  );

  return (
    <svg viewBox="0 0 320 200" role="img" aria-label="Flujos automáticos conectando sistemas de la empresa" className="h-full w-full">
      {edge("M86,52 C120,52 130,100 154,100", 0)}
      {edge("M86,100 L154,100", 0.9)}
      {edge("M86,148 C120,148 130,100 154,100", 1.8)}
      {edge("M186,100 C210,100 220,64 250,64", 0.4)}
      {edge("M186,100 C210,100 220,136 250,136", 1.3)}
      {node(60, 52, "ERP")}
      {node(60, 100, "Form")}
      {node(60, 148, "Email")}
      {/* Hub central */}
      <g>
        <rect x={140} y={84} width={40} height={32} rx={9} fill={`rgba(${a},0.16)`} stroke={`rgba(${a},0.55)`} strokeWidth="1.2" />
        <rect x={140} y={84} width={40} height={32} rx={9} fill="none" stroke={`rgba(${a},0.35)`} strokeWidth="1">
          <animate attributeName="stroke-opacity" values="0.35;0.9;0.35" dur="2.2s" repeatCount="indefinite" />
        </rect>
        <text x={160} y={104} textAnchor="middle" fontFamily={MONO} fontSize="9" fontWeight="700" fill="rgba(240,244,255,0.9)">flujo</text>
      </g>
      {node(276, 64, "CRM")}
      {node(276, 136, "Panel")}
      <text x={160} y={188} textAnchor="middle" fontFamily={MONO} fontSize="8" fill="rgba(173,193,255,0.5)">LOGS · ALERTAS · REINTENTOS</text>
    </svg>
  );
}

function CrmVisual({ a }: { a: string }) {
  const col = (x: number, label: string, cards: number[]) => (
    <g key={label}>
      <text x={x + 33} y={40} textAnchor="middle" fontFamily={MONO} fontSize="8" fill="rgba(173,193,255,0.6)">{label}</text>
      <rect x={x} y={48} width={66} height={120} rx={8} fill={`rgba(${a},0.04)`} stroke={`rgba(${a},0.18)`} strokeWidth="1" />
      {cards.map((cy, i) => (
        <g key={cy}>
          <rect x={x + 7} y={cy} width={52} height={22} rx={5} fill={`rgba(${a},${i === 0 ? 0.2 : 0.1})`} stroke={`rgba(${a},0.25)`} strokeWidth="0.8" />
          <rect x={x + 12} y={cy + 6} width={30} height={4} rx={2} fill="rgba(240,244,255,0.4)" />
          <rect x={x + 12} y={cy + 13} width={20} height={3} rx={1.5} fill={`rgba(${a},0.5)`} />
        </g>
      ))}
    </g>
  );

  return (
    <svg viewBox="0 0 320 200" role="img" aria-label="Tablero CRM a medida con etapas del proceso comercial" className="h-full w-full">
      {col(38, "ENTRADA", [56, 84, 112])}
      {col(127, "EN CURSO", [56, 84])}
      {col(216, "CERRADO", [56])}
      {/* Tarjeta que avanza de columna */}
      <g>
        <rect x={0} y={0} width={52} height={22} rx={5} fill={`rgba(${a},0.35)`} stroke={`rgba(${a},0.8)`} strokeWidth="1">
          <animateMotion dur="5s" repeatCount="indefinite" keyPoints="0;0;0.5;0.5;1;1" keyTimes="0;0.2;0.35;0.6;0.75;1" calcMode="linear" path="M45,140 L134,112 L223,84" />
        </rect>
      </g>
      <text x={160} y={190} textAnchor="middle" fontFamily={MONO} fontSize="8" fill="rgba(173,193,255,0.5)">ROLES · PERMISOS · TRAZABILIDAD</text>
    </svg>
  );
}

export default function ServiceVisual({ slug, accentRgb, className }: Props) {
  const visual =
    slug === "software-a-medida" ? <SoftwareVisual a={accentRgb} /> :
    slug === "web-a-medida" ? <WebVisual a={accentRgb} /> :
    slug === "automatizacion-integraciones" ? <AutomationVisual a={accentRgb} /> :
    <CrmVisual a={accentRgb} />;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border ${className ?? ""}`}
      style={{
        borderColor: `rgba(${accentRgb},0.14)`,
        background: `linear-gradient(160deg, rgba(${accentRgb},0.05), rgba(6,11,26,0.6))`,
      }}
    >
      {visual}
    </div>
  );
}
