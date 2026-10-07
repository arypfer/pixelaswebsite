import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react'
import { PixelasLogo } from '@/components/PixelasLogo'

// Company homepage. The storefront lives at /products.

const EMAIL = 'syarifsuganda@pixelas.store'

export const metadata: Metadata = {
  title: 'Pixelas: AI software for creators',
  description:
    'Pixelas is a Jakarta software company building AI desktop apps and Adobe plugins for photographers and video editors in Indonesia.',
  openGraph: {
    title: 'Pixelas: AI software for creators',
    description:
      'Desktop apps and Adobe plugins that automate the slow parts of photo and video editing.',
    siteName: 'Pixelas',
    type: 'website',
  },
}

// ponytail: curated by hand, update when a product ships or is retired
const productGroups = [
  {
    label: 'Video editing',
    items: [
      { name: 'PXCut', href: '/products/pxcut', desc: 'Finds and removes silent gaps in Adobe Premiere Pro timelines. Windows and macOS.' },
      { name: 'PXSub', href: '/products/pxsub', desc: 'Generates Bahasa Indonesia subtitles directly inside Premiere Pro.' },
    ],
  },
  {
    label: 'Photography',
    items: [
      { name: 'PXGate', href: '/products/pxgate', desc: 'Photo culling software that sorts a shoot so photographers only review the keepers.' },
      { name: 'PXTouch', href: '/pxtouch', desc: 'AI portrait retouching and upscaling up to 4x, on Windows, macOS and Linux.' },
      { name: 'AMLOGEN', href: '/products/nano-banana-photoshop-plugin-amlogen', desc: 'Generative image editing inside Photoshop, powered by Nano Banana.' },
      { name: 'Amlo Panel Retouch', href: '/products/amlo-panel-retouch-plugin-photoshop', desc: 'A one-click retouching panel for Photoshop.' },
      { name: 'Canon Picture Style', href: '/canonstyle', desc: '48 in-camera color profiles that give Canon photos a film look straight out of camera.' },
    ],
  },
  {
    label: 'Apps',
    items: [
      { name: 'Amlo App', href: '/products/amlo-app-aplikasi-pose-fotografi', desc: 'A library of 11,000+ pose references that photographers can share with clients.' },
      { name: 'Enteng', href: '/products/enteng', desc: 'Makes Windows lighter and faster on editing machines.' },
    ],
  },
]

const principles = [
  {
    title: 'Built for Indonesia',
    desc: 'Most editing software is made for English-speaking markets and priced in dollars. Our tools speak Bahasa Indonesia, are priced in rupiah, and are paid for once.',
  },
  {
    title: 'Automate the repetitive part',
    desc: 'Culling, retouching, cutting and subtitling eat hours of every project. We automate those steps so creators spend their time on the decisions that need a person.',
  },
  {
    title: 'Small team, AI-native',
    desc: 'We are a small team that ships quickly by building with AI, from the models inside our products to Claude Code in our own development.',
  },
]

export default function CompanyHome() {
  return (
    <div lang="en" className="relative w-full min-h-screen noise">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#060606]/80 border-b border-white/[0.06]">
        <nav className="max-w-6xl mx-auto flex items-center justify-between gap-4 py-3 sm:py-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <PixelasLogo size={22} />
            <span className="text-[15px] font-bold text-white tracking-tight">Pixelas</span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-2 text-[13px]">
            <a href="#products" className="hidden sm:flex px-3 py-2 text-white/50 hover:text-white transition-colors">Products</a>
            <a href="#about" className="hidden sm:flex px-3 py-2 text-white/50 hover:text-white transition-colors">About</a>
            <a href="#contact" className="hidden sm:flex px-3 py-2 text-white/50 hover:text-white transition-colors">Contact</a>
            <Link
              href="/products"
              className="ml-1 min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 font-medium text-white/80 hover:text-white border border-white/[0.1] hover:border-white/[0.2] rounded-lg transition-all"
            >
              Store <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative ambient-glow">
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-28 pb-16 sm:pb-24">
            <p className="text-amber-400/80 text-xs sm:text-sm font-medium tracking-wide mb-5">Software company · Jakarta, Indonesia</p>
            <h1 className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              AI software for Indonesia&apos;s{' '}
              <span className="font-display font-normal text-gradient box-decoration-clone pr-[0.12em]">photographers and video editors.</span>
            </h1>
            <p className="max-w-2xl text-base sm:text-lg text-white/50 leading-relaxed mb-10">
              Pixelas builds desktop apps and Adobe plugins that handle the slow parts of editing: culling photos,
              retouching portraits, cutting silences and writing subtitles. Made in Indonesia, in Bahasa Indonesia, for
              the creators who work here.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-[15px] transition-colors"
              >
                What we build <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/[0.12] hover:border-white/[0.25] text-white/70 hover:text-white font-semibold rounded-xl text-[15px] transition-all"
              >
                Get in touch
              </a>
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="scroll-mt-20 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <SectionLabel>What we build</SectionLabel>
            <h2 className="max-w-2xl text-2xl sm:text-4xl font-bold tracking-tight mb-12">
              Tools for each step of a creator&apos;s workflow, from the shoot to the final cut.
            </h2>
            <div className="space-y-12">
              {productGroups.map((group) => (
                <div key={group.label} className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-8">
                  <h3 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-white/30 pt-1">{group.label}</h3>
                  <ul className="grid sm:grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden">
                    {group.items.map((p) => (
                      <li key={p.name} className="bg-[#060606] sm:[&:last-child:nth-child(odd)]:col-span-2">
                        <Link href={p.href} className="group block h-full p-5 sm:p-6 hover:bg-white/[0.02] transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-white">{p.name}</span>
                            <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-amber-400 transition-colors" />
                          </div>
                          <p className="text-[14px] text-white/40 leading-relaxed">{p.desc}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-20 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <SectionLabel>About</SectionLabel>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-14">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                An independent software company, <span className="font-display font-normal text-white/60">based in Jakarta.</span>
              </h2>
              <div className="space-y-4 text-white/50 leading-relaxed">
                <p>
                  Pixelas was founded by Syarif Suganda to give Indonesian creators professional editing software that fits
                  how they actually work: in their own language, at local prices, without subscriptions.
                </p>
                <p>
                  We design, build and support every product ourselves, and sell directly to photographers and video
                  editors through our own store.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {principles.map((p) => (
                <div key={p.title} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
                  <h3 className="font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-[14px] text-white/40 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <SectionLabel>Contact</SectionLabel>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">Partnerships, press or support.</h2>
            <p className="text-white/50 mb-8 max-w-xl">Email us and you will hear back from the founder directly.</p>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-3 text-lg sm:text-2xl font-semibold text-amber-400 hover:text-amber-300 transition-colors break-all"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" /> {EMAIL}
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row gap-4 sm:items-center justify-between text-[13px] text-white/30">
          <div className="flex items-center gap-2">
            <PixelasLogo size={18} />
            <span>&copy; {new Date().getFullYear()} Pixelas · Jakarta, Indonesia</span>
          </div>
          <div className="flex gap-5">
            <Link href="/products" className="hover:text-white/60 transition-colors">Store</Link>
            <a href={`mailto:${EMAIL}`} className="hover:text-white/60 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-[11px] uppercase tracking-[0.2em] text-amber-400/60 font-semibold">{children}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent" />
    </div>
  )
}
