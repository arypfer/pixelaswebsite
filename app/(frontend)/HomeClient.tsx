'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, X, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

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
    <div className="relative w-full min-h-screen bg-[#0a0a0a] overflow-hidden">
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

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 py-4 px-6">
          <Link href="/" className="text-lg font-bold text-white flex-shrink-0">
            Pixelas
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:border-white/[0.15] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            className="px-4 py-2 text-sm bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-xl text-white transition-all flex-shrink-0"
            onClick={() => window.open('mailto:amlolife.contact@gmail.com', '_self')}
          >
            Contact
          </button>
        </div>
      </header>

      {/* Featured Section */}
      {featuredProducts.length > 0 && !searchQuery && selectedCategory === 'All' && (
        <section className="pt-12 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Section Label */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs uppercase tracking-widest text-white/[0.3]">Featured</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            {/* Featured Cards */}
            <div className={featuredProducts.length === 1 ? 'grid grid-cols-1 gap-6' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}>
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden shadow-[0_0_80px_-20px_rgba(249,115,22,0.15)] transition-all duration-300 hover:border-white/[0.12] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Cover Image */}
                    {product.coverImage && (
                      <div className="relative w-full sm:w-56 h-48 sm:h-auto flex-shrink-0">
                        <Image
                          src={product.coverImage.url}
                          alt={product.coverImage.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 224px"
                        />
                        {/* Bottom gradient fade (mobile) */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent sm:hidden" />
                        {/* Right gradient fade (desktop) */}
                        <div className="hidden sm:block absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-l from-[#0a0a0a]/80 to-transparent" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="featured">{product.badge || 'Featured'}</Badge>
                        <span className="text-xs text-white/40">{product.category}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{product.name}</h3>
                      <p className="text-base sm:text-lg text-white/60 mb-2">{product.tagline}</p>
                      <p className="text-sm text-white/40 line-clamp-2 mb-6">{product.shortDescription}</p>
                      <div className="flex items-center justify-between mt-auto">
                        {product.price > 0 && (
                          <span className="text-lg font-semibold text-white">{formatPrice(product.price)}</span>
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
        </section>
      )}

      {/* Products Section */}
      <div className={`px-6 pb-20 ${featuredProducts.length > 0 && !searchQuery && selectedCategory === 'All' ? 'pt-16' : 'pt-12'}`}>
        <div className="max-w-7xl mx-auto">
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs uppercase tracking-widest text-white/[0.3]">All Products</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Category Filters */}
          <div className="flex justify-start gap-2 mb-8 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-white/[0.1] text-white border border-white/[0.15]'
                    : 'text-white/40 hover:text-white/60 hover:bg-white/[0.04] border border-transparent'
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              /* Empty State */
              <div className="col-span-full">
                <div className="bg-white/[0.03] rounded-2xl border border-white/[0.06] p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/[0.04] flex items-center justify-center">
                    <Search className="w-8 h-8 text-white/20" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                  <p className="text-white/40 text-sm mb-8 max-w-md mx-auto">
                    {searchQuery
                      ? `We couldn't find any products matching "${searchQuery}"`
                      : `No products in ${selectedCategory}`}
                  </p>
                  <div className="flex justify-center gap-3">
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="px-5 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-xl text-white text-sm font-medium transition-all"
                      >
                        Clear Search
                      </button>
                    )}
                    {selectedCategory !== 'All' && (
                      <button
                        onClick={() => setSelectedCategory('All')}
                        className="px-5 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-xl text-white text-sm font-medium transition-all"
                      >
                        View All Products
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto py-12 px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Pixelas</h3>
              <p className="text-sm text-white/[0.3] max-w-md">
                Professional AI-powered tools for creative professionals. One-time payment, lifetime access.
              </p>
            </div>
            <a
              href="mailto:amlolife.contact@gmail.com"
              className="text-sm text-white/[0.3] hover:text-white/60 transition-colors"
            >
              amlolife.contact@gmail.com
            </a>
          </div>
          <div className="border-t border-white/[0.06] mt-10 pt-8">
            <p className="text-xs text-white/[0.2]">&copy; {new Date().getFullYear()} Pixelas. All rights reserved.</p>
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
      className={`group bg-white/[0.03] border rounded-xl overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 flex flex-col ${
        product.featured ? 'border-orange-500/20' : 'border-white/[0.06]'
      }`}
    >
      {/* Image Area */}
      {product.coverImage && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.coverImage.url}
            alt={product.coverImage.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
        </div>
      )}

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category */}
        <span className="text-xs text-white/40 mb-2">{product.category}</span>

        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
          {product.featured && (
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-400 mr-2 align-middle" />
          )}
          {product.name}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-white/50 mb-4 line-clamp-2">{product.tagline}</p>

        {/* Bottom Row */}
        <div className="flex items-center justify-between mt-auto">
          {product.price > 0 ? (
            <span className="text-lg font-bold text-white">{formatPrice(product.price)}</span>
          ) : (
            <span />
          )}
          <span className="bg-white/[0.06] hover:bg-white/[0.1] text-white text-sm px-4 py-2 rounded-lg border border-white/[0.08] transition-all">
            View <span className="inline-block">&rarr;</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
