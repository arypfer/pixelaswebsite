import type { Metadata } from 'next';
import { Download, ArrowRight, Zap, ShieldCheck, Layers, Sparkles, MessageCircle, Play } from 'lucide-react';
import { PixelasLogo } from '@/components/PixelasLogo';

const BUY_URL = 'https://doss.co.id/products/myflow-ai-photo-culler-smart-saver-edition';
const WHATSAPP_URL = 'https://wa.me/62811121300';
const YOUTUBE_ID = 'snoLkPs2sYY';

export const metadata: Metadata = {
  title: 'MyFlow by DOSS | AI Photo Culler',
  description:
    'AI photo culler lokal untuk fotografer Indonesia. Pilih foto terbaik dari ribuan hasil shoot dalam hitungan menit, bukan jam. Mac & Windows.',
  openGraph: { images: ['/myflow/banner.webp'] },
};

const HIGHLIGHTS = [
  {
    icon: Zap,
    title: '±500 foto per menit',
    body: 'Di Mac Apple Silicon M4, wedding 1.500 foto selesai dipilah kira-kira 3 menit. Di Windows, makin cepat dengan GPU NVIDIA.',
  },
  {
    icon: ShieldCheck,
    title: '100% di komputer Anda',
    body: 'Foto klien tidak pernah di-upload. Tidak ada cloud, tidak ada server pihak ketiga. File asli tidak pernah dihapus atau dipindah.',
  },
  {
    icon: Layers,
    title: 'Langsung ke Lightroom',
    body: 'Rating dan label warna ditulis dalam format XMP standar industri. Buka foldernya di Lightroom, hasil seleksi langsung terbaca.',
  },
  {
    icon: Sparkles,
    title: 'Belajar selera Anda',
    body: 'Setiap koreksi di halaman review dipelajari, jadi hasilnya makin mendekati gaya Anda. Proses belajarnya juga terjadi di komputer Anda.',
  },
];

const STEPS = [
  { title: 'Pilih folder', body: 'Pilih folder foto, atau langsung dari kartu memori.' },
  { title: 'Pilih jenis shoot', body: 'Wedding, portrait, event, olahraga, dan lainnya.' },
  { title: 'Biarkan MyFlow bekerja', body: 'AI menilai ketajaman, ekspresi wajah, mata terbuka, komposisi, dan estetika.' },
  { title: 'Periksa & ekspor', body: 'Setiap foto disertai alasan kenapa dipilih atau dibuang, lalu ekspor.' },
];

const SCREENS = [
  { src: '/myflow/screen-3.webp', caption: 'Atur persentase seleksi, sensitivitas blur, dan rejection gates' },
  { src: '/myflow/screen-5.webp', caption: 'Proses analisa AI berjalan offline di komputer Anda' },
  { src: '/myflow/screen-4.webp', caption: 'Hasil: Selected, Rejected, dan XMP siap untuk Lightroom' },
  { src: '/myflow/screen-1.webp', caption: 'Analog color profiles: Cineva, Nebula, Proxima, Vantage' },
  { src: '/myflow/screen-2.webp', caption: 'AI Profile untuk berbagai gaya editing' },
];

const FAQS = [
  {
    q: 'Apa itu MyFlow by DOSS?',
    a: 'Aplikasi seleksi foto otomatis untuk Mac dan Windows. Dengan bantuan AI, ribuan foto hasil pemotretan dipilah dalam hitungan menit: foto terbaik masuk ke Picks, yang meragukan ke Maybe, dan yang gagal (blur, mata terpejam, duplikat burst) ke Rejects. Anda tinggal memeriksa hasilnya.',
  },
  {
    q: 'Tersedia dalam bahasa apa?',
    a: 'Bahasa Indonesia dan Inggris, termasuk penjelasan alasan seleksi di setiap foto.',
  },
  {
    q: 'Apakah foto saya di-upload ke internet?',
    a: 'Tidak. Seluruh proses berjalan di komputer Anda sendiri. Foto klien tidak pernah keluar dari perangkat.',
  },
  {
    q: 'Apakah file asli saya aman?',
    a: 'Aman. MyFlow tidak pernah menghapus atau memindahkan file asli Anda. Hasil seleksi berupa salinan dan tanda rating; file sumber tidak disentuh sama sekali.',
  },
  {
    q: 'Bagaimana cara aktivasinya?',
    a: 'Setelah membeli, Anda menerima kode lisensi dari DOSS. Buka aplikasi, masukkan kode, selesai. Saat aktivasi perlu koneksi internet.',
  },
  {
    q: 'Lisensinya bagaimana?',
    a: 'Sekali bayar, berlaku selamanya. Bukan langganan, tidak ada biaya bulanan. Satu lisensi untuk satu perangkat.',
  },
  {
    q: 'Kalau ganti laptop?',
    a: 'Lisensi terikat ke satu perangkat. Untuk pindah ke komputer baru, silakan hubungi tim DOSS.',
  },
  {
    q: 'Update-nya bayar lagi?',
    a: 'Tidak. Pembaruan terpasang otomatis dan gratis.',
  },
];

