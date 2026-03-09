import Link from 'next/link'
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import { PixelasLogo } from '@/components/PixelasLogo'

export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>
}) {
  const { product } = await searchParams

  return (
    <div className="min-h-screen bg-[#060606] text-white noise flex flex-col">
      <nav className="border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex items-center px-4 sm:px-6 py-3 sm:py-3.5">
          <Link href="/" className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
            <PixelasLogo size={18} />
            <span className="font-bold text-sm">Pixelas</span>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Thank you for your purchase!
          </h1>
          <p className="text-white/40 text-[15px] leading-relaxed mb-8">
            Your payment has been received. Check your email for the download link and receipt.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {product && (
              <Link
                href={`/products/${product}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-colors"
              >
                Back to Product <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/[0.08] hover:border-white/[0.15] text-white/60 hover:text-white rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
