import React from 'react';
import { NAV_LINKS } from '@/app/(frontend)/pxtouch/constants';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/[0.05]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 py-4 px-6">
        <a href="/" className="text-lg font-bold text-white flex-shrink-0">
          Pixelas
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/60 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#download"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold px-5 py-2 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300"
        >
          Download
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
