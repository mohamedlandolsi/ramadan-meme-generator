export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a0b2e]">
      <div className="relative">
        <div className="h-24 w-24 animate-spin rounded-full border-4 border-white/10 border-t-[#d4af37]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl animate-pulse">
          🌙
        </div>
      </div>
    </div>
  );
}
