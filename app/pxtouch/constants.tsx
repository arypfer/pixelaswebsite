import { 
  Wand2, 
  Aperture, 
  Layers, 
  Zap, 
  Monitor, 
  ShieldCheck,
  Maximize2,
  LucideIcon
} from 'lucide-react';

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export const NAV_LINKS = [
  { label: 'Upscale', href: '#upscale' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Pricing', href: '#pricing' },
];

export const FEATURES: Feature[] = [
  {
    title: 'Multi-Model Intelligence',
    description: 'Didukung keluaran sinergis dari Anta, Arya, Gatka, dan Rudra. Setiap model mengerjakan aspek topologi wajah yang berbeda.',
    icon: Wand2,
  },
  {
    title: 'AI Upscaling',
    description: 'Bukan sekadar menajamkan. Mesin sekunder kami mengisi detail yang hilang untuk meng-upscale gambar hingga 400%.',
    icon: Maximize2,
  },
  {
    title: 'Cross-Platform',
    description: 'Pengalaman terpadu di Windows, macOS, dan Linux. Lisensi kamu berlaku di semua platform.',
    icon: Monitor,
  },
];

export const WORKFLOW_STEPS: Step[] = [
  {
    number: '01',
    title: 'Import',
    description: 'Drag and drop your portraits. Supports JPG, PNG, and TIFF formats.',
  },
  {
    number: '02',
    title: 'Retouch',
    description: 'The Quad-Core Engine (Anta, Arya, Gatka, Rudra) analyzes and enhances the subject.',
  },
  {
    number: '03',
    title: 'Refine & Upscale',
    description: 'Adjust intensity or apply 4x Upscaling for large format printing.',
  },
  {
    number: '04',
    title: 'Export',
    description: 'Save your work in high resolution, ready for client delivery or social media.',
  },
];

export const FAQS: FaqItem[] = [
  {
    question: 'Bagaimana cara tiap model bekerja bersama?',
    answer: 'Anta menangani tekstur kulit, Arya mengatur pencahayaan, Gatka fokus pada color grading, dan Rudra menjaga struktur wajah tetap utuh. Keempatnya berjalan paralel untuk menghasilkan output yang konsisten.',
  },
  {
    question: 'Apakah AI akan mengubah bentuk wajah?',
    answer: 'Tidak. Model Rudra dirancang khusus untuk mengunci titik identitas wajah, sehingga orangnya tetap terlihat sama—hanya pada versi terbaiknya.',
  },
  {
    question: 'Bagaimana sistem kredit atau token bekerja?',
    answer: 'Kamu membeli token yang tidak pernah kedaluwarsa. Retouch standar biasanya memakai sekitar 1 token, sedangkan tugas berat seperti Upscaling 4x memakai sekitar 5 token.',
  },
  {
    question: 'Apakah saya boleh memakai ini untuk pekerjaan klien?',
    answer: 'Tentu. Semua gambar yang kamu proses adalah milikmu. Lisensi Komersial kami mencakup penggunaan untuk proyek berbayar, studio, dan agensi.',
  },
  {
    question: 'Sistem operasi apa saja yang didukung?',
    answer: 'Kami mendukung Windows 10/11, macOS 12+ (Intel & Apple Silicon), dan distro Linux populer seperti Ubuntu dan Fedora.',
  },
];
