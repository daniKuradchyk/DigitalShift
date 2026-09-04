import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[#63666D]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-colors hover:text-[#101014]">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-[#3D4046]" : undefined}>{item.label}</span>
              )}
              {!isLast ? <span aria-hidden className="text-[#C9CCD3]">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
