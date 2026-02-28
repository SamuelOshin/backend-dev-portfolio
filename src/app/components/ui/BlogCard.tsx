"use client";

import Link from "next/link";
import { Calendar, Clock, ArrowUpRight, Tag } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogCardProps {
    post: BlogPostMeta;
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-[color:var(--accent)]/30 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-[color:var(--accent)]/5"
        >
            {/* Arrow indicator */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight
                    size={18}
                    className="text-[color:var(--accent)] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full bg-[color:var(--accent)]/10 text-[color:var(--accent)] border border-[color:var(--accent)]/20"
                        >
                            {tag}
                        </span>
                    ))}
                    {post.tags.length > 3 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full bg-white/5 text-white/40">
                            +{post.tags.length - 3}
                        </span>
                    )}
                </div>
            )}

            {/* Title */}
            <h2
                className="text-xl font-bold text-white mb-2 group-hover:text-[color:var(--accent)] transition-colors leading-snug"
                style={{ fontFamily: "var(--font-heading)" }}
            >
                {post.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-white/50 leading-relaxed mb-6 line-clamp-3 flex-1">
                {post.description}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-white/30 mt-auto pt-4 border-t border-white/5">
                <span className="inline-flex items-center gap-1.5">
                    <Calendar size={12} />
                    <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <Clock size={12} />
                    {post.readingTime}
                </span>
            </div>
        </Link>
    );
}
