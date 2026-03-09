'use client'

import { useState } from 'react'
import { X, Loader2, ShieldCheck } from 'lucide-react'

interface CheckoutModalProps {
  productSlug: string
  productName: string
  price: string
  onClose: () => void
}

export function CheckoutModal({ productSlug, productName, price, onClose }: CheckoutModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productSlug, name, email, mobile }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setLoading(false)
        return
      }

      // Redirect to Mayar payment page
      window.location.href = data.paymentUrl
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-[#0c0c0c] border border-white/[0.08] rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight mb-1">Checkout</h2>
            <p className="text-[13px] text-white/30">{productName}</p>
            <p className="text-lg font-bold text-amber-400 mt-2">{price}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-white/40 mb-1.5">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-lg text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-white/40 mb-1.5">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-lg text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-white/40 mb-1.5">
                Phone <span className="text-white/20">(optional)</span>
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-lg text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors"
              />
            </div>

            {error && (
              <p className="text-red-400 text-[13px]">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 text-black font-bold rounded-xl text-[15px] transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Continue to Payment'
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-white/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Secure payment powered by Mayar
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
