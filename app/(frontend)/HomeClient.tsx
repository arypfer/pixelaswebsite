'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedBackground from '@/components/ui/background-animated'
import { Search, X, ArrowRight, Sparkles, TrendingUp } from 'lucide-react'

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

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
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
                className="flex-1 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
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

      {/* Animated Background */}
      <AnimatedBackground />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 sm:py-6 border-b border-white/10 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4 max-w-6xl mx-auto">
          <Link
            className="text-xs sm:text-sm font-medium tracking-wider text-white/60 hover:text-white transition-colors flex-shrink-0"
            href="/"
          >
            AMLOLIFE
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
            />
          </div>

          <button
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-white transition-all"
            onClick={() => window.open('mailto:amlolife.contact@gmail.com', '_self')}
          >
            Contact
          </button>
        </div>
      </header>

      {/* Featured Hero Spotlight */}
      {featuredProducts.length > 0 && !searchQuery && selectedCategory === 'All' && (
        <div className="relative z-10 pt-28 sm:pt-32 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-2">Featured</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-orange-400/50 bg-gradient-to-br from-orange-950/40 via-black/60 to-black/80 p-6 sm:p-8 transition-all duration-500 hover:border-orange-400/80 hover:shadow-2xl hover:shadow-orange-500/20"
                >
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    {product.coverImage && (
                      <div className="relative w-full sm:w-48 h-40 sm:h-48 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={product.coverImage.url}
                          alt={product.coverImage.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 200px"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {product.badge || 'Featured'}
                        </span>
                        <span className="text-xs text-white/40">{product.category}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                      <p className="text-white/60 text-sm mb-3">{product.tagline}</p>
                      <p className="text-white/40 text-sm mb-4 line-clamp-2">{product.shortDescription}</p>
                      <div className="flex items-center justify-between">
                        {product.price > 0 && (
                          <span className="text-white font-semibold">{formatPrice(product.price)}</span>
                        )}
                        <span className="text-sm text-orange-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Explore <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className={`relative z-10 px-4 pb-20 ${featuredProducts.length > 0 && !searchQuery && selectedCategory === 'All' ? 'pt-12' : 'pt-28 sm:pt-32'}`}>
        <div className="w-full max-w-6xl mx-auto">
          {/* Section title */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-white/50 uppercase tracking-widest">All Products</h2>
          </div>

          {/* Category Filters */}
          <div className="flex justify-start gap-2 mb-8 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-white text-black shadow-lg shadow-white/20'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Results Count */}
          {(searchQuery || selectedCategory !== 'All') && (
            <div className="mb-6">
              <p className="text-white/60 text-sm">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                {searchQuery && ` matching "${searchQuery}"`}
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </p>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                    <Search className="w-10 h-10 text-white/20" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
                  <p className="text-white/40 text-base mb-6">
                    {searchQuery
                      ? `We couldn't find any products matching "${searchQuery}"`
                      : `No products in ${selectedCategory}`}
                  </p>
                </div>
                <div className="flex justify-center gap-3">
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-all"
                    >
                      Clear Search
                    </button>
                  )}
                  {selectedCategory !== 'All' && (
                    <button
                      onClick={() => setSelectedCategory('All')}
                      className="px-6 py-2.5 bg-white text-black hover:bg-gray-200 rounded-lg text-sm font-semibold transition-all"
                    >
                      View All Products
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">AMLOLIFE</h3>
              <p className="text-sm text-white/60 leading-relaxed max-w-xl">
                Professional AI-powered tools for creative professionals. One-time payment, lifetime access.
              </p>
            </div>
            <button
              onClick={() => window.open('mailto:amlolife.contact@gmail.com', '_self')}
              className="px-5 py-3 rounded-xl border border-white/20 bg-white/10 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              Contact Us
            </button>
          </div>
          <div className="mt-10 pt-8 border-t border-white/10 text-sm text-white/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>&copy; 2024 Amlolife. All rights reserved.</p>
            <span>amlolife.contact@gmail.com</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group relative isolation overflow-hidden rounded-2xl border backdrop-blur-xl bg-gradient-to-br from-white/12 via-black/40 to-black/70 flex flex-col h-full transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 ${
        product.featured
          ? 'border-orange-400/70 ring-2 ring-orange-400/40 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50'
          : 'border-white/20 ring-1 ring-inset ring-white/12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] hover:border-white/50 hover:ring-white/30 hover:shadow-[0_25px_60px_-15px_rgba(255,255,255,0.15)]'
      }`}
    >
      {/* Background Image */}
      {product.coverImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={product.coverImage.url}
            alt={product.coverImage.alt}
            fill
            className="object-cover opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 120% 100% at top right, transparent 0%, transparent 25%, black 75%)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/98 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Badges */}
        <div className="flex items-start justify-between mb-4 gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 group-hover:bg-white/15 transition-all">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] font-semibold text-white/90 uppercase tracking-wider">{product.category}</span>
          </div>
          {product.badge && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-lg shadow-orange-500/50 border border-orange-400/50">
              <Sparkles className="w-3 h-3 text-white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wide">{product.badge}</span>
            </div>
          )}
        </div>

        {/* Title & Tagline */}
        <div className="mb-3">
          <h3 className="text-white font-bold text-xl mb-2 line-clamp-2 drop-shadow-lg tracking-tight leading-tight">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          </div>
          <p className="text-gray-300 text-xs font-medium opacity-90 group-hover:opacity-100 transition-opacity line-clamp-1">
            {product.tagline}
          </p>
        </div>

        {/* Short Description */}
        <div className="flex-grow overflow-hidden mb-4">
          <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
            {product.shortDescription}
          </p>
        </div>

        {/* Price */}
        {product.price > 0 && (
          <div className="mb-4">
            <span className="text-white font-bold text-lg">{formatPrice(product.price)}</span>
            {product.priceLabel && (
              <span className="text-white/40 text-xs ml-2">{product.priceLabel}</span>
            )}
          </div>
        )}

        {/* Trust Indicators */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <div className="p-1 bg-green-500/20 rounded">
              <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-[11px] text-gray-400 font-medium">Lifetime Access</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3 text-blue-400" />
            <span className="text-[11px] text-gray-400 font-medium">Pro Quality</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto space-y-2">
          <span
            className={`w-full px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
              product.featured
                ? 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg shadow-orange-500/30'
                : 'bg-white text-black hover:bg-gray-100 shadow-lg shadow-white/10'
            }`}
          >
            Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="flex items-center justify-center gap-2 text-[11px] text-white/50">
            <span>&bull;</span>
            <span>One-time payment</span>
            <span>&bull;</span>
            <span>Instant download</span>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Link>
  )
}
