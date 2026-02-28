'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, X, ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react'
import { PixelasLogo } from '@/components/PixelasLogo'

interface Product {
  id: string | number
  name: string
  slug: string
  tagline: string
  shortDescription: string
  category: string
  price: number
  priceLabel: string
  buyUrl: string
  coverImage: { url: string; alt: string } | null
  badge: string | null
  featured: boolean
  order: number
}

const categories = ['All', 'Standalone Apps', 'Photoshop Plugins', 'AI Tools']

function formatPrice(price: number): string {
  if (!price) return ''
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
}

export function HomeClient({ products }: { products: Product[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showTikTokMessage, setShowTikTokMessage] = useState(false)

  useEffect(() => {
    if (/TikTok/i.test(navigator.userAgent)) {
      setShowTikTokMessage(true)
    }
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredProducts = products.filter((p) => p.featured)
  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = cat === 'All' ? products.length : products.filter((p) => p.category === cat).length
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="relative w-full min-h-screen noise">
      {/* TikTok Browser Warning */}
      {showTikTokMessage && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Open in Browser</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              You&apos;re viewing this in TikTok&apos;s browser. For the best experience, please copy this link and open it in Chrome or Safari:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <p className="text-sm font-mono text-gray-800 break-all select-all">
                {typeof window !== 'undefined' ? window.location.href : 'pixelas.store'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : 'pixelas.store')}
                className="flex-1 px-4 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-colors"
              >
                Copy Link
              </button>
              <button
                onClick={() => setShowTikTokMessage(false)}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════ HEADER ═══════════════════ */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#060606]/80 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 sm:gap-6 py-3 sm:py-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <PixelasLogo size={22} />
            <span className="text-[15px] font-bold text-white tracking-tight">Pixelas</span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-8 py-2 text-[13px] bg-white/[0.05] border border-white/[0.08] rounded-lg text-white placeholder:text-white/25 focus:outline-none focus:border-amber-500/40 focus:bg-white/[0.07] transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            className="px-3 sm:px-4 py-2 text-[12px] sm:text-[13px] font-medium text-white/60 hover:text-white border border-white/[0.08] hover:border-white/[0.15] rounded-lg transition-all flex-shrink-0"
            onClick={() => window.open('mailto:amlolife.contact@gmail.com', '_self')}
          >
            Contact
          </button>
        </div>
      </header>

      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="relative ambient-glow">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-32 pb-16 sm:pb-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-4 sm:mb-6">
              Pixelas Store<br />
              <span className="font-display text-white/25">by Amlolife</span>
            </h1>
            <p className="text-base sm:text-xl font-light text-white/35 leading-relaxed max-w-lg mb-10 sm:mb-14">
              Professional AI-powered plugins and standalone apps for photographers, designers, and digital artists.
            </p>
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-[15px] shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_-5px_rgba(245,158,11,0.5)] transition-all"
            >
              Browse Products <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="flex justify-center pb-8 sm:pb-10">
          <ChevronDown className="w-5 h-5 text-white/15 animate-bounce-subtle" />
        </div>
      </section>

      {/* ═══════════════════ FEATURED ═══════════════════ */}
      {featuredProducts.length > 0 && !searchQuery && selectedCategory === 'All' && (
        <section className="px-4 sm:px-6 pb-16 sm:pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12 sm:mb-16">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold">Featured</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent" />
            </div>

            {featuredProducts.length === 1 ? (
              <Link href={`/products/${featuredProducts[0].slug}`} className="group block">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 group-hover:text-white/90 transition-colors">{featuredProducts[0].name}</h3>
                    <p className="text-base sm:text-lg font-light text-white/35 mb-3 leading-relaxed">{featuredProducts[0].tagline}</p>
                    <p className="text-sm text-white/25 line-clamp-2 mb-8 max-w-lg leading-relaxed">{featuredProducts[0].shortDescription}</p>
                    <div className="flex items-center gap-6">
                      {featuredProducts[0].price > 0 && (
                        <span className="text-xl font-bold text-white">{formatPrice(featuredProducts[0].price)}</span>
                      )}
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-black text-sm font-bold rounded-lg group-hover:bg-amber-400 transition-colors">
                        View Product <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  {featuredProducts[0].coverImage && (
                    <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.06] group-hover:border-white/[0.1] transition-colors">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={featuredProducts[0].coverImage.url}
                          alt={featuredProducts[0].coverImage.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {featuredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group block"
                  >
                    {product.coverImage && (
                      <div className="rounded-xl overflow-hidden border border-white/[0.06] group-hover:border-white/[0.1] transition-colors mb-5">
                        <div className="relative aspect-[16/9]">
                          <Image
                            src={product.coverImage.url}
                            alt={product.coverImage.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </div>
                    )}
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-white/80 transition-colors">{product.name}</h3>
                    <p className="text-sm font-light text-white/35 mb-4 leading-relaxed">{product.tagline}</p>
                    <div className="flex items-center gap-5">
                      {product.price > 0 && (
                        <span className="text-base font-bold text-white">{formatPrice(product.price)}</span>
                      )}
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-black text-[13px] font-bold rounded-lg group-hover:bg-amber-400 transition-colors">
                        View Product <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════════ PRODUCTS GRID ═══════════════════ */}
      <section id="products" className={`px-4 sm:px-6 pb-16 sm:pb-24 ${featuredProducts.length > 0 && !searchQuery && selectedCategory === 'All' ? '' : 'pt-4'}`}>
        <div className="max-w-6xl mx-auto">
          {/* Section header + filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold">All Products</span>
              <div className="w-12 h-px bg-white/[0.08]" />
            </div>

            <div className="flex gap-1.5 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-md text-[12px] font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-white text-black'
                      : 'text-white/35 hover:text-white/70 hover:bg-white/[0.05]'
                  }`}
                >
                  {category}
                  {categoryCounts[category] > 0 && (
                    <span className={`ml-1.5 text-[10px] ${selectedCategory === category ? 'text-black/50' : 'text-white/20'}`}>
                      {categoryCounts[category]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results Count */}
          {(searchQuery || selectedCategory !== 'All') && (
            <p className="text-white/35 text-sm mb-6">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              {searchQuery && <> matching &ldquo;{searchQuery}&rdquo;</>}
              {selectedCategory !== 'All' && <> in {selectedCategory}</>}
            </p>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))
            ) : (
              <div className="col-span-full">
                <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-16 text-center">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-white/[0.05] flex items-center justify-center">
                    <Search className="w-6 h-6 text-white/20" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No products found</h3>
                  <p className="text-white/35 text-sm mb-8 max-w-sm mx-auto">
                    {searchQuery
                      ? `No results for "${searchQuery}"`
                      : `Nothing in ${selectedCategory} yet`}
                  </p>
                  <div className="flex justify-center gap-3">
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="px-5 py-2 text-[13px] font-medium text-white/60 border border-white/[0.1] hover:border-white/[0.2] rounded-lg transition-all">
                        Clear search
                      </button>
                    )}
                    {selectedCategory !== 'All' && (
                      <button onClick={() => setSelectedCategory('All')} className="px-5 py-2 text-[13px] font-medium bg-white text-black rounded-lg hover:bg-white/90 transition-all">
                        View all
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Quick links */}
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[11px] uppercase tracking-[0.2em] text-amber-400/40 font-semibold">Browse</span>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/10 to-transparent" />
          </div>
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.filter(c => c !== 'All').map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-4 py-2 text-[13px] font-medium text-white/30 hover:text-white/60 border border-white/[0.06] hover:border-white/[0.12] rounded-lg transition-all"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <PixelasLogo size={24} />
                <span className="text-sm font-bold text-white">Pixelas</span>
              </div>
              <p className="text-sm text-white/40 max-w-sm leading-relaxed">
                Professional AI-powered tools for creative professionals.<br />One-time payment, lifetime access.
              </p>
            </div>
            <div className="text-right">
              <a href="mailto:amlolife.contact@gmail.com" className="text-[13px] text-white/30 hover:text-amber-400/80 transition-colors">
                amlolife.contact@gmail.com
              </a>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-white/[0.04] flex items-center justify-between">
            <p className="text-[11px] text-white/15">&copy; {new Date().getFullYear()} Pixelas</p>
            <p className="text-[11px] text-white/15">Jakarta, Indonesia</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ─────────────────── PRODUCT CARD ─────────────────── */

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group scroll-reveal block rounded-xl overflow-hidden bg-[#0c0c0c] border border-transparent hover:border-white/[0.06] transition-all duration-300"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      {product.coverImage ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0a0a]">
          <Image
            src={product.coverImage.url}
            alt={product.coverImage.alt}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-[#0a0a0a] flex items-center justify-center">
          <span className="text-white/10 text-2xl font-bold">{product.name[0]}</span>
        </div>
      )}

      {/* Content */}
      <div className="p-5 sm:p-6">
        <h3 className="text-base font-bold text-white mb-1.5 line-clamp-1 group-hover:text-white/80 transition-colors">
          {product.name}
        </h3>
        <p className="text-[13px] font-light text-white/30 line-clamp-2 mb-5 leading-relaxed">{product.tagline}</p>

        <div className="flex items-center justify-between">
          {product.price > 0 ? (
            <span className="text-[15px] font-bold text-white">{formatPrice(product.price)}</span>
          ) : (
            <span className="text-[13px] text-white/25 font-light">Free</span>
          )}
          <span className="flex items-center gap-1 px-2.5 py-1 text-[12px] font-medium text-white/25 border border-transparent group-hover:border-white/[0.1] group-hover:text-white/50 rounded-md transition-all duration-300">
            View <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
