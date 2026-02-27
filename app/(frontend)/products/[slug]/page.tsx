import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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
    title: `${product.name} — Amlolife`,
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
  if (Icon) return <Icon className="w-5 h-5 text-orange-400" />
  return <LucideIcons.Star className="w-5 h-5 text-orange-400" />
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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* SECTION 1: HERO */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-16">
          {/* Breadcrumb */}
          <nav className="text-xs text-white/[0.3] mb-12">
            <Link href="/" className="hover:text-white/60 transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <span>{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Text side */}
            <div>
              {product.badge && (
                <span className="inline-block px-3 py-1 mb-4 bg-orange-500/10 rounded-full text-xs font-medium text-orange-400">
                  {product.badge}
                </span>
              )}
              <h1 className="text-4xl font-bold mb-3 tracking-tight">{product.name}</h1>
              {product.tagline && (
                <p className="text-xl text-white/50 mb-6">{product.tagline}</p>
              )}
              {product.shortDescription && (
                <p className="text-sm text-white/40 leading-relaxed mb-8">{product.shortDescription}</p>
              )}

              {/* Price + CTA */}
              {product.price && product.price > 0 && (
                <div className="mb-4">
                  <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
                  {product.priceLabel && (
                    <p className="text-sm text-white/40 mt-1">{product.priceLabel}</p>
                  )}
                </div>
              )}
              <a
                href={product.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/20 transition-all"
              >
                Buy Now <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-xs text-white/[0.3] mt-3">Lifetime access &middot; Instant delivery</p>
            </div>

            {/* Image side */}
            {coverImageUrl && (
              <div className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06]">
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
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURES GRID */}
      {product.features && product.features.length > 0 && (
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-white/[0.3] mb-2">What&apos;s included</p>
              <h2 className="text-2xl font-semibold">Features</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-colors"
                >
                  <div className="mb-4">{getLucideIcon(feature.icon || 'Star')}</div>
                  <h3 className="text-sm font-semibold mb-2">{feature.title}</h3>
                  {feature.description && (
                    <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2.5: RICH TEXT DESCRIPTION */}
      {product.description && (
        <section className="py-16 border-t border-white/[0.06]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-invert prose-sm">
            <RichText data={product.description} />
          </div>
        </section>
      )}

      {/* SECTION 3: SCREENSHOT GALLERY */}
      {galleryImages.length > 0 && (
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-white/[0.3] mb-2">Screenshots</p>
              <h2 className="text-2xl font-semibold">Gallery</h2>
            </div>
            <ProductGallery images={galleryImages} />
          </div>
        </section>
      )}

      {/* SECTION 4: FINAL CTA */}
      <section className="border-t border-white/[0.06]">
        <div className="py-20 text-center max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Get {product.name} today
          </h2>
          {product.price && product.price > 0 && (
            <p className="text-xl font-semibold text-orange-400 mb-2">{formatPrice(product.price)}</p>
          )}
          <p className="text-sm text-white/[0.3] mb-8">One-time payment. No subscription. Lifetime access.</p>
          <a
            href={product.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl text-lg shadow-lg shadow-orange-500/20 transition-all"
          >
            Buy Now <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer back link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-t border-white/[0.06]">
        <Link href="/" className="inline-flex items-center gap-2 text-white/[0.3] hover:text-white/60 text-sm transition-colors">
          &larr; Back to all products
        </Link>
      </div>
    </div>
  )
}
