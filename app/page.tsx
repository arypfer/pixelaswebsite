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
  const [products, setProducts] = useState<any[]>(allProducts);

  // Load products from API on mount
  useEffect(() => {
    const loadProductsFromAPI = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
        } else {
          // Fallback to localStorage if API fails
          const savedProducts = localStorage.getItem('admin-products');
          if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
          }
        }
      } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to localStorage
        const savedProducts = localStorage.getItem('admin-products');
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        }
      }
    };

    loadProductsFromAPI();
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
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
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
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all"
            onClick={() => alert("We'll get back to you soon.")}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
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
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">AMLOLIFE</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Professional AI-powered tools for creative professionals. One-time payment, lifetime access.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="https://instagram.com/amlolife" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Email Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/40">
            <p>© 2024 Amlolife. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
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
        group relative backdrop-blur-xl bg-black/40 border border-white/10 rounded-xl overflow-hidden
        hover:bg-black/50 hover:border-white/30 hover:shadow-lg
        flex flex-col h-full cursor-pointer transition-all duration-300
        ${featured ? 
          'border-orange-500/70 shadow-xl shadow-orange-500/30' : ''
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 border border-white/20 rounded-3xl shadow-2xl shadow-white/20 animate-in zoom-in-95 slide-in-from-bottom-4 duration-500 ${
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
