import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Backend Developer Portfolio",
  description: "Modern, performance-focused backend engineering portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {/* Header Navigation */}
        <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur bg-background/70">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 h-14 flex items-center justify-between">
            <a href="/" className="text-sm font-semibold tracking-tight text-white/90">
              Samuel Oshin
            </a>
            <nav className="flex items-center gap-4 text-white/70">
              <a
                href="mailto:samuelt.oshin@gmail.com"
                className="hover:text-[color:var(--accent)] transition-colors text-sm"
              >
                Email
              </a>
              <a
                href="https://github.com/SamuelOshin"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--accent)] transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/samuel-oshin-2903611a5/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--accent)] transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Samuel Oshin_Junior_Python_Backend_Developer-1758178066590.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/10 px-3 py-1.5 text-sm hover:border-[color:var(--accent)]/50 hover:text-[color:var(--accent)]"
              >
                Download CV
              </a>
            </nav>
          </div>
        </header>
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}