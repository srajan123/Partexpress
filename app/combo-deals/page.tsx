"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Header from "@/components/header"
import Cart from "@/components/cart"
import Footer from "@/components/footer"
import Link from "next/link"

export default function ComboDealPage() {
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)

  const ArrowLeftIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )

  const ZapIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )

  const comboDealProducts = [
    {
      id: 101,
      name: "Complete Engine Service Kit",
      description: "Engine Oil + Air Filter + Oil Filter",
      price: 2199,
      originalPrice: 3197,
      rating: 4.9,
      reviews: 567,
      image: "/premium-synthetic-engine-oil.jpg",
      badge: "Best Combo",
      items: ["Premium Synthetic Engine Oil 5W-30", "High Performance Air Filter", "Engine Oil Filter Premium"],
    },
    {
      id: 102,
      name: "Spark Plug & Coolant Bundle",
      description: "Spark Plugs + Coolant Concentrate",
      price: 2299,
      originalPrice: 3298,
      rating: 4.8,
      reviews: 423,
      image: "/iridium-spark-plugs.jpg",
      badge: "Popular",
      items: ["Iridium Spark Plugs Set (4pcs)", "Coolant Concentrate 1L"],
    },
    {
      id: 103,
      name: "Lighting Upgrade Package",
      description: "LED Headlights + Fog Lights",
      price: 4199,
      originalPrice: 5398,
      rating: 4.7,
      reviews: 345,
      image: "/led-headlight-kit.jpg",
      badge: "Limited Deal",
      items: ["LED Headlight Upgrade Kit", "Fog Light Assembly"],
    },
    {
      id: 104,
      name: "Suspension & Brake Combo",
      description: "Lowering Springs + Brake Pads",
      price: 6299,
      originalPrice: 8498,
      rating: 4.9,
      reviews: 612,
      image: "/lowering-springs-suspension.jpg",
      badge: "Top Rated",
      items: ["Lowering Springs Set", "Performance Brake Pads"],
    },
    {
      id: 105,
      name: "Interior Comfort Bundle",
      description: "Leather Seat Covers + Cabin Air Filter",
      price: 2599,
      originalPrice: 3598,
      rating: 4.6,
      reviews: 289,
      image: "/leather-seat-covers.png",
      badge: "Best Value",
      items: ["Premium Leather Seat Covers", "Cabin Air Filter Replacement"],
    },
    {
      id: 106,
      name: "Premium Exhaust System",
      description: "Stainless Steel Exhaust + Performance Pads",
      price: 5099,
      originalPrice: 6798,
      rating: 4.8,
      reviews: 456,
      image: "/stainless-steel-exhaust-pipe.jpg",
      badge: "Flash Sale",
      items: ["Stainless Steel Exhaust Pipe", "Performance Brake Pads"],
    },
    {
      id: 107,
      name: "Full Maintenance Kit",
      description: "All Engine Service Parts + Filters",
      price: 3499,
      originalPrice: 4997,
      rating: 4.9,
      reviews: 678,
      image: "/premium-synthetic-engine-oil.jpg",
      badge: "Best Seller",
      items: [
        "Premium Synthetic Engine Oil 5W-30",
        "High Performance Air Filter",
        "Engine Oil Filter Premium",
        "Cabin Air Filter Replacement",
      ],
    },
    {
      id: 108,
      name: "Performance Upgrade Bundle",
      description: "Spark Plugs + Exhaust + Suspension",
      price: 7199,
      originalPrice: 9297,
      rating: 4.7,
      reviews: 534,
      image: "/iridium-spark-plugs.jpg",
      badge: "Popular",
      items: ["Iridium Spark Plugs Set (4pcs)", "Stainless Steel Exhaust Pipe", "Lowering Springs Set"],
    },
  ]

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId)
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)} onCartClick={() => setShowCart(!showCart)} onSearch={() => {}} />

      {showCart && (
        <Cart
          items={cartItems}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onClose={() => setShowCart(false)}
        />
      )}

      <main className="w-full flex-1 px-2 md:px-4 py-4 md:py-6">
        <div className="bg-black rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="text-red-600">
              <ZapIcon />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">All Combo Deals</h1>
          </div>
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent text-white border-white hover:bg-red-600 hover:border-red-600 hover:text-white mt-4"
            >
              <ArrowLeftIcon />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 min-w-min md:min-w-full">
            {comboDealProducts.map((combo) => (
              <div key={combo.id} className="w-64 md:w-auto flex-shrink-0 md:flex-shrink">
                <Card className="bg-white border border-border hover:border-red-600 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer group">
                  <div className="relative">
                    <img
                      src={combo.image || "/placeholder.svg"}
                      alt={combo.name}
                      className="w-full h-40 object-cover group-hover:opacity-90 transition-opacity"
                    />
                    {combo.badge && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {combo.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex-1 flex flex-col">
                    <h3 className="font-bold text-sm text-foreground mb-1 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {combo.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">{combo.description}</p>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-xs text-yellow-500">★</span>
                      <span className="text-xs font-semibold text-foreground">{combo.rating}</span>
                      <span className="text-xs text-muted-foreground">({combo.reviews})</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg font-bold text-red-600">₹{combo.price.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground line-through">
                        ₹{combo.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-red-600">
                        {Math.round(((combo.originalPrice - combo.price) / combo.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                    <Button
                      onClick={() => handleAddToCart(combo)}
                      className="w-full bg-red-600 text-white hover:bg-white hover:text-red-600 hover:border-red-600 border-2 border-red-600 font-semibold text-sm py-2 transition-all duration-300"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
