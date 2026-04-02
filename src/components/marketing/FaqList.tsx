import type { ServiceFaq } from "@/content/services";

export default function FaqList({ items }: { items: ServiceFaq[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.q} className="group surface-card relative overflow-hidden rounded-2xl p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-slate-900 dark:text-white">
            <span>{item.q}</span>
            <span className="text-sky-400 transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
