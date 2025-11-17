"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, Check, Download, Camera, Palette, Zap, ChevronLeft, ChevronRight, Info, X } from "lucide-react";
import Link from "next/link";

// Picture Style showcase data
const pictureStyles = [
  {
    id: 1,
    name: "Fuji Natura 1600",
    description: "Warna natural khas Fujifilm",
    beforeImage: "/canonstyle/fuji-natura-before.webp",
    afterImage: "/canonstyle/fuji-natura-after.webp"
  },
  {
    id: 2,
    name: "Kodak Ektar",
    description: "Warna yang kaya dan saturasi tinggi, sempurna untuk landscape dan portrait",
    beforeImage: "/canonstyle/kodak-ektar-before.webp",
    afterImage: "/canonstyle/kodak-ektar-after.webp"
  },
  {
    id: 3,
    name: "Puretone 2",
    description: "Tone bersih dengan reproduksi warna yang akurat",
    beforeImage: "/canonstyle/puretone-before.webp",
    afterImage: "/canonstyle/puretone-after.webp"
  },
  {
    id: 4,
    name: "Kodak Satin",
    description: "Hasil lembut dengan kontras yang seimbang",
    beforeImage: "/canonstyle/kodak-satin-before.webp",
    afterImage: "/canonstyle/kodak-satin-after.webp"
  },
  {
    id: 5,
    name: "Kodak Alaris",
    description: "Tone hangat dengan karakter film klasik yang timeless",
    beforeImage: "/canonstyle/kodak-alaris-before.webp",
    afterImage: "/canonstyle/kodak-alaris-after.webp"
  },
  {
    id: 6,
    name: "Clean Film",
    description: "Warna bersih dan natural dengan tone film yang elegan",
    beforeImage: "/canonstyle/clean-film-before.webp",
    afterImage: "/canonstyle/clean-film-after.webp"
  },
  {
    id: 7,
    name: "Fuji 5",
    description: "Karakter warna Fujifilm dengan saturasi yang seimbang",
    beforeImage: "/canonstyle/fuji-5-before.webp",
    afterImage: "/canonstyle/fuji-5-after.webp"
  },
  {
    id: 8,
    name: "Silvergreen",
    description: "Tone hijau silver yang unik dan artistik",
    beforeImage: "/canonstyle/silvergreen-before.webp",
    afterImage: "/canonstyle/silvergreen-after.webp"
  }
];

const features = [
  {
    title: "57 Picture Style Premium",
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
    answer: "Anda akan mendapatkan 57 file Picture Style (.pf3) yang siap diinstall ke kamera."
  }
];

