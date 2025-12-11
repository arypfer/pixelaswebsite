import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface ComparisonSliderProps {
  beforeImage?: string; // Optional: Provide specific before image
  afterImage: string;   // Required: The main image
  simulateEnhancement?: boolean; // If true, applies filters to create a 'Raw' vs 'Graded' look from a single image
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ 
  beforeImage, 
  afterImage,
  simulateEnhancement = true 
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  }, []);

  const onMouseDown = () => { isDragging.current = true; };
  const onMouseUp = () => { isDragging.current = false; };
  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  // Intro animation
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const animateIntro = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      if (elapsed < duration) {
        // Smooth ease-out
        const progress = 1 - Math.pow(1 - elapsed / duration, 3);
        setSliderPosition(35 + (progress * 15)); // Animate from 35% to 50%
        requestAnimationFrame(animateIntro);
      }
    };
    
    requestAnimationFrame(animateIntro);

    const stopDragging = () => { isDragging.current = false; };
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchend', stopDragging);
    return () => {
        window.removeEventListener('mouseup', stopDragging);
        window.removeEventListener('touchend', stopDragging);
    };
  }, []);

  // Styles for the "Raw" look if simulating
  const rawFilterStyle = simulateEnhancement && !beforeImage ? {
    filter: 'brightness(0.9) contrast(0.85) saturate(0.6) sepia(0.1)',
  } : {};

  // Styles for the "Pro" look
  const enhancedFilterStyle = simulateEnhancement ? {
    filter: 'brightness(1.05) contrast(1.1) saturate(1.15) sharp(1)',
  } : {};

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-col-resize select-none bg-black group touch-none"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onMouseDown={(e) => { handleMove(e.clientX); isDragging.current = true; }}
    >
      {/* 
        LAYER 1: AFTER IMAGE (Background / Full Width)
        This represents the "Result".
      */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={afterImage} 
          alt="After" 
          className="w-full h-full object-cover md:object-center opacity-40 group-hover:opacity-100 transition-opacity duration-300"
          style={enhancedFilterStyle}
          draggable={false}
        />
        {/* Label */}
        <div className="absolute bottom-8 right-8 bg-black/50 backdrop-blur-md text-white px-3 py-1 text-xs font-mono border border-white/20 rounded z-10 pointer-events-none uppercase tracking-widest">
           Enhanced
        </div>
      </div>

      {/* 
        LAYER 2: BEFORE IMAGE (Foreground / Clipped)
        This represents the "Original".
        We use clip-path to reveal it based on slider position.
      */}
      <div 
        className="absolute inset-0 w-full h-full will-change-[clip-path]"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img 
          src={beforeImage || afterImage} 
          alt="Before" 
          className="absolute inset-0 w-full h-full object-cover md:object-center opacity-40 group-hover:opacity-100 transition-opacity duration-300"
          style={rawFilterStyle}
          draggable={false}
        />
        
        {/* Optional: Subtle Noise Grain for RAW feel */}
        {simulateEnhancement && (
           <div className="absolute inset-0 bg-white/5 mix-blend-overlay pointer-events-none opacity-50"></div>
        )}

        {/* Label */}
        <div className="absolute bottom-8 left-8 bg-black/50 backdrop-blur-md text-white/80 px-3 py-1 text-xs font-mono border border-white/10 rounded z-10 pointer-events-none uppercase tracking-widest">
           Original
        </div>
      </div>

      {/* 
        SLIDER HANDLE 
      */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white cursor-col-resize z-30 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-md border border-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
             <ArrowLeftRight size={16} className="text-white" />
         </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;
