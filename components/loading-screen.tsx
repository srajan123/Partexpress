"use client"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        {/* Animated plus/logo */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-2 border-primary rounded-lg animate-spin-slow"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-bold text-primary">+</div>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-foreground font-semibold">Loading</p>
          <p className="text-muted-foreground text-sm mt-1">Please wait...</p>
        </div>
      </div>
    </div>
  )
}
