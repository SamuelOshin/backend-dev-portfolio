import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Navigation } from "./components/Navigation";
import { Analytics } from "@vercel/analytics/next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://samueloshin.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: "vGt07LDFWrD3BzBrHtktoJLFo_8Npwidwqe-xy_H4Lk",
  },
  title: {
    default: "Samuel Oshin — Python Backend Engineer | AI/LLM Infrastructure",
    template: "%s — Samuel Oshin",
  },
  description:
    "Award-winning Python Backend Engineer specializing in RAG pipelines, distributed systems, and AI-powered backends. 2× HNG Finalist, Top 1-5% of 10,000+ developers.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Samuel Oshin",
    title: "Samuel Oshin — Python Backend Engineer",
    description:
      "Award-winning Python Backend Engineer specializing in RAG pipelines, distributed systems, and AI-powered backends.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Oshin — Python Backend Engineer",
    description:
      "Award-winning Python Backend Engineer specializing in RAG pipelines, distributed systems, and AI-powered backends.",
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
        <Navigation />
        {children}
        <Analytics />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}