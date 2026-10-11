"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Download, Camera, Palette, Zap, ChevronLeft, ChevronRight, Info, X, Star } from "lucide-react";
import { PixelasLogo } from '@/components/PixelasLogo';

// Picture Style showcase data
const pictureStyles = [
  {
    id: 1,
    name: "Fuji 5",
    description: "Karakter warna Fujifilm dengan saturasi yang seimbang",
    beforeImage: "/canonstyle/fuji-5-before.webp",
    afterImage: "/canonstyle/fuji-5-after.webp"
  },
  {
    id: 2,
    name: "Clean Film",
    description: "Warna bersih dan natural dengan tone film yang elegan",
    beforeImage: "/canonstyle/clean-film-before.webp",
    afterImage: "/canonstyle/clean-film-after.webp"
  },
  {
    id: 3,
    name: "Kodak Alaris",
    description: "Tone hangat dengan karakter film klasik yang timeless",
    beforeImage: "/canonstyle/kodak-alaris-before.webp",
    afterImage: "/canonstyle/kodak-alaris-after.webp"
  },
  {
    id: 4,
    name: "Kodak Ektar",
    description: "Warna yang kaya dan saturasi tinggi, sempurna untuk landscape dan portrait",
    beforeImage: "/canonstyle/kodak-ektar-before.webp",
    afterImage: "/canonstyle/kodak-ektar-after.webp"
  },
  {
    id: 5,
    name: "Silvergreen",
    description: "Tone hijau silver yang unik dan artistik",
    beforeImage: "/canonstyle/silvergreen-before.webp",
    afterImage: "/canonstyle/silvergreen-after.webp"
  },
  {
    id: 6,
    name: "Fuji Natura 1600",
    description: "Warna natural khas Fujifilm",
    beforeImage: "/canonstyle/fuji-natura-before.webp",
    afterImage: "/canonstyle/fuji-natura-after.webp"
  },
  {
    id: 7,
    name: "Puretone 2",
    description: "Tone bersih dengan reproduksi warna yang akurat",
    beforeImage: "/canonstyle/puretone-before.webp",
    afterImage: "/canonstyle/puretone-after.webp"
  },
  {
    id: 8,
    name: "Kodak Satin",
    description: "Hasil lembut dengan kontras yang seimbang",
    beforeImage: "/canonstyle/kodak-satin-before.webp",
    afterImage: "/canonstyle/kodak-satin-after.webp"
  }
];

const features = [
  {
    title: "48 Picture Style Premium",
    description: "Koleksi lengkap picture style untuk fotografer profesional"
  },
  {
    title: "Film Look Authentic",
    description: "Warna khas film analog legendaris langsung di foto Anda"
  },
  {
    title: "Langsung dari Kamera",
    description: "Hasil SOOC tanpa perlu editing panjang"
  }
];

const pictureStyleFiles = [
  { category: "Agfa Series", files: ["Agfa", "Agfa 2", "Agfa 3"] },
  { category: "Fuji Series", files: ["Fuji 1", "Fuji 2", "Fuji 3", "Fuji 4", "Fuji 5", "FUJI ASTIA 100F 5", "Fuji Natura 1600", "Fuji Superia"] },
  { category: "Kodak Series", files: ["Kodak 1", "Kodak 2", "Kodak 3", "Kodak Alaris", "Kodak Ectar", "Kodak Gray", "Kodak Gray 2", "Kodak Satin"] },
  { category: "Konica Series", files: ["Konica 1", "Konica 2", "Konica 3"] },
  { category: "Green Series", files: ["GreenGrass", "GreenLand", "GreenStone"] },
  { category: "SilverGreen Series", files: ["SilverGreen", "SilverGreen 2", "SilverGreen 3"] },
  { category: "Flat Series", files: ["FlatColors", "FlatDark", "FlatExperimental", "SuperFlat"] },
  { category: "FireCrack Series", files: ["FireCrack", "FireCrack2", "FireCrack3"] },
  { category: "DeepMatte Series", files: ["DeepMatte", "DeepMatte 2"] },
  { category: "PureTone Series", files: ["PureTone", "PureTone 2"] },
  { category: "NeoPortra Series", files: ["NeoPortra", "NeoPortra 2"] },
  { category: "Nikon Simulation", files: ["Nikon Simulation", "Nikon Simulation 2"] },
  { category: "Other Styles", files: ["Cameroon", "CinematicFlat", "CleanFilm", "MoonBlood", "WarmShade"] }
];

