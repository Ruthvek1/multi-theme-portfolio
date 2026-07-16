import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Space_Mono } from "next/font/google";
import { PortfolioProvider } from "@/core/PortfolioContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

import personal from "@/data/personal.json";
import socials from "@/data/socials.json";

export const metadata: Metadata = {
  title: `${personal.name} | ${personal.title}`,
  description: personal.bio,
  keywords: ["portfolio", "developer", "creative", personal.name, "React", "Next.js"],
  authors: [{ name: personal.name }],
  creator: personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ruthvekkannan.com",
    title: `${personal.name} | ${personal.title}`,
    description: personal.bio,
    siteName: `${personal.name} Portfolio`,
    images: [
      {
        url: personal.avatarUrl.startsWith('http') ? personal.avatarUrl : `https://ruthvekkannan.com${personal.avatarUrl}`,
        width: 1200,
        height: 630,
        alt: personal.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} | ${personal.title}`,
    description: personal.bio,
    images: [personal.avatarUrl.startsWith('http') ? personal.avatarUrl : `https://ruthvekkannan.com${personal.avatarUrl}`],
    creator: "@janedoe", // We don't have a twitter handle in personal.json so placeholder
  },
};

import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.title,
    description: personal.bio,
    url: "https://ruthvekkannan.com",
    image: personal.avatarUrl.startsWith('http') ? personal.avatarUrl : `https://ruthvekkannan.com${personal.avatarUrl}`,
    sameAs: Object.values(socials)
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
        <Analytics />
      </body>
    </html>
  );
}
