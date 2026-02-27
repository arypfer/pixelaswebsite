import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ProductGallery } from './ProductGallery'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const product = docs[0]
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `${product.name} — Pixelas`,
    description: product.shortDescription || product.tagline || '',
  }
}

function formatPrice(price: number): string {
  if (!price) return ''
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
}

function getLucideIcon(name: string) {
  const icons = LucideIcons as Record<string, React.ComponentType<{ className?: string }>>
  const Icon = icons[name]
  if (Icon) return <Icon className="w-5 h-5 text-amber-400" />
  return <LucideIcons.Star className="w-5 h-5 text-amber-400" />
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug }, visible: { equals: true } },
    limit: 1,
    depth: 2,
  })

  const product = docs[0]
  if (!product) notFound()

  const coverImageUrl =
    typeof product.coverImage === 'object' && product.coverImage !== null
      ? product.coverImage.url
      : null

  const galleryImages =
    product.gallery
      ?.map((item) => {
        if (typeof item.image === 'object' && item.image !== null) {
          return { url: item.image.url || '', alt: item.image.alt || product.name }
        }
        return null
      })
      .filter(Boolean) as { url: string; alt: string }[] || []

  return (
    <div className="min-h-screen bg-[#060606] text-white noise">
      {/* ═══ NAV BAR ═══ */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-[#060606]/80 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-3 text-[13px]">
            <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-white/15" />
            <span className="text-white/60 truncate max-w-[200px]">{product.name}</span>
          </div>
          <a
            href={product.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 text-[12px] font-semibold bg-amber-500 hover:bg-amber-400 text-black rounded-md transition-colors"
          >
            Buy Now
          </a>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        {/* Ambient background from cover image */}
        {coverImageUrl && (
          <div className="absolute inset-0 z-0">
            <Image src={coverImageUrl} alt="" fill className="object-cover opacity-[0.07] blur-2xl scale-110" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-transparent to-[#060606]" />
          </div>
        )}

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div>
              {product.badge && (
                <span className="inline-block px-2.5 py-1 mb-6 bg-amber-500/15 rounded-md text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                  {product.badge}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4">{product.name}</h1>
              {product.tagline && (
                <p className="text-xl text-white/45 mb-6 leading-relaxed">{product.tagline}</p>
              )}
              {product.shortDescription && (
                <p className="text-[15px] text-white/30 leading-relaxed mb-10 max-w-lg">{product.shortDescription}</p>
              )}

              {/* Price + CTA */}
              <div className="flex flex-wrap items-center gap-5 mb-4">
                {product.price && product.price > 0 && (
                  <div>
                    <span className="text-3xl font-extrabold">{formatPrice(product.price)}</span>
                    {product.priceLabel && (
                      <p className="text-[13px] text-white/30 mt-1">{product.priceLabel}</p>
                    )}
                  </div>
                )}
                <a
                  href={product.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-[15px] shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_-5px_rgba(245,158,11,0.5)] transition-all"
                >
                  Buy Now <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <p className="text-[12px] text-white/20">One-time payment &middot; Lifetime access &middot; Instant delivery</p>
            </div>

            {/* Image */}
            {coverImageUrl && (
              <div className="relative group">
                <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c0c0c] shadow-2xl shadow-black/50">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={coverImageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
                {/* Glow effect behind image */}
                <div className="absolute -inset-4 rounded-3xl bg-amber-500/[0.04] blur-2xl -z-10" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      {product.features && product.features.length > 0 && (
        <section className="py-24 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-14">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/20 font-semibold">What&apos;s included</span>
              <h2 className="text-3xl font-bold mt-2 tracking-tight">Features</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.features.map((feature, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl bg-[#0c0c0c] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group"
                >
                  <div className="mb-3 w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    {getLucideIcon(feature.icon || 'Star')}
                  </div>
                  <h3 className="text-[14px] font-semibold mb-1.5">{feature.title}</h3>
                  {feature.description && (
                    <p className="text-[13px] text-white/30 leading-relaxed">{feature.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ RICH TEXT ═══ */}
      {product.description && (
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-3xl mx-auto px-6 prose prose-invert prose-sm prose-p:text-white/40 prose-headings:font-bold prose-strong:text-white/70 prose-a:text-amber-400">
            <RichText data={product.description} />
          </div>
        </section>
      )}

      {/* ═══ GALLERY ═══ */}
      {galleryImages.length > 0 && (
        <section className="py-24 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-14">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/20 font-semibold">Screenshots</span>
              <h2 className="text-3xl font-bold mt-2 tracking-tight">Gallery</h2>
            </div>
            <ProductGallery images={galleryImages} />
          </div>
        </section>
      )}

      {/* ═══ FINAL CTA ═══ */}
      <section className="border-t border-white/[0.06] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent pointer-events-none" />
        <div className="relative py-24 text-center max-w-2xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ready to get started?
          </h2>
          {product.price && product.price > 0 && (
            <p className="text-2xl font-bold text-amber-400 mb-2">{formatPrice(product.price)}</p>
          )}
          <p className="text-[14px] text-white/25 mb-10">One-time payment. No subscription. Lifetime access.</p>
          <a
            href={product.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-lg shadow-[0_0_40px_-8px_rgba(245,158,11,0.4)] hover:shadow-[0_0_50px_-8px_rgba(245,158,11,0.5)] transition-all"
          >
            Buy Now <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <div className="max-w-6xl mx-auto px-6 py-10 border-t border-white/[0.06]">
        <Link href="/" className="inline-flex items-center gap-2 text-white/25 hover:text-white/50 text-[13px] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to all products
        </Link>
      </div>
    </div>
  )
}
