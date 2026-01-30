"use client";

import { memo } from "react";
import Image from "next/image";
import { Star, Globe, Zap, X, Link2, Check } from "lucide-react";
import { DownloadButton } from "@/components/ui/download-button";

interface ProductDetailModalProps {
  product: any;
  onClose: () => void;
  copySuccess?: boolean;
  onCopyLink?: () => void;
}

function ProductDetailModal({ product, onClose, copySuccess, onCopyLink }: ProductDetailModalProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Star': return <Star className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto p-4 sm:p-8 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`relative mx-auto max-w-4xl bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 border border-white/20 rounded-3xl shadow-2xl shadow-white/20 animate-in zoom-in-95 slide-in-from-bottom-4 duration-500 ${
          product.featured ? 'border-orange-500/50 shadow-orange-500/20 ring-2 ring-orange-500/30' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Action Buttons - Enhanced */}
        <div className="absolute top-6 right-6 z-20 flex gap-2">
          {/* Copy Link Button */}
          <button
            onClick={onCopyLink}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl hover:shadow-white/20 transform hover:scale-110 active:scale-95 group"
            title="Copy link to this product"
            aria-label="Copy link to this product"
          >
            {copySuccess ? (
              <Check className="w-6 h-6 text-green-400" />
            ) : (
              <Link2 className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
            )}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl hover:shadow-white/20 transform hover:scale-110 active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Product Image */}
        {product.detailedImage && (
          <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
            <Image
              src={product.detailedImage}
              alt={product.title}
              fill
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="flex items-start gap-3 mb-2">
                <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  {getIcon(product.icon)}
                </div>
                {product.featured && (
                  <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold rounded-full">
                    ⭐ Featured
                  </span>
                )}
              </div>
              <h2 id="modal-title" className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg">{product.title}</h2>
              <p className="text-white/80 text-sm sm:text-base drop-shadow">{product.subtitle}</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Download Buttons - Moved to top */}
          <div className="mb-8">
            {product.downloadButtons && product.downloadButtons.length >= 1 && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {product.downloadButtons[0]?.url && product.downloadButtons[0]?.text && (
                  <DownloadButton
                    text={product.downloadButtons[0].text}
                    variant="primary"
                    onClick={() => window.open(product.downloadButtons[0].url, '_blank')}
                  />
                )}
                {product.downloadButtons[1]?.url && product.downloadButtons[1]?.text && (
                  <DownloadButton
                    text={product.downloadButtons[1].text}
                    variant="secondary"
                    onClick={() => window.open(product.downloadButtons[1].url, '_blank')}
                  />
                )}
                {product.downloadButtons[2]?.url && product.downloadButtons[2]?.text && (
                  <DownloadButton
                    text={product.downloadButtons[2].text}
                    variant="tertiary"
                    onClick={() => window.open(product.downloadButtons[2].url, '_blank')}
                  />
                )}
              </div>
            )}

            {/* Fallback download link */}
            {!product.downloadButtons?.[0]?.url && product.link && (
              <DownloadButton
                text="Download"
                variant="primary"
                onClick={() => window.open(product.link, '_blank')}
              />
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4">About This Product</h3>
            <p className="text-white/80 leading-relaxed text-base whitespace-pre-line">
              {product.detailedDescription || product.description}
            </p>
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
                  >
                    <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category Badge */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/60 text-sm">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductDetailModal);
