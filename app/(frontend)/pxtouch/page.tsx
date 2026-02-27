'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/pxtouch/Navbar';
import ComparisonSlider from '@/components/pxtouch/ComparisonSlider';
import { WORKFLOW_STEPS } from './constants';
import { Download, Monitor, ArrowRight, Activity, Cpu, FileText } from 'lucide-react';

const heroBefore = '/pxtouch/hero-before.webp';
const heroAfter = '/pxtouch/hero-after.webp';

// Pricing Tier Component
const PricingTier: React.FC<{
  title: string;
  tokens: string;
  price: string;
  recommended?: boolean;
}> = ({ title, tokens, price, recommended }) => (
  <div className={`
    relative p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300
    bg-[#0c0c0c] border rounded-xl
    hover:border-white/[0.15] hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)]
    ${recommended ? 'border-amber-500/30 shadow-[0_0_30px_-5px_rgba(245,158,11,0.15)]' : 'border-white/[0.07]'}
  `}>
    {recommended && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <div className="bg-amber-500 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Most Popular
        </div>
      </div>
    )}

    <div className="mb-8">
      <div className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold mb-4">
        {title}
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">{tokens}</span>
        <span className="text-[12px] font-semibold text-amber-400 uppercase tracking-wider">Tokens</span>
      </div>
      <div className="text-white/30 text-sm">
        {price}
      </div>
    </div>
    <div className="text-[11px] text-white/15 uppercase tracking-wider">
      Available Now
    </div>
  </div>
);

