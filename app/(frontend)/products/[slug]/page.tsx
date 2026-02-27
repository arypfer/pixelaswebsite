import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react'
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
  if (Icon) return <Icon className="w-6 h-6 text-orange-400" />
  return <LucideIcons.Star className="w-6 h-6 text-orange-400" />
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
    <div className="min-h-screen bg-black text-white">
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden">
        {/* Background cover image */}
        {coverImageUrl && (
          <div className="absolute inset-0 z-0">
            <Image
              src={coverImageUrl}
              alt={product.name}
              fill
              className="object-cover opacity-20"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
          </div>
        )}

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-16">
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-12 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Text side */}
            <div>
              {product.badge && (
                <span className="inline-block px-3 py-1 mb-4 bg-orange-500/20 border border-orange-500/40 rounded-full text-xs font-semibold text-orange-400 uppercase tracking-wider">
                  {product.badge}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight">{product.name}</h1>
              {product.tagline && (
                <p className="text-xl text-white/70 mb-6">{product.tagline}</p>
              )}
              {product.shortDescription && (
                <p className="text-white/50 leading-relaxed mb-8">{product.shortDescription}</p>
              )}

              {/* Price + CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                {product.price && product.price > 0 && (
                  <div>
                    <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                    {product.priceLabel && (
                      <p className="text-white/40 text-sm mt-1">{product.priceLabel}</p>
                    )}
                  </div>
                )}
                <a
                  href={product.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold rounded-xl text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all flex items-center gap-2"
                >
                  Buy Now <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>One-time payment &middot; No subscription &middot; Lifetime access</span>
              </div>
            </div>

            {/* Image side */}
            {coverImageUrl && (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={coverImageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURES GRID */}
      {product.features && product.features.length > 0 && (
        <section className="py-20 border-t border-white/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="mb-4">{getLucideIcon(feature.icon || 'Star')}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  {feature.description && (
                    <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2.5: RICH TEXT DESCRIPTION */}
      {product.description && (
        <section className="py-16 border-t border-white/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-invert prose-lg">
            <RichText data={product.description} />
          </div>
        </section>
      )}

      {/* SECTION 3: SCREENSHOT GALLERY */}
      {galleryImages.length > 0 && (
        <section className="py-20 border-t border-white/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Screenshots</h2>
            <ProductGallery images={galleryImages} />
          </div>
        </section>
      )}

      {/* SECTION 4: FINAL CTA */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get {product.name} today
          </h2>
          {product.price && product.price > 0 && (
            <p className="text-2xl font-semibold text-orange-400 mb-2">{formatPrice(product.price)}</p>
          )}
          <p className="text-white/50 mb-8">One-time payment. No subscription. Lifetime access.</p>
          <a
            href={product.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold rounded-xl text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
          >
            Buy Now <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer back link */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 border-t border-white/10">
        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to all products
        </Link>
      </div>
    </div>
  )
}
