import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, ChevronRight, Shield, Download, RefreshCw } from 'lucide-react'
import { PixelasLogo } from '@/components/PixelasLogo'
import * as LucideIcons from 'lucide-react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ProductGallery } from './ProductGallery'
import { StickyBuyBar } from './StickyBuyBar'
import { FAQSection } from './FAQSection'

export const revalidate = 60 // re-fetch from DB at most every 60 seconds

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
    title: (product.metaTitle as string) || `${product.name} — Pixelas`,
    description: (product.metaDescription as string) || product.shortDescription || product.tagline || '',
  }
}

function formatPrice(price: number): string {
  if (!price) return ''
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

function ensureUrl(url: string): string {
  if (!url) return '#'
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `https://${url}`
}

function getLucideIcon(name: string) {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>
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
      ?.map((item: { image: { url?: string; alt?: string } | string | number | null; id?: string }) => {
        if (typeof item.image === 'object' && item.image !== null) {
          return { url: item.image.url || '', alt: item.image.alt || product.name }
        }
        return null
      })
      .filter(Boolean) as { url: string; alt: string }[] || []

  const buyLinks = (product.buyLinks as { label: string; url: string; primary?: boolean }[] | undefined)?.length
    ? (product.buyLinks as { label: string; url: string; primary?: boolean }[])
    : product.buyUrl
      ? [{ label: 'Beli Sekarang', url: product.buyUrl as string, primary: true }]
      : []

  const primaryLink = buyLinks.find((l) => l.primary) || buyLinks[0]

  const videos = (product.videos as { url: string; title?: string; id?: string }[] | undefined)
    ?.map((v) => {
      const id = extractYouTubeId(v.url)
      return id ? { id, title: v.title } : null
    })
    .filter(Boolean) as { id: string; title?: string }[] || []

  const promo = product.promo?.active
    ? {
        originalPrice: product.promo.originalPrice as number | undefined,
        label: product.promo.label as string | undefined,
        endDate: product.promo.endDate as string | undefined,
      }
    : null

  return (
    <div className="min-h-screen bg-[#060606] text-white noise">
      {/* ═══ NAV BAR ═══ */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-[#060606]/80 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5">
          <div className="flex items-center gap-2 sm:gap-3 text-[13px] min-w-0">
            <Link href="/" className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors flex-shrink-0">
              <PixelasLogo size={18} />
              <span className="hidden sm:inline font-bold">Pixelas</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-white/15 flex-shrink-0" />
            <span className="text-white/60 truncate max-w-[140px] sm:max-w-[200px]">{product.name}</span>
          </div>
          <a
            href="#buy"
            className="px-4 sm:px-5 py-2 text-[13px] font-semibold bg-amber-500 hover:bg-amber-400 text-black rounded-md transition-colors flex-shrink-0"
          >
            Beli Sekarang
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

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-14 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Image — shown first on mobile */}
            {coverImageUrl && (
              <div className="relative group order-first lg:order-last">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c0c0c] shadow-2xl shadow-black/50">
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

            {/* Text */}
            <div className="order-last lg:order-first">
              {/* Promo banner */}
              {promo && promo.label && (
                <div className="mb-5 sm:mb-6 inline-flex items-center gap-3 px-4 py-2.5 bg-red-500/15 border border-red-500/30 rounded-xl">
                  <span className="px-2.5 py-1 bg-red-500 text-white text-[12px] font-bold uppercase tracking-wider rounded shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                    {promo.label}
                  </span>
                  {promo.endDate && new Date(promo.endDate) > new Date() && (
                    <span className="text-[12px] text-red-300/80 font-medium">
                      Berakhir {new Date(promo.endDate).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  )}
                </div>
              )}

              {product.badge && !promo && (
                <span className="inline-block px-2.5 py-1 mb-4 sm:mb-6 bg-amber-500/15 rounded-md text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                  {product.badge}
                </span>
              )}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-3 sm:mb-4">{product.name}</h1>
              {product.tagline && (
                <p className="text-base sm:text-xl text-white/45 mb-4 sm:mb-6 leading-relaxed">{product.tagline}</p>
              )}
              {product.shortDescription && (
                <p className="text-[14px] sm:text-[15px] text-white/30 leading-relaxed mb-6 sm:mb-10 max-w-lg">{product.shortDescription}</p>
              )}

              {/* Price + CTA */}
              <div id="hero-buy" className="flex flex-col gap-4 sm:gap-5 mb-4">
                {product.price && product.price > 0 && (
                  <div>
                    <div className="flex items-center gap-3">
                      {promo && promo.originalPrice && (
                        <span className="text-lg sm:text-xl text-white/25 line-through font-medium">{formatPrice(promo.originalPrice)}</span>
                      )}
                      <span className={`text-2xl sm:text-3xl font-extrabold ${promo ? 'text-red-400' : 'text-white'}`}>{formatPrice(product.price)}</span>
                      {promo && promo.originalPrice && promo.originalPrice > 0 && product.price && (
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-[13px] font-bold rounded">
                          -{Math.round(((promo.originalPrice - product.price) / promo.originalPrice) * 100)}%
                        </span>
                      )}
                    </div>
                    {promo && promo.originalPrice && promo.originalPrice > 0 && product.price && (
                      <p className="text-[12px] sm:text-[13px] text-emerald-400/70 font-medium mt-1.5">
                        Kamu hemat {formatPrice(promo.originalPrice - product.price)}
                      </p>
                    )}
                    {product.priceLabel && (
                      <p className="text-[12px] sm:text-[13px] text-white/30 mt-1">{product.priceLabel}</p>
                    )}
                  </div>
                )}
                {buyLinks.length === 1 ? (
                  <a
                    href={ensureUrl(buyLinks[0].url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-[15px] shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_-5px_rgba(245,158,11,0.5)] transition-all"
                  >
                    Beli Sekarang — {formatPrice(product.price)} <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                    {buyLinks.map((link, i) => (
                      <a
                        key={i}
                        href={ensureUrl(link.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl text-[14px] font-bold transition-all ${
                          link.primary
                            ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]'
                            : 'bg-[#0c0c0c] hover:bg-white/[0.06] text-white border border-white/[0.07] hover:border-white/[0.15]'
                        }`}
                      >
                        {link.primary && product.price ? `${link.label} — ${formatPrice(product.price)}` : link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-[11px] sm:text-[12px] text-white/50">Bayar sekali &middot; Pakai selamanya &middot; Langsung dikirim</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      {product.features && product.features.length > 0 && (
        <section className="py-14 sm:py-24 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="mb-8 sm:mb-14">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/20 font-semibold">Fitur Utama</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 tracking-tight">Kenapa Kamu Bakal Suka</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {product.features.map((feature: { icon?: string; title: string; description?: string }, index: number) => (
                <div
                  key={index}
                  className={`p-5 rounded-xl bg-[#0c0c0c] border hover:border-white/[0.12] transition-all duration-300 group ${
                    index === 0
                      ? 'lg:col-span-2 border-amber-500/20 hover:border-amber-500/30 border-l-2 border-l-amber-500/40'
                      : 'border-white/[0.06]'
                  }`}
                >
                  <div className={`${index === 0 ? 'flex items-start gap-4' : ''}`}>
                    <div className={`mb-3 ${index === 0 ? 'w-12 h-12 mb-0 flex-shrink-0' : 'w-10 h-10'} rounded-lg bg-amber-500/10 flex items-center justify-center`}>
                      {getLucideIcon(feature.icon || 'Star')}
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-1.5 ${index === 0 ? 'text-[16px]' : 'text-[14px]'}`}>{feature.title}</h3>
                      {feature.description && (
                        <p className={`text-white/30 leading-relaxed ${index === 0 ? 'text-[14px]' : 'text-[13px]'}`}>{feature.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ RICH TEXT ═══ */}
      {product.description && (
        <section className="py-14 sm:py-24 border-t border-white/[0.06]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="mb-8 sm:mb-14">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/20 font-semibold">Detail</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 tracking-tight">Tentang Produk Ini</h2>
            </div>
            <div className="prose prose-invert prose-base prose-p:text-white/40 prose-p:leading-relaxed prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-strong:text-white/70 prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-ul:text-white/40 prose-ol:text-white/40 prose-li:marker:text-amber-500/40 prose-blockquote:border-amber-500/30 prose-blockquote:text-white/30 prose-hr:border-white/[0.06] max-w-none">
              <RichText data={product.description} />
            </div>
          </div>
        </section>
      )}

      {/* ═══ GALLERY ═══ */}
      {galleryImages.length > 0 && (
        <section className="py-14 sm:py-24 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="mb-8 sm:mb-14">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/20 font-semibold">Tangkapan Layar</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 tracking-tight">Galeri</h2>
            </div>
            <ProductGallery images={galleryImages} />
          </div>
        </section>
      )}

      {/* ═══ VIDEOS ═══ */}
      {videos.length > 0 && (
        <section className="py-14 sm:py-24 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="mb-8 sm:mb-14">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/20 font-semibold">Tonton</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 tracking-tight">Video</h2>
            </div>
            <div className={`grid gap-6 ${videos.length === 1 ? 'max-w-4xl mx-auto' : 'grid-cols-1 lg:grid-cols-2'}`}>
              {videos.map((video, i) => (
                <div key={i}>
                  {video.title && (
                    <p className="text-[14px] font-medium text-white/50 mb-3">{video.title}</p>
                  )}
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-white/[0.08] bg-[#0c0c0c]">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title || 'Product video'}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ FAQ ═══ */}
      <FAQSection />

      {/* ═══ FINAL CTA ═══ */}
      <section id="buy" className={`border-t relative scroll-mt-16 ${promo ? 'border-red-500/20' : 'border-white/[0.06]'}`}>
        <div className={`absolute inset-0 pointer-events-none ${promo ? 'bg-gradient-to-b from-transparent via-red-500/[0.03] to-transparent' : 'bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent'}`} />
        <div className="relative py-16 sm:py-24 text-center max-w-2xl mx-auto px-4 sm:px-6">
          {promo && promo.label && (
            <div className="mb-6">
              <span className="px-3 py-1.5 bg-red-500 text-white text-[13px] font-bold uppercase tracking-wider rounded-lg shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                {promo.label}
              </span>
            </div>
          )}
          <p className="text-[13px] sm:text-[14px] text-white/35 mb-3">
            Ribuan kreator udah pakai — sekarang giliran kamu
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4">
            Ambil {product.name} Sekarang
          </h2>
          {product.price && product.price > 0 && (
            <div className="flex items-center justify-center gap-3 mb-2">
              {promo && promo.originalPrice && (
                <span className="text-lg sm:text-xl text-white/25 line-through">{formatPrice(promo.originalPrice)}</span>
              )}
              <p className={`text-xl sm:text-2xl font-bold ${promo ? 'text-red-400' : 'text-amber-400'}`}>{formatPrice(product.price)}</p>
              {promo && promo.originalPrice && promo.originalPrice > 0 && product.price && (
                <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-[13px] font-bold rounded">
                  -{Math.round(((promo.originalPrice - product.price) / promo.originalPrice) * 100)}%
                </span>
              )}
            </div>
          )}
          <p className="text-[13px] sm:text-[14px] text-white/25 mb-8 sm:mb-10">Bayar sekali aja. Gak ada langganan. Pakai selamanya.</p>
          {buyLinks.length === 1 ? (
            <a
              href={ensureUrl(buyLinks[0].url)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-base sm:text-lg shadow-[0_0_40px_-8px_rgba(245,158,11,0.4)] hover:shadow-[0_0_50px_-8px_rgba(245,158,11,0.5)] transition-all"
            >
              Beli Sekarang — {formatPrice(product.price)} <ArrowRight className="w-5 h-5" />
            </a>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {buyLinks.map((link, i) => (
                <a
                  key={i}
                  href={ensureUrl(link.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold transition-all ${
                    link.primary
                      ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_40px_-8px_rgba(245,158,11,0.4)]'
                      : 'bg-[#0c0c0c] hover:bg-white/[0.06] text-white border border-white/[0.07] hover:border-white/[0.15]'
                  }`}
                >
                  {link.primary && product.price ? `${link.label} — ${formatPrice(product.price)}` : link.label}
                </a>
              ))}
            </div>
          )}
          {/* Reassurance icons */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 mt-8">
            <div className="flex items-center gap-2 text-white/25">
              <Shield className="w-4 h-4" />
              <span className="text-[11px] sm:text-[12px]">Bayar Aman</span>
            </div>
            <div className="flex items-center gap-2 text-white/25">
              <Download className="w-4 h-4" />
              <span className="text-[11px] sm:text-[12px]">Langsung Pakai</span>
            </div>
            <div className="flex items-center gap-2 text-white/25">
              <RefreshCw className="w-4 h-4" />
              <span className="text-[11px] sm:text-[12px]">Update Gratis</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 pb-24 md:pb-10 border-t border-white/[0.06]">
        <Link href="/" className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 -ml-4 text-white/40 hover:text-white/70 text-[14px] font-medium rounded-lg hover:bg-white/[0.04] transition-all">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke semua produk
        </Link>
      </div>

      {/* ═══ STICKY MOBILE BUY BAR ═══ */}
      {primaryLink && (
        <StickyBuyBar
          productName={product.name}
          price={formatPrice(product.price)}
          promoPrice={promo?.originalPrice ? formatPrice(promo.originalPrice) : undefined}
          buyUrl={primaryLink.url}
        />
      )}
    </div>
  )
}
