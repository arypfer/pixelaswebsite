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
    <div className="relative w-full">
      {/* Subtle orange glow underneath */}
      <div 
        className="absolute -inset-0.5 rounded-xl opacity-20 blur-lg bg-orange-500/40"
      />
      
      <button
        onClick={onClick}
        className={cn(
          "group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl px-6 py-3.5 font-semibold text-white transition-all duration-300",
          "bg-[#1a1a1b] border border-white/10",
          "hover:border-orange-500/30 hover:bg-[#202021]",
          "active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/20",
          className
        )}
      >
        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2.5 text-sm">
          <Download className="w-4 h-4 flex-shrink-0" />
          <span>{text}</span>
        </span>
      </button>
    </div>
  )
}
