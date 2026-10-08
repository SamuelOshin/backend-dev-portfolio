import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";

export function WritingSection({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section id="writing" className="relative mt-32 sm:mt-44 scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="eyebrow">06 · Writing</span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white">
            Notes from <span className="font-display italic font-normal">the build.</span>
          </h2>
        </div>
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white transition-colors">
          All posts <ArrowUpRight size={14} />
        </Link>
      </div>

      <ul className="mt-10 border-t border-white/[0.08]">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group grid grid-cols-12 gap-3 items-baseline border-b border-white/[0.08] py-6"
            >
              <time dateTime={post.date} className="col-span-12 sm:col-span-2 font-mono text-xs text-white/40">
                {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </time>
              <span className="col-span-11 sm:col-span-8">
                <span className="block text-lg text-white group-hover:text-[color:var(--signal)] transition-colors">{post.title}</span>
                <span className="mt-1 block text-sm text-white/50 line-clamp-2">{post.description}</span>
              </span>
              <span className="col-span-1 sm:col-span-2 flex items-center justify-end gap-3">
                <span className="hidden sm:inline font-mono text-[11px] text-white/35">{post.readingTime}</span>
                <ArrowUpRight size={16} className="text-white/30 transition-all group-hover:text-[color:var(--signal)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
