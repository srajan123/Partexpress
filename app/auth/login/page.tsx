"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Simulate login
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/")
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  const HomeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )

  return (
    <div className="min-h-screen bg-background px-4 py-3 sm:py-12 sm:flex sm:items-center sm:justify-center">
      <Link href="/" className="fixed top-2 left-2 z-10">
        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 flex items-center gap-2 h-8 px-2">
          <HomeIcon />
          <span className="hidden sm:inline">Home</span>
        </Button>
      </Link>

      <div className="w-full max-w-md mx-auto">
        {/* Logo and branding */}
        <div className="text-center mb-4 sm:mb-8 mt-10 sm:mt-0">
          <div className="flex justify-center mb-2 sm:mb-4">
            <Image src="/logo.png" alt="PartExpress Logo" width={50} height={50} className="drop-shadow-lg sm:w-20 sm:h-20" />
          </div>
          <h1 className="text-xl sm:text-3xl font-bold text-foreground">PartExpress</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-0.5 sm:mt-1">Premium Auto Parts</p>
        </div>

        {/* Login card */}
        <Card className="bg-card border border-border p-3 sm:p-8 shadow-2xl">
          <div className="mb-3 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground text-xs sm:text-sm mt-0.5 sm:mt-1">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-2 sm:mb-4 p-2 sm:p-3 bg-destructive/10 border border-destructive/20 rounded text-destructive text-xs sm:text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-4">
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="email" className="text-foreground font-semibold text-xs sm:text-sm">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary h-9 sm:h-11 text-sm"
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground font-semibold text-xs sm:text-sm">
                  Password
                </Label>
                <Link href="/auth/forgot-password" className="text-primary hover:text-primary/80 text-xs sm:text-sm font-medium">
                  Forgot?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary h-9 sm:h-11 text-sm"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-2 sm:py-2 mt-3 sm:mt-6 h-10 sm:h-11 text-sm sm:text-base"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-3 sm:mt-6 pt-3 sm:pt-6 border-t border-border">
            <p className="text-center text-muted-foreground text-xs sm:text-sm">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-primary hover:text-primary/80 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </Card>

        {/* Footer text */}
        <div className="mt-2 sm:mt-8 mb-4 sm:mb-0 text-center text-xs text-muted-foreground">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}
