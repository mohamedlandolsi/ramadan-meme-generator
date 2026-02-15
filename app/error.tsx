'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#1a0b2e] px-4 text-center">
      <h2 className="mb-4 text-2xl font-bold text-[#d4af37]">Something went wrong! 😔</h2>
      <p className="mb-8 text-white/70">
        Maybe the dates were too delicious?
      </p>
      <button
        onClick={reset}
        className="rounded-xl bg-[#fbbf24] px-6 py-3 font-semibold text-[#1a0b2e] transition-transform hover:scale-105"
      >
        Try again
      </button>
    </div>
  );
}
