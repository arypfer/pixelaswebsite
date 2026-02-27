'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/pxtouch/Navbar';
// import Button from '@/components/pxtouch/Button'; // Unused in App.tsx but imported. Keeping if needed or removing. It was imported in App.tsx line 3.
import ComparisonSlider from '@/components/pxtouch/ComparisonSlider';
import { FEATURES, WORKFLOW_STEPS } from './constants';
import { Download, Monitor, ArrowRight, Activity, Cpu, CheckCircle2, FileText } from 'lucide-react';

const heroBefore = '/pxtouch/hero-before.webp';
const heroAfter = '/pxtouch/hero-after.webp';

const Marquee: React.FC<{ text: string; reverse?: boolean }> = ({ text, reverse }) => (
  <div className="flex overflow-hidden py-4 border-y border-white/10 bg-black relative z-20">
    <div className={`flex gap-8 whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
      {[...Array(10)].map((_, i) => (
        <span key={i} className="text-6xl md:text-8xl font-black text-transparent text-outline uppercase tracking-tighter opacity-30 hover:opacity-100 hover:text-white transition-opacity duration-300 cursor-default">
          {text} <span className="text-accent">•</span>
        </span>
      ))}
    </div>
  </div>
);

// New Brutalist Pricing Tier Component
const PricingTier: React.FC<{
  title: string;
  tokens: string;
  price: string;
  index: string;
  recommended?: boolean;
}> = ({ title, tokens, price, index, recommended }) => (
  <div className={`
    relative border-b md:border-b-0 md:border-r border-white/10 p-8 flex flex-col justify-between group transition-colors duration-500
    ${recommended ? 'bg-white/[0.02]' : 'hover:bg-white/[0.02]'}
  `}>
    {recommended && (
      <div className="absolute top-0 right-0 p-4">
        <div className="bg-accent text-black text-[10px] font-mono font-bold px-2 py-1 uppercase tracking-widest flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-black animate-pulse"></div>
          MOST POPULAR
        </div>
      </div>
    )}

    <div className="mb-12">
      <div className="font-mono text-xs text-white/30 mb-4 tracking-widest uppercase">
        Sector_0{index} // {title}
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-6xl font-black tracking-tighter text-white">{tokens}</span>
        <span className="font-mono text-sm text-accent uppercase">Tokens</span>
      </div>
      <div className="font-mono text-slate-500 text-sm border-l-2 border-accent pl-3">
        COST_BASIS: {price}
      </div>
    </div>
    <div className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
      [ CAPACITY_AVAILABLE ]
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
    <>
    <style jsx global>{`
      /* Film Grain Overlay */
      .noise-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.05;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      }

      .mix-diff {
        mix-blend-mode: difference;
      }
      
      .text-outline {
        -webkit-text-stroke: 1px rgba(255,255,255,0.3);
        color: transparent;
      }
    `}</style>
    <div className="noise-overlay"></div>
    <div className="bg-black min-h-screen text-white selection:bg-accent selection:text-black overflow-x-hidden font-sans">
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
             <div className="font-mono text-xs text-accent tracking-[0.2em] flex flex-col gap-1 bg-black/20 backdrop-blur-sm p-2 rounded border border-white/5">
               <span>SYS.READY</span>
               <span>MODELS: ANTA / ARYA / GATKA / RUDRA</span>
             </div>
             <div className="flex gap-2 bg-black/20 backdrop-blur-sm p-2 rounded items-center border border-white/5">
                <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></div>
                <div className="font-mono text-xs text-white/80">LIVE_PREVIEW</div>
             </div>
          </div>

          {/* Center Content */}
          <div className="w-full text-center mix-blend-difference mt-[-10vh]">
             <h1 className="text-[12vw] md:text-[14vw] leading-[0.8] font-black tracking-tighter text-white">
               PXTOUCH
             </h1>
             <p className="mt-4 text-sm md:text-xl font-mono text-white tracking-widest uppercase">
               The Quad-Core Retouching Engine.
             </p>
          </div>

          {/* Bottom Bar */}
          <div className="flex justify-between items-end">
            <div className="hidden md:block w-48 text-xs font-mono text-white/80 leading-relaxed bg-black/20 backdrop-blur-sm p-2 rounded border border-white/5">
              ACTIVE MODULES: <br/>
              [A]nta . [A]rya . [G]atka . [R]udra<br/>
              LATENCY: 12ms
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: MARQUEE & STATEMENT --- */}
      <section className="bg-black py-0 overflow-hidden relative z-20 border-t border-white/10">
         <Marquee text="ARTIFICIAL INTELLIGENCE" />
         
         <div className="py-32 px-4 md:px-12 max-w-7xl mx-auto border-x border-white/10 relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               <div>
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-8">
                    BEYOND <br/>
                    <span className="text-accent">HUMAN VISION.</span>
                  </h2>
                  <a 
                    href="/pxtouch-guidance.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full tracking-wide bg-white text-slate-950 hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] border border-transparent text-sm px-6 py-3 gap-2 mb-12 uppercase"
                  >
                    <FileText className="w-4 h-4" />
                    Dokumentasi Software
                  </a>
               </div>
               <div className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
                  <p>
                    <span className="text-white font-bold">PXTouch</span> menggunakan arsitektur Tetra-Model eksklusif.
                  </p>
                  <p className="mt-4 text-base md:text-lg text-slate-300">
                    Setiap model punya peran khusus di tahap yang berbeda dalam pipeline retouching:
                  </p>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
                    <div className="border border-white/10 bg-black/40 p-3">
                      <div className="flex items-baseline justify-between">
                        <span className="font-mono font-semibold text-brand-400">ANTA</span>
                        <span className="font-mono text-[11px] text-accent">1 Token</span>
                      </div>
                      <p className="mt-1 text-xs md:text-sm text-slate-400">
                        Model Retouching AI Tercepat. Cocok untuk edit cepat media sosial.
                      </p>
                    </div>
                    <div className="border border-white/10 bg-black/40 p-3">
                      <div className="flex items-baseline justify-between">
                        <span className="font-mono font-semibold text-purple-400">ARYA</span>
                        <span className="font-mono text-[11px] text-accent">4 Tokens</span>
                      </div>
                      <p className="mt-1 text-xs md:text-sm text-slate-400">
                        AI Model dengan kemampuan retouch medium dan output image sebesar 2048px.
                      </p>
                    </div>
                    <div className="border border-white/10 bg-black/40 p-3">
                      <div className="flex items-baseline justify-between">
                        <span className="font-mono font-semibold text-yellow-400">GATKA</span>
                        <span className="font-mono text-[11px] text-accent">15 Tokens</span>
                      </div>
                      <p className="mt-1 text-xs md:text-sm text-slate-400">
                        AI Model retouching high-fidelity. Menjaga detail pori dan tekstur mikro. Output 2048px.
                      </p>
                    </div>
                    <div className="border border-white/10 bg-black/40 p-3">
                      <div className="flex items-baseline justify-between">
                        <span className="font-mono font-semibold text-red-400">RUDRA</span>
                        <span className="font-mono text-[11px] text-accent">30 Tokens</span>
                      </div>
                      <p className="mt-1 text-xs md:text-sm text-slate-400">
                        AI Model tertinggi. Output 4096px dengan kualitas kulit kelas komersial.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 flex gap-8 font-mono text-xs text-slate-500">
                     <div className="flex items-center gap-2">
                       <Cpu size={14}/> 4-MODEL PARALLELISM
                     </div>
                     <div className="flex items-center gap-2">
                       <Activity size={14}/> 99.9% IDENTITY MATCH
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- SECTION 3: UPSCALE SHOWCASE --- */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden" id="upscale">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.05),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-8">
              CRYSTAL CLEAR <span className="text-accent">UPSCALE</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Upscaling image hingga 6 kali ukuran aslinya. Mengembalikan detail yang hilang, mempertajam, dan menghilangkan artefak kompresi menggunakan deep learning.
            </p>
          </div>

          <div className="relative h-[600px] w-full border border-white/10 rounded-xl overflow-hidden group">
            <div className="absolute inset-0 grid grid-cols-2">
              {/* Left Side: Pixelated */}
              <div className="bg-black relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" 
                  className="w-full h-full object-cover opacity-50 scale-150 blur-sm"
                  alt="Low Res" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="bg-black/80 backdrop-blur text-white/50 px-4 py-2 font-mono text-xs border border-white/10">
                     INPUT: 720p
                   </div>
                </div>
              </div>

              {/* Right Side: Sharp */}
              <div className="bg-black relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2800&auto=format&fit=crop" 
                  className="w-full h-full object-cover"
                  alt="High Res" 
                />
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className="bg-brand-500/90 text-white px-4 py-2 font-mono text-xs font-bold shadow-[0_0_20px_rgba(14,165,233,0.5)]">
                     OUTPUT: 4K
                   </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-brand-500/50 z-20 shadow-[0_0_15px_#0ea5e9]">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border border-brand-500 p-2 rounded-full">
                  <Activity size={20} className="text-brand-500" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: TOKEN SYSTEM (REDESIGNED) --- */}
      <section className="bg-black border-y border-white/10" id="pricing">
        <div className="max-w-7xl mx-auto border-x border-white/10">
          
          {/* Header */}
          <div className="p-8 md:p-12 border-b border-white/10 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <div className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
                /// SYSTEM_RESOURCES
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                Resource Allocation
              </h2>
              <p className="mt-3 text-sm md:text-base text-slate-400 max-w-md">
                PXTouch menggunakan sistem token pay-as-you-go: kamu hanya membayar sesuai pemakaian.
              </p>
            </div>
            <div className="text-right font-mono text-xs text-slate-500 hidden md:block">
              SERVER_STATUS: ONLINE<br/>
              AVAILABLE_REGIONS: GLOBAL
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0">
            <PricingTier 
              title="STARTER"
              index="1"
              tokens="100"
              price="Rp 35.000"
            />
            <PricingTier 
              title="PRO"
              index="2"
              tokens="500"
              price="Rp 165.000"
              recommended={true}
            />
            <PricingTier 
              title="STUDIO"
              index="3"
              tokens="1000"
              price="Rp 315.000"
            />
          </div>

          {/* Consumption Rate */}
          <div className="border-t border-white/10 bg-black/40 px-8 md:px-12 py-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              <div>
                <div className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
                  /// CONSUMPTION_RATE
                </div>
                <p className="text-sm text-slate-400 max-w-md">
                  Biaya token per foto:
                </p>
              </div>
              <div className="w-full md:w-auto text-xs font-mono text-slate-300">
                <ul className="space-y-2">
                  <li className="border-b border-white/10 pb-2">
                    <div className="text-slate-200">
                      Fast Retouch (
                      <span className="font-semibold text-brand-400">Anta</span>
                      )
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      <span className="font-semibold text-accent">1 token</span> per foto
                    </div>
                  </li>
                  <li className="border-b border-white/10 pb-2">
                    <div className="text-slate-200">
                      Balanced Retouch (
                      <span className="font-semibold text-purple-400">Arya</span>
                      )
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      <span className="font-semibold text-accent">4 token</span> per foto
                    </div>
                  </li>
                  <li className="border-b border-white/10 pb-2">
                    <div className="text-slate-200">
                      High Quality Retouch (
                      <span className="font-semibold text-yellow-400">Gatka</span>
                      )
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      <span className="font-semibold text-accent">15 token</span> per foto
                    </div>
                  </li>
                  <li className="border-b border-white/10 pb-2">
                    <div className="text-slate-200">
                      Ultra 4K Retouch (
                      <span className="font-semibold text-red-400">Rudra</span>
                      )
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      <span className="font-semibold text-accent">30 token</span> per foto
                    </div>
                  </li>
                  <li className="border-b border-white/10 pb-2">
                    <div className="text-slate-200">
                      Upscaling <span className="font-semibold text-brand-400">(2X - 6X)</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      <span className="font-semibold text-accent">5 - 40 token</span> per foto
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Footer of Pricing */}
          <div className="bg-white/5 p-4 text-center font-mono text-[10px] text-slate-500 uppercase tracking-widest border-t border-white/10">
            Gateway Pembayaran Aman // Mayar.id Encrypted // Aktivasi Instan
          </div>

        </div>
      </section>

      {/* --- SECTION 6: DARKROOM WORKFLOW --- */}
      <section className="py-32 bg-black relative overflow-hidden">
         {/* Background Grid */}
         <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
         
         <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h2 className="text-center text-4xl font-bold mb-20 tracking-tight">PIPELINE EXECUTION</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
               {WORKFLOW_STEPS.map((step, i) => (
                  <div key={i} className="bg-black/80 backdrop-blur-md border border-white/10 p-4 hover:bg-white hover:text-black transition-all duration-300 group cursor-crosshair">
                     <div className="text-4xl font-black text-white/10 mb-4 group-hover:text-black/10 transition-colors">0{i+1}</div>
                     <h4 className="text-lg font-bold mb-1">{step.title}</h4>
                     <p className="text-xs md:text-sm text-slate-500 group-hover:text-black/60 leading-relaxed">{step.description}</p>
                     
                     <div className="mt-4 h-px w-full bg-white/10 group-hover:bg-black/10"></div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- SECTION 7: FINAL CTA --- */}
      <section className="h-[100vh] flex items-center justify-center relative bg-accent text-black overflow-hidden" id="download">
         <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-700"></div>
         
         <div className="text-center z-10 px-4">
            <h2 className="text-[10vw] font-black leading-none tracking-tighter mb-8">
               GET THE<br/>POWER.
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 flex-wrap">
               <a 
                  href="https://amlo-life.myr.id/catalog/pxtouch-windows"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-8 py-6 text-lg font-bold hover:bg-white hover:text-black transition-all border-2 border-black flex items-center gap-3"
               >
                  <Download /> WINDOWS
               </a>
               <a 
                  href="https://amlo-life.myr.id/catalog/pxtouch-windows-ahyn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border-2 border-black text-black px-8 py-6 text-lg font-bold hover:bg-black hover:text-white transition-all flex items-center gap-3"
               >
                  <Cpu /> MAC APPLE SILICON
               </a>
               <a 
                  href="https://amlo-life.myr.id/catalog/pxtouch-windows-ahyn-uo1b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border-2 border-black text-black px-8 py-6 text-lg font-bold hover:bg-black hover:text-white transition-all flex items-center gap-3"
               >
                  <Monitor /> MAC INTEL CHIP
               </a>
            </div>
            <p className="mt-8 font-mono text-sm opacity-60">
               BERLISENSI UNTUK PENGGUNAAN KOMERSIAL. TANPA LANGGANAN CLOUD.
            </p>
         </div>

      </section>
    </div>
    </>
  );
}
