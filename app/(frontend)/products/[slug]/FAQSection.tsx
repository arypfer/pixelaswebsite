'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Gimana cara download & install?',
    answer:
      'Setelah bayar, kamu langsung dapet link download lewat email. Tinggal ikutin panduan yang udah disertakan — gampang kok.',
  },
  {
    question: 'Ini bayar sekali doang?',
    answer:
      'Yep! Semua produk kita sekali bayar, pakai selamanya. Gak ada biaya bulanan atau biaya tersembunyi.',
  },
  {
    question: 'Dapet update gratis gak?',
    answer:
      'Pasti. Semua update ke depan udah termasuk dalam pembelian kamu, gak perlu bayar lagi.',
  },
  {
    question: 'Kalau butuh bantuan gimana?',
    answer:
      'Langsung aja email ke amlolife.contact@gmail.com — kita bantu sampai beres.',
  },
  {
    question: 'Bisa jalan di perangkat aku gak?',
    answer:
      'Produk kita didesain untuk versi terbaru dari platform masing-masing. Cek deskripsi produk di atas buat detail kompatibilitas ya.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-14 sm:py-24 border-t border-white/[0.06]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-14">
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/20 font-semibold">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2 tracking-tight">
            Yang Sering Ditanyain
          </h2>
        </div>
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/[0.06]">
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between gap-4 py-5 min-h-[44px] text-left group"
              >
                <span className="text-[15px] font-medium text-white/80 group-hover:text-white transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-white/30 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  openIndex === index
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-[14px] text-white/35 leading-relaxed pb-5">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
