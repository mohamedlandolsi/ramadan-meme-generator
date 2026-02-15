import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#1a0b2e] px-4 text-center text-white">
      <h1 className="font-arabic mb-4 text-6xl font-bold text-[#d4af37]">404</h1>
      <h2 className="mb-8 text-2xl font-semibold">Page Not Found 🌙</h2>
      <p className="mb-12 text-lg text-white/70 max-w-md">
        Looks like this page is observing a strict fast. It's not here!
      </p>
      <Link
        href="/"
        className="rounded-xl bg-[#fbbf24] px-8 py-4 font-bold text-[#1a0b2e] shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
      >
        Return Home 🏠
      </Link>
    </div>
  );
}
