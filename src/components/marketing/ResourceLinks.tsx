import Link from "next/link";
import labs from "@/content/labs.json";
import { getPost } from "@/lib/posts";

type Props = {
  posts: string[];
  labSlugs: string[];
};

const panelClass = "surface-card relative overflow-hidden rounded-2xl p-5";

export default function ResourceLinks({ posts, labSlugs }: Props) {
  const postItems = posts.map((slug) => getPost(slug)).filter(Boolean);
  const labItems = labSlugs.map((slug) => labs.find((item) => item.slug === slug)).filter(Boolean);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className={panelClass}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-400">Lecturas</p>
        <div className="mt-4 space-y-4">
          {postItems.map((post) => (
            <Link key={post!.slug} href={`/blog/${post!.slug}`} className="block">
              <p className="text-base font-semibold text-slate-900 transition-colors hover:text-sky-400 dark:text-white">
                {post!.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{post!.description}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className={panelClass}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-400">Labs</p>
        <div className="mt-4 space-y-4">
          {labItems.map((lab) => (
            <Link key={lab!.slug} href={lab!.href ?? `/labs/${lab!.slug}`} className="block">
              <p className="text-base font-semibold text-slate-900 transition-colors hover:text-sky-400 dark:text-white">
                {lab!.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{lab!.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
