import React from 'react';
import { Sparkles } from 'lucide-react';
import { NAV_LINKS } from '@/app/pxtouch/constants';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 mix-blend-difference text-white w-full max-w-md px-4">
       <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full flex items-center justify-between gap-4 shadow-2xl w-full">
          <div className="font-black tracking-tighter text-xl shrink-0">PX</div>
          
          <div className="hidden md:flex gap-4 text-xs font-medium font-mono">
             {NAV_LINKS.map((link) => (
               <a 
                 key={link.label} 
                 href={link.href} 
                 className="hover:text-gray-300 transition-colors uppercase"
               >
                 {link.label}
               </a>
             ))}
          </div>
          
          <div className="w-px h-4 bg-white/30 hidden md:block shrink-0"></div>
          
          <a
            href="#download"
            className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-200 transition-colors uppercase tracking-widest shrink-0 whitespace-nowrap"
          >
             Download
          </a>
       </div>
    </nav>
  );
};

export default Navbar;
