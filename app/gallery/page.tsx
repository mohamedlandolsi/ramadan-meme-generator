"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

/* ── Types ────────────────────────────────────────── */
interface ImageItem {
  filename: string;
  url: string;
}

interface Star {
  id: number;
  top: string;
  left: string;
  delay: string;
  size: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  /* ── Stars (client-only) ──────────────────────────── */
  useEffect(() => {
    setStars(
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
        size: `${1 + Math.random() * 2}px`,
      }))
    );
  }, []);

  /* ── Fetch images ─────────────────────────────────── */
  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("/api/images");
        if (!res.ok) throw new Error("Failed to load images");
        const data = await res.json();
        setImages(data.images);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  /* ── Modal controls ───────────────────────────────── */
  const openModal = useCallback((index: number) => setModalIndex(index), []);
  const closeModal = useCallback(() => setModalIndex(null), []);

  const goNext = useCallback(() => {
    if (modalIndex === null) return;
    setModalIndex((modalIndex + 1) % images.length);
  }, [modalIndex, images.length]);

  const goPrev = useCallback(() => {
    if (modalIndex === null) return;
    setModalIndex((modalIndex - 1 + images.length) % images.length);
  }, [modalIndex, images.length]);

  /* ── Swipe handlers ───────────────────────────────── */
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goNext();
    }
    if (isRightSwipe) {
      goPrev();
    }
  };

  /* ── Keyboard navigation ──────────────────────────── */
  useEffect(() => {
    if (modalIndex === null) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [modalIndex, closeModal, goNext, goPrev]);

  /* ── Download helper ──────────────────────────────── */
  const downloadImage = useCallback(
    (url: string) => {
      const a = document.createElement("a");
      a.href = url;
      a.download = images[modalIndex ?? 0]?.filename || "meme.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    [images, modalIndex]
  );

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8">
      {/* ── Background Stars ──────────────────────────── */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
            width: s.size,
            height: s.size,
          }}
        />
      ))}

      {/* ── Glow Orb ─────────────────────────────────── */}
      <div className="glow-orb -top-48 left-1/2 -translate-x-1/2" />

      {/* ── Crescent Moon ─────────────────────────────── */}
      <div className="absolute top-6 right-6 animate-rotate-slow opacity-50">
        <svg
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="#d4af37"
            stroke="#fbbf24"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* ── Header ────────────────────────────────────── */}
      <header className="relative z-10 mx-auto mb-12 max-w-7xl text-center">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-moon transition-all duration-200 hover:bg-white/10"
        >
          ← Back to Generator
        </Link>

        <h1
          className="mt-6 font-arabic leading-tight"
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 700,
            color: "var(--moon-white)",
            textShadow: "0 0 30px rgba(212, 175, 55, 0.4)",
          }}
        >
          🌙 Meme Gallery
        </h1>

        {!loading && !error && (
          <p className="mt-3 text-lg text-moon/70">
            Browse all {images.length} Ramadan memes
          </p>
        )}
      </header>

      {/* ── Loading Skeleton Grid ──────────────────────── */}
      {loading && (
        <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="skeleton-pulse aspect-[4/3] rounded-2xl"
            />
          ))}
        </div>
      )}

      {/* ── Error State ───────────────────────────────── */}
      {error && (
        <div className="relative z-10 mx-auto max-w-md text-center">
          <p className="text-dawn-pink text-lg" role="alert">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 cursor-pointer rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-moon transition-all duration-200 hover:bg-white/10"
          >
            Try Again
          </button>
        </div>
      )}

      {/* ── Empty State ───────────────────────────────── */}
      {!loading && !error && images.length === 0 && (
        <div className="relative z-10 mx-auto max-w-md text-center">
          <p className="text-lg text-moon/70">
            No memes available yet. Add images to{" "}
            <code className="rounded bg-white/10 px-2 py-0.5 text-sm text-star-gold">
              /public/images/
            </code>
          </p>
        </div>
      )}

      {/* ── Image Grid ────────────────────────────────── */}
      {!loading && !error && images.length > 0 && (
        <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, index) => (
            <div
              key={img.filename}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 p-3 transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
              style={{
                background: "var(--card-gradient)",
                backdropFilter: "blur(10px)",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset",
              }}
              onClick={() => openModal(index)} // Make entire card clickable
            >
              <button
                className="w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ramadan-gold"
                aria-label={`View meme ${index + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.filename}
                  className="aspect-[4/3] w-full rounded-xl object-cover shadow-[0_5px_15px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </button>

              {/* Download Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  downloadImage(img.url);
                }}
                className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-emerald-500 hover:shadow-lg active:scale-95 group-hover:opacity-100 md:opacity-0"
                aria-label="Download image"
                title="Download"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Footer Stats ──────────────────────────────── */}
      {!loading && !error && images.length > 0 && (
        <footer className="relative z-10 mx-auto mt-12 max-w-7xl text-center">
          <p className="text-sm text-moon/40">
            {images.length} memes available
          </p>
        </footer>
      )}

      {/* ── Modal Viewer ──────────────────────────────── */}
      {modalIndex !== null && images[modalIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <div className="relative mx-4 max-h-[90vh] max-w-5xl">
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 cursor-pointer text-2xl text-moon/70 transition-colors hover:text-moon"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Previous */}
            <button
              onClick={goPrev}
              className="absolute top-1/2 -left-12 hidden -translate-y-1/2 cursor-pointer text-3xl text-moon/50 transition-colors hover:text-moon md:block"
              aria-label="Previous image"
            >
              ‹
            </button>

            {/* Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[modalIndex].url}
              alt={images[modalIndex].filename}
              className="max-h-[80vh] w-auto rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            />

            {/* Next */}
            <button
              onClick={goNext}
              className="absolute top-1/2 -right-12 hidden -translate-y-1/2 cursor-pointer text-3xl text-moon/50 transition-colors hover:text-moon md:block"
              aria-label="Next image"
            >
              ›
            </button>

            {/* Bottom bar */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="truncate text-sm text-moon/60">
                {modalIndex + 1} / {images.length} —{" "}
                {images[modalIndex].filename}
              </p>
              <button
                onClick={() => downloadImage(images[modalIndex].url)}
                className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-moon transition-all duration-200 hover:bg-white/10"
              >
                Download ⬇️
              </button>
            </div>

            {/* Mobile nav arrows */}
            <div className="mt-4 flex justify-center gap-8 md:hidden">
              <button
                onClick={goPrev}
                className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-6 py-2 text-lg text-moon transition-all duration-200 hover:bg-white/10"
                aria-label="Previous image"
              >
                ‹ Prev
              </button>
              <button
                onClick={goNext}
                className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-6 py-2 text-lg text-moon transition-all duration-200 hover:bg-white/10"
                aria-label="Next image"
              >
                Next ›
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
