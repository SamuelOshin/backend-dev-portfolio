import { getAllPosts } from "@/lib/blog";
import RSS from "rss";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://samueloshin.dev";

export async function GET() {
    const posts = getAllPosts();

    const feed = new RSS({
        title: "Samuel Oshin — Blog",
        description:
            "Technical articles on Python backend development, RAG pipelines, distributed systems, and AI infrastructure.",
        site_url: SITE_URL,
        feed_url: `${SITE_URL}/feed.xml`,
        language: "en",
        pubDate: posts.length > 0 ? new Date(posts[0].date) : new Date(),
        copyright: `© ${new Date().getFullYear()} Samuel Oshin`,
    });

    posts.forEach((post) => {
        feed.item({
            title: post.title,
            description: post.description,
            url: `${SITE_URL}/blog/${post.slug}`,
            date: new Date(post.date),
            categories: post.tags,
            author: "Samuel Oshin",
        });
    });

    return new Response(feed.xml({ indent: true }), {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
        },
    });
}
