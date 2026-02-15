import { Metadata } from 'next';
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Ramadan Meme Generator - تم تعبئة الكرش بنجاح 🌙",
  description: "Generate hilarious Ramadan memes instantly. مبروك الكرش! The best meme generator for Ramadan 2026. Free, fast, and fun.",
  openGraph: {
    title: "Ramadan Meme Generator - تم تعبئة الكرش بنجاح 🌙",
    description: "Generate hilarious Ramadan memes instantly. مبروك الكرش!",
    url: "https://ramadan-meme-generator.vercel.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ramadan Meme Generator Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramadan Meme Generator - تم تعبئة الكرش بنجاح 🌙",
    description: "Generate hilarious Ramadan memes instantly. مبروك الكرش!",
    images: ["/twitter-image.png"],
  },
};

export default function Home() {
  return <HomeClient />;
}
