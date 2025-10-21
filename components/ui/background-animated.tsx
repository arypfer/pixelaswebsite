"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()
    window.addEventListener("resize", setSize)

    // Animated mesh gradient
    let time = 0
    const animate = () => {
      time += 0.002  // Reduced from 0.005

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#000000")
      gradient.addColorStop(0.3 + Math.sin(time) * 0.05, "#0a0a0a")  // Reduced amplitude
      gradient.addColorStop(0.6 + Math.cos(time * 0.8) * 0.05, "#1a1a1a")  // Reduced amplitude
      gradient.addColorStop(1, "#000000")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw animated mesh lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)"
      ctx.lineWidth = 1

      const gridSize = 200  // Increased from 100
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const offsetX = Math.sin(time + x * 0.01) * 10  // Reduced offset
          const offsetY = Math.cos(time + y * 0.01) * 10  // Reduced offset
          
          ctx.beginPath()
          ctx.moveTo(x + offsetX, y + offsetY)
          ctx.lineTo(x + gridSize + offsetX, y + offsetY)
          ctx.lineTo(x + gridSize + offsetX, y + gridSize + offsetY)
          ctx.stroke()
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setSize)
    }
  }, [])

  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute inset-0"
      />

      {/* Lighting overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-white/[0.015] rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-gray-900/[0.03] rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "0.5s" }}
        />
      </div>

      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