export default function CanonStylePage() {
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
  const [isBeforeView, setIsBeforeView] = useState(true);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState<Array<{styleName: string, images: string[]}>>([]);

  const currentStyle = pictureStyles[currentStyleIndex];

  const nextStyle = () => {
    setCurrentStyleIndex((prev) => (prev + 1) % pictureStyles.length);
    setSliderPosition(50);
  };

  const prevStyle = () => {
    setCurrentStyleIndex((prev) => (prev - 1 + pictureStyles.length) % pictureStyles.length);
    setSliderPosition(50);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

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

  // Preload all images on mount
  useEffect(() => {
    pictureStyles.forEach((style) => {
      const beforeImg = new window.Image();
      const afterImg = new window.Image();
      beforeImg.src = style.beforeImage;
      afterImg.src = style.afterImage;
    });
  }, []);

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
    <div className="min-h-screen bg-black text-white">
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali</span>
            </Link>
            <h1 className="text-xl font-bold">Canon Picture Style</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-500/30">
            <span className="text-sm md:text-base text-orange-400 font-semibold">57 Picture Style Premium</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent leading-tight">
            Film Look Analog
            <br />
            Langsung dari Kamera
          </h2>
          <p className="text-base md:text-xl text-white/60 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
            Berikan foto digital Anda warna dan karakter film analog legendaris langsung dari kamera. 
            Hemat waktu editing dengan hasil langsung dari kamera.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <a 
              href="#beli" 
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all text-center text-sm md:text-base"
            >
              Beli Sekarang - Rp 175.000
            </a>
            <a 
              href="#showcase" 
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white/5 border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-all text-center text-sm md:text-base"
            >
              Lihat Contoh Hasil
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-black to-orange-950/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-orange-500/50 transition-all text-center"
              >
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Showcase */}
      <section id="showcase" className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              Lihat Perbedaannya
            </h2>
            <p className="text-base md:text-xl text-white/60">
              Geser untuk membandingkan Before & After
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-4 md:p-8">
            {/* Style Name */}
            <div className="text-center mb-4 md:mb-6">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{currentStyle.name}</h3>
              <p className="text-sm md:text-base text-white/60">{currentStyle.description}</p>
            </div>

            {/* Image Comparison Slider */}
            <div 
              className="relative aspect-[3/4] max-w-2xl mx-auto rounded-2xl overflow-hidden mb-6 bg-white/5 select-none touch-none"
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
                    // Fallback to placeholder if image not found
                    const target = e.target as HTMLElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                          <div class="text-center">
                            <p class="text-white/40">Before - Original</p>
                            <p class="text-white/20 text-sm mt-2">Tambahkan: ${currentStyle.beforeImage.split('/').pop()}</p>
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
                    // Fallback to placeholder if image not found
                    const target = e.target as HTMLElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="relative w-full h-full bg-gradient-to-br from-orange-900 to-red-900 flex items-center justify-center">
                          <div class="text-center">
                            <p class="text-white/60">After - ${currentStyle.name}</p>
                            <p class="text-white/30 text-sm mt-2">Tambahkan: ${currentStyle.afterImage.split('/').pop()}</p>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />
              </div>

              {/* Slider Handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize pointer-events-none z-10"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing">
                  <div className="flex gap-1">
                    <div className="w-0.5 h-5 bg-black"></div>
                    <div className="w-0.5 h-5 bg-black"></div>
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-sm pointer-events-none z-10">
                Before
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-sm pointer-events-none z-10">
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
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer mb-6"
              style={{
                background: `linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) ${sliderPosition}%, rgba(249,115,22,0.3) ${sliderPosition}%, rgba(249,115,22,0.3) 100%)`
              }}
            />

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevStyle}
                className="flex items-center justify-center w-12 h-12 md:w-auto md:px-6 md:py-3 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden md:inline ml-2">Previous</span>
              </button>

              <div className="flex gap-2">
                {pictureStyles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentStyleIndex(index);
                      setSliderPosition(50);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentStyleIndex 
                        ? 'bg-orange-500 w-8' 
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to style ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextStyle}
                className="flex items-center justify-center w-12 h-12 md:w-auto md:px-6 md:py-3 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10"
                aria-label="Next"
              >
                <span className="hidden md:inline mr-2">Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Gallery Button - Better Placement */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowGallery(true)}
                className="group px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 rounded-2xl font-semibold transition-all flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-base font-bold">Lihat Galeri Foto</div>
                  <div className="text-xs text-white/60">Contoh hasil dari semua picture style</div>
                </div>
              </button>
            </div>
          </div>

          {/* Note */}
          <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-orange-200/80">
              <strong>Catatan:</strong> Ini hanya preview 8 dari 57 Picture Style yang tersedia. 
              Setiap style memiliki karakter unik yang bisa disesuaikan.
            </p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-orange-950/20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Apa yang Anda Dapatkan?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "57 File Picture Style (.pf3)",
              "Kompatibel dengan semua kamera Canon yang support custom Picture Style"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Camera Compatibility */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Kamera yang Didukung
            </h2>
            <p className="text-xl text-white/60">
              Support hampir semua kamera Canon modern
            </p>
          </div>

          <div className="space-y-4">
            {compatibleCameras.map((camera, index) => (
              <div 
                key={index}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              >
                <h3 className="text-xl font-bold mb-2 text-orange-400">{camera.series}</h3>
                <p className="text-white/60">{camera.models}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl">
            <p className="text-center text-white/80">
              <strong>Tidak yakin kamera Anda kompatibel?</strong>
              <br />
              Cek apakah ada menu <span className="text-orange-400">User Def. 1, 2, 3</span> di Picture Style settings.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-orange-950/20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Yang Sering Ditanya
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-all"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <ChevronRight 
                    className={`w-5 h-5 transition-transform ${
                      expandedFaq === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-white/60 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purchase Section */}
      <section id="beli" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-3xl border border-orange-500/30 p-8 md:p-12 text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
              <span className="font-bold">Penawaran Terbatas</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Dapatkan 57 Picture Style
            </h2>
            
            <div className="mb-6">
              <div className="text-5xl md:text-6xl font-bold text-orange-400 mb-2">
                Rp 175.000
              </div>
              <p className="text-white/60">One Time Purchase</p>
            </div>

            <div className="space-y-3 mb-8 text-left max-w-md mx-auto">
              {[
                "57 Picture Style premium (.pf3)",
                "Support semua kamera Canon"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/6285183186370?text=Halo,%20saya%20ingin%20membeli%20Canon%20Picture%20Style%20Package"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all hover:scale-105"
            >
              <Download className="w-5 h-5" />
              Beli Sekarang via WhatsApp
            </a>

            <p className="mt-6 text-sm text-white/40">
              Pembayaran aman melalui transfer bank atau e-wallet
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {showGallery && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto overscroll-contain"
          onClick={() => setShowGallery(false)}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div className="container mx-auto px-4 py-20" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setShowGallery(false)}
              className="fixed top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all z-50"
              aria-label="Close gallery"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Gallery Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Galeri Foto Picture Style
              </h2>
              <p className="text-white/60">
                Contoh hasil foto pakai berbagai picture style
              </p>
            </div>

            {/* Gallery by Category */}
            <div className="max-w-7xl mx-auto space-y-16">
              {galleryImages.map((gallery, galleryIndex) => (
                gallery.images.length > 0 && (
                  <div key={galleryIndex}>
                    {/* Category Title */}
                    <div className="mb-6">
                      <h3 className="text-2xl md:text-3xl font-bold text-orange-400 mb-2">
                        {gallery.styleName}
                      </h3>
                      <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {gallery.images.map((imageSrc, imageIndex) => (
                        <div 
                          key={imageIndex}
                          className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white/5 group cursor-pointer"
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
              <div className="text-center py-20">
                <Camera className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/40 text-lg">
                  Belum ada foto di galeri
                </p>
                <p className="text-white/30 text-sm mt-2">
                  Tambahkan foto ke folder: /canonstyle/gallery/[nama-picture-style]/
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl text-center text-white/40">
          <p className="mb-2">© 2025 Pixelas Studio. All rights reserved.</p>
          <p className="text-sm">
            Canon Picture Style Package - Transformasi foto digital Anda dengan film look analog
          </p>
        </div>
      </footer>
    </div>
  );
}
