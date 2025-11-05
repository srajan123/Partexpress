"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"
import Logo from "./logo"

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
  onSearch?: (query: string) => void
}

export default function Header({ cartCount, onCartClick, onSearch }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showAuthMenu, setShowAuthMenu] = useState(false)
  const [showCatalogueMenu, setShowCatalogueMenu] = useState(false)

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowAuthMenu(false)
  }

  const ShoppingCartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )

  const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )

  const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )

  const LogOutIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )

  const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )

  return (
    <header className="sticky top-0 z-50 bg-black border-b-2 border-black shadow-md">
      <div className="max-w-7xl mx-auto px-2 md:px-4 py-1 md:py-2 flex items-center justify-between gap-1 md:gap-4">
        <div className="flex items-center gap-0.5 md:gap-2 flex-shrink-0 min-w-fit">
          <Logo />
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Input
              placeholder="Search parts..."
              onChange={(e) => onSearch?.(e.target.value)}
              className="pl-10 py-2 text-sm bg-white border border-muted-foreground/30 focus:border-primary"
            />
            <div className="absolute left-3 top-2.5 text-muted-foreground">
              <SearchIcon />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-0.5 md:gap-2">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex font-semibold text-white"
              onClick={() => setShowCatalogueMenu(!showCatalogueMenu)}
            >
              Catalogue
            </Button>

            {/* Catalogue dropdown menu */}
            {showCatalogueMenu && (
              <div className="absolute left-0 mt-2 w-56 bg-white border border-border rounded shadow-lg z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <h3 className="font-semibold text-foreground">Categories</h3>
                  <button
                    onClick={() => setShowCatalogueMenu(false)}
                    className="text-muted-foreground hover:text-foreground"
                    title="Close menu"
                  >
                    <CloseIcon />
                  </button>
                </div>
                <Link href="/">
                  <button className="w-full text-left px-4 py-2 hover:bg-secondary text-foreground font-semibold">
                    All Parts
                  </button>
                </Link>
                <Link href="/">
                  <button className="w-full text-left px-4 py-2 hover:bg-secondary text-foreground font-semibold">
                    Engine Parts
                  </button>
                </Link>
                <Link href="/">
                  <button className="w-full text-left px-4 py-2 hover:bg-secondary text-foreground font-semibold">
                    Oil & Filters
                  </button>
                </Link>
                <Link href="/">
                  <button className="w-full text-left px-4 py-2 hover:bg-secondary text-foreground font-semibold">
                    Exhaust Systems
                  </button>
                </Link>
                <Link href="/">
                  <button className="w-full text-left px-4 py-2 hover:bg-secondary text-foreground font-semibold">
                    Lighting
                  </button>
                </Link>
                <Link href="/">
                  <button className="w-full text-left px-4 py-2 hover:bg-secondary text-foreground font-semibold">
                    Interior Accessories
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Cart button */}
          <Button variant="ghost" size="sm" className="relative text-white" onClick={onCartClick} title="Shopping Cart">
            <ShoppingCartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="text-white"
              onClick={() => setShowAuthMenu(!showAuthMenu)}
              title={isLoggedIn ? "User Account" : "Login"}
            >
              <UserIcon />
            </Button>

            {/* Auth dropdown menu */}
            {showAuthMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded shadow-lg z-50">
                {isLoggedIn ? (
                  <>
                    <button className="w-full text-left px-4 py-2 hover:bg-secondary text-foreground font-semibold">
                      My Account
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-secondary text-foreground font-semibold">
                      My Orders
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-secondary text-foreground font-semibold">
                      Wishlist
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-secondary text-primary font-semibold flex items-center gap-2"
                    >
                      <LogOutIcon />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <button className="w-full text-left px-4 py-2 hover:bg-secondary text-primary font-semibold">
                        Login
                      </button>
                    </Link>
                    <Link href="/auth/signup">
                      <button className="w-full text-left px-4 py-2 hover:bg-secondary text-foreground font-semibold">
                        Sign Up
                      </button>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
