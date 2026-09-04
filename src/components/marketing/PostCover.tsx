/**
 * Portada generativa por artículo. Determinista a partir del slug:
 * mismo artículo → misma portada, sin assets externos.
 * Composición editorial plana: fondo claro, líneas finas y un solo acento.
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

const ACCENT = "#2C4BC4";
const LINE = "#E4E6EA";
const LINE_STRONG = "#C9CCD3";

export default function PostCover({ slug, tag, className }: Props) {
  const h = hash(slug);
  const variant = h % 3; // 0: nodos, 1: ondas, 2: rejilla isométrica
  const seedX = 40 + (h % 200);
  const seedY = 30 + ((h >> 3) % 60);

  return (
    <div aria-hidden className={`relative overflow-hidden bg-[#F5F6F8] ${className ?? ""}`}>
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
                  <line x1={x} y1={y} x2={x2} y2={y2} stroke={LINE} strokeWidth="1" />
                  <circle cx={x} cy={y} r={2.5 + (i % 3)} fill={i === 0 ? ACCENT : LINE_STRONG} />
                </g>
              );
            })}
            <circle cx={seedX} cy={seedY + 40} r="26" fill="none" stroke={LINE_STRONG} strokeWidth="1" />
          </g>
        )}

        {variant === 1 && (
          <g fill="none" strokeWidth="1">
            {Array.from({ length: 6 }, (_, i) => (
              <path
                key={i}
                d={`M-20,${30 + i * 30} C 100,${10 + i * 30 + (h % 40)} 300,${50 + i * 30 - (h % 30)} 420,${25 + i * 30}`}
                stroke={i === 2 ? ACCENT : i % 2 ? LINE_STRONG : LINE}
              />
            ))}
          </g>
        )}

        {variant === 2 && (
          <g stroke={LINE} strokeWidth="1">
            {Array.from({ length: 9 }, (_, i) => (
              <line key={`a${i}`} x1={i * 50 - 40} y1={220} x2={i * 50 + 60} y2={-20} />
            ))}
            {Array.from({ length: 5 }, (_, i) => (
              <line key={`b${i}`} x1={-20} y1={i * 50 - 10} x2={420} y2={i * 50 + 30} />
            ))}
            <rect x={seedX} y={seedY} width="70" height="44" rx="2" fill="#FFFFFF" stroke={ACCENT} />
          </g>
        )}
      </svg>

      {tag ? (
        <span className="absolute bottom-3 left-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#63666D]">
          <span className="inline-block h-0.5 w-5 bg-brand-600" />
          {tag}
        </span>
      ) : (
        <span className="absolute left-4 top-4 block h-0.5 w-8 bg-brand-600" />
      )}
    </div>
  );
}
