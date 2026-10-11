import type { Metadata } from 'next';
import { Download, ArrowRight, ShieldCheck, Layers, Sparkles, Languages, MessageCircle, Play } from 'lucide-react';
import { PixelasLogo } from '@/components/PixelasLogo';
import { MobileBuyBar } from './MobileBuyBar';

const BUY_URL = 'https://doss.co.id/products/myflow-ai-photo-culler-smart-saver-edition?sca_ref=10348027.41ha7Ug4pC9xxmV';
const WHATSAPP_URL = 'https://wa.me/62811121300';
const YOUTUBE_ID = 'snoLkPs2sYY';

export const metadata: Metadata = {
  title: 'MyFlow by DOSS | AI Photo Culler',
  description:
    'AI photo culler lokal untuk fotografer Indonesia. Pilih foto terbaik dari ribuan hasil shoot dalam hitungan menit, bukan jam. Mac & Windows.',
  openGraph: { images: ['/myflow/banner.webp'] },
};

// MyFlow brand orange, darkened so white button text passes WCAG AA (4.8:1)
const ORANGE = 'bg-[#CC4115] hover:bg-[#B3370F] text-white';
const ORANGE_TEXT = 'text-[#CC4115]';

const STATS = [
  { value: '±500', label: 'foto per menit di Mac M4' },
  { value: '3 menit', label: 'untuk wedding 1.500 foto' },
  { value: '0', label: 'foto yang di-upload ke internet' },
  { value: '24', label: 'color preset bonus untuk Lightroom' },
];

const BUCKETS = [
  { name: 'Picks', chip: 'bg-emerald-100 text-emerald-800', body: 'Foto terbaik: tajam, mata terbuka, ekspresi dan komposisi paling kuat.' },
  { name: 'Maybe', chip: 'bg-amber-100 text-amber-800', body: 'Foto yang meragukan, menunggu keputusan Anda saat review.' },
  { name: 'Rejects', chip: 'bg-red-100 text-red-800', body: 'Blur, mata terpejam, dan duplikat burst.' },
];

const STEPS = [
  { title: 'Pilih folder', body: 'Dari hardisk atau langsung dari kartu memori.' },
  { title: 'Pilih jenis shoot', body: 'Wedding, portrait, event, olahraga, dan lainnya.' },
  { title: 'Biarkan MyFlow bekerja', body: 'AI menilai ketajaman, wajah, mata, komposisi, dan estetika.' },
  { title: 'Periksa lalu ekspor', body: 'Setiap foto disertai alasan kenapa dipilih atau dibuang.' },
];

const FAQS = [
  {
    q: 'Apa itu MyFlow by DOSS?',
    a: 'Aplikasi seleksi foto otomatis untuk Mac dan Windows. AI memilah ribuan foto dalam hitungan menit ke Picks, Maybe, dan Rejects. Anda tinggal memeriksa hasilnya.',
  },
  {
    q: 'Seberapa cepat prosesnya?',
    a: 'Di Mac Apple Silicon M4 sekitar 500 foto per menit, jadi wedding 1.500 foto selesai kira-kira 3 menit. Di Windows kecepatan mengikuti spesifikasi: dengan GPU NVIDIA lebih cepat, tanpa GPU tetap jalan.',
  },
  {
    q: 'Apakah foto saya di-upload ke internet?',
    a: 'Tidak. Seluruh proses berjalan di komputer Anda sendiri. Foto klien tidak pernah keluar dari perangkat.',
  },
  {
    q: 'Apakah file asli saya aman?',
    a: 'Aman. MyFlow tidak pernah menghapus atau memindahkan file asli. Hasil seleksi berupa salinan dan tanda rating.',
  },
  {
    q: 'Bagaimana cara aktivasinya?',
    a: 'Setelah membeli, Anda menerima kode lisensi dari DOSS. Buka aplikasi, masukkan kode, selesai. Aktivasi perlu koneksi internet.',
  },
  {
    q: 'Lisensinya bagaimana?',
    a: 'Sekali bayar, berlaku selamanya. Bukan langganan. Satu lisensi untuk satu perangkat.',
  },
  {
    q: 'Kalau ganti laptop?',
    a: 'Lisensi terikat ke satu perangkat. Untuk pindah ke komputer baru, hubungi tim DOSS.',
  },
  {
    q: 'Update-nya bayar lagi?',
    a: 'Tidak. Pembaruan terpasang otomatis dan gratis.',
  },
];

