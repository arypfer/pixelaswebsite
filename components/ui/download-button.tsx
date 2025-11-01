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
    <button
      onClick={onClick}
      className={cn(
        "group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl px-6 py-3.5 font-semibold text-white transition-all duration-300",
        "bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
        "bg-origin-border bg-clip-padding-box",
        "[background-clip:padding-box,border-box,border-box]",
        "[background-size:200%]",
        "[border:calc(0.08*1rem)_solid_transparent]",
        "[animation:rainbow_8s_linear_infinite]",
        "hover:bg-[position:100%_0]",
        "hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]",
        "active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
        className
      )}
    >
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2.5 text-sm">
        <Download className="w-4 h-4 flex-shrink-0" />
        <span>{text}</span>
      </span>
    </button>
  )
}
