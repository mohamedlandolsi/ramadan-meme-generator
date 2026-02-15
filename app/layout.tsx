import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

/* IBM Plex Sans Arabic is available on Google Fonts but next/font/google
   sometimes has issues with Arabic subsets. We import it via a <link> tag
   in the head instead to guarantee reliable loading. */

import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  // Basic Meta
  title: 'Ramadan Meme Generator - تم تعبئة الكرش بنجاح',
  description: 'Generate and share hilarious Ramadan-themed memes! مولد ميمز رمضان - Free meme generator for Ramadan 2026. Share with friends instantly!',
  
  // Open Graph (Facebook, WhatsApp, LinkedIn, etc.)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ramadan-meme-generator.vercel.app/',
    siteName: 'تم تعبئة الكرش بنجاح',
    title: 'تم تعبئة الكرش بنجاح 🌙',
    description: 'Generate and share hilarious Ramadan-themed memes! مبروك الكرش - Free meme generator.',
    images: [
      {
        url: 'https://ramadan-meme-generator.vercel.app/og-image.png', // Absolute URL
        width: 1200,
        height: 630,
        alt: 'تم تعبئة الكرش بنجاح',
        type: 'image/png',
      }
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'تم تعبئة الكرش بنجاح',
    description: 'Generate hilarious Ramadan memes! تم تعبئة الكرش بنجاح',
    images: ['https://ramadan-meme-generator.vercel.app/og-image.png'],
    creator: '@ramadanmemes', 
  },
  
  // Additional
  metadataBase: new URL('https://ramadan-meme-generator.vercel.app'),
  
  // For other platforms & PWA
  manifest: "/site.webmanifest",
  
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  
  alternates: {
    canonical: "https://ramadan-meme-generator.vercel.app",
  },

  other: {
    'og:image:width': '1200',
    'og:image:height': '630',
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a0b2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* IBM Plex Sans Arabic from Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
