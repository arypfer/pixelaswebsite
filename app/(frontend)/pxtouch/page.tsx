'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/pxtouch/Navbar';
import ComparisonSlider from '@/components/pxtouch/ComparisonSlider';
import { FEATURES, WORKFLOW_STEPS } from './constants';
import { Download, Monitor, ArrowRight, Activity, Cpu, CheckCircle2, FileText } from 'lucide-react';

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
    relative p-8 flex flex-col justify-between group transition-all duration-300
    bg-white/[0.03] border border-white/[0.06] rounded-xl
    hover:border-white/[0.12] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40
    ${recommended ? 'ring-1 ring-orange-500/30' : ''}
  `}>
    {recommended && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          Most Popular
        </div>
      </div>
    )}

    <div className="mb-8">
      <div className="text-sm font-medium text-white/40 mb-4 uppercase tracking-wider">
        {title}
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-5xl font-bold tracking-tight text-white">{tokens}</span>
        <span className="text-sm font-medium text-orange-400 uppercase">Tokens</span>
      </div>
      <div className="text-white/40 text-sm">
        {price}
      </div>
    </div>
    <div className="text-xs text-white/[0.2] uppercase tracking-wider">
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
    <div className="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden font-sans">
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
        <div className="absolute inset-0 z-10 pointer-events-none p-6 md:p-12 flex flex-col justify-between">

          {/* Top Bar */}
          <div className="flex justify-between items-start">
            <div className="text-xs text-white/40 tracking-wider flex flex-col gap-1 bg-white/[0.03] backdrop-blur-xl p-3 rounded-xl border border-white/[0.06]">
              <span className="text-orange-400">SYS.READY</span>
              <span>MODELS: ANTA / ARYA / GATKA / RUDRA</span>
            </div>
            <div className="flex gap-2 bg-white/[0.03] backdrop-blur-xl p-3 rounded-xl items-center border border-white/[0.06]">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <div className="text-xs text-white/60">LIVE PREVIEW</div>
            </div>
          </div>

          {/* Center Content */}
          <div className="w-full text-center mt-[-10vh]">
            <h1 className="text-[12vw] md:text-[14vw] leading-[0.8] font-black tracking-tighter text-white mix-blend-difference">
              PXTOUCH
            </h1>
            <p className="mt-4 text-sm md:text-xl text-white/60 tracking-widest uppercase">
              The Quad-Core Retouching Engine.
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="flex justify-between items-end">
            <div className="hidden md:block text-xs text-white/40 leading-relaxed bg-white/[0.03] backdrop-blur-xl p-3 rounded-xl border border-white/[0.06]">
              ACTIVE MODULES:<br />
              Anta . Arya . Gatka . Rudra<br />
              LATENCY: 12ms
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: STATEMENT --- */}
      <section className="bg-[#0a0a0a] relative z-20 border-t border-white/[0.06]">
        <div className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto relative">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-8">
                Beyond <br />
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Human Vision.</span>
              </h2>
              <a
                href="/pxtouch-guidance.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.08] hover:border-white/[0.15] text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-300"
              >
                <FileText className="w-4 h-4" />
                Software Documentation
              </a>
            </div>
            <div className="text-lg md:text-xl text-white/60 font-light leading-relaxed">
              <p>
                <span className="text-white font-semibold">PXTouch</span> uses an exclusive Tetra-Model architecture.
              </p>
              <p className="mt-4 text-base text-white/40">
                Each model has a specialized role at different stages of the retouching pipeline:
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.12] transition-all duration-300">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold text-orange-400">ANTA</span>
                    <span className="text-[11px] text-orange-400/60">1 Token</span>
                  </div>
                  <p className="mt-2 text-sm text-white/40">
                    Fastest AI Retouching Model. Perfect for quick social media edits.
                  </p>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.12] transition-all duration-300">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold text-purple-400">ARYA</span>
                    <span className="text-[11px] text-orange-400/60">4 Tokens</span>
                  </div>
                  <p className="mt-2 text-sm text-white/40">
                    Medium retouching with 2048px output resolution.
                  </p>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.12] transition-all duration-300">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold text-yellow-400">GATKA</span>
                    <span className="text-[11px] text-orange-400/60">15 Tokens</span>
                  </div>
                  <p className="mt-2 text-sm text-white/40">
                    High-fidelity retouching. Preserves pore detail and micro-texture. 2048px output.
                  </p>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.12] transition-all duration-300">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold text-red-400">RUDRA</span>
                    <span className="text-[11px] text-orange-400/60">30 Tokens</span>
                  </div>
                  <p className="mt-2 text-sm text-white/40">
                    Highest-tier model. 4096px output with commercial-grade skin quality.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex gap-8 text-xs text-white/40">
                <div className="flex items-center gap-2">
                  <Cpu size={14} /> 4-Model Parallelism
                </div>
                <div className="flex items-center gap-2">
                  <Activity size={14} /> 99.9% Identity Match
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: UPSCALE SHOWCASE --- */}
      <section className="py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden" id="upscale">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-6">
              Crystal Clear <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Upscale</span>
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto text-lg">
              Upscale images up to 6x their original size. Restore lost detail, sharpen, and remove compression artifacts using deep learning.
            </p>
          </div>

          <div className="relative h-[500px] md:h-[600px] w-full bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden group">
            <div className="absolute inset-0 grid grid-cols-2">
              {/* Left Side: Pixelated */}
              <div className="bg-[#0a0a0a] relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
                  className="w-full h-full object-cover opacity-50 scale-150 blur-sm"
                  alt="Low Res"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/[0.03] backdrop-blur-xl text-white/40 px-4 py-2 text-xs font-medium border border-white/[0.06] rounded-xl">
                    INPUT: 720p
                  </div>
                </div>
              </div>

              {/* Right Side: Sharp */}
              <div className="bg-[#0a0a0a] relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2800&auto=format&fit=crop"
                  className="w-full h-full object-cover"
                  alt="High Res"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 text-xs font-semibold rounded-xl shadow-lg shadow-orange-500/30">
                    OUTPUT: 4K
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-orange-500/40 z-20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] p-2 rounded-full">
                <Activity size={20} className="text-orange-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: TOKEN SYSTEM --- */}
      <section className="bg-[#0a0a0a] border-t border-white/[0.06]" id="pricing">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

          {/* Header */}
          <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <p className="text-sm font-medium text-orange-400 uppercase tracking-wider mb-3">
                Pricing
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-none">
                Resource Allocation
              </h2>
              <p className="mt-4 text-white/40 max-w-md">
                PXTouch uses a pay-as-you-go token system: you only pay for what you use.
              </p>
            </div>
            <div className="text-right text-sm text-white/[0.2] hidden md:block">
              Server Status: Online<br />
              Available Regions: Global
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
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
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              <div>
                <p className="text-sm font-medium text-orange-400 uppercase tracking-wider mb-2">
                  Consumption Rate
                </p>
                <p className="text-sm text-white/40">
                  Token cost per photo:
                </p>
              </div>
              <div className="w-full md:w-auto text-sm text-white/60">
                <ul className="space-y-3">
                  <li className="border-b border-white/[0.06] pb-3 flex items-center justify-between gap-8">
                    <div>
                      Fast Retouch (<span className="font-semibold text-orange-400">Anta</span>)
                    </div>
                    <div className="text-orange-400 font-medium whitespace-nowrap">1 token / photo</div>
                  </li>
                  <li className="border-b border-white/[0.06] pb-3 flex items-center justify-between gap-8">
                    <div>
                      Balanced Retouch (<span className="font-semibold text-purple-400">Arya</span>)
                    </div>
                    <div className="text-orange-400 font-medium whitespace-nowrap">4 tokens / photo</div>
                  </li>
                  <li className="border-b border-white/[0.06] pb-3 flex items-center justify-between gap-8">
                    <div>
                      High Quality Retouch (<span className="font-semibold text-yellow-400">Gatka</span>)
                    </div>
                    <div className="text-orange-400 font-medium whitespace-nowrap">15 tokens / photo</div>
                  </li>
                  <li className="border-b border-white/[0.06] pb-3 flex items-center justify-between gap-8">
                    <div>
                      Ultra 4K Retouch (<span className="font-semibold text-red-400">Rudra</span>)
                    </div>
                    <div className="text-orange-400 font-medium whitespace-nowrap">30 tokens / photo</div>
                  </li>
                  <li className="flex items-center justify-between gap-8">
                    <div>
                      Upscaling (<span className="font-semibold text-orange-400">2X - 6X</span>)
                    </div>
                    <div className="text-orange-400 font-medium whitespace-nowrap">5 - 40 tokens / photo</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-white/[0.2]">
            Secure payment gateway via Mayar.id. Instant activation.
          </div>
        </div>
      </section>

      {/* --- SECTION 5: WORKFLOW --- */}
      <section className="py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden" id="workflow">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-orange-400 uppercase tracking-wider mb-3">
              How it works
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Pipeline Execution</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {WORKFLOW_STEPS.map((step, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 hover:border-white/[0.12] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 transition-all duration-300 group"
              >
                <div className="text-4xl font-bold text-white/[0.06] mb-4 group-hover:text-orange-500/20 transition-colors">0{i + 1}</div>
                <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 6: FINAL CTA --- */}
      <section className="py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden" id="download">
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            Get the <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Power.</span>
          </h2>
          <p className="text-white/40 text-lg mb-12 max-w-lg mx-auto">
            Licensed for commercial use. No cloud subscription required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            <a
              href="https://amlo-life.myr.id/catalog/pxtouch-windows"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-base font-semibold px-8 py-4 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300"
            >
              <Download size={20} /> Windows
            </a>
            <a
              href="https://amlo-life.myr.id/catalog/pxtouch-windows-ahyn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.08] hover:border-white/[0.15] text-base font-semibold px-8 py-4 rounded-xl transition-all duration-300"
            >
              <Cpu size={20} /> Mac Apple Silicon
            </a>
            <a
              href="https://amlo-life.myr.id/catalog/pxtouch-windows-ahyn-uo1b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.08] hover:border-white/[0.15] text-base font-semibold px-8 py-4 rounded-xl transition-all duration-300"
            >
              <Monitor size={20} /> Mac Intel Chip
            </a>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/[0.06] bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Pixelas</h3>
              <p className="text-sm text-white/[0.3] max-w-md">
                Professional AI-powered retouching tools for creative professionals.
              </p>
            </div>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
            >
              Back to Store <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="border-t border-white/[0.06] mt-10 pt-8">
            <p className="text-xs text-white/[0.2]">&copy; {new Date().getFullYear()} Pixelas. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
