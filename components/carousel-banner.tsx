"use client"

import { useState, useEffect } from "react"

interface CarouselBannerProps {
  images: Array<{ id: number; src: string; alt: string }>
}

export default function CarouselBanner({ images }: CarouselBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  const handleDotClick = (index: number) => {
    setIsTransitioning(true)
    setCurrentSlide(index)
  }

  return (
    <div className="w-full">
      <div className="relative w-full aspect-[3/2] md:aspect-[16/5] overflow-hidden bg-white">
        <div className="relative w-full h-full">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                idx === currentSlide
                  ? "opacity-100 translate-x-0"
                  : idx < currentSlide
                    ? "opacity-0 translate-x-full"
                    : "opacity-0 -translate-x-full"
              }`}
            >
              <img
                src={img.src || "/placeholder.svg"}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading={idx === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 px-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                idx === currentSlide ? "bg-primary md:w-8 w-6" : "bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-black/50 text-white px-3 md:px-4 py-1 md:py-2 rounded text-xs md:text-sm font-semibold">
          {currentSlide + 1} / {images.length}
        </div>
      </div>
    </div>
  )
}
