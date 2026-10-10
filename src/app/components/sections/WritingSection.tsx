import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function Cover({ post, sizes }: { post: BlogPostMeta; sizes: string }) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-[color:var(--ink)]">
      {post.image ? (
        <Image
          src={post.image}
          alt=""
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.9_0.19_125/0.1),transparent_65%)]" />
      )}
    </div>
  );
}

function Meta({ post }: { post: BlogPostMeta }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px] text-white/40">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span>·</span>
      <span>{post.readingTime}</span>
    </div>
  );
}

export function WritingSection({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) return null;
  const [latest, ...rest] = posts;

  return (
    <section id="blog" className="relative mt-32 sm:mt-44 scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="eyebrow">06 · Blog</span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white">
            From the <span className="font-display italic font-normal">blog.</span>
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed">
            Deep dives on the systems above: RAG pipelines, guest sessions, resilient ingestion and backend architecture.
          </p>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition-colors hover:border-white/30 hover:text-white"
        >
          Read the blog <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Latest post */}
      <Link
        href={`/blog/${latest.slug}`}
        className="group mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 rounded-2xl border border-white/[0.08] bg-white/[0.015] p-4 sm:p-6 transition-colors hover:border-white/20"
      >
        <div className="lg:col-span-7">
          <Cover post={latest} sizes="(min-width: 1024px) 620px, 100vw" />
        </div>
        <div className="lg:col-span-5 flex flex-col justify-center">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[color:var(--signal)]">Latest post</span>
          <h3 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-white group-hover:text-[color:var(--signal)] transition-colors">
            {latest.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/60">{latest.description}</p>
          <div className="mt-5 flex items-center justify-between gap-4">
            <Meta post={latest} />
            <ArrowUpRight size={18} className="text-white/40 transition-all group-hover:text-[color:var(--signal)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>

      {/* More posts */}
      {rest.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.015] p-4 transition-colors hover:border-white/20"
            >
              <Cover post={post} sizes="(min-width: 768px) 360px, 100vw" />
              <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight text-white group-hover:text-[color:var(--signal)] transition-colors">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50 line-clamp-2">{post.description}</p>
              <div className="mt-auto pt-4">
                <Meta post={post} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
