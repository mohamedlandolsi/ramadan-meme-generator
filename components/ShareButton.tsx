"use client";

import { useState } from "react";

interface ShareButtonProps {
  imageUrl: string;
  imageName?: string;
  variant?: "default" | "icon-only";
  className?: string;
}

export default function ShareButton({
  imageUrl,
  imageName = "ramadan-meme",
  variant = "default",
  className = "",
}: ShareButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const showDesktopOptions = () => {
    setShowModal(true);
  };

  const handleShare = async () => {
    try {
      // Fetch the image as blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], `${imageName}.png`, { type: blob.type });

      // Check if Web Share API is available and can share files
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          title: "Ramadan Meme - تم تعبئة الكرش بنجاح",
          text: "Check out this Ramadan meme! 🌙 مبروك الكرش",
          url: window.location.href,
          files: [file],
        });

        showToastMessage("Shared successfully! ✓");
      } else {
        // Fallback to desktop options
        showDesktopOptions();
      }
    } catch (error: any) {
      // User cancelled or error occurred
      if (error.name !== "AbortError") {
        console.error("Share failed:", error);
        showDesktopOptions(); // Show desktop options as fallback
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowModal(false);
    showToastMessage("Link copied to clipboard! ✓");
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `${imageName}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setShowModal(false);
    showToastMessage("Image downloaded! ✓");
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      "Check out this Ramadan meme! 🌙 " + window.location.href
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
    setShowModal(false);
  };

  const handleTwitter = () => {
    const text = encodeURIComponent("Check out this Ramadan meme! 🌙 #Ramadan");
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank"
    );
    setShowModal(false);
  };

  return (
    <>
      {/* ── Main Button ───────────────────────────────── */}
      {variant === "icon-only" ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleShare();
          }}
          className={`group/share flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-twilight-purple hover:shadow-lg active:scale-95 ${className}`}
          aria-label="Share meme"
          title="Share"
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
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
        </button>
      ) : (
        <button
          onClick={handleShare}
          className={`flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-moon-white shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] ${className}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          Share
        </button>
      )}

      {/* ── Desktop Options Modal ─────────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-md scale-100 rounded-2xl border border-white/10 bg-[#1a0b2e]/90 p-8 shadow-2xl backdrop-blur-xl transition-all"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(145deg, rgba(26,11,46,0.95), rgba(45,27,78,0.95))",
            }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-moon-white">
                Share Meme 🌙
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-moon-white/50 hover:text-moon-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleCopyLink}
                className="flex w-full items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-left text-moon-white transition-all hover:bg-white/10 hover:pl-5"
              >
                🔗 Copy Link
              </button>

              <button
                onClick={handleDownload}
                className="flex w-full items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-left text-moon-white transition-all hover:bg-white/10 hover:pl-5"
              >
                💾 Download Image
              </button>

              <button
                onClick={handleWhatsApp}
                className="flex w-full items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-left text-moon-white transition-all hover:bg-white/10 hover:pl-5"
              >
                💬 Share on WhatsApp
              </button>

              <button
                onClick={handleTwitter}
                className="flex w-full items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-left text-moon-white transition-all hover:bg-white/10 hover:pl-5"
              >
                🐦 Share on Twitter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast Notification ────────────────────────── */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 z-[110] -translate-x-1/2 animate-slide-up">
          <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-[#1a0b2e]/90 px-6 py-3 shadow-[0_0_30px_rgba(16,185,129,0.2)] backdrop-blur-md">
            <span className="text-emerald-400">✓</span>
            <p className="font-medium text-moon-white">{toastMessage}</p>
          </div>
        </div>
      )}
    </>
  );
}
