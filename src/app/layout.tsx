import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Navigation } from "./components/Navigation";
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://samueloshin.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.ico",
    apple: "/icon.svg",
  },
  verification: {
    google: "vGt07LDFWrD3BzBrHtktoJLFo_8Npwidwqe-xy_H4Lk",
  },
  title: {
    default: "Samuel Oshin | AI Backend Engineer — LLM Systems, RAG & Agents",
    template: "%s | Samuel Oshin",
  },
  description:
    "AI Backend Engineer building production LLM systems: hybrid RAG with pgvector and full-text search, prefix-cached generation at 80% lower cost, and agents on top of distributed Python backends. Sole backend engineer on a live generative AI platform.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Samuel Oshin",
    title: "Samuel Oshin | AI Backend Engineer",
    description:
      "Production LLM systems: hybrid RAG, cached generation, agents, and the distributed backends underneath them.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Oshin | AI Backend Engineer",
    description:
      "Production LLM systems: hybrid RAG, cached generation, agents, and the distributed backends underneath them.",
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Samuel Oshin",
  jobTitle: "AI Backend Engineer",
  url: SITE_URL,
  email: "mailto:samuelt.oshin@gmail.com",
  sameAs: ["https://github.com/SamuelOshin", "https://linkedin.com/in/samuel-oshin-2903611a5/"],
  knowsAbout: ["Large Language Models", "Retrieval-Augmented Generation", "AI Agents", "Python", "FastAPI", "Distributed Systems"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${geist.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground ">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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
        <Navigation />
        {children}
        <Analytics />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}