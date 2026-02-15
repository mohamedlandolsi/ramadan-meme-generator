import { Metadata } from 'next';
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: 'تم تعبئة الكرش بنجاح',
  description: 'Create and share hilarious Ramadan-themed memes instantly!',
  openGraph: {
    title: 'تم تعبئة الكرش بنجاح 🌙',
    description: 'مبروك تعبئة الكرش بنجاح! Generate hilarious Ramadan memes',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ramadan Meme Generator',
      }
    ],
  },
};

export default function Home() {
  return <HomeClient />;
}