// Radius system: buttons are pills, media and panels are rounded-2xl.
const primaryBtn = `inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-bold transition-all active:scale-[0.98] ${ORANGE}`;
const secondaryBtn =
  'inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold text-zinc-900 bg-white border border-zinc-300 hover:border-zinc-900 transition-all active:scale-[0.98]';
const h2 = 'text-3xl md:text-[42px] font-extrabold tracking-tight leading-[1.1] text-zinc-900';

function BuyButton({ className = '' }: { className?: string }) {
  return (
    <a href={BUY_URL} target="_blank" rel="noopener noreferrer" className={`${primaryBtn} ${className}`}>
      <Download className="w-[18px] h-[18px]" strokeWidth={2.25} /> Download MyFlow
    </a>
  );
}

function PartnerLockup() {
  return (
    <div className="flex items-center gap-3">
      <a href="/" className="flex items-center gap-2.5">
        <PixelasLogo size={24} />
        <span className="text-sm font-bold text-zinc-900">Pixelas</span>
      </a>
      <span className="text-zinc-400 text-sm" aria-hidden="true">×</span>
      <a href="https://doss.co.id" target="_blank" rel="noopener noreferrer">
        <img src="/myflow/doss-logo.webp" alt="DOSS Camera & Gadget" width={323} height={96} className="h-7 w-auto" />
      </a>
    </div>
  );
}

