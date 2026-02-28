import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/app/components/ui/BlogCard";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://samueloshin.vercel.app";

export const metadata: Metadata = {
    title: "Blog — Samuel Oshin | Python Backend & AI Engineering",
    description:
        "Technical articles on Python backend development, RAG pipelines, distributed systems, AI infrastructure, and software engineering best practices.",
    openGraph: {
        title: "Blog — Samuel Oshin",
        description:
            "Technical articles on Python backend development, RAG pipelines, and AI infrastructure.",
        url: `${SITE_URL}/blog`,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog — Samuel Oshin",
        description:
            "Technical articles on Python backend development, RAG pipelines, and AI infrastructure.",
    },
    alternates: {
        canonical: `${SITE_URL}/blog`,
    },
};

export default function BlogPage() {
    const posts = getAllPosts();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Samuel Oshin's Blog",
        description: metadata.description,
        url: `${SITE_URL}/blog`,
        mainEntity: {
            "@type": "ItemList",
            itemListElement: posts.map((post, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `${SITE_URL}/blog/${post.slug}`,
                name: post.title,
            })),
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-16">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="mb-16 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                            Blog
                        </h1>
                        <p className="text-lg text-white/60 max-w-2xl mx-auto">
                            Deep dives into backend engineering, AI infrastructure, RAG
                            pipelines, and the tools I use to build production systems.
                        </p>
                    </div>

                    {/* Posts Grid */}
                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-white/40 text-lg">
                                No posts yet. Check back soon!
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-2">
                            {posts.map((post) => (
                                <BlogCard key={post.slug} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
