'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { CheckoutModal } from './CheckoutModal'

interface BuyButtonProps {
  productSlug: string
  productName: string
  price: string
  label?: string
  primary?: boolean
  size?: 'default' | 'large'
  className?: string
}

export function BuyButton({
  productSlug,
  productName,
  price,
  label = 'Buy Now',
  primary = true,
  size = 'default',
  className = '',
}: BuyButtonProps) {
  const [showCheckout, setShowCheckout] = useState(false)

  const baseStyles = size === 'large'
    ? 'px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg'
    : 'px-6 py-3 text-[14px]'

  const colorStyles = primary
    ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_-5px_rgba(245,158,11,0.5)]'
    : 'bg-[#0c0c0c] hover:bg-white/[0.06] text-white border border-white/[0.07] hover:border-white/[0.15]'

  return (
    <>
      <button
        onClick={() => setShowCheckout(true)}
        className={`inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all ${baseStyles} ${colorStyles} ${className}`}
      >
        {label} {primary && <ArrowRight className="w-4 h-4" />}
      </button>

      {showCheckout && (
        <CheckoutModal
          productSlug={productSlug}
          productName={productName}
          price={price}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </>
  )
}
