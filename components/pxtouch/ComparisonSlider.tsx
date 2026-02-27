import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface ComparisonSliderProps {
  beforeImage?: string;
  afterImage: string;
  simulateEnhancement?: boolean;
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

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();

    const animateIntro = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      if (elapsed < duration) {
        const progress = 1 - Math.pow(1 - elapsed / duration, 3);
        setSliderPosition(35 + (progress * 15));
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

  const rawFilterStyle = simulateEnhancement && !beforeImage ? {
    filter: 'brightness(0.9) contrast(0.85) saturate(0.6) sepia(0.1)',
  } : {};

  const enhancedFilterStyle = simulateEnhancement ? {
    filter: 'brightness(1.05) contrast(1.1) saturate(1.15)',
  } : {};

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-col-resize select-none bg-[#0a0a0a] rounded-xl border border-white/[0.06] group touch-none"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onMouseDown={(e) => { handleMove(e.clientX); isDragging.current = true; }}
    >
      {/* LAYER 1: AFTER IMAGE (Background / Full Width) */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={afterImage}
          alt="After"
          className="w-full h-full object-cover md:object-center opacity-40 group-hover:opacity-100 transition-opacity duration-300"
          style={enhancedFilterStyle}
          draggable={false}
        />
        <div className="absolute bottom-6 right-6 bg-white/[0.03] backdrop-blur-xl text-white/60 px-3 py-1.5 text-xs font-medium border border-white/[0.06] rounded-xl z-10 pointer-events-none">
          Enhanced
        </div>
      </div>

      {/* LAYER 2: BEFORE IMAGE (Foreground / Clipped) */}
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

        {simulateEnhancement && (
          <div className="absolute inset-0 bg-white/5 mix-blend-overlay pointer-events-none opacity-50"></div>
        )}

        <div className="absolute bottom-6 left-6 bg-white/[0.03] backdrop-blur-xl text-white/40 px-3 py-1.5 text-xs font-medium border border-white/[0.06] rounded-xl z-10 pointer-events-none">
          Original
        </div>
      </div>

      {/* SLIDER HANDLE */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/60 cursor-col-resize z-30"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
          <ArrowLeftRight size={16} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;
