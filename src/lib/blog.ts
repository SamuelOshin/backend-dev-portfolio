import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPostMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    published: boolean;
    image?: string;
    readingTime: string;
}

export interface BlogPost extends BlogPostMeta {
    content: string;
}

/**
 * Get all published blog posts, sorted by date (newest first).
 */
export function getAllPosts(): BlogPostMeta[] {
    if (!fs.existsSync(BLOG_DIR)) return [];

    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

    const posts = files
        .map((filename) => {
            const slug = filename.replace(/\.mdx$/, "");
            const filePath = path.join(BLOG_DIR, filename);
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const { data, content } = matter(fileContent);
            const stats = readingTime(content);

            return {
                slug,
                title: data.title || slug,
                description: data.description || "",
                date: data.date || new Date().toISOString(),
                tags: data.tags || [],
                published: data.published !== false,
                image: data.image || undefined,
                readingTime: stats.text,
            } satisfies BlogPostMeta;
        })
        .filter((post) => post.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}

/**
 * Get a single blog post by slug (includes raw MDX content).
 */
export function getPostBySlug(slug: string): BlogPost | null {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);

    return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
        published: data.published !== false,
        image: data.image || undefined,
        readingTime: stats.text,
        content,
    };
}

/**
 * Get all unique tags from published posts.
 */
export function getAllTags(): string[] {
    const posts = getAllPosts();
    const tagSet = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
}

/**
 * Get all slugs for generateStaticParams.
 */
export function getAllSlugs(): string[] {
    if (!fs.existsSync(BLOG_DIR)) return [];
    return fs
        .readdirSync(BLOG_DIR)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => f.replace(/\.mdx$/, ""));
}
