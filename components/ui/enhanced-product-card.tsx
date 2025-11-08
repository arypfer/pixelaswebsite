"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Check, Sparkles, ArrowRight, Download, Zap, Shield, Award, TrendingUp } from "lucide-react";

interface EnhancedProductCardProps {
  title: string;
  subtitle: string;
  description: string;
  features?: string[];
  highlights?: string[];
  price?: string;
  originalPrice?: string;
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  image?: string;
  category?: string;
  badge?: string;
  stats?: {
    downloads?: string;
    rating?: string;
    users?: string;
  };
  onDetailsClick?: () => void;
  onDownloadClick?: () => void;
}

export function EnhancedProductCard({
  title,
  subtitle,
  description,
  features = [],
  highlights = [],
  price,
  originalPrice,
  rating = 5,
  reviewCount = 0,
  featured = false,
  image,
  category,
  badge,
  stats,
  onDetailsClick,
  onDownloadClick
}: EnhancedProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        group relative isolation overflow-hidden rounded-3xl border backdrop-blur-xl
        bg-gradient-to-br from-white/15 via-black/30 to-black/60 
        flex flex-col h-full transition-all duration-500
        ${featured ? 
          'border-orange-400/70 ring-2 ring-orange-400/40 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50' : 
          'border-white/30 ring-1 ring-inset ring-white/20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] hover:border-white/60 hover:ring-white/40 hover:shadow-[0_25px_60px_-15px_rgba(255,255,255,0.2)]'
        }
        hover:scale-[1.02] hover:-translate-y-2
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium Background Image with Enhanced Overlay */}
      {image && (
        <div className="absolute inset-0 z-0">
          <Image 
            src={image} 
            alt={title}
            fill
            className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Multi-layer gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/98 via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          
          {/* Animated shine effect */}
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000`} />
        </div>
      )}

      {/* Content Layer */}
      <div className="relative z-10 p-7 flex flex-col h-full">
        {/* Top Section: Badges and Stats */}
        <div className="flex items-start justify-between mb-5 gap-3">
          <div className="flex flex-col gap-2">
            {/* Category Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-lg border border-white/30 group-hover:bg-white/20 transition-all">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">{category}</span>
            </div>
            
            {/* Custom Badge */}
            {badge && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg shadow-lg shadow-green-500/30 border border-green-400/50">
                <Shield className="w-3.5 h-3.5 text-white" />
                <span className="text-xs font-bold text-white uppercase tracking-wide">{badge}</span>
              </div>
            )}
          </div>
          
          {/* Featured Badge */}
          {featured && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl shadow-lg shadow-orange-500/50 border border-orange-400/50 animate-pulse">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-xs font-bold text-white uppercase tracking-wide">Best Seller</span>
            </div>
          )}
        </div>

        {/* Title Section */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 transition-all duration-300">
            {title}
          </h3>
          <p className="text-sm font-semibold text-blue-300 uppercase tracking-wide">{subtitle}</p>
        </div>

        {/* Rating Section */}
        {rating && (
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'}`}
                />
              ))}
            </div>
            {reviewCount > 0 && (
              <span className="text-xs text-white/60">({reviewCount} reviews)</span>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-white/80 leading-relaxed mb-5 line-clamp-3">
          {description}
        </p>

        {/* Stats Section */}
        {stats && (
          <div className="grid grid-cols-3 gap-3 mb-5">
            {stats.downloads && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <Download className="w-4 h-4 text-blue-400 mb-1" />
                <p className="text-xs font-bold text-white">{stats.downloads}</p>
                <p className="text-[10px] text-white/60">Downloads</p>
              </div>
            )}
            {stats.rating && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <Award className="w-4 h-4 text-yellow-400 mb-1" />
                <p className="text-xs font-bold text-white">{stats.rating}</p>
                <p className="text-[10px] text-white/60">Rating</p>
              </div>
            )}
            {stats.users && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <TrendingUp className="w-4 h-4 text-green-400 mb-1" />
                <p className="text-xs font-bold text-white">{stats.users}</p>
                <p className="text-[10px] text-white/60">Users</p>
              </div>
            )}
          </div>
        )}

        {/* Features List */}
        {features.length > 0 && (
          <div className="mb-5 space-y-2">
            <p className="text-xs font-bold text-white/90 uppercase tracking-wider mb-3">Key Features:</p>
            <div className="space-y-2">
              {features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-white/80 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Highlights Section */}
        {highlights.length > 0 && (
          <div className="mb-5">
            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-4 border border-purple-400/30">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-purple-300" />
                <p className="text-xs font-bold text-purple-200 uppercase tracking-wider">Special Highlights</p>
              </div>
              <div className="space-y-2">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                    <span className="text-xs text-white/90 leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Spacer to push buttons to bottom */}
        <div className="flex-grow" />

        {/* Price Section */}
        {price && (
          <div className="mb-4 pb-4 border-b border-white/20">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white">{price}</span>
              {originalPrice && (
                <span className="text-lg text-white/40 line-through">{originalPrice}</span>
              )}
            </div>
            {originalPrice && (
              <p className="text-xs text-green-400 font-semibold mt-1">
                Save {Math.round((1 - parseFloat(price.replace(/[^0-9.]/g, '')) / parseFloat(originalPrice.replace(/[^0-9.]/g, ''))) * 100)}%
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDetailsClick?.();
            }}
            className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-105 backdrop-blur-sm group/btn"
          >
            <span className="flex items-center justify-center gap-2">
              View Details
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </span>
          </button>
          
          {onDownloadClick && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownloadClick();
              }}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 group/btn"
            >
              <span className="flex items-center justify-center gap-2">
                <Download className="w-4 h-4 group-hover/btn:animate-bounce" />
                Download
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl" />
      </div>
    </div>
  );
}
