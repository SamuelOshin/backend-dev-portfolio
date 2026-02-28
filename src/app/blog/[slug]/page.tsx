import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkMermaid from "@/lib/remark-mermaid";
import { Mermaid } from "@/app/components/ui/Mermaid";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://samueloshin.vercel.app";

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

    const components = { Mermaid };

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
                    <header className="mb-10">
                        {/* Cover Image */}
                        {post.image && (
                            <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-8 border border-white/10">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 768px"
                                />
                            </div>
                        )}
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                            {post.title}
                        </h1>

                        <p className="text-base sm:text-lg text-white/60 mb-6">{post.description}</p>

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
                    <div className="prose prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-[color:var(--accent)] prose-a:font-medium prose-a:underline-offset-4 hover:prose-a:text-white transition-colors
            prose-strong:text-white prose-strong:font-bold
            prose-code:text-[color:var(--accent)] prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:shadow-xl prose-pre:overflow-x-auto prose-pre:text-sm
            prose-blockquote:border-l-4 prose-blockquote:border-[color:var(--accent)] prose-blockquote:bg-white/[0.02] prose-blockquote:py-1 prose-blockquote:pr-4 prose-blockquote:pl-5 prose-blockquote:rounded-r-lg prose-blockquote:text-white/70 prose-blockquote:font-medium prose-blockquote:italic
            prose-ul:text-white/80 prose-ul:leading-relaxed prose-ul:list-disc
            prose-ol:text-white/80 prose-ol:leading-relaxed
            prose-li:my-1
            prose-table:text-white/80 prose-table:w-full prose-table:text-sm
            prose-th:text-white prose-th:font-semibold prose-th:border-b prose-th:border-white/20 prose-th:text-left prose-th:p-3
            prose-td:border-b prose-td:border-white/10 prose-td:p-3
            prose-hr:border-white/10 prose-hr:my-12
            prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-img:shadow-xl"
                    >
                        <MDXRemote
                            source={post.content}
                            components={components}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkGfm, remarkMermaid],
                                    rehypePlugins: [
                                        rehypeSlug,
                                        [rehypeAutolinkHeadings, { behavior: "wrap" }],
                                        [rehypePrettyCode, { theme: "github-dark" }],
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
