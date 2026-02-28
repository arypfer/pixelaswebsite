import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PixelasLogo } from '@/components/PixelasLogo';
import { NAV_LINKS } from '@/app/(frontend)/pxtouch/constants';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-[#060606]/80 border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 py-3 sm:py-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors flex-shrink-0">
          <PixelasLogo size={18} />
          <span className="text-[13px] font-bold hidden sm:inline">Pixelas</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-[13px] font-medium">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/40 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#download"
          className="px-4 py-1.5 text-[12px] font-semibold bg-amber-500 hover:bg-amber-400 text-black rounded-md transition-colors flex-shrink-0"
        >
          Download
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
