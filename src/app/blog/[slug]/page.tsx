import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://samueloshin.dev";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.title} — Samuel Oshin`,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            url: `${SITE_URL}/blog/${post.slug}`,
            type: "article",
            publishedTime: post.date,
            authors: ["Samuel Oshin"],
            images: post.image
                ? [{ url: `${SITE_URL}${post.image}`, width: 1200, height: 630 }]
                : [],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: post.image ? [`${SITE_URL}${post.image}`] : [],
        },
        alternates: {
            canonical: `${SITE_URL}/blog/${post.slug}`,
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        author: {
            "@type": "Person",
            name: "Samuel Oshin",
            url: SITE_URL,
        },
        publisher: {
            "@type": "Person",
            name: "Samuel Oshin",
        },
        image: post.image ? `${SITE_URL}${post.image}` : undefined,
        url: `${SITE_URL}/blog/${post.slug}`,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/blog/${post.slug}`,
        },
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${SITE_URL}/blog`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `${SITE_URL}/blog/${post.slug}`,
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <main className="min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-16">
                <article className="max-w-3xl mx-auto">
                    {/* Back Link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[color:var(--accent)] transition-colors mb-8 group"
                    >
                        <ArrowLeft
                            size={16}
                            className="group-hover:-translate-x-1 transition-transform"
                        />
                        Back to Blog
                    </Link>

                    {/* Post Header */}
                    <header className="mb-12">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                            {post.title}
                        </h1>

                        <p className="text-lg text-white/60 mb-6">{post.description}</p>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-white/40">
                            <span className="inline-flex items-center gap-1.5">
                                <Calendar size={14} />
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </time>
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Clock size={14} />
                                {post.readingTime}
                            </span>
                        </div>

                        {/* Tags */}
                        {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-white/60 border border-white/10"
                                    >
                                        <Tag size={10} />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="mt-8 border-b border-white/10" />
                    </header>

                    {/* MDX Content */}
                    <div className="prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-white/70 prose-p:leading-relaxed
            prose-a:text-[color:var(--accent)] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-semibold
            prose-code:text-[color:var(--accent)] prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-[#1a1a2e] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
            prose-blockquote:border-[color:var(--accent)] prose-blockquote:text-white/60
            prose-li:text-white/70
            prose-table:text-white/70
            prose-th:text-white prose-th:font-semibold prose-th:border-white/10
            prose-td:border-white/10
            prose-hr:border-white/10
            prose-img:rounded-xl prose-img:border prose-img:border-white/10"
                    >
                        <MDXRemote
                            source={post.content}
                            options={{
                                mdxOptions: {
                                    rehypePlugins: [
                                        rehypeSlug,
                                        [rehypeAutolinkHeadings, { behavior: "wrap" }],
                                    ],
                                },
                            }}
                        />
                    </div>

                    {/* Footer */}
                    <footer className="mt-16 pt-8 border-t border-white/10">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[color:var(--accent)] transition-colors group"
                        >
                            <ArrowLeft
                                size={16}
                                className="group-hover:-translate-x-1 transition-transform"
                            />
                            Back to all posts
                        </Link>
                    </footer>
                </article>
            </main>
        </>
    );
}
