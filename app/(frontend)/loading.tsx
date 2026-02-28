export default function Loading() {
  return (
    <div className="relative w-full min-h-screen noise">
      {/* Header skeleton */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#060606]/80 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-6 py-4 px-4 sm:px-6">
          <div className="h-4 w-16 bg-white/[0.06] rounded animate-pulse" />
          <div className="flex-1 max-w-md h-9 bg-white/[0.04] rounded-lg animate-pulse" />
          <div className="h-9 w-20 bg-white/[0.04] rounded-lg animate-pulse" />
        </div>
      </header>

      {/* Hero skeleton */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-8 sm:pb-12">
        <div className="max-w-2xl space-y-4">
          <div className="h-3 w-40 bg-white/[0.04] rounded animate-pulse" />
          <div className="h-10 w-72 bg-white/[0.06] rounded animate-pulse" />
          <div className="h-4 w-96 bg-white/[0.03] rounded animate-pulse" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-xl bg-[#0c0c0c] border border-white/[0.07] overflow-hidden">
              <div className="aspect-[16/10] bg-white/[0.03] animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-24 bg-white/[0.04] rounded animate-pulse" />
                <div className="h-4 w-40 bg-white/[0.06] rounded animate-pulse" />
                <div className="h-3 w-full bg-white/[0.03] rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