const compatibleCameras = [
  {
    series: "Canon DSLR",
    models: "EOS 5D, 6D, 7D, 80D, 90D, 200D, 250D, 750D, 800D, 850D, dan lainnya"
  },
  {
    series: "Canon EOS R",
    models: "EOS R, RP, R3, R5, R6, R6 Mark II, R7, R8, R10, R50, R100"
  },
  {
    series: "Canon EOS M",
    models: "EOS M, M2, M3, M5, M6, M6 Mark II, M10, M50, M50 Mark II, M100, M200"
  }
];

const faqItems = [
  {
    question: "Apa itu Picture Style?",
    answer: "Picture Style adalah profil warna yang bisa diinstall ke kamera Canon untuk memberikan warna dan kontras tertentu langsung dari kamera. Setiap kamera Canon memiliki 3 slot User Defined yang bisa diisi custom picture style."
  },
  {
    question: "Bagaimana cara install Picture Style?",
    answer: "Anda memerlukan kabel USB Canon dan software Canon EOS Utility. Hubungkan kamera ke komputer, buka EOS Utility, lalu load file .pf3 ke slot User Def 1, 2, atau 3 di kamera Anda."
  },
  {
    question: "Apakah Picture Style bekerja untuk foto RAW?",
    answer: "Picture Style tidak mengubah file RAW secara permanen, namun mempengaruhi preview dan histogram di kamera. Anda dapat menerapkan Picture Style ke file RAW menggunakan Canon Digital Photo Professional (DPP) dalam color space sRGB."
  },
  {
    question: "Apakah Picture Style bekerja untuk video?",
    answer: "Ya! Picture Style langsung diterapkan ke video dan JPEG yang diambil. Setelah video atau JPEG diambil, picture style yang dipilih tidak dapat diubah, hanya bisa dilakukan color grading tambahan."
  },
  {
    question: "Bisakah mengubah setting Picture Style?",
    answer: "Tentu saja! Anda bebas menyesuaikan parameter seperti Contrast, Saturation, Color Tone, dan Sharpness sesuai kebutuhan."
  },
  {
    question: "Apa yang didapat setelah pembelian?",
    answer: "Anda akan mendapatkan 48 file Picture Style (.pf3) yang siap diinstall ke kamera."
  }
];

// Memoized Feature Card Component
const FeatureCard = memo(({ feature, index }: { feature: { title: string; description: string }; index: number }) => (
  <div
    className="p-5 sm:p-6 bg-[#0c0c0c] rounded-xl border border-white/[0.07] hover:border-white/[0.15] transition-all text-center group hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] duration-300"
  >
    <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-amber-500/10 rounded-xl flex items-center justify-center group-hover:bg-amber-500/15 transition-colors duration-300">
      {index === 0 && <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />}
      {index === 1 && <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />}
      {index === 2 && <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />}
    </div>
    <h3 className="text-[15px] sm:text-base font-semibold mb-1.5 text-white">{feature.title}</h3>
    <p className="text-[13px] text-white/30 leading-relaxed">{feature.description}</p>
  </div>
));
FeatureCard.displayName = 'FeatureCard';

