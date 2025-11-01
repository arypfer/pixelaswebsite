"use client"

import { Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface DownloadButtonProps {
  text: string
  className?: string
  onClick?: () => void
  variant?: "blue" | "green" | "purple" | "gray"
}

export function DownloadButton({
  text,
  className,
  onClick,
  variant = "blue"
}: DownloadButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getVariantClasses = () => {
    switch (variant) {
      case "blue":
        return "bg-slate-700 hover:bg-slate-600 border-slate-600/40 shadow-slate-900/30 hover:shadow-slate-900/40"
      case "green":
        return "bg-slate-700 hover:bg-slate-600 border-slate-600/40 shadow-slate-900/30 hover:shadow-slate-900/40"
      case "purple":
        return "bg-slate-700 hover:bg-slate-600 border-slate-600/40 shadow-slate-900/30 hover:shadow-slate-900/40"
      case "gray":
        return "bg-slate-700 hover:bg-slate-600 border-slate-600/40 shadow-slate-900/30 hover:shadow-slate-900/40"
      default:
        return "bg-slate-700 hover:bg-slate-600 border-slate-600/40 shadow-slate-900/30 hover:shadow-slate-900/40"
    }
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative w-full overflow-hidden rounded-xl px-6 py-3.5",
        "border backdrop-blur-sm",
        "transition-all duration-300 ease-out",
        "shadow-lg hover:shadow-xl",
        "active:scale-[0.98] hover:scale-[1.01]",
        "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black",
        getVariantClasses(),
        className
      )}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Shine effect on hover */}
      <div 
        className={cn(
          "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent",
          "transition-transform duration-700 ease-out",
          isHovered && "translate-x-full"
        )}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2.5 text-white text-sm font-semibold">
        <Download className={cn(
          "w-4 h-4 flex-shrink-0 transition-transform duration-300",
          isHovered && "translate-y-0.5"
        )} />
        <span>{text}</span>
      </span>
    </button>
  )
}
