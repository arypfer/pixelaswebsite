"use client"

import { motion } from "framer-motion"
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
  const getColors = () => {
    switch (variant) {
      case "blue":
        return {
          idle: "rgb(59, 130, 246)",
          hover: "rgb(37, 99, 235)",
          tap: "rgb(29, 78, 216)"
        }
      case "green":
        return {
          idle: "rgb(34, 197, 94)",
          hover: "rgb(22, 163, 74)",
          tap: "rgb(21, 128, 61)"
        }
      case "purple":
        return {
          idle: "rgb(147, 51, 234)",
          hover: "rgb(126, 34, 206)",
          tap: "rgb(107, 33, 168)"
        }
      case "gray":
        return {
          idle: "rgb(107, 114, 128)",
          hover: "rgb(75, 85, 99)",
          tap: "rgb(55, 65, 81)"
        }
      default:
        return {
          idle: "rgb(59, 130, 246)",
          hover: "rgb(37, 99, 235)",
          tap: "rgb(29, 78, 216)"
        }
    }
  }

  const colors = getColors()

  const buttonVariants = {
    idle: {
      backgroundColor: colors.idle,
      scale: 1,
    },
    hover: {
      backgroundColor: colors.hover,
      scale: 1.02,
    },
    tap: {
      backgroundColor: colors.tap,
      scale: 0.98,
    },
  }

  return (
    <motion.button
      onClick={onClick}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      className={cn(
        "group relative grid overflow-hidden rounded-full px-6 py-3 transition-all duration-200",
        "shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] w-full",
        className
      )}
      style={{ minWidth: "200px" }}
    >
      {/* Spark effect */}
      <span>
        <span
          className={cn(
            "spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full",
            "[mask:linear-gradient(black,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]",
            "before:rotate-[-90deg] before:animate-rotate",
            "before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]",
          )}
        />
      </span>

      {/* Content - ensure white text on colored backgrounds */}
      <span className="z-10 flex items-center justify-center gap-3 text-white text-sm font-semibold relative">
        <Download className="w-4 h-4 flex-shrink-0 drop-shadow-sm" />
        <span className="drop-shadow-sm">{text}</span>
      </span>
    </motion.button>
  )
}
