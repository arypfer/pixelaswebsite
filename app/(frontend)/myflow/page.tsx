import type { Metadata } from 'next';
import {
  Download,
  ArrowRight,
  ShieldCheck,
  Layers,
  Sparkles,
  Languages,
  MessageCircle,
  Play,
  Check,
  HelpCircle,
  X,
} from 'lucide-react';
import { PixelasLogo } from '@/components/PixelasLogo';
import { StickyBuyBar } from '../products/[slug]/StickyBuyBar';

const BUY_URL = 'https://doss.co.id/products/myflow-ai-photo-culler-smart-saver-edition?sca_ref=10348027.41ha7Ug4pC9xxmV';
const WHATSAPP_URL = 'https://wa.me/62811121300';
const YOUTUBE_ID = 'snoLkPs2sYY';

export const metadata: Metadata = {
  title: 'MyFlow by DOSS | AI Photo Culler',
  description:
    'AI photo culler lokal untuk fotografer Indonesia. Pilih foto terbaik dari ribuan hasil shoot dalam hitungan menit, bukan jam. Mac & Windows.',
  openGraph: { images: ['/myflow/banner.webp'] },
};

const STATS = [
  { value: '±500', label: 'foto per menit', note: 'Mac Apple Silicon M4' },
  { value: '3 mnt', label: 'untuk 1.500 foto', note: 'satu wedding penuh' },
  { value: '100%', label: 'offline', note: 'foto tidak pernah di-upload' },
  { value: '24', label: 'color preset', note: 'bonus untuk Lightroom' },
];

