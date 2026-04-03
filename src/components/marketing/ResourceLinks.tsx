import Link from "next/link";
import labs from "@/content/labs.json";
import { getPost } from "@/lib/posts";

type Props = {
  posts: string[];
  labSlugs: string[];
};

const panelClass = "card-glass relative overflow-hidden rounded-2xl p-6";

export default function ResourceLinks({ posts, labSlugs }: Props) {
  const postItems = posts.map((slug) => getPost(slug)).filter(Boolean);
  const labItems = labSlugs.map((slug) => labs.find((item) => item.slug === slug)).filter(Boolean);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className={panelClass}>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-400">Lecturas</p>
        <div className="mt-4 space-y-4">
          {postItems.map((post) => (
            <Link key={post!.slug} href={`/blog/${post!.slug}`} className="group block">
              <p className="text-base font-semibold transition-colors group-hover:text-blue-300" style={{ color: "var(--text-primary)" }}>
                {post!.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{post!.description}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className={panelClass}>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-400">Labs</p>
        <div className="mt-4 space-y-4">
          {labItems.map((lab) => (
            <Link key={lab!.slug} href={lab!.href ?? `/labs/${lab!.slug}`} className="group block">
              <p className="text-base font-semibold transition-colors group-hover:text-blue-300" style={{ color: "var(--text-primary)" }}>
                {lab!.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{lab!.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
