'use client'

import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

interface StickyBuyBarProps {
  productName: string
  price: string
  promoPrice?: string
  buyUrl: string
}

function ensureUrl(url: string): string {
  if (!url) return '#'
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `https://${url}`
}

export function StickyBuyBar({ productName, price, promoPrice, buyUrl }: StickyBuyBarProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const target = document.getElementById('hero-buy')
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden backdrop-blur-xl bg-[#060606]/95 border-t border-white/[0.08] transition-transform duration-300 ease-out ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 safe-area-pb">
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-white truncate">{productName}</p>
          <div className="flex items-center gap-2">
            {promoPrice && (
              <span className="text-[12px] text-white/25 line-through">{promoPrice}</span>
            )}
            <span className={`text-[14px] font-bold ${promoPrice ? 'text-red-400' : 'text-amber-400'}`}>
              {price}
            </span>
          </div>
        </div>
        <a
          href={ensureUrl(buyUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-3 min-h-[44px] bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg text-[13px] shadow-[0_0_20px_-5px_rgba(245,158,11,0.4)] transition-all"
        >
          Beli Sekarang <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )
}
