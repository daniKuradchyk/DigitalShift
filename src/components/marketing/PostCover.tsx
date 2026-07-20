/**
 * Portada generativa por artículo. Determinista a partir del slug:
 * mismo artículo → misma portada, sin assets externos.
 * Server Component.
 */

type Props = {
  slug: string;
  tag?: string;
  className?: string;
};

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

const PALETTES: Array<[string, string]> = [
  ["65,105,225", "133,162,255"],
  ["91,141,239", "65,105,225"],
  ["133,162,255", "91,141,239"],
  ["38,65,167", "91,141,239"],
];

export default function PostCover({ slug, tag, className }: Props) {
  const h = hash(slug);
  const [c1, c2] = PALETTES[h % PALETTES.length];
  const variant = h % 3; // 0: nodos, 1: ondas, 2: rejilla isométrica
  const seedX = 40 + (h % 200);
  const seedY = 30 + ((h >> 3) % 60);

  return (
    <div
      aria-hidden
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{
        background: `linear-gradient(135deg, rgba(${c1},0.16), rgba(6,11,26,0.4) 55%, rgba(${c2},0.10))`,
      }}
    >
      <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        {variant === 0 && (
          <g>
            {Array.from({ length: 7 }, (_, i) => {
              const x = ((h >> i) % 360) + 20;
              const y = ((h >> (i + 2)) % 160) + 20;
              const x2 = ((h >> (i + 1)) % 360) + 20;
              const y2 = ((h >> (i + 3)) % 160) + 20;
              return (
                <g key={i}>
                  <line x1={x} y1={y} x2={x2} y2={y2} stroke={`rgba(${c1},0.18)`} strokeWidth="1" />
                  <circle cx={x} cy={y} r={3 + (i % 3)} fill={`rgba(${c2},0.4)`} />
                </g>
              );
            })}
            <circle cx={seedX} cy={seedY + 40} r="26" fill="none" stroke={`rgba(${c1},0.3)`} strokeWidth="1" strokeDasharray="4 4" />
          </g>
        )}
        {variant === 1 && (
          <g fill="none" strokeWidth="1.2">
            {Array.from({ length: 6 }, (_, i) => (
              <path
                key={i}
                d={`M-20,${30 + i * 30} C 100,${10 + i * 30 + (h % 40)} 300,${50 + i * 30 - (h % 30)} 420,${25 + i * 30}`}
                stroke={`rgba(${i % 2 ? c1 : c2},${0.28 - i * 0.035})`}
              />
            ))}
          </g>
        )}
        {variant === 2 && (
          <g stroke={`rgba(${c1},0.16)`} strokeWidth="1">
            {Array.from({ length: 9 }, (_, i) => (
              <line key={`a${i}`} x1={i * 50 - 40} y1={220} x2={i * 50 + 60} y2={-20} />
            ))}
            {Array.from({ length: 5 }, (_, i) => (
              <line key={`b${i}`} x1={-20} y1={i * 50 - 10} x2={420} y2={i * 50 + 30} />
            ))}
            <rect x={seedX} y={seedY} width="70" height="44" rx="8" fill={`rgba(${c2},0.14)`} stroke={`rgba(${c2},0.4)`} />
          </g>
        )}
      </svg>

      {/* Viñeta inferior para legibilidad */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(6,11,26,0.55), transparent 60%)" }}
      />

      {tag ? (
        <span
          className="absolute bottom-3 left-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: `rgba(${c2},0.9)` }}
        >
          {tag}
        </span>
      ) : null}
    </div>
  );
}
