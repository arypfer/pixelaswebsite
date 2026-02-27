import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-white/50 mb-8">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to products
        </Link>
      </div>
    </div>
  )
}
