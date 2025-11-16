"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Check, Download, Camera, Palette, Zap, ChevronLeft, ChevronRight, Info } from "lucide-react";
import Link from "next/link";

// Picture Style showcase data
const pictureStyles = [
  {
    id: 1,
    name: "Kodak Ektar",
    description: "Warna yang kaya dan saturasi tinggi, sempurna untuk landscape dan portrait",
    beforeImage: "/canonstyle/kodak-ektar-before.jpg",
    afterImage: "/canonstyle/kodak-ektar-after.jpg"
  },
  {
    id: 2,
    name: "Kodak Alaris",
    description: "Tone hangat dengan karakter film klasik yang timeless",
    beforeImage: "/canonstyle/kodak-alaris-before.jpg",
    afterImage: "/canonstyle/kodak-alaris-after.jpg"
  },
  {
    id: 3,
    name: "Kodak Satin",
    description: "Hasil lembut dengan kontras yang seimbang",
    beforeImage: "/canonstyle/kodak-satin-before.jpg",
    afterImage: "/canonstyle/kodak-satin-after.jpg"
  },
  {
    id: 4,
    name: "Fuji Natura 1600",
    description: "Grain halus dengan warna natural yang khas Fujifilm",
    beforeImage: "/canonstyle/fuji-natura-before.jpg",
    afterImage: "/canonstyle/fuji-natura-after.jpg"
  },
  {
    id: 5,
    name: "Puretone 2",
    description: "Tone bersih dengan reproduksi warna yang akurat",
    beforeImage: "/canonstyle/puretone-before.jpg",
    afterImage: "/canonstyle/puretone-after.jpg"
  }
];

const features = [
  {
    icon: Camera,
    title: "57 Picture Style Premium",
    description: "Koleksi lengkap picture style yang dirancang khusus untuk fotografer profesional"
  },
  {
    icon: Palette,
    title: "Film Look Authentic",
    description: "Hasil warna yang terinspirasi dari film analog legendaris"
  },
  {
    icon: Zap,
    title: "Langsung dari Kamera",
    description: "Hemat waktu editing dengan hasil SOOC (Straight Out Of Camera) yang stunning"
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
    answer: "Picture Style adalah profil warna yang dapat diinstal ke kamera Canon untuk menghasilkan warna dan kontras tertentu langsung dari kamera. Setiap kamera Canon memiliki 3 slot User Defined yang dapat diisi dengan custom picture style."
  },
  {
    question: "Bagaimana cara menginstall Picture Style?",
    answer: "Anda memerlukan kabel USB Canon dan software Canon EOS Utility. Hubungkan kamera ke komputer, buka EOS Utility, dan load file .pf2 atau .pf3 ke slot User Def 1, 2, atau 3 di kamera Anda."
  },
  {
    question: "Apakah Picture Style bekerja untuk foto RAW?",
    answer: "Picture Style tidak mengubah file RAW secara permanen, namun mempengaruhi preview dan histogram di kamera. Anda dapat menerapkan Picture Style ke file RAW menggunakan Canon Digital Photo Professional (DPP) dalam color space sRGB."
  },
  {
    question: "Apakah Picture Style bekerja untuk video?",
    answer: "Ya! Picture Style akan langsung diterapkan ke video dan JPEG yang diambil. Setelah video atau JPEG diambil, picture style yang dipilih tidak dapat diubah, hanya bisa dilakukan color grading tambahan."
  },
  {
    question: "Bisakah saya mengubah setting Picture Style?",
    answer: "Tentu! Anda bebas menyesuaikan parameter seperti Contrast, Saturation, Color Tone, dan Sharpness sesuai selera dan kebutuhan Anda."
  },
  {
    question: "Apa yang saya dapatkan setelah membeli?",
    answer: "Anda akan mendapatkan 57 file Picture Style (.pf2/.pf3), panduan instalasi lengkap dalam Bahasa Indonesia, dan tips penggunaan untuk hasil maksimal."
  }
];

