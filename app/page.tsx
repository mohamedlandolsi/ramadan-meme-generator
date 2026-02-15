"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";

/* ── Star type ────────────────────────────────────── */
interface Star {
  id: number;
  top: string;
  left: string;
  delay: string;
  size: string;
}

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stars, setStars] = useState<Star[]>([]);

  /* Generate stars only on the client to avoid hydration mismatch */
  useEffect(() => {
    setStars(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
        size: `${1 + Math.random() * 2}px`,
      }))
    );
  }, []);

  const generateMeme = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/random-image?t=${Date.now()}`);
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to fetch image");
      }
      const blob = await res.blob();
      // Revoke previous object URL to avoid memory leaks
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      setImageUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [imageUrl]);

  const downloadImage = useCallback(() => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `ramadan-meme-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [imageUrl]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-8 pb-32 md:pb-8">
      {/* ── Background Stars ─────────────────────────── */}
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

      {/* ── Glow Orb ────────────────────────────────── */}
      <div className="glow-orb -top-48 left-1/2 -translate-x-1/2" />

      {/* ── Crescent Moon (Top Right) ────────────────── */}
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

      {/* ── Logo ─────────────────────────────────────── */}
      <div className="relative z-10 mb-4 animate-bounce">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Ramadan Karsh Logo"
          className="h-32 w-auto drop-shadow-[0_0_25px_rgba(251,191,36,0.6)]"
        />
      </div>

      {/* ── Hero Title ───────────────────────────────── */}
      <h1
        className="relative z-10 mb-12 text-center font-arabic leading-tight md:mb-8"
        style={{
          fontSize: "clamp(2rem, 6vw, 3.5rem)",
          fontWeight: 700,
          color: "var(--moon-white)",
          textShadow: "0 0 30px rgba(212, 175, 55, 0.4)",
        }}
      >
        🌙 تم تعبئة الكرش بنجاح
      </h1>

      {/* ── CTA Button ───────────────────────────────── */}
      <button
        onClick={generateMeme}
        disabled={loading}
        aria-label="Generate a random Ramadan meme"
        className="fixed bottom-8 left-4 right-4 z-50 cursor-pointer rounded-2xl border-2 border-white/10 px-10 py-4 text-lg font-semibold text-moon shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(16,185,129,0.4)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 md:relative md:bottom-auto md:left-auto md:right-auto md:z-10 md:shadow-none"
        style={{
          background: loading
            ? "linear-gradient(90deg, #10b981 0%, #34d399 50%, #10b981 100%)"
            : "var(--button-gradient)",
          backgroundSize: loading ? "200% auto" : "100% auto",
          animation: loading ? "shimmer 1.5s ease-in-out infinite" : "none",
        }}
      >
        {loading ? "Generating..." : "Generate Meme 🎲"}
      </button>

      {/* ── Gallery Link ──────────────────────────────── */}
      <Link
        href="/gallery"
        className="relative z-10 mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-moon/80 transition-all duration-200 hover:bg-white/10 hover:text-moon md:mt-6"
      >
        Browse Gallery 📚
      </Link>

      {/* ── Error Message ────────────────────────────── */}
      {error && (
        <p className="relative z-10 mt-4 text-sm text-dawn-pink" role="alert">
          {error}
        </p>
      )}

      {/* ── Image Card ───────────────────────────────── */}
      {imageUrl && (
        <div
          className="relative z-10 mt-8 w-full max-w-2xl animate-fade-in rounded-3xl border border-white/10 p-4 md:p-6"
          style={{
            background: "var(--card-gradient)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Random Ramadan meme"
            className="w-full rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          />

          {/* ── Action Buttons ─────────────────────── */}
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <ShareButton
              imageUrl={imageUrl}
              imageName="ramadan-meme"
              variant="default"
              className="flex-1 md:flex-none"
            />
            <button
              onClick={downloadImage}
              className="flex-1 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-moon shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] md:flex-none"
              aria-label="Download this meme"
            >
              Download ⬇️
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
