import Link from "next/link";
import labs from "@/content/labs.json";
import { getPost } from "@/lib/posts";

type Props = {
  posts: string[];
  labSlugs: string[];
};

const panelClass = "border border-[#E4E6EA] bg-white p-8 rounded-[4px]";

export default function ResourceLinks({ posts, labSlugs }: Props) {
  const postItems = posts.map((slug) => getPost(slug)).filter(Boolean);
  const labItems = labSlugs.map((slug) => labs.find((item) => item.slug === slug)).filter(Boolean);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className={panelClass}>
        <p className="section-tag">Lecturas</p>
        <div className="mt-6 divide-y divide-[#E4E6EA]">
          {postItems.map((post) => (
            <Link key={post!.slug} href={`/blog/${post!.slug}`} className="group block py-4 first:pt-0 last:pb-0">
              <p className="text-base font-semibold text-[#101014] transition-colors group-hover:text-brand-600">
                {post!.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#63666D]">{post!.description}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className={panelClass}>
        <p className="section-tag">Labs</p>
        <div className="mt-6 divide-y divide-[#E4E6EA]">
          {labItems.map((lab) => (
            <Link
              key={lab!.slug}
              href={lab!.href ?? `/labs/${lab!.slug}`}
              className="group block py-4 first:pt-0 last:pb-0"
            >
              <p className="text-base font-semibold text-[#101014] transition-colors group-hover:text-brand-600">
                {lab!.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#63666D]">{lab!.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
