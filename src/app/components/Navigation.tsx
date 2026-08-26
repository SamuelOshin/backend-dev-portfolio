"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, FileText, Menu, X, ArrowUpRight } from "lucide-react";

const navigation = [
  { name: "Home", href: "#home", isPage: false },
  { name: "Experience", href: "#experience", isPage: false },
  { name: "Skills", href: "#skills", isPage: false },
  { name: "Projects", href: "#projects", isPage: false },
  { name: "Blog", href: "/blog", isPage: true },
  { name: "Contact", href: "#contact", isPage: false },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith("/blog");

  useEffect(() => {
    if (isBlogPage) return;

    const sectionIds = ["home", "experience", "skills", "projects", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [isBlogPage]);

  const scrollToSection = (href: string) => {
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center justify-between gap-2 sm:gap-6 rounded-full border border-white/10 bg-zinc-950/80 px-3 py-2 sm:px-4 sm:py-2 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]">
          {/* Logo / Monogram */}
          <Link
            href="/"
            className="flex items-center gap-2 pl-2 pr-1 py-1 text-sm font-semibold tracking-tight text-white hover:text-[color:var(--accent)] transition-colors"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-mono font-bold text-white border border-white/15">
              SO
            </span>
            <span className="hidden sm:inline text-xs font-mono text-white/70">samuel.oshin</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = item.isPage
                ? pathname.startsWith(item.href)
                : !isBlogPage && activeSection === item.href.substring(1);

              if (item.isPage) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                      isActive
                        ? "text-white bg-white/10"
                        : "text-white/65 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              }

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    if (isBlogPage) {
                      window.location.href = `/${item.href}`;
                    } else {
                      scrollToSection(item.href);
                    }
                  }}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                      : "text-white/65 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="hidden md:block h-4 w-px bg-white/10" />

          {/* Desktop Socials & CV */}
          <div className="hidden md:flex items-center gap-1">
            <a
              href="https://github.com/SamuelOshin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/65 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={15} />
            </a>
            <a
              href="https://linkedin.com/in/samuel-oshin-2903611a5/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/65 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="mailto:samuelt.oshin@gmail.com"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/65 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Send Email"
            >
              <Mail size={15} />
            </a>
            <a
              href="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Samuel Oshin_Junior_Python_Backend_Developer-1758178066590.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[color:var(--accent)]/15 border border-[color:var(--accent)]/30 rounded-full hover:bg-[color:var(--accent)]/25 hover:border-[color:var(--accent)]/50 text-[color:var(--accent)] transition-all"
            >
              <FileText size={13} />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-2xl md:hidden flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-3 max-w-sm mx-auto w-full">
              {navigation.map((item, idx) => {
                if (item.isPage) {
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between px-4 py-3 rounded-2xl text-lg font-medium text-white/80 hover:text-white hover:bg-white/5 border border-white/5 transition-colors"
                      >
                        <span>{item.name}</span>
                        <ArrowUpRight size={18} className="text-white/40" />
                      </Link>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <button
                      onClick={() => {
                        if (isBlogPage) {
                          window.location.href = `/${item.href}`;
                        } else {
                          scrollToSection(item.href);
                        }
                      }}
                      className="flex w-full items-center justify-between px-4 py-3 rounded-2xl text-lg font-medium text-white/80 hover:text-white hover:bg-white/5 border border-white/5 transition-colors text-left"
                    >
                      <span>{item.name}</span>
                      <span className="text-xs font-mono text-white/40">0{idx + 1}</span>
                    </button>
                  </motion.div>
                );
              })}

              {/* Mobile Social Links */}
              <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex gap-3">
                  <a
                    href="https://github.com/SamuelOshin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="https://linkedin.com/in/samuel-oshin-2903611a5/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="mailto:samuelt.oshin@gmail.com"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white"
                  >
                    <Mail size={18} />
                  </a>
                </div>
                <a
                  href="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Samuel Oshin_Junior_Python_Backend_Developer-1758178066590.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[color:var(--accent)] rounded-full hover:bg-[color:var(--accent)]/90 text-zinc-950 transition-all"
                >
                  <FileText size={14} />
                  <span>Resume</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}