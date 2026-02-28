export default function Loading() {
  return (
    <div className="min-h-screen bg-[#060606] text-white noise">
      {/* Nav skeleton */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-[#060606]/80 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5">
          <div className="h-4 w-24 bg-white/[0.06] rounded animate-pulse" />
          <div className="h-8 w-20 bg-amber-500/20 rounded-md animate-pulse" />
        </div>
      </nav>

      {/* Hero skeleton */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image skeleton */}
          <div className="order-first lg:order-last">
            <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c0c0c]">
              <div className="aspect-[4/3] bg-white/[0.03] animate-pulse" />
            </div>
          </div>

          {/* Text skeleton */}
          <div className="order-last lg:order-first space-y-4">
            <div className="h-5 w-24 bg-amber-500/10 rounded-md animate-pulse" />
            <div className="h-10 w-64 bg-white/[0.06] rounded animate-pulse" />
            <div className="h-5 w-80 bg-white/[0.04] rounded animate-pulse" />
            <div className="h-4 w-full max-w-lg bg-white/[0.03] rounded animate-pulse" />
            <div className="pt-4 flex items-center gap-5">
              <div className="h-8 w-32 bg-white/[0.06] rounded animate-pulse" />
              <div className="h-12 w-36 bg-amber-500/20 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