// Memoized FAQ Item Component
const FAQItem = memo(({ faq, isExpanded, onToggle }: {
  faq: { question: string; answer: string };
  index: number;
  isExpanded: boolean;
  onToggle: () => void
}) => (
  <div
    className="bg-[#0c0c0c] rounded-xl border border-white/[0.07] overflow-hidden hover:border-white/[0.15] transition-all"
  >
    <button
      onClick={onToggle}
      className="w-full p-4 sm:p-5 text-left flex items-center justify-between hover:bg-white/[0.02] transition-all group"
      aria-expanded={isExpanded}
    >
      <span className="font-semibold text-[15px] sm:text-base pr-4 text-white">{faq.question}</span>
      <ChevronRight
        className={`w-4 h-4 sm:w-5 sm:h-5 text-white/25 transition-transform flex-shrink-0 group-hover:text-amber-400 ${
          isExpanded ? 'rotate-90' : ''
        }`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="px-4 sm:px-5 pb-4 sm:pb-5">
        <p className="text-[13px] sm:text-sm text-white/35 leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  </div>
));
FAQItem.displayName = 'FAQItem';

export default function CanonStylePage() {
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState<Array<{styleName: string, images: string[]}>>([]);
  const [showFileList, setShowFileList] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const currentStyle = useMemo(() => pictureStyles[currentStyleIndex], [currentStyleIndex]);

  const nextStyle = useCallback(() => {
    setCurrentStyleIndex((prev) => (prev + 1) % pictureStyles.length);
    setSliderPosition(50);
  }, []);

  const prevStyle = useCallback(() => {
    setCurrentStyleIndex((prev) => (prev - 1 + pictureStyles.length) % pictureStyles.length);
    setSliderPosition(50);
  }, []);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  }, [isDragging]);

  const handleTouchStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  }, [isDragging]);

  // Prevent body scroll when dragging or gallery open
  useEffect(() => {
    if (isDragging || showGallery) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isDragging, showGallery]);

  // Initial load animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Preload all images on mount with priority
  useEffect(() => {
    pictureStyles.forEach((style, index) => {
      const beforeImg = new window.Image();
      const afterImg = new window.Image();
      beforeImg.src = style.beforeImage;
      afterImg.src = style.afterImage;
      if (index < 3) {
        beforeImg.loading = 'eager';
        afterImg.loading = 'eager';
      }
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showGallery || showFileList) return;
      if (e.key === 'ArrowLeft') prevStyle();
      if (e.key === 'ArrowRight') nextStyle();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showGallery, showFileList, prevStyle, nextStyle]);

  // Load all gallery images from all styles
  useEffect(() => {
    const loadAllGalleryImages = async () => {
      try {
        const response = await fetch('/api/gallery?all=true');
        if (response.ok) {
          const data = await response.json();
          setGalleryImages(data.galleries || []);
        }
      } catch (error) {
        console.error('Error loading gallery:', error);
        setGalleryImages([]);
      }
    };
    loadAllGalleryImages();
  }, []);

  return (
    <div className={`min-h-screen bg-[#060606] text-white noise transition-opacity duration-700 ${
      isLoaded ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Preload all images (hidden) */}
      <div className="hidden">
        {pictureStyles.map((style) => (
          <div key={style.id}>
            <Image src={style.beforeImage} alt="" width={1} height={1} priority />
            <Image src={style.afterImage} alt="" width={1} height={1} priority />
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#060606]/80 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
              <PixelasLogo size={18} />
              <span className="text-[13px] font-bold hidden sm:inline">Pixelas</span>
            </Link>
            <h1 className="text-sm sm:text-base font-bold flex items-center gap-2 text-white">
              Canon Picture Style
            </h1>
            <a
              href="#beli"
              className="px-3 sm:px-4 py-1.5 text-[12px] font-semibold bg-amber-500 hover:bg-amber-400 text-black rounded-md transition-colors flex-shrink-0"
            >
              Buy Now
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden ambient-glow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 md:pt-20 pb-8 sm:pb-12 text-center relative z-10">
          <span className="inline-block px-3 py-1.5 mb-4 sm:mb-5 bg-amber-500/15 rounded-md text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
            <Star className="w-3 h-3 inline -mt-0.5 mr-1" />
            48 Picture Style Premium
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4 sm:mb-6">
            Film Look Analog
            <br />
            <span className="font-display text-amber-300">Langsung dari Kamera</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/35 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Berikan foto digital Anda warna dan karakter film analog legendaris langsung dari kamera.
            Hemat waktu editing dengan hasil langsung dari kamera.
          </p>
          <a
            href="#showcase"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#0c0c0c] hover:bg-white/[0.06] border border-white/[0.07] hover:border-white/[0.15] rounded-xl text-[13px] sm:text-sm font-semibold text-white transition-all group"
          >
            Lihat Contoh Hasil
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Gallery Thumbnails Preview */}
          <div className="mt-8 sm:mt-12 max-w-4xl mx-auto">
            <div className="text-center mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Galeri Foto Picture Style</h3>
              <p className="text-[12px] sm:text-sm text-white/25">Klik untuk melihat lebih banyak contoh hasil</p>
            </div>
            <button
              onClick={() => setShowGallery(true)}
              className="group w-full relative overflow-hidden rounded-xl border border-white/[0.07] hover:border-white/[0.15] transition-all bg-[#0c0c0c] hover:bg-white/[0.04] p-1.5 sm:p-2"
            >
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#111]">
                  <Image
                    src="/canonstyle/fuji-natura-after.webp"
                    alt="Gallery preview 1"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#111]">
                  <Image
                    src="/canonstyle/kodak-ektar-after.webp"
                    alt="Gallery preview 2"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#111]">
                  <Image
                    src="/canonstyle/puretone-after.webp"
                    alt="Gallery preview 3"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#111]">
                  <Image
                    src="/canonstyle/kodak-satin-after.webp"
                    alt="Gallery preview 4"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                    <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mb-1 sm:mb-2" />
                    <span className="text-white font-semibold text-xs sm:text-sm">Lihat Semua</span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold">Keunggulan</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">Kenapa Picture Style Ini Spesial</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Showcase */}
      <section id="showcase" className="py-14 sm:py-20 px-4 sm:px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold">Before & After</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mt-2 mb-3">
              Lihat Perbedaannya
            </h2>
            <p className="text-sm sm:text-base text-white/30">
              Geser untuk membandingkan Before & After
            </p>
          </div>

          <div className="bg-[#0c0c0c] rounded-xl border border-white/[0.07] p-3 sm:p-4 md:p-8">
            {/* Style Name */}
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mb-1.5 sm:mb-2 text-white">{currentStyle.name}</h3>
              <p className="text-[13px] sm:text-sm text-white/30">{currentStyle.description}</p>
            </div>

            {/* Image Comparison Slider */}
            <div
              className="relative aspect-[3/4] max-w-2xl mx-auto rounded-xl overflow-hidden mb-5 sm:mb-6 bg-[#111] select-none touch-none"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchMove={handleTouchMove}
            >
              {/* Before Image (Full) */}
              <div className="absolute inset-0">
                <Image
                  src={currentStyle.beforeImage}
                  alt={`${currentStyle.name} - Before`}
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="relative w-full h-full bg-[#111] flex items-center justify-center">
                          <div class="text-center">
                            <p class="text-white/30">Before - Original</p>
                            <p class="text-white/15 text-sm mt-2">Tambahkan: ${currentStyle.beforeImage.split('/').pop()}</p>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />
              </div>

              {/* After Image (Clipped) */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
              >
                <Image
                  src={currentStyle.afterImage}
                  alt={`${currentStyle.name} - After`}
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="relative w-full h-full bg-[#111] flex items-center justify-center">
                          <div class="text-center">
                            <p class="text-white/40">After - ${currentStyle.name}</p>
                            <p class="text-white/20 text-sm mt-2">Tambahkan: ${currentStyle.afterImage.split('/').pop()}</p>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize pointer-events-none z-10"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-2xl flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform active:scale-95">
                  <div className="flex gap-1">
                    <div className="w-0.5 h-4 sm:h-5 bg-black"></div>
                    <div className="w-0.5 h-4 sm:h-5 bg-black"></div>
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full text-[11px] sm:text-sm pointer-events-none z-10 text-white/40">
                Before
              </div>
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full text-[11px] sm:text-sm pointer-events-none z-10 text-white/40">
                After
              </div>
            </div>

            {/* Slider Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="w-full h-1.5 sm:h-2 bg-white/[0.06] rounded-lg appearance-none cursor-pointer mb-5 sm:mb-6"
              style={{
                background: `linear-gradient(to right, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.06) ${sliderPosition}%, rgba(245,158,11,0.3) ${sliderPosition}%, rgba(245,158,11,0.3) 100%)`
              }}
            />

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevStyle}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-auto md:px-6 md:py-3 bg-[#060606] hover:bg-white/[0.04] rounded-xl transition-all border border-white/[0.07] group hover:border-white/[0.15]"
                aria-label="Previous style"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden md:inline ml-2 text-[13px]">Previous</span>
              </button>

              <div className="flex gap-1.5 sm:gap-2">
                {pictureStyles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentStyleIndex(index);
                      setSliderPosition(50);
                    }}
                    className={`h-1.5 sm:h-2 rounded-full transition-all ${
                      index === currentStyleIndex
                        ? 'bg-amber-500 w-6 sm:w-8'
                        : 'w-1.5 sm:w-2 bg-white/[0.1] hover:bg-white/[0.2]'
                    }`}
                    aria-label={`Go to style ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextStyle}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-auto md:px-6 md:py-3 bg-[#060606] hover:bg-white/[0.04] rounded-xl transition-all border border-white/[0.07] group hover:border-white/[0.15]"
                aria-label="Next style"
              >
                <span className="hidden md:inline mr-2 text-[13px]">Next</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Note */}
          <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-[#0c0c0c] border border-white/[0.07] rounded-xl flex items-start gap-3 hover:border-white/[0.15] transition-colors">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-[12px] sm:text-sm text-white/30">
              <strong className="text-white/50">Catatan:</strong> Ini hanya preview 8 dari 48 Picture Style yang tersedia.
              Setiap style memiliki karakter unik yang bisa disesuaikan.
            </p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold">Paket Lengkap</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mt-2 mb-3 sm:mb-4">
              Apa yang Anda Dapatkan?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              "48 File Picture Style (.pf3)",
              "Kompatibel dengan semua kamera Canon yang support custom Picture Style"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-[#0c0c0c] rounded-xl border border-white/[0.07]">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-amber-500/15 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
                </div>
                <span className="text-[13px] sm:text-sm text-white/35">{item}</span>
              </div>
            ))}
          </div>

          {/* Complete File List Dropdown */}
          <div className="mt-6 sm:mt-8">
            <button
              onClick={() => setShowFileList(!showFileList)}
              className="w-full p-4 sm:p-6 bg-[#0c0c0c] hover:bg-white/[0.04] border border-white/[0.07] hover:border-white/[0.15] rounded-xl transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
                  <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                </div>
                <div className="text-left">
                  <div className="text-sm sm:text-base font-semibold text-white">Lihat Daftar Lengkap 48 Picture Style</div>
                  <div className="text-[11px] sm:text-sm text-white/25">Klik untuk melihat semua file yang termasuk</div>
                </div>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-white/25 transition-transform ${showFileList ? 'rotate-90' : ''}`}
              />
            </button>

            {showFileList && (
              <div className="mt-3 sm:mt-4 p-4 sm:p-6 bg-[#0c0c0c] border border-white/[0.07] rounded-xl">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {pictureStyleFiles.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold text-amber-400 text-[13px] sm:text-sm mb-2 sm:mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                        {category.category}
                        <span className="text-white/15 text-[11px] sm:text-sm font-normal">({category.files.length})</span>
                      </h4>
                      <ul className="space-y-1 sm:space-y-1.5 pl-4">
                        {category.files.map((file, fileIndex) => (
                          <li key={fileIndex} className="text-[12px] sm:text-sm text-white/30 flex items-start gap-2">
                            <span className="text-amber-500/30 mt-1">•</span>
                            <span>{file}.pf3</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/[0.06] text-center">
                  <p className="text-white/35 text-[12px] sm:text-sm">
                    <strong className="text-amber-400">Total: 48 files</strong> - Semua file dalam format .pf3 siap diinstall ke kamera Canon Anda
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Camera Compatibility */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold">Kompatibilitas</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mt-2 mb-3 sm:mb-4">
              Kamera yang Didukung
            </h2>
            <p className="text-sm sm:text-base text-white/30">
              Support hampir semua kamera Canon modern
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {compatibleCameras.map((camera, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 bg-[#0c0c0c] rounded-xl border border-white/[0.07] hover:border-white/[0.15] transition-all"
              >
                <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2 text-amber-400">{camera.series}</h3>
                <p className="text-[13px] sm:text-sm text-white/30">{camera.models}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-[#0c0c0c] border border-white/[0.07] rounded-xl">
            <p className="text-center text-[13px] sm:text-sm text-white/30">
              <strong className="text-white/50">Tidak yakin kamera Anda kompatibel?</strong>
              <br />
              Cek apakah ada menu <span className="text-amber-400">User Def. 1, 2, 3</span> di Picture Style settings.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold">FAQ</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mt-2 mb-3 sm:mb-4">
              Yang Sering Ditanya
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqItems.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isExpanded={expandedFaq === index}
                onToggle={() => setExpandedFaq(expandedFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Purchase Section */}
      <section id="beli" className="relative border-t border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent pointer-events-none" />
        <div className="relative py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#0c0c0c] rounded-xl border border-white/[0.07] p-6 sm:p-8 md:p-12 text-center">
              <span className="inline-block mb-5 sm:mb-6 px-3 py-1.5 bg-amber-500/15 rounded-md text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                Penawaran Terbatas
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                Dapatkan 48 Picture Style
              </h2>

              <div className="mb-5 sm:mb-6">
                <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-amber-400 mb-2">
                  Rp 135.000
                </div>
                <p className="text-[13px] text-white/25">One Time Purchase</p>
              </div>

              <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 text-left max-w-md mx-auto">
                {[
                  "48 Picture Style premium (.pf3)",
                  "Support semua kamera Canon"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-[13px] sm:text-sm text-white/35">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://amlo-life.myr.id/pl/48-canon-picture-style-premium/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-amber-500 hover:bg-amber-400 rounded-xl font-bold text-base sm:text-lg text-black shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_-5px_rgba(245,158,11,0.5)] transition-all"
              >
                <Download className="w-5 h-5" />
                Beli Sekarang
              </a>

              <p className="mt-5 sm:mt-6 text-[11px] sm:text-[12px] text-white/15">
                Pembayaran aman melalui transfer bank atau e-wallet
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {showGallery && (
        <div
          className="fixed inset-0 z-50 bg-[#060606]/95 backdrop-blur-xl overflow-y-auto overscroll-contain"
          onClick={() => setShowGallery(false)}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setShowGallery(false)}
              className="fixed top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-[#0c0c0c] hover:bg-white/[0.06] border border-white/[0.07] rounded-xl flex items-center justify-center transition-all z-50"
              aria-label="Close gallery"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Gallery Header */}
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold">Galeri</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mt-2 mb-2">
                Galeri Foto Picture Style
              </h2>
              <p className="text-[13px] sm:text-sm text-white/30">
                Contoh hasil foto pakai berbagai picture style
              </p>
            </div>

            {/* Gallery by Category */}
            <div className="space-y-12 sm:space-y-16">
              {galleryImages.map((gallery, galleryIndex) => (
                gallery.images.length > 0 && (
                  <div key={galleryIndex}>
                    <div className="mb-4 sm:mb-6">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-amber-400 mb-2 tracking-tight">
                        {gallery.styleName}
                      </h3>
                      <div className="h-0.5 w-16 sm:w-20 bg-amber-500/30 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                      {gallery.images.map((imageSrc, imageIndex) => (
                        <div
                          key={imageIndex}
                          className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#0c0c0c] border border-white/[0.07] group cursor-pointer hover:border-white/[0.15] transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Image
                            src={imageSrc}
                            alt={`${gallery.styleName} example ${imageIndex + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>

            {/* Empty State */}
            {galleryImages.length === 0 && (
              <div className="text-center py-16 sm:py-20">
                <Camera className="w-12 h-12 sm:w-16 sm:h-16 text-white/10 mx-auto mb-4" />
                <p className="text-white/30 text-base sm:text-lg">
                  Belum ada foto di galeri
                </p>
                <p className="text-white/15 text-[12px] sm:text-sm mt-2">
                  Tambahkan foto ke folder: /canonstyle/gallery/[nama-picture-style]/
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <PixelasLogo size={24} />
                <span className="text-sm font-bold text-white">Pixelas</span>
              </div>
              <p className="text-[13px] text-white/25 max-w-md leading-relaxed">
                Canon Picture Style Package - Transformasi foto digital Anda dengan film look analog
              </p>
            </div>
            <Link href="/" className="text-[13px] text-white/30 hover:text-amber-400/80 transition-colors">
              Back to Store
            </Link>
          </div>
          <div className="border-t border-white/[0.04] mt-8 sm:mt-10 pt-6 sm:pt-8">
            <p className="text-[11px] text-white/15">&copy; {new Date().getFullYear()} Pixelas. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
