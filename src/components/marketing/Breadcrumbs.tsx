import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-colors hover:text-sky-600 dark:hover:text-sky-400">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-slate-900 dark:text-slate-300" : undefined}>{item.label}</span>
              )}
              {!isLast ? <span aria-hidden className="text-slate-400 dark:text-slate-600">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