export default function CanonStylePage() {
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
  const [isBeforeView, setIsBeforeView] = useState(true);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

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

  return (
    <div className="min-h-screen bg-black text-white">
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
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-500/30">
            <span className="text-orange-400 font-semibold">57 Picture Style Premium</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
            Film Look Analog
            <br />
            Langsung dari Kamera Canon
          </h2>
          <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto">
            Transformasi foto digital Anda dengan warna dan karakter film analog legendaris. 
            Hemat waktu editing dengan hasil SOOC yang memukau.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#beli" 
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
            >
              Beli Sekarang - Rp 175.000
            </a>
            <a 
              href="#showcase" 
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              Lihat Contoh Hasil
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-orange-950/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-orange-500/50 transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Showcase */}
      <section id="showcase" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Lihat Perbedaannya
            </h2>
            <p className="text-xl text-white/60">
              Geser untuk membandingkan Before & After
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-4 md:p-8">
            {/* Style Name */}
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold mb-2">{currentStyle.name}</h3>
              <p className="text-white/60">{currentStyle.description}</p>
            </div>

            {/* Image Comparison Slider */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-white/5">
              {/* Before Image (Full) */}
              <div className="absolute inset-0">
                <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/40">Before - Original</p>
                    <p className="text-white/20 text-sm mt-2">Gambar contoh akan ditambahkan</p>
                  </div>
                </div>
              </div>

              {/* After Image (Clipped) */}
              <div 
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <div className="relative w-full h-full bg-gradient-to-br from-orange-900 to-red-900 flex items-center justify-center">
                  <div className="text-center">
                    <Palette className="w-16 h-16 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60">After - {currentStyle.name}</p>
                    <p className="text-white/30 text-sm mt-2">Gambar contoh akan ditambahkan</p>
                  </div>
                </div>
              </div>

              {/* Slider Handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-0.5 h-4 bg-black"></div>
                    <div className="w-0.5 h-4 bg-black"></div>
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-sm">
                Before
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-sm">
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
                className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Sebelumnya</span>
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
                  />
                ))}
              </div>

              <button
                onClick={nextStyle}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10"
              >
                <span>Selanjutnya</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Note */}
          <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-orange-200/80">
              <strong>Catatan:</strong> Ini hanya menampilkan 5 dari 57 Picture Style yang tersedia. 
              Setiap style memiliki karakteristik unik yang dapat disesuaikan dengan kebutuhan Anda.
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
              "57 File Picture Style (.pf2 & .pf3)",
              "Kompatibel dengan semua kamera Canon yang support custom PS",
              "Panduan instalasi lengkap dalam Bahasa Indonesia",
              "Tips penggunaan untuk hasil maksimal",
              "Update gratis jika ada perbaikan",
              "Support via WhatsApp untuk bantuan instalasi"
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
              Kompatibilitas Kamera
            </h2>
            <p className="text-xl text-white/60">
              Mendukung hampir semua kamera Canon modern
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
              Cek apakah kamera Anda memiliki menu <span className="text-orange-400">User Def. 1, 2, 3</span> di Picture Style settings.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-orange-950/20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Pertanyaan yang Sering Ditanyakan
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
              <p className="text-white/60">Pembayaran satu kali, milik selamanya</p>
            </div>

            <div className="space-y-3 mb-8 text-left max-w-md mx-auto">
              {[
                "57 Picture Style premium",
                "Panduan instalasi lengkap",
                "Update gratis selamanya",
                "Support via WhatsApp"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20membeli%20Canon%20Picture%20Style%20Package"
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

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl text-center text-white/40">
          <p className="mb-2">© 2024 Pixelas Studio. All rights reserved.</p>
          <p className="text-sm">
            Canon Picture Style Package - Transformasi foto digital Anda dengan film look analog
          </p>
        </div>
      </footer>
    </div>
  );
}
