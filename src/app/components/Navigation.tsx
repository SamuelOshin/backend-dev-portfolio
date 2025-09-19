"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Download, Menu, X } from "lucide-react";

const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur bg-background/80">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-white hover:text-[color:var(--accent)] transition-colors"
          >
            Samuel Oshin
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium transition-colors hover:text-[color:var(--accent)] ${
                  activeSection === item.href.substring(1)
                    ? "text-[color:var(--accent)]"
                    : "text-white/70"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop Contact Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="mailto:samuelt.oshin@gmail.com"
              className="text-white/70 hover:text-[color:var(--accent)] transition-colors p-2"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://github.com/SamuelOshin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-[color:var(--accent)] transition-colors p-2"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/samuel-oshin-2903611a5/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-[color:var(--accent)] transition-colors p-2"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Samuel Oshin_Junior_Python_Backend_Developer-1758178066590.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-lg hover:border-[color:var(--accent)]/50 hover:text-[color:var(--accent)] transition-all"
            >
              <Download size={16} className="inline mr-2" />
              CV
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white/70 hover:text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-white/10">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    activeSection === item.href.substring(1)
                      ? "text-[color:var(--accent)] bg-white/5"
                      : "text-white/70 hover:text-[color:var(--accent)] hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </button>
              ))}

              {/* Mobile Contact Links */}
              <div className="border-t border-white/10 mt-4 pt-4">
                <div className="px-3 py-2">
                  <div className="text-sm font-medium text-white/50 mb-3">Connect</div>
                  <div className="flex items-center space-x-4">
                    <a
                      href="mailto:samuelt.oshin@gmail.com"
                      className="text-white/70 hover:text-[color:var(--accent)] transition-colors p-2"
                      aria-label="Email"
                    >
                      <Mail size={20} />
                    </a>
                    <a
                      href="https://github.com/SamuelOshin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-[color:var(--accent)] transition-colors p-2"
                      aria-label="GitHub"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href="https://linkedin.com/in/samuel-oshin-2903611a5/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-[color:var(--accent)] transition-colors p-2"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                  <a
                    href="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Samuel Oshin_Junior_Python_Backend_Developer-1758178066590.pdf"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-lg hover:border-[color:var(--accent)]/50 hover:text-[color:var(--accent)] transition-all"
                  >
                    <Download size={16} className="mr-2" />
                    Download CV
                  </a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}