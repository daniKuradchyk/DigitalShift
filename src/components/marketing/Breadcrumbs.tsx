import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-colors hover:text-blue-300">
                  {item.label}
                </Link>
              ) : (
                <span style={isLast ? { color: "var(--text-secondary)" } : undefined}>{item.label}</span>
              )}
              {!isLast ? <span aria-hidden className="text-blue-400/30">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
