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
  title: {
    default: "تم تعبئة الكرش بنجاح",
    template: "%s | تم تعبئة الكرش بنجاح",
  },
  description:
    "Generate and share hilarious Ramadan-themed memes. مولد ميمز رمضان - تم تعبئة الكرش بنجاح. Free meme generator for Ramadan 2026.",
  keywords: [
    "Ramadan",
    "Ramadan memes",
    "تم تعبئة الكرش بنجاح",
    "Ramadan 2026",
    "Islamic memes",
    "مبروك الكرش",
    "Ramadan Kareem",
    "رمضان كريم",
    "meme generator",
    "funny Ramadan",
    "halal memes",
  ],
  authors: [{ name: "Ramadan Meme Generator" }],
  creator: "Ramadan Meme Generator",
  publisher: "Ramadan Meme Generator",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_AR", "fr_FR"],
    url: "https://ramadan-meme-generator.vercel.app",
    siteName: "Ramadan Meme Generator",
    title: "Ramadan Meme Generator - تم تعبئة الكرش بنجاح",
    description: "Generate and share hilarious Ramadan-themed memes instantly!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ramadan Meme Generator",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Ramadan Meme Generator - تم تعبئة الكرش بنجاح",
    description: "Generate and share hilarious Ramadan-themed memes instantly!",
    images: ["/twitter-image.png"],
    creator: "@ramadanmemes",
  },

  // Additional
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

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: "https://ramadan-meme-generator.vercel.app",
  },

  other: {
    "theme-color": "#1a0b2e", // midnight-purple
    "color-scheme": "dark",
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