const BUCKETS = [
  { icon: Check, name: 'Picks', color: 'text-emerald-400', ring: 'border-emerald-500/30 bg-emerald-500/[0.06]', body: 'Foto terbaik: tajam, mata terbuka, ekspresi dan komposisi paling kuat.' },
  { icon: HelpCircle, name: 'Maybe', color: 'text-amber-400', ring: 'border-amber-500/30 bg-amber-500/[0.06]', body: 'Foto yang meragukan, menunggu keputusan Anda saat review.' },
  { icon: X, name: 'Rejects', color: 'text-red-400', ring: 'border-red-500/30 bg-red-500/[0.06]', body: 'Foto gagal: blur, mata terpejam, dan duplikat burst.' },
];

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: 'Privasi foto klien terjaga',
    body: 'Seluruh proses berjalan di komputer Anda. Tidak ada cloud, tidak ada server pihak ketiga. File asli tidak pernah dihapus atau dipindah.',
  },
  {
    icon: Layers,
    title: 'Langsung ke Lightroom',
    body: 'Rating dan label warna ditulis dalam format XMP standar industri. Buka foldernya di Lightroom, hasil seleksi langsung terbaca.',
  },
  {
    icon: Sparkles,
    title: 'Belajar selera Anda',
    body: 'Setiap koreksi di halaman review dipelajari, jadi hasilnya makin mendekati gaya Anda. Proses belajarnya juga di komputer Anda.',
  },
  {
    icon: Languages,
    title: 'Bahasa Indonesia & Inggris',
    body: 'Termasuk penjelasan alasan seleksi di setiap foto, jadi Anda tahu kenapa sebuah foto dipilih atau dibuang.',
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
  { src: '/myflow/screen-5.webp', caption: 'Analisa AI berjalan offline di komputer Anda' },
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
    q: 'Seberapa cepat prosesnya?',
    a: 'Di Mac dengan chip Apple Silicon M4, sekitar 500 foto per menit. Pemotretan wedding 1.500 foto selesai dipilah kira-kira 3 menit. Di Windows, kecepatan mengikuti spesifikasi komputer: dengan GPU NVIDIA lebih cepat, tanpa GPU pun tetap jalan.',
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

const eyebrow = 'text-[11px] uppercase tracking-[0.2em] text-white/30 font-semibold';
const h2 = 'text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mt-3';
const accent = 'font-display font-normal text-amber-300';
const card = 'bg-[#0c0c0c] border border-white/[0.07] rounded-2xl hover:border-white/[0.15] transition-all duration-300';
const primaryBtn =
  'inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-black text-sm sm:text-base font-bold px-7 sm:px-9 py-4 rounded-xl shadow-[0_0_40px_-8px_rgba(245,158,11,0.6)] hover:shadow-[0_0_50px_-6px_rgba(245,158,11,0.7)] hover:-translate-y-0.5 transition-all';
const secondaryBtn =
  'inline-flex items-center justify-center gap-3 bg-white/[0.03] hover:bg-white/[0.07] text-white border border-white/[0.1] hover:border-white/[0.2] text-sm sm:text-base font-semibold px-7 sm:px-9 py-4 rounded-xl transition-all duration-300';

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
          <nav className="hidden md:flex items-center gap-8 text-[13px] text-white/40">
            <a href="#fitur" className="hover:text-white transition-colors">Fitur</a>
            <a href="#tutorial" className="hover:text-white transition-colors">Tutorial</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
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

      {/* --- HERO: headline → promo video → download --- */}
      <section className="relative">
        <div className="absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.12),transparent_60%)] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-16 sm:pb-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-1.5 text-[12px] text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            MyFlow by DOSS · AI Photo Culler
          </span>
          <h1 className="mt-6 text-[40px] leading-[1.05] sm:text-6xl md:text-7xl font-extrabold tracking-tight">
            Sortir ribuan foto
            <br />
            dalam <span className={accent}>hitungan menit.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-white/45 leading-relaxed max-w-2xl mx-auto">
            Habis motret, ribuan foto numpuk minta disortir? Biar MyFlow yang kerjain. Foto blur, duplikat, dan burst
            kepisah otomatis, Anda tinggal review.
          </p>

          <div className="mt-10 sm:mt-14 rounded-2xl p-[1px] bg-gradient-to-b from-white/[0.18] to-white/[0.03] shadow-[0_40px_120px_-30px_rgba(245,158,11,0.35)]">
            <video
              src="/myflow/promo.mp4"
              poster="/myflow/promo-poster.webp"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              className="w-full aspect-video rounded-2xl bg-black"
            />
          </div>
          <p className="mt-3 text-[12px] text-white/25">Nyalakan suara untuk mendengar penjelasannya</p>

          <div id="hero-buy" className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href={BUY_URL} target="_blank" rel="noopener noreferrer" className={`w-full sm:w-auto ${primaryBtn}`}>
              <Download size={20} /> Download Now
            </a>
            <a href="#tutorial" className={`w-full sm:w-auto ${secondaryBtn}`}>
              <Play size={20} /> Tonton Tutorial
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-white/35">
            {['Mac & Windows', 'Sekali bayar, berlaku selamanya', 'Update gratis'].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-amber-400" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- STATS --- */}
      <section className="border-y border-white/[0.06] bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`py-8 sm:py-10 px-2 sm:px-6 text-center border-white/[0.06] ${i % 2 ? 'border-l' : ''} ${i > 1 ? 'border-t md:border-t-0' : ''} ${i === 2 ? 'md:border-l' : ''}`}
            >
              <div className="text-3xl sm:text-5xl font-extrabold tracking-tight text-amber-300">{s.value}</div>
              <div className="mt-2 text-[14px] font-semibold text-white/80">{s.label}</div>
              <div className="mt-1 text-[12px] text-white/30">{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PICKS / MAYBE / REJECTS --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <span className={eyebrow}>Cara kerjanya</span>
          <h2 className={h2}>
            AI memilah, <span className={accent}>Anda tinggal memeriksa.</span>
          </h2>
          <p className="mt-5 text-white/40 leading-relaxed">
            Cocok untuk wedding, event, dan studio yang setiap hari berhadapan dengan 2.000–5.000 RAW per session. Tidak
            perlu lagi menyortir satu per satu berjam-jam.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BUCKETS.map(({ icon: Icon, name, color, ring, body }) => (
            <div key={name} className={`rounded-2xl border p-6 sm:p-8 ${ring}`}>
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-black/40 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className={`mt-5 text-2xl font-extrabold ${color}`}>{name}</h3>
              <p className="mt-2 text-[14px] text-white/50 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- BANNER --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <a href={BUY_URL} target="_blank" rel="noopener noreferrer" className="block group">
          <img
            src="/myflow/banner.webp"
            alt="Tools AI untuk sortir ribuan foto dalam hitungan menit"
            width={1600}
            height={533}
            loading="lazy"
            className="w-full h-auto rounded-2xl border border-white/[0.07] group-hover:border-white/[0.15] transition-colors"
          />
        </a>
      </section>

      {/* --- HIGHLIGHTS --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 scroll-mt-16" id="fitur">
        <div className="text-center mb-12 sm:mb-16">
          <span className={eyebrow}>Kenapa MyFlow</span>
          <h2 className={h2}>
            Dibuat untuk <span className={accent}>fotografer Indonesia.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
            <div key={title} className={`${card} p-6 sm:p-8 flex gap-5`}>
              <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-[14px] text-white/40 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- STEPS + SCREENSHOTS --- */}
      <section className="border-t border-white/[0.06] bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center mb-12 sm:mb-16">
            <span className={eyebrow}>Cara pakai</span>
            <h2 className={h2}>
              Empat langkah, <span className={accent}>selesai.</span>
            </h2>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {STEPS.map((step, i) => (
              <li key={step.title} className={`${card} p-6`}>
                <div className="w-9 h-9 rounded-full bg-amber-500 text-black font-extrabold flex items-center justify-center text-sm">
                  {i + 1}
                </div>
                <h3 className="mt-5 text-base sm:text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-[13px] text-white/40 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCREENS.map((s, i) => (
              <figure key={s.src} className={`${card} overflow-hidden ${i === 0 ? 'md:col-span-2' : ''}`}>
                <img src={s.src} alt={s.caption} width={940} height={586} loading="lazy" className="w-full h-auto" />
                <figcaption className="px-5 py-4 text-[13px] text-white/45 border-t border-white/[0.06]">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* --- TUTORIAL --- */}
      <section className="border-t border-white/[0.06] scroll-mt-16" id="tutorial">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center mb-10 sm:mb-14">
            <span className={eyebrow}>Tutorial</span>
            <h2 className={h2}>
              Tutorial pakai <span className={accent}>MyFlow</span>
            </h2>
          </div>
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0c0c0c]">
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`${card} p-6 sm:p-8`}>
            <span className={eyebrow}>Format didukung</span>
            <ul className="mt-5 space-y-2.5 text-[14px] text-white/55 leading-relaxed">
              <li>JPEG, PNG, TIFF</li>
              <li>RAW semua merek besar: Canon (CR2/CR3), Nikon (NEF), Sony (ARW), Fujifilm (RAF), DNG, dan lainnya</li>
              <li>HEIC (foto iPhone)</li>
              <li className="text-white/35">Pasangan RAW+JPG otomatis dikenali sebagai satu foto.</li>
            </ul>
          </div>
          <div className={`${card} p-6 sm:p-8`}>
            <span className={eyebrow}>Kebutuhan sistem</span>
            <ul className="mt-5 space-y-2.5 text-[14px] text-white/55 leading-relaxed">
              <li>Mac: Apple Silicon (M1 ke atas) atau Intel</li>
              <li>Windows: 64-bit, GPU NVIDIA opsional</li>
              <li className="text-white/35">
                Internet hanya untuk aktivasi lisensi, unduhan komponen AI pertama kali, dan update. Seleksi foto
                sepenuhnya offline.
              </li>
            </ul>
          </div>
          <div className="rounded-2xl p-6 sm:p-8 border border-amber-500/30 bg-gradient-to-br from-amber-500/[0.12] to-transparent">
            <span className="text-[11px] uppercase tracking-[0.2em] text-amber-400 font-semibold">Bonus</span>
            <p className="mt-5 text-4xl font-extrabold">24 color preset</p>
            <p className="mt-3 text-[14px] text-white/50 leading-relaxed">
              Preset profesional eksklusif (Cineva, Nebula, Proxima, Vantage) yang langsung ter-apply di Lightroom
              Classic.
            </p>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="border-t border-white/[0.06] scroll-mt-16" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center mb-10 sm:mb-14">
            <span className={eyebrow}>FAQ</span>
            <h2 className={h2}>Pertanyaan umum</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className={`${card} group px-5 sm:px-6 py-5`}>
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-[15px]">
                  {f.q}
                  <span className="text-amber-400 transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-[14px] text-white/45 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="px-4 sm:px-6 pb-20 sm:pb-28" id="download">
        <div className="relative max-w-5xl mx-auto overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-b from-amber-500/[0.10] to-[#0c0c0c] px-6 py-16 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            Siap meningkatkan <span className={accent}>produktivitas?</span>
          </h2>
          <p className="mt-4 text-white/45 text-sm sm:text-lg max-w-lg mx-auto">
            Dapatkan lisensi seumur hidup MyFlow dengan klik tombol di bawah ini.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
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
      <footer className="border-t border-white/[0.06] pb-20 md:pb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <PixelasLogo size={24} />
            <span className="text-sm font-bold">Pixelas</span>
          </div>
          <a href="/" className="inline-flex items-center gap-2 text-[13px] text-white/30 hover:text-amber-400/80 transition-colors">
            Back to Store <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </footer>

      {/* ponytail: StickyBuyBar's `price` slot shows a tagline here, MyFlow page shows no prices */}
      <StickyBuyBar productName="MyFlow by DOSS" price="Lisensi seumur hidup" buyUrl={BUY_URL} />
    </div>
  );
}
