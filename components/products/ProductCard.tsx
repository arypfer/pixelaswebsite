"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { Star, Globe, Zap, Sparkles, TrendingUp, ArrowRight } from "lucide-react";

interface ProductCardProps {
  title: string;
  subtitle: string;
  description: string;
  featured?: boolean;
  link?: string;
  image?: string;
  category?: string;
  onDetailsClick?: () => void;
}

function ProductCard({
  title,
  subtitle,
  description,
  featured,
  link,
  image,
  category,
  onDetailsClick
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    if (onDetailsClick) {
      onDetailsClick();
    }
  };

  return (
    <div
      className={`
        group relative isolation overflow-hidden rounded-2xl border backdrop-blur-xl
        bg-gradient-to-br from-white/12 via-black/40 to-black/70
        flex flex-col h-full cursor-pointer transition-all duration-500
        ${featured ?
          'border-orange-400/70 ring-2 ring-orange-400/40 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50' :
          'border-white/20 ring-1 ring-inset ring-white/12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] hover:border-white/50 hover:ring-white/30 hover:shadow-[0_25px_60px_-15px_rgba(255,255,255,0.15)]'
        }
        hover:scale-[1.02] hover:-translate-y-1
      `}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick();
        }
      }}
    >
      {/* Background Image with Enhanced Overlay */}
      {image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={title}
            fill
            className="w-full h-full object-cover opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
          {/* Enhanced gradient overlays */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 120% 100% at top right, transparent 0%, transparent 25%, black 75%)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/98 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

          {/* Animated shine effect on hover */}
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000`} />
        </div>
      )}

      {/* Content Layer */}
      <div className={`relative z-10 p-6 flex flex-col h-full transition-all duration-300`}>
        {/* Top Section: Badges */}
        <div className="flex items-start justify-between mb-4 gap-2">
          {/* Category Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 group-hover:bg-white/15 transition-all">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] font-semibold text-white/90 uppercase tracking-wider">{category}</span>
          </div>

          {/* Featured Badge */}
          {featured && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-lg shadow-orange-500/50 border border-orange-400/50">
              <Sparkles className="w-3 h-3 text-white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wide">Best Seller</span>
            </div>
          )}
        </div>

        {/* Title & Subtitle */}
        <div className="mb-3">
          <h3 className="text-white font-bold text-xl mb-2 line-clamp-2 drop-shadow-lg tracking-tight leading-tight group-hover:text-white transition-all duration-300">
            {title}
          </h3>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          </div>
          <p className="text-gray-300 text-xs font-medium opacity-90 group-hover:opacity-100 transition-opacity line-clamp-1">
            {subtitle}
          </p>
        </div>

        {/* Description */}
        <div className="flex-grow overflow-hidden mb-4">
          <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
            {description}
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <div className="p-1 bg-green-500/20 rounded">
              <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-[11px] text-gray-400 font-medium">Lifetime Access</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3 text-blue-400" />
            <span className="text-[11px] text-gray-400 font-medium">Pro Quality</span>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-auto space-y-2">
          {/* Primary CTA */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className={`
              w-full px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300
              flex items-center justify-center gap-2 group/btn
              ${featured
                ? 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50'
                : 'bg-white text-black hover:bg-gray-100 shadow-lg shadow-white/10 hover:shadow-white/20'
              }
              hover:scale-[1.02] active:scale-[0.98]
            `}
            aria-label={`View full details for ${title}`}
          >
            <span>View Full Details</span>
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
          </button>

          {/* Secondary Info */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-white/50">
            <span aria-hidden="true">•</span>
            <span>One-time payment</span>
            <span aria-hidden="true">•</span>
            <span>Instant download</span>
          </div>
        </div>
      </div>

      {/* Premium corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

export default memo(ProductCard);
