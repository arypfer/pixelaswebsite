"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AnimatedBackground from "@/components/ui/background-animated";
import { Star, Globe, Zap, Search, X } from "lucide-react";
import { allProducts, categories } from "@/lib/products";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [showTikTokMessage, setShowTikTokMessage] = useState(false);

  // Detect TikTok browser and show message instead of redirecting
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isTikTokBrowser = /TikTok/i.test(userAgent);

    if (isTikTokBrowser) {
      setShowTikTokMessage(true);
    }
  }, []);

  // Load products from database and sync with localStorage
  useEffect(() => {
    const loadProductsFromDatabase = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products');

        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
          setApiLoaded(true);

          // Sync to localStorage for admin panel compatibility
          localStorage.setItem('admin-products', JSON.stringify(data.products));
        } else {
          console.error('API returned error:', response.status);
          // Fallback to localStorage
          fallbackToLocalStorage();
        }
      } catch (error) {
        console.error('Error loading products from database:', error);
        fallbackToLocalStorage();
      } finally {
        setIsLoading(false);
      }
    };

    const fallbackToLocalStorage = () => {
      // Try synced admin data first
      const syncedProducts = localStorage.getItem('admin-products-sync');
      if (syncedProducts) {
        try {
          const syncData = JSON.parse(syncedProducts);
          setProducts(syncData.products);
          setApiLoaded(true);
          return;
        } catch (error) {
          console.error('Error parsing synced products:', error);
        }
      }

      // Fallback to regular localStorage
      const savedProducts = localStorage.getItem('admin-products');
      if (savedProducts) {
        try {
          setProducts(JSON.parse(savedProducts));
          setApiLoaded(true);
          return;
        } catch (error) {
          console.error('Error parsing saved products:', error);
        }
      }

      // Final fallback to static data
      setProducts(allProducts);
      setApiLoaded(true);
    };

    // Listen for localStorage changes from admin panel
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin-products-sync' && e.newValue) {
        try {
          const syncData = JSON.parse(e.newValue);
          setProducts(syncData.products);
          console.log('Main page updated with admin changes');
        } catch (error) {
          console.error('Error parsing admin sync data:', error);
        }
      }
    };

    // Load products from database
    loadProductsFromDatabase();

    // Listen for admin updates
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  // Simulate loading
  useState(() => {
    setTimeout(() => setIsLoading(false), 1000);
  });

  // Filter products based on search query and category
  const filteredProducts = products.length > 0 ? products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  }) : [];

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* TikTok Browser Warning */}
      {showTikTokMessage && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Open in Browser</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              You're viewing this in TikTok's browser. For the best experience and to access all features, please copy this link and open it in Chrome or Safari:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <p className="text-sm font-mono text-gray-800 break-all select-all">
                {typeof window !== 'undefined' ? window.location.href : 'pixelas.store'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : 'pixelas.store')}
                className="flex-1 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Copy Link
              </button>
              <button
                onClick={() => setShowTikTokMessage(false)}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 sm:py-6 border-b border-white/10 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4 max-w-6xl mx-auto">
          <a className="text-xs sm:text-sm font-medium tracking-wider text-white/60 hover:text-white transition-colors flex-shrink-0" href="/">
            AMLOLIFE
          </a>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
            />
          </div>
          
          <button 
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-white transition-all"
            onClick={() => window.open('mailto:amlolife.contact@gmail.com', '_self')}
          >
            Contact
          </button>
        </div>
      </header>
      
      {/* Products Section - No scroll, all visible */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20 sm:py-24">
        <div className="w-full max-w-6xl">
          
          {/* Category Filters */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedCategory === category
                    ? 'bg-white text-black shadow-lg shadow-white/20'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Results Count */}
          {(searchQuery || selectedCategory !== "All") && (
            <div className="mb-6 text-center">
              <p className="text-white/60 text-sm">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} 
                {searchQuery && ` matching "${searchQuery}"`}
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
              </p>
            </div>
          )}
          
          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl h-64">
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-white/10 rounded w-3/4"></div>
                      <div className="h-3 bg-white/10 rounded w-1/2"></div>
                      <div className="h-3 bg-white/10 rounded w-full"></div>
                      <div className="h-3 bg-white/10 rounded w-5/6"></div>
                      <div className="mt-auto pt-8">
                        <div className="h-4 bg-white/10 rounded w-1/3 mb-2"></div>
                        <div className="h-10 bg-white/10 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : !apiLoaded ? (
            // API failed to load
            <div className="col-span-full text-center py-20">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                  <X className="w-10 h-10 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Unable to load products</h3>
                <p className="text-white/40 text-base mb-6">
                  There was an error loading the product data. Please try refreshing the page.
                </p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 bg-white text-black hover:bg-gray-200 rounded-lg text-sm font-semibold transition-all"
              >
                Refresh Page
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <ProductCard
                    key={index}
                    title={product.title}
                    subtitle={product.subtitle}
                    description={product.description}
                    featured={product.featured}
                    link={product.link}
                    image={product.image}
                    category={product.category}
                    onDetailsClick={() => setSelectedProduct(product)}
                  />
                ))
              ) : (
                // Enhanced Empty State
                <div className="col-span-full text-center py-20">
                  <div className="mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                      <Search className="w-10 h-10 text-white/20" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
                    <p className="text-white/40 text-base mb-6">
                      {searchQuery
                        ? `We couldn't find any products matching "${searchQuery}"`
                        : `No products in ${selectedCategory}`
                      }
                    </p>
                  </div>
                  <div className="flex justify-center gap-3">
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-all"
                      >
                        Clear Search
                      </button>
                    )}
                    {selectedCategory !== "All" && (
                      <button
                        onClick={() => setSelectedCategory("All")}
                        className="px-6 py-2.5 bg-white text-black hover:bg-gray-200 rounded-lg text-sm font-semibold transition-all"
                      >
                        View All Products
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">AMLOLIFE</h3>
              <p className="text-sm text-white/60 leading-relaxed max-w-xl">
                Professional AI-powered tools for creative professionals. One-time payment, lifetime access.
              </p>
            </div>
            <button
              onClick={() => window.open('mailto:amlolife.contact@gmail.com', '_self')}
              className="px-5 py-3 rounded-xl border border-white/20 bg-white/10 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              Contact Us
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 text-sm text-white/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2024 Amlolife. All rights reserved.</p>
            <span>amlolife.contact@gmail.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

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

function ProductCard({ title, subtitle, description, featured, link, image, category, onDetailsClick }: ProductCardProps) {
  const handleCardClick = () => {
    if (onDetailsClick) {
      onDetailsClick();
    }
  };

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
      className={`
        group relative isolation overflow-hidden rounded-2xl border border-white/20 backdrop-blur-xl
        bg-gradient-to-br from-white/12 via-black/40 to-black/70 shadow-[0_22px_55px_-24px_rgba(0,0,0,0.95)] ring-1 ring-inset ring-white/12
        hover:border-white/60 hover:ring-white/35 hover:shadow-[0_28px_70px_-24px_rgba(0,0,0,0.95)]
        flex flex-col h-full cursor-pointer transition-all duration-300
        ${featured ? 
          'border-orange-400/70 ring-orange-400/40 shadow-xl shadow-orange-400/35' : ''
        }
      `}
      onClick={handleCardClick}
    >
      {/* Background Image with Gradient Overlay */}
      {image && (
        <div className="absolute inset-0 z-0">
          <Image 
            src={image} 
            alt={title}
            fill
            className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Multi-layer gradient for smooth blending - fades from top-right */}
          <div 
            className="absolute inset-0" 
            style={{
              background: 'radial-gradient(ellipse 120% 100% at top right, transparent 0%, transparent 30%, black 70%)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        </div>
      )}

      {/* Content Layer - Enhanced Layout & Typography */}
      <div className={`relative z-10 p-5 flex flex-col h-full transition-all duration-300 ${featured ? 'ring-1 ring-orange-500/20' : ''}`}>
        {featured && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-orange-500/50 border border-orange-400/50">
            ⭐ Featured
          </div>
        )}
        
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-lg mb-1.5 line-clamp-1 drop-shadow-lg tracking-tight leading-tight transition-all duration-300">{title}</h3>
            <p className="text-gray-300 text-xs drop-shadow font-medium opacity-90 group-hover:opacity-100 transition-opacity">{subtitle}</p>
          </div>
        </div>
        
        <div className="flex-grow overflow-hidden">
          <p className="text-gray-400 text-sm leading-snug drop-shadow group-hover:text-gray-300 transition-colors duration-300 line-clamp-4">{description}</p>
        </div>
        
        <div className="mt-auto">
          <div className="flex justify-end mb-4">
            <div className="text-xs text-white/60 font-medium px-2 py-1 bg-white/5 rounded-full border border-white/10 group-hover:bg-white/10 transition-colors duration-300">
              {category}
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleCardClick}
              className="w-full px-4 py-3 bg-white text-black text-sm font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-white/20 active:translate-y-0"
            >
              <span className="flex items-center justify-center gap-2">
                View Details
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProductDetailModalProps {
  product: any;
  onClose: () => void;
}

function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
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
    >
      <div
        className={`relative mx-auto max-w-4xl bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 border border-white/20 rounded-3xl shadow-2xl shadow-white/20 animate-in zoom-in-95 slide-in-from-bottom-4 duration-500 ${
          product.featured ? 'border-orange-500/50 shadow-orange-500/20 ring-2 ring-orange-500/30' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Enhanced */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl hover:shadow-white/20 transform hover:scale-110 active:scale-95"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Product Image */}
        {product.detailedImage && (
          <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
            <Image 
              src={product.detailedImage} 
              alt={product.title}
              fill
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, 100vw"
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
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg">{product.title}</h2>
              <p className="text-white/80 text-sm sm:text-base drop-shadow">{product.subtitle}</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 sm:p-8">
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

          {/* Category Badge and Download Buttons */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex justify-between items-center mb-4">
              <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/60 text-sm">
                {product.category}
              </span>
            </div>

            {/* Download Buttons */}
            {product.downloadButtons && product.downloadButtons.length >= 2 && (
              <div className="flex gap-3">
                {product.downloadButtons[0]?.url && product.downloadButtons[0]?.text && (
                  <button 
                    onClick={() => window.open(product.downloadButtons[0].url, '_blank')}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
                  >
                    {product.downloadButtons[0].text}
                  </button>
                )}
                {product.downloadButtons[1]?.url && product.downloadButtons[1]?.text && (
                  <button 
                    onClick={() => window.open(product.downloadButtons[1].url, '_blank')}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/25"
                  >
                    {product.downloadButtons[1].text}
                  </button>
                )}
              </div>
            )}

            {/* Fallback download link */}
            {!product.downloadButtons?.[0]?.url && product.link && (
              <button 
                onClick={() => window.open(product.link, '_blank')}
                className="w-full px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all shadow-lg"
              >
                Download
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