export default function PXTouchPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#060606] min-h-screen text-white overflow-x-hidden noise">
      <Navbar />

      {/* --- SECTION 1: IMMERSIVE HERO --- */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col">

        {/* The Interaction Layer */}
        <div className="absolute inset-0 z-0">
          <ComparisonSlider
            beforeImage={heroBefore}
            afterImage={heroAfter}
            simulateEnhancement={false}
          />
        </div>

        {/* The HUD Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none p-4 sm:p-6 md:p-12 flex flex-col justify-between">

          {/* Top Bar */}
          <div className="flex justify-between items-start">
            <div className="text-[10px] sm:text-xs text-white/30 tracking-wider flex flex-col gap-1 bg-[#0c0c0c]/80 backdrop-blur-xl p-2.5 sm:p-3 rounded-xl border border-white/[0.07]">
              <span className="text-amber-400">SYS.READY</span>
              <span className="hidden sm:block">MODELS: ANTA / ARYA / GATKA / RUDRA</span>
            </div>
            <div className="flex gap-2 bg-[#0c0c0c]/80 backdrop-blur-xl p-2.5 sm:p-3 rounded-xl items-center border border-white/[0.07]">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <div className="text-[10px] sm:text-xs text-white/40">LIVE PREVIEW</div>
            </div>
          </div>

          {/* Center Content */}
          <div className="w-full text-center mt-[-10vh]">
            <h1 className="text-[15vw] sm:text-[12vw] md:text-[14vw] leading-[0.8] font-extrabold tracking-tighter text-white mix-blend-difference">
              PXTOUCH
            </h1>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-xl text-white/40 tracking-[0.15em] sm:tracking-widest uppercase">
              The Quad-Core Retouching Engine.
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="flex justify-between items-end">
            <div className="hidden md:block text-xs text-white/25 leading-relaxed bg-[#0c0c0c]/80 backdrop-blur-xl p-3 rounded-xl border border-white/[0.07]">
              ACTIVE MODULES:<br />
              Anta . Arya . Gatka . Rudra<br />
              LATENCY: 12ms
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: STATEMENT --- */}
      <section className="relative z-20 border-t border-white/[0.06]">
        <div className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto relative">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold">Architecture</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mt-2 mb-6 sm:mb-8">
                Beyond <br />
                <span className="font-display text-amber-300">Human Vision.</span>
              </h2>
              <a
                href="/pxtouch-guidance.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0c0c0c] hover:bg-white/[0.06] text-white border border-white/[0.07] hover:border-white/[0.15] text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300"
              >
                <FileText className="w-4 h-4" />
                Software Documentation
              </a>
            </div>
            <div>
              <p className="text-base sm:text-lg text-white/40 leading-relaxed">
                <span className="text-white font-semibold">PXTouch</span> uses an exclusive Tetra-Model architecture.
              </p>
              <p className="mt-3 text-sm sm:text-base text-white/30">
                Each model has a specialized role at different stages of the retouching pipeline:
              </p>
              <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#0c0c0c] border border-white/[0.07] rounded-xl p-4 hover:border-white/[0.15] transition-all duration-300">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold text-amber-400">ANTA</span>
                    <span className="text-[11px] text-amber-400/60">1 Token</span>
                  </div>
                  <p className="mt-2 text-[13px] text-white/30 leading-relaxed">
                    Fastest AI Retouching Model. Perfect for quick social media edits.
                  </p>
                </div>
                <div className="bg-[#0c0c0c] border border-white/[0.07] rounded-xl p-4 hover:border-white/[0.15] transition-all duration-300">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold text-purple-400">ARYA</span>
                    <span className="text-[11px] text-amber-400/60">4 Tokens</span>
                  </div>
                  <p className="mt-2 text-[13px] text-white/30 leading-relaxed">
                    Medium retouching with 2048px output resolution.
                  </p>
                </div>
                <div className="bg-[#0c0c0c] border border-white/[0.07] rounded-xl p-4 hover:border-white/[0.15] transition-all duration-300">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold text-yellow-400">GATKA</span>
                    <span className="text-[11px] text-amber-400/60">15 Tokens</span>
                  </div>
                  <p className="mt-2 text-[13px] text-white/30 leading-relaxed">
                    High-fidelity retouching. Preserves pore detail and micro-texture. 2048px output.
                  </p>
                </div>
                <div className="bg-[#0c0c0c] border border-white/[0.07] rounded-xl p-4 hover:border-white/[0.15] transition-all duration-300">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold text-red-400">RUDRA</span>
                    <span className="text-[11px] text-amber-400/60">30 Tokens</span>
                  </div>
                  <p className="mt-2 text-[13px] text-white/30 leading-relaxed">
                    Highest-tier model. 4096px output with commercial-grade skin quality.
                  </p>
                </div>
              </div>
              <div className="mt-6 sm:mt-8 flex gap-6 sm:gap-8 text-[11px] sm:text-xs text-white/25">
                <div className="flex items-center gap-2">
                  <Cpu size={14} className="text-amber-400/50" /> 4-Model Parallelism
                </div>
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-amber-400/50" /> 99.9% Identity Match
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: UPSCALE SHOWCASE --- */}
      <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden border-t border-white/[0.06]" id="upscale">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold">Upscaling</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mt-2 mb-4 sm:mb-6">
              Crystal Clear{' '}
              <span className="font-display text-amber-300">Upscale</span>
            </h2>
            <p className="text-white/30 max-w-2xl mx-auto text-sm sm:text-base">
              Upscale images up to 6x their original size. Restore lost detail, sharpen, and remove compression artifacts using deep learning.
            </p>
          </div>

          <div className="relative h-[350px] sm:h-[500px] md:h-[600px] w-full bg-[#0c0c0c] border border-white/[0.07] rounded-xl overflow-hidden group">
            <div className="absolute inset-0 grid grid-cols-2">
              {/* Left Side: Pixelated */}
              <div className="bg-[#060606] relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
                  className="w-full h-full object-cover opacity-50 scale-150 blur-sm"
                  alt="Low Res"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#0c0c0c]/80 backdrop-blur-xl text-white/30 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium border border-white/[0.07] rounded-xl">
                    INPUT: 720p
                  </div>
                </div>
              </div>

              {/* Right Side: Sharp */}
              <div className="bg-[#060606] relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2800&auto=format&fit=crop"
                  className="w-full h-full object-cover"
                  alt="High Res"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-amber-500 text-black px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold rounded-xl shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]">
                    OUTPUT: 4K
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-amber-500/40 z-20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0c0c0c]/80 backdrop-blur-xl border border-white/[0.07] p-2 rounded-full">
                <Activity size={20} className="text-amber-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: TOKEN SYSTEM --- */}
      <section className="border-t border-white/[0.06]" id="pricing">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32">

          {/* Header */}
          <div className="mb-10 sm:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold">Pricing</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2">
                Resource Allocation
              </h2>
              <p className="mt-3 sm:mt-4 text-white/30 max-w-md text-sm sm:text-base">
                PXTouch uses a pay-as-you-go token system: you only pay for what you use.
              </p>
            </div>
            <div className="text-right text-[11px] text-white/15 uppercase tracking-wider hidden md:block">
              Server Status: Online<br />
              Available Regions: Global
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 sm:mb-12">
            <PricingTier
              title="Starter"
              tokens="100"
              price="Rp 35,000"
            />
            <PricingTier
              title="Pro"
              tokens="500"
              price="Rp 165,000"
              recommended={true}
            />
            <PricingTier
              title="Studio"
              tokens="1,000"
              price="Rp 315,000"
            />
          </div>

          {/* Consumption Rate */}
          <div className="bg-[#0c0c0c] border border-white/[0.07] rounded-xl p-5 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 sm:gap-8">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-amber-400/80 font-semibold">
                  Consumption Rate
                </span>
                <p className="text-sm text-white/30 mt-1">
                  Token cost per photo:
                </p>
              </div>
              <div className="w-full md:w-auto text-sm text-white/40">
                <ul className="space-y-3">
                  <li className="border-b border-white/[0.06] pb-3 flex items-center justify-between gap-6 sm:gap-8">
                    <div>
                      Fast Retouch (<span className="font-semibold text-amber-400">Anta</span>)
                    </div>
                    <div className="text-amber-400 font-medium whitespace-nowrap">1 token / photo</div>
                  </li>
                  <li className="border-b border-white/[0.06] pb-3 flex items-center justify-between gap-6 sm:gap-8">
                    <div>
                      Balanced Retouch (<span className="font-semibold text-purple-400">Arya</span>)
                    </div>
                    <div className="text-amber-400 font-medium whitespace-nowrap">4 tokens / photo</div>
                  </li>
                  <li className="border-b border-white/[0.06] pb-3 flex items-center justify-between gap-6 sm:gap-8">
                    <div>
                      High Quality Retouch (<span className="font-semibold text-yellow-400">Gatka</span>)
                    </div>
                    <div className="text-amber-400 font-medium whitespace-nowrap">15 tokens / photo</div>
                  </li>
                  <li className="border-b border-white/[0.06] pb-3 flex items-center justify-between gap-6 sm:gap-8">
                    <div>
                      Ultra 4K Retouch (<span className="font-semibold text-red-400">Rudra</span>)
                    </div>
                    <div className="text-amber-400 font-medium whitespace-nowrap">30 tokens / photo</div>
                  </li>
                  <li className="flex items-center justify-between gap-6 sm:gap-8">
                    <div>
                      Upscaling (<span className="font-semibold text-amber-400">2X - 6X</span>)
                    </div>
                    <div className="text-amber-400 font-medium whitespace-nowrap">5 - 40 tokens / photo</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-[11px] text-white/15">
            Secure payment gateway via Mayar.id. Instant activation.
          </div>
        </div>
      </section>

      {/* --- SECTION 5: WORKFLOW --- */}
      <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden border-t border-white/[0.06]" id="workflow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold">How it works</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2">Pipeline Execution</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {WORKFLOW_STEPS.map((step, i) => (
              <div
                key={i}
                className="bg-[#0c0c0c] border border-white/[0.07] rounded-xl p-5 sm:p-6 hover:border-white/[0.15] hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] transition-all duration-300 group"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-white/[0.04] mb-3 sm:mb-4 group-hover:text-amber-500/10 transition-colors">0{i + 1}</div>
                <h4 className="text-base sm:text-lg font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-[13px] text-white/30 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 6: FINAL CTA --- */}
      <section className="relative overflow-hidden border-t border-white/[0.06]" id="download">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 py-16 sm:py-24 md:py-32 relative z-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3 sm:mb-4">
            Get the{' '}
            <span className="font-display text-amber-300">Power.</span>
          </h2>
          <p className="text-white/30 text-sm sm:text-lg mb-8 sm:mb-12 max-w-lg mx-auto">
            Licensed for commercial use. No cloud subscription required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://amlo-life.myr.id/catalog/pxtouch-windows"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-black text-sm sm:text-base font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_-5px_rgba(245,158,11,0.5)] transition-all"
            >
              <Download size={20} /> Windows
            </a>
            <a
              href="https://amlo-life.myr.id/catalog/pxtouch-windows-ahyn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0c0c0c] hover:bg-white/[0.06] text-white border border-white/[0.07] hover:border-white/[0.15] text-sm sm:text-base font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-300"
            >
              <Cpu size={20} /> Mac Apple Silicon
            </a>
            <a
              href="https://amlo-life.myr.id/catalog/pxtouch-windows-ahyn-uo1b"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0c0c0c] hover:bg-white/[0.06] text-white border border-white/[0.07] hover:border-white/[0.15] text-sm sm:text-base font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-300"
            >
              <Monitor size={20} /> Mac Intel Chip
            </a>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
                  <span className="text-black text-[10px] font-extrabold">P</span>
                </div>
                <span className="text-sm font-bold text-white">Pixelas</span>
              </div>
              <p className="text-[13px] text-white/25 max-w-md leading-relaxed">
                Professional AI-powered retouching tools for creative professionals.
              </p>
            </div>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-[13px] text-white/30 hover:text-amber-400/80 transition-colors"
            >
              Back to Store <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="border-t border-white/[0.04] mt-8 sm:mt-10 pt-6 sm:pt-8">
            <p className="text-[11px] text-white/15">&copy; {new Date().getFullYear()} Pixelas. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
