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
        return "bg-blue-600 hover:bg-blue-700 border-blue-500/30 shadow-blue-500/20 hover:shadow-blue-500/30"
      case "green":
        return "bg-green-600 hover:bg-green-700 border-green-500/30 shadow-green-500/20 hover:shadow-green-500/30"
      case "purple":
        return "bg-purple-600 hover:bg-purple-700 border-purple-500/30 shadow-purple-500/20 hover:shadow-purple-500/30"
      case "gray":
        return "bg-gray-700 hover:bg-gray-800 border-gray-600/30 shadow-gray-500/20 hover:shadow-gray-500/30"
      default:
        return "bg-blue-600 hover:bg-blue-700 border-blue-500/30 shadow-blue-500/20 hover:shadow-blue-500/30"
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
