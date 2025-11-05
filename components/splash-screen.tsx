"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Reduced delay from 2500ms to 800ms for faster loading
    const timer = setTimeout(() => {
      setIsVisible(false)
      // Reduced fade-out from 600ms to 300ms
      setTimeout(onComplete, 300)
    }, 800)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 bg-background flex items-center justify-center z-50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo with pulse animation */}
        <div className="animate-pulse-scale">
          <Image src="/logo.png" alt="PartExpress Logo" width={120} height={120} priority className="drop-shadow-lg" />
        </div>

        {/* Brand text */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">PartExpress</h1>
          <p className="text-muted-foreground text-sm mt-2">Premium Auto Parts</p>
        </div>

        {/* Loading indicator */}
        <div className="flex gap-2 mt-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  )
}
