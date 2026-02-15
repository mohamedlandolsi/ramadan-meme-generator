import { Metadata } from "next";
import GalleryClient from "@/components/GalleryClient";

export const metadata: Metadata = {
  title: 'تم تعبئة الكرش بنجاح Gallery',
  description: 'Browse our collection of hilarious Ramadan memes',
  openGraph: {
    title: 'Ramadan Meme Gallery 📚',
    description: 'Browse all Ramadan memes - تم تعبئة الكرش بنجاح',
    images: ['/og-gallery.png'],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