export default function MyFlowPage() {
  return (
    <div className="bg-white min-h-screen text-zinc-900 antialiased pt-16">
      {/* --- NAV --- */}
      <header className="fixed top-0 inset-x-0 z-40 bg-white/85 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <PartnerLockup />
          <nav className="hidden md:flex items-center gap-8 text-[14px] text-zinc-600">
            <a href="#cara-kerja" className="hover:text-zinc-900 transition-colors">Cara kerja</a>
            <a href="#tutorial" className="hover:text-zinc-900 transition-colors">Tutorial</a>
            <a href="#faq" className="hover:text-zinc-900 transition-colors">FAQ</a>
          </nav>
          <BuyButton className="!px-4 !py-2 !text-[13px] hidden sm:inline-flex" />
        </div>
      </header>

      {/* --- HERO: headline, promo video, then download --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 md:pt-20 pb-16 md:pb-24">
        <div className="max-w-3xl">
          <p className={`text-[14px] font-semibold ${ORANGE_TEXT}`}>MyFlow by DOSS</p>
          <h1 className="mt-3 text-[40px] md:text-6xl font-extrabold tracking-tight leading-[1.05]">
            Sortir ribuan foto dalam <span className={ORANGE_TEXT}>hitungan menit.</span>
          </h1>
          <p className="mt-5 text-lg text-zinc-600 leading-relaxed max-w-[52ch]">
            AI photo culler untuk Mac dan Windows. Foto blur, mata terpejam, dan duplikat burst kepisah otomatis.
          </p>
        </div>

        <video
          src="/myflow/promo.mp4"
          poster="/myflow/promo-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          className="mt-10 md:mt-12 w-full aspect-video rounded-2xl bg-zinc-900 shadow-[0_24px_60px_-20px_rgba(39,39,42,0.35)]"
        />

        <div id="hero-buy" className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
          <BuyButton className="w-full sm:w-auto" />
          <a href="#tutorial" className={`w-full sm:w-auto ${secondaryBtn}`}>
            <Play className="w-[18px] h-[18px]" strokeWidth={2.25} /> Tonton tutorial
          </a>
        </div>
      </section>

      {/* --- STATS --- */}
      <section className="bg-zinc-50 border-y border-zinc-200">
        <dl className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900">{s.value}</dd>
              <dd className="mt-2 text-[14px] text-zinc-600 leading-snug max-w-[18ch]">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* --- PICKS / MAYBE / REJECTS: split text + real screenshot --- */}
      <section id="cara-kerja" className="scroll-mt-16 max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 grid md:grid-cols-[5fr_7fr] gap-12 md:gap-16 items-center">
        <div>
          <h2 className={h2}>AI yang memilah. Anda tinggal memeriksa.</h2>
          <p className="mt-5 text-zinc-600 leading-relaxed max-w-[48ch]">
            Dibuat untuk wedding, event, dan studio yang setiap hari pegang 2.000-5.000 RAW per session.
          </p>
          <ul className="mt-8 space-y-5">
            {BUCKETS.map((b) => (
              <li key={b.name} className="flex gap-4">
                <span className={`shrink-0 h-7 px-3 rounded-full text-[13px] font-bold inline-flex items-center ${b.chip}`}>
                  {b.name}
                </span>
                <p className="text-[15px] text-zinc-700 leading-relaxed pt-0.5">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <img
          src="/myflow/screen-4.webp"
          alt="Hasil ekspor MyFlow: 34 foto, 21 dipilih, 13 ditolak, XMP siap untuk Lightroom"
          width={926}
          height={576}
          loading="lazy"
          className="w-full h-auto rounded-2xl shadow-[0_24px_60px_-24px_rgba(39,39,42,0.45)]"
        />
      </section>

      {/* --- FEATURES: bento with mixed cells --- */}
      <section className="bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <h2 className={`${h2} max-w-2xl`}>Bekerja seperti asisten editor Anda sendiri.</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-4 rounded-2xl bg-white border border-zinc-200 overflow-hidden flex flex-col">
              <div className="p-7 md:p-8">
                <Layers className={`w-6 h-6 ${ORANGE_TEXT}`} strokeWidth={2} />
                <h3 className="mt-4 text-xl font-bold">Langsung terbaca di Lightroom</h3>
                <p className="mt-2 text-zinc-600 leading-relaxed max-w-[52ch]">
                  Rating dan label warna ditulis dalam format XMP. Buka foldernya di Lightroom, hasil seleksi sudah ada.
                </p>
              </div>
              <img src="/myflow/screen-1.webp" alt="Analog color profiles Cineva, Nebula, Proxima, Vantage di MyFlow" width={940} height={586} loading="lazy" className="mt-auto w-full h-auto" />
            </div>
            <div className="md:col-span-2 rounded-2xl bg-[#CC4115] text-white p-7 md:p-8 flex flex-col">
              <ShieldCheck className="w-6 h-6" strokeWidth={2} />
              <h3 className="mt-4 text-xl font-bold">Foto klien tidak pernah keluar dari laptop</h3>
              <p className="mt-2 text-white/85 leading-relaxed">
                Semua proses AI berjalan offline. Tidak ada cloud, tidak ada server pihak ketiga. File asli tidak disentuh.
              </p>
            </div>
            <div className="md:col-span-2 rounded-2xl bg-white border border-zinc-200 p-7 md:p-8">
              <Sparkles className={`w-6 h-6 ${ORANGE_TEXT}`} strokeWidth={2} />
              <h3 className="mt-4 text-xl font-bold">Makin lama makin paham selera Anda</h3>
              <p className="mt-2 text-zinc-600 leading-relaxed">
                Setiap koreksi saat review dipelajari, dan belajarnya juga di komputer Anda.
              </p>
            </div>
            <div className="md:col-span-2 rounded-2xl bg-white border border-zinc-200 p-7 md:p-8">
              <Languages className={`w-6 h-6 ${ORANGE_TEXT}`} strokeWidth={2} />
              <h3 className="mt-4 text-xl font-bold">Bahasa Indonesia dan Inggris</h3>
              <p className="mt-2 text-zinc-600 leading-relaxed">
                Termasuk alasan seleksi di setiap foto, jadi Anda tahu kenapa foto dipilih atau dibuang.
              </p>
            </div>
            <div className="md:col-span-2 rounded-2xl bg-zinc-900 text-white p-7 md:p-8 flex flex-col">
              <p className="text-5xl font-extrabold tracking-tight">24</p>
              <h3 className="mt-3 text-xl font-bold">Color preset bonus</h3>
              <p className="mt-2 text-zinc-300 leading-relaxed">
                Koleksi Cineva, Nebula, Proxima, dan Vantage, langsung ter-apply di Lightroom Classic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW TO: big screenshot + numbered row --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <h2 className={`${h2} max-w-2xl`}>Empat langkah dari kartu memori ke Lightroom.</h2>
        <img
          src="/myflow/screen-3.webp"
          alt="Pengaturan seleksi MyFlow: persentase seleksi, sensitivitas blur, dan rejection gates"
          width={926}
          height={576}
          loading="lazy"
          className="mt-12 w-full h-auto rounded-2xl shadow-[0_24px_60px_-24px_rgba(39,39,42,0.45)]"
        />
        <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {STEPS.map((s, i) => (
            <li key={s.title} className="border-t-2 border-zinc-900 pt-5">
              <span className={`text-[14px] font-bold ${ORANGE_TEXT}`}>{i + 1}</span>
              <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-[15px] text-zinc-600 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* --- TUTORIAL --- */}
      <section id="tutorial" className="scroll-mt-16 bg-zinc-100 border-y border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 grid md:grid-cols-[4fr_8fr] gap-10 md:gap-14 items-center">
          <div>
            <h2 className={h2}>Tutorial pakai MyFlow</h2>
            <p className="mt-5 text-zinc-600 leading-relaxed">
              Dari import sampai ekspor ke Lightroom. Butuh internet hanya untuk aktivasi, unduhan komponen AI pertama
              kali, dan update.
            </p>
          </div>
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-zinc-900">
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Format yang didukung</h2>
          <p className="mt-4 text-zinc-700 leading-relaxed">
            JPEG, PNG, TIFF, HEIC, dan RAW semua merek besar: Canon (CR2/CR3), Nikon (NEF), Sony (ARW), Fujifilm (RAF),
            DNG, dan lainnya. Pasangan RAW+JPG otomatis dihitung sebagai satu foto.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Kebutuhan sistem</h2>
          <p className="mt-4 text-zinc-700 leading-relaxed">
            Mac Apple Silicon (M1 ke atas) atau Intel. Windows 64-bit, GPU NVIDIA opsional. Seleksi foto sehari-hari
            sepenuhnya offline.
          </p>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="scroll-mt-16 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 grid md:grid-cols-[4fr_8fr] gap-10 md:gap-14">
          <div>
            <h2 className={h2}>Pertanyaan yang sering masuk</h2>
            <p className="mt-5 text-zinc-600 leading-relaxed">Belum terjawab? Tim DOSS siap bantu lewat WhatsApp.</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`mt-6 ${secondaryBtn}`}>
              <MessageCircle className="w-[18px] h-[18px]" strokeWidth={2.25} /> 0811-121-300
            </a>
          </div>
          <div className="divide-y divide-zinc-200 border-y border-zinc-200">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-6 text-[17px] font-semibold text-zinc-900">
                  {f.q}
                  <span className={`shrink-0 text-2xl leading-none transition-transform group-open:rotate-45 ${ORANGE_TEXT}`}>+</span>
                </summary>
                <p className="mt-3 text-[15px] text-zinc-600 leading-relaxed max-w-[60ch]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="px-4 sm:px-6 pb-24 md:pb-28">
        <div className="max-w-6xl mx-auto rounded-2xl bg-[#CC4115] text-white px-6 py-14 md:px-14 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-[42px] font-extrabold tracking-tight leading-[1.1]">Siap meningkatkan produktivitas?</h2>
            <p className="mt-3 text-white/85 text-lg">Lisensi seumur hidup. Sekali bayar, update gratis.</p>
          </div>
          <a
            href={BUY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-bold bg-white text-zinc-900 hover:bg-zinc-100 transition-all active:scale-[0.98]"
          >
            <Download className="w-[18px] h-[18px]" strokeWidth={2.25} /> Download MyFlow
          </a>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-zinc-200 pb-24 sm:pb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <PartnerLockup />
          <a href="/" className="inline-flex items-center gap-2 text-[14px] text-zinc-600 hover:text-zinc-900 transition-colors">
            Kembali ke toko <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </footer>

      <MobileBuyBar>
        <BuyButton className="w-full" />
      </MobileBuyBar>
    </div>
  );
}
