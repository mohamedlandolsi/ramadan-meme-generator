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

export const metadata: Metadata = {
  title: "تم تعبئة الكرش بنجاح",
  description:
    "Generate hilarious Ramadan belly memes. مبروك الكرش! A fun meme generator for the holy month.",
  keywords: ["ramadan", "meme", "generator", "رمضان", "كرش", "تعبئة"],
  openGraph: {
    title: "تم تعبئة الكرش بنجاح 🌙",
    description: "مبروك الكرش! Generate hilarious Ramadan memes.",
    type: "website",
    locale: "ar_SA",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "تم تعبئة الكرش بنجاح 🌙",
    description: "مبروك الكرش! Generate hilarious Ramadan memes.",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
    <html lang="ar" dir="ltr" className={`${inter.variable} ${poppins.variable}`}>
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
