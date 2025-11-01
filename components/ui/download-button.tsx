"use client"

import { Download } from "lucide-react"
import { cn } from "@/lib/utils"

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
  return (
    <div className="relative w-full group/button">
      {/* Subtle orange glow that intensifies on hover */}
      <div 
        className="absolute -inset-1 rounded-xl opacity-30 group-hover/button:opacity-50 blur-xl bg-gradient-to-r from-orange-500/50 via-amber-500/50 to-orange-500/50 transition-opacity duration-500"
      />
      
      <button
        onClick={onClick}
        className={cn(
          "relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl px-6 py-3.5 font-semibold text-white transition-all duration-300",
          "bg-gradient-to-br from-[#2a2a2b] via-[#1f1f20] to-[#1a1a1b]",
          "border border-white/10 hover:border-orange-500/40",
          "shadow-lg shadow-black/50 hover:shadow-orange-500/20",
          "hover:scale-[1.02] active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/30",
          className
        )}
      >
        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover/button:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-1000" />
        </div>

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2.5 text-sm">
          <Download className="w-4 h-4 flex-shrink-0 group-hover/button:animate-bounce" />
          <span>{text}</span>
        </span>
      </button>
    </div>
  )
}
