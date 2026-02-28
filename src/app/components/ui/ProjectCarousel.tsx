"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRight, Github, Database, ExternalLink } from "lucide-react";

export function ProjectCarousel({
    projects
}: { projects: { title: string; image: string; tags: string[]; githubUrl?: string; liveUrl?: string; apiUrl?: string; }[]; }) {
    return (
        <div className="mt-10 relative sm:px-12 md:px-16">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {projects.map((p, i) => (
                        <CarouselItem key={p.title + i} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                            <motion.article
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="h-full flex flex-col rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur overflow-hidden group cursor-pointer"
                            >
                                <motion.div
                                    className="relative w-full h-48 sm:h-56 lg:h-60 overflow-hidden"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.img
                                        src={p.image}
                                        alt={p.title}
                                        className="h-full w-full object-cover transition-transform duration-500"
                                        whileHover={{ scale: 1.1 }}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                                    />

                                    <motion.div
                                        className="pointer-events-none absolute inset-x-0 -bottom-1 h-1 bg-[radial-gradient(60%_100%_at_50%_120%,_var(--accent),_transparent)] opacity-60"
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                                    />
                                </motion.div>

                                <div className="flex-1 p-6 flex flex-col">
                                    <motion.div
                                        className="flex items-center justify-between gap-3 mb-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                                    >
                                        <h3 className="text-lg font-medium tracking-[-0.01em] group-hover:text-[color:var(--accent)] transition-colors line-clamp-2">
                                            {p.title}
                                        </h3>
                                        <motion.div
                                            whileHover={{ x: 4 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ArrowRight size={16} className="text-white/60 group-hover:text-[color:var(--accent)] transition-colors flex-shrink-0" />
                                        </motion.div>
                                    </motion.div>

                                    <motion.div
                                        className="flex flex-wrap gap-2 mb-4"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.1 + 0.4 }}
                                    >
                                        {p.tags.map((tag, tagIndex) => (
                                            <motion.div
                                                key={tag}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.3, delay: i * 0.1 + 0.5 + tagIndex * 0.05 }}
                                            >
                                                <Badge className="bg-white/5 text-white/75 border-white/10 hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)] text-xs">
                                                    {tag}
                                                </Badge>
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    <motion.div
                                        className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.1 + 0.6 }}
                                    >
                                        {p.githubUrl && (
                                            <motion.a
                                                href={p.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 py-1 sm:px-3 sm:py-2 text-[10px] sm:text-sm font-medium text-white/80 bg-white/5 border border-white/10 rounded-md sm:rounded-lg hover:bg-white/10 hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)] transition-all duration-200 whitespace-nowrap"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Github size={12} className="sm:w-4 sm:h-4" />
                                                Code
                                            </motion.a>
                                        )}
                                        {p.apiUrl && (
                                            <motion.a
                                                href={p.apiUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 py-1 sm:px-3 sm:py-2 text-[10px] sm:text-sm font-medium text-white/80 bg-blue-500/20 border border-blue-500/40 rounded-md sm:rounded-lg hover:bg-blue-500/30 hover:border-blue-500/60 transition-all duration-200 whitespace-nowrap"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Database size={12} className="sm:w-4 sm:h-4" />
                                                API Docs
                                            </motion.a>
                                        )}
                                        {p.liveUrl && (
                                            <motion.a
                                                href={p.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 py-1 sm:px-3 sm:py-2 text-[10px] sm:text-sm font-medium text-white/80 bg-[color:var(--accent)]/20 border border-[color:var(--accent)]/40 rounded-md sm:rounded-lg hover:bg-[color:var(--accent)]/30 hover:border-[color:var(--accent)]/60 transition-all duration-200 whitespace-nowrap"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <ExternalLink size={12} className="sm:w-4 sm:h-4" />
                                                Live Demo
                                            </motion.a>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.article>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex -left-12 md:-left-16 bg-white/5 border-white/10 hover:bg-white/10 hover:border-[color:var(--accent)]/40 text-white z-10" />
                <CarouselNext className="hidden sm:flex -right-12 md:-right-16 bg-white/5 border-white/10 hover:bg-[color:var(--accent)]/10 hover:border-[color:var(--accent)]/40 text-white z-10" />
            </Carousel>

            {/* Mobile Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6 sm:hidden">
                {projects.map((_, index) => (
                    <button
                        key={index}
                        className="w-2 h-2 rounded-full bg-white/30 hover:bg-[color:var(--accent)] transition-colors"
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
