"use client"

import { Download } from "lucide-react"
import { cn } from "@/lib/utils"

interface DownloadButtonProps {
  text: string
  className?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "tertiary"
}

export function DownloadButton({
  text,
  className,
  onClick,
  variant = "secondary"
}: DownloadButtonProps) {
  
  const isPrimary = variant === "primary"
  const isSecondary = variant === "secondary"
  
  return (
    <div className="relative w-full group/button">
      {/* Enhanced glow - more visible and dynamic */}
      <div 
        className={cn(
          "absolute -inset-1 rounded-lg blur-xl transition-all duration-500",
          isPrimary 
            ? "opacity-40 group-hover/button:opacity-70 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600" 
            : "opacity-20 group-hover/button:opacity-40 bg-gradient-to-r from-orange-500/60 via-amber-500/60 to-orange-500/60"
        )}
      />
      
      <button
        onClick={onClick}
        className={cn(
          "relative inline-flex w-full items-center justify-center overflow-hidden rounded-lg px-6 py-3 font-semibold text-white transition-all duration-300",
          "border shadow-xl",
          "hover:scale-[1.02] active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          isPrimary && [
            "bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600",
            "border-orange-400/50 hover:border-orange-300/60",
            "shadow-orange-500/30 hover:shadow-orange-500/50",
            "text-white"
          ],
          isSecondary && [
            "bg-gradient-to-br from-[#2d2d2e] via-[#232324] to-[#1c1c1d]",
            "border-white/15 hover:border-orange-500/50",
            "shadow-black/50 hover:shadow-orange-500/25"
          ],
          variant === "tertiary" && [
            "bg-gradient-to-br from-[#252526] via-[#1e1e1f] to-[#1a1a1b]",
            "border-white/10 hover:border-orange-500/40",
            "shadow-black/40 hover:shadow-orange-500/20"
          ],
          className
        )}
      >
        {/* Glossy overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50" />
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover/button:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover/button:translate-x-[200%] transition-transform duration-1000 ease-out" />
        </div>

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2.5 text-sm tracking-wide">
          <Download className={cn(
            "w-4 h-4 flex-shrink-0 transition-transform duration-300",
            "group-hover/button:translate-y-0.5"
          )} />
          <span className="font-medium">{text}</span>
        </span>
      </button>
    </div>
  )
}