const eyebrow = 'text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold';
const h2 = 'text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mt-2';
const card = 'bg-[#0c0c0c] border border-white/[0.07] rounded-xl hover:border-white/[0.15] transition-all duration-300';
const primaryBtn =
  'inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-black text-sm sm:text-base font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_-5px_rgba(245,158,11,0.5)] transition-all';
const secondaryBtn =
  'inline-flex items-center justify-center gap-3 bg-[#0c0c0c] hover:bg-white/[0.06] text-white border border-white/[0.07] hover:border-white/[0.15] text-sm sm:text-base font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-300';

export default function MyFlowPage() {
  return (
    <div className="bg-[#060606] min-h-screen text-white overflow-x-hidden noise">
      {/* --- NAV --- */}
      <header className="sticky top-0 z-50 bg-[#060606]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <PixelasLogo size={24} />
            <span className="text-sm font-bold">Pixelas</span>
          </a>
          <a
            href={BUY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-[13px] font-bold px-4 py-2 rounded-lg transition-colors"
          >
            <Download size={16} /> Download
          </a>
        </div>
      </header>

      {/* --- HERO --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        <img
          src="/myflow/banner.webp"
          alt="MyFlow: Tools AI untuk sortir ribuan foto dalam hitungan menit"
          width={1600}
          height={533}
          className="w-full h-auto rounded-xl border border-white/[0.07]"
        />
        <div className="py-12 sm:py-20 text-center max-w-3xl mx-auto">
          <span className={eyebrow}>DOSS AI Suite · AI Photo Culler</span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mt-3">
            MyFlow <span className="font-display font-normal text-amber-300">by DOSS</span>
          </h1>
          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-white/40 leading-relaxed">
            AI photo culler lokal yang membantu fotografer Indonesia memilih foto terbaik dari ribuan hasil shoot,
            dalam hitungan menit, bukan jam. Cocok untuk wedding, event, dan studio yang setiap hari berhadapan dengan
            2.000–5.000 RAW per session.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href={BUY_URL} target="_blank" rel="noopener noreferrer" className={`w-full sm:w-auto ${primaryBtn}`}>
              <Download size={20} /> Download Now
            </a>
            <a href="#tutorial" className={`w-full sm:w-auto ${secondaryBtn}`}>
              <Play size={20} /> Tonton Tutorial
            </a>
          </div>
          <p className="mt-4 text-[12px] text-white/25">Mac & Windows · Lisensi seumur hidup · Update gratis</p>
        </div>
      </section>

      {/* --- HIGHLIGHTS --- */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
              <div key={title} className={`${card} p-5 sm:p-6`}>
                <Icon className="w-5 h-5 text-amber-400 mb-4" />
                <h3 className="text-base font-semibold mb-2">{title}</h3>
                <p className="text-[13px] text-white/30 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-10 sm:mb-16">
            <span className={eyebrow}>Cara pakai</span>
            <h2 className={h2}>
              Empat langkah, <span className="font-display font-normal text-amber-300">selesai.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {STEPS.map((step, i) => (
              <div key={step.title} className={`${card} p-5 sm:p-6 group`}>
                <div className="text-3xl sm:text-4xl font-extrabold text-white/[0.06] mb-3 sm:mb-4 group-hover:text-amber-500/20 transition-colors">
                  0{i + 1}
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-[13px] text-white/30 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SCREENSHOTS --- */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-10 sm:mb-16">
            <span className={eyebrow}>Tampilan aplikasi</span>
            <h2 className={h2}>Lihat MyFlow bekerja</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCREENS.map((s, i) => (
              <figure key={s.src} className={`${card} overflow-hidden ${i === 0 ? 'md:col-span-2' : ''}`}>
                <img src={s.src} alt={s.caption} width={940} height={586} loading="lazy" className="w-full h-auto" />
                <figcaption className="px-4 py-3 text-[13px] text-white/40">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* --- TUTORIAL --- */}
      <section className="border-t border-white/[0.06] scroll-mt-16" id="tutorial">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-10 sm:mb-12">
            <span className={eyebrow}>Tutorial</span>
            <h2 className={h2}>Tutorial pakai MyFlow</h2>
          </div>
          <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/[0.07] bg-[#0c0c0c]">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1`}
              title="Tutorial pakai MyFlow"
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* --- SPECS --- */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`${card} p-6`}>
            <span className={eyebrow}>Format didukung</span>
            <ul className="mt-4 space-y-2 text-[14px] text-white/50 leading-relaxed">
              <li>JPEG, PNG, TIFF</li>
              <li>RAW semua merek besar: Canon (CR2/CR3), Nikon (NEF), Sony (ARW), Fujifilm (RAF), DNG, dan lainnya</li>
              <li>HEIC (foto iPhone)</li>
              <li className="text-white/30">Pasangan RAW+JPG otomatis dikenali sebagai satu foto.</li>
            </ul>
          </div>
          <div className={`${card} p-6`}>
            <span className={eyebrow}>Kebutuhan sistem</span>
            <ul className="mt-4 space-y-2 text-[14px] text-white/50 leading-relaxed">
              <li>Mac: Apple Silicon (M1 ke atas) atau Intel</li>
              <li>Windows: 64-bit, GPU NVIDIA opsional</li>
              <li className="text-white/30">
                Internet hanya untuk aktivasi lisensi, unduhan komponen AI pertama kali, dan update. Seleksi foto
                sepenuhnya offline.
              </li>
            </ul>
          </div>
          <div className={`${card} p-6 border-amber-500/30`}>
            <span className="text-[11px] uppercase tracking-[0.2em] text-amber-400/80 font-semibold">Bonus</span>
            <p className="mt-4 text-2xl font-extrabold">24 color preset</p>
            <p className="mt-2 text-[14px] text-white/40 leading-relaxed">
              Preset profesional eksklusif (Cineva, Nebula, Proxima, Vantage) yang langsung ter-apply di Lightroom
              Classic.
            </p>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-10 sm:mb-12">
            <span className={eyebrow}>FAQ</span>
            <h2 className={h2}>Pertanyaan umum</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className={`${card} group px-5 py-4`}>
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-[15px]">
                  {f.q}
                  <span className="text-amber-400 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-[14px] text-white/40 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="relative overflow-hidden border-t border-white/[0.06]" id="download">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 py-16 sm:py-24 md:py-32 relative z-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3 sm:mb-4">
            Siap meningkatkan <span className="font-display font-normal text-amber-300">produktivitas?</span>
          </h2>
          <p className="text-white/30 text-sm sm:text-lg mb-8 sm:mb-12 max-w-lg mx-auto">
            Dapatkan lisensi seumur hidup MyFlow dengan klik tombol di bawah ini.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href={BUY_URL} target="_blank" rel="noopener noreferrer" className={`w-full sm:w-auto ${primaryBtn}`}>
              <Download size={20} /> Download Now
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`w-full sm:w-auto ${secondaryBtn}`}>
              <MessageCircle size={20} /> Support 0811-121-300
            </a>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <PixelasLogo size={24} />
            <span className="text-sm font-bold">Pixelas</span>
          </div>
          <a href="/" className="inline-flex items-center gap-2 text-[13px] text-white/30 hover:text-amber-400/80 transition-colors">
            Back to Store <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </div>
  );
}
