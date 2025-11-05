"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Header from "@/components/header"
import Cart from "@/components/cart"
import Footer from "@/components/footer"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

// Move static data outside component to prevent recreation
const specialOffers = [
    {
      id: 201,
      name: "Basic Silver Plan",
      description: "Essential maintenance for your vehicle",
      price: 999,
      originalPrice: 1499,
      rating: 4.5,
      reviews: 189,
      image: "/specila-basic-silve-plan.png",
      badge: "Popular",
      images: [
        "/specila-basic-silve-plan.png",
        "/premium-synthetic-engine-oil.jpg",
        "/oil-filter.png",
        "/air-filter.png"
      ],
      includes: [
        { item: "ENGINE OIL", available: true },
        { item: "OIL FILTER", available: true },
        { item: "WASHER FLUID", available: true },
        { item: "AIR FILTER", available: false },
        { item: "AC FILTER", available: false },
        { item: "FUEL FILTER", available: false },
        { item: "BRAKE OIL", available: false },
        { item: "COOLANT", available: false },
      ],
      specifications: {
        "Validity": "6 Months",
        "Service Frequency": "Every 3 Months",
        "Coverage Area": "Pan India",
        "Service Centers": "100+ Authorized Centers",
      },
    },
    {
      id: 202,
      name: "Gold Plan",
      description: "Premium care package for luxury vehicles",
      price: 1999,
      originalPrice: 2999,
      rating: 4.8,
      reviews: 345,
      image: "/special-gold-pla.png",
      badge: "Best Value",
      images: [
        "/special-gold-pla.png",
        "/premium-synthetic-engine-oil.jpg",
        "/oil-filter.png",
        "/air-filter.png",
        "/cabin-air-filter.jpg"
      ],
      includes: [
        { item: "ENGINE OIL", available: true },
        { item: "OIL FILTER", available: true },
        { item: "AIR FILTER", available: true },
        { item: "AC FILTER", available: true },
        { item: "WASHER FLUID", available: true },
        { item: "FUEL FILTER", available: false },
        { item: "BRAKE OIL", available: false },
        { item: "COOLANT", available: false },
      ],
      specifications: {
        "Validity": "12 Months",
        "Service Frequency": "Every 3 Months",
        "Coverage Area": "Pan India",
        "Service Centers": "150+ Authorized Centers",
      },
    },
    {
      id: 203,
      name: "Platinum Plan",
      description: "Ultimate protection and service package",
      price: 3499,
      originalPrice: 4999,
      rating: 4.9,
      reviews: 567,
      image: "/specila-platinum-plan.png",
      badge: "Premium",
      images: [
        "/specila-platinum-plan.png",
        "/premium-synthetic-engine-oil.jpg",
        "/oil-filter.png",
        "/air-filter.png",
        "/cabin-air-filter.jpg",
        "/brake-pads-close-up.png"
      ],
      includes: [
        { item: "ENGINE OIL", available: true },
        { item: "OIL FILTER", available: true },
        { item: "AIR FILTER", available: true },
        { item: "AC FILTER", available: true },
        { item: "FUEL FILTER", available: true },
        { item: "WASHER FLUID", available: true },
        { item: "BRAKE OIL", available: true },
        { item: "COOLANT", available: true },
      ],
      specifications: {
        "Validity": "18 Months",
        "Service Frequency": "Every 3 Months",
        "Coverage Area": "Pan India",
        "Service Centers": "200+ Authorized Centers",
        "Additional Perks": "VIP Support",
      },
    },
  ]

// Dynamic percentage calculation function (moved outside component)
const calculateDiscountPercentage = (originalPrice: number, currentPrice: number): number => {
  if (originalPrice <= 0 || currentPrice < 0) return 0
  if (currentPrice >= originalPrice) return 0
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
}

export default function SpecialOfferPage() {
  const params = useParams()
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Memoize offer lookup to prevent recalculation
  const offer = useMemo(() => 
    specialOffers.find((o) => o.id === Number(params.id)),
    [params.id]
  )

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart data:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes (skip initial empty state)
  useEffect(() => {
    if (cartItems.length > 0 || localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems])

  // Memoize mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }, [])

  // Early return if offer not found
  if (!offer) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)} onCartClick={() => setShowCart(!showCart)} />
        <main className="w-full flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Offer not found</h1>
            <Button onClick={() => router.push("/")}>Go to Homepage</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = useCallback(() => {
    setIsAdding(true)
    
    setTimeout(() => {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === offer.id)
        
        if (existing) {
          // Add the selected quantity to existing quantity
          return prev.map((item) =>
            item.id === offer.id ? { ...item, quantity: item.quantity + quantity } : item
          )
        } else {
          // Only include the properties needed for CartItem
          const cartItem: CartItem = {
            id: offer.id,
            name: offer.name,
            price: offer.price,
            quantity: quantity,
            image: offer.image,
          }
          return [...prev, cartItem]
        }
      })
      
      setIsAdding(false)
      setShowSuccess(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }, 200)
}, [offer, quantity])

const handleRemoveFromCart = useCallback((productId: number) => {
  setCartItems((prev) => prev.filter((item) => item.id !== productId))
}, [])

const handleUpdateQuantity = useCallback((productId: number, quantity: number) => {
  if (quantity <= 0) {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  } else {
    setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }
}, [])

  // Icon components
  const MinusIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )

  const PlusIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )

  const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  )

  const CrossIcon = () => (
    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )

  // Memoize cart count calculation
  const cartCount = useMemo(() => 
    cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  )

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header cartCount={cartCount} onCartClick={() => setShowCart(!showCart)} />

      {showCart && (
        <Cart
          items={cartItems}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onClose={() => setShowCart(false)}
        />
      )}

      <main className="w-full flex-1">
        <div className="w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 text-brand-red hover:text-brand-red hover:bg-brand-red/10"
          >
            ← Back to Offers
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Left Side - Images */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Thumbnail Images */}
              <div className="flex sm:flex-col gap-2 w-full sm:w-20 order-2 sm:order-1 overflow-x-auto sm:overflow-x-visible">
                {offer.images?.map((image, index) => (
                  <div
                    key={index}
                    className={`relative aspect-square cursor-pointer border-2 rounded-lg overflow-hidden transition-all flex-shrink-0 w-16 h-16 sm:w-full sm:h-auto ${
                      selectedImage === index ? 'border-primary' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${offer.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 order-1 sm:order-2">
                <Card className="overflow-hidden">
                  <div 
                    className="relative aspect-square cursor-crosshair"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onMouseMove={handleMouseMove}
                  >
                    <img
                      src={offer.images?.[selectedImage] || offer.image || "/placeholder.svg"}
                      alt={offer.name}
                      className={`w-full h-full object-cover transition-transform duration-200 ${
                        isHovering ? 'scale-150' : 'scale-100'
                      }`}
                      style={isHovering ? {
                        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                      } : {}}
                      loading="eager"
                      decoding="async"
                    />
                    {offer.badge && (
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-sm font-bold px-3 py-2 rounded">
                        {offer.badge}
                      </div>
                    )}
                    {isHovering && (
                      <div className="absolute inset-0 border-2 border-primary/50 pointer-events-none" />
                    )}
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="space-y-4 px-2 sm:px-0">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{offer.name}</h1>
                <p className="text-muted-foreground text-sm">{offer.description}</p>
              </div>

              {/* Fulfilled by, Rating, and Same Day Delivery */}
              <div className="flex flex-col gap-3">
                {/* Fulfilled by and Rating - Same Line */}
                <div className="flex flex-row items-center justify-between gap-2">
                  <button className="flex items-center gap-1 bg-black hover:bg-gray-800 border border-gray-300 px-2 sm:px-3 py-2 rounded-lg w-fit transition-colors">
                    <span className="text-xs sm:text-sm font-semibold text-white">Fulfilled by</span>
                    <img src="/partexpress-logo.png" alt="PartExpress" className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-lg sm:text-xl">★</span>
                      <span className="text-base sm:text-lg font-semibold">{offer.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">({offer.reviews} reviews)</span>
                  </div>
                </div>
                
                {/* Same Day Delivery */}
                <div className="flex items-center gap-2 text-red-600 font-semibold text-sm sm:text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-truck flex-shrink-0" viewBox="0 0 16 16">
                    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                  </svg>
                  <span>Same Day Delivery</span>
                </div>
              </div>

              {/* Price with Savings */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-red-600 text-xl sm:text-2xl font-bold">
                    -{calculateDiscountPercentage(offer.originalPrice, offer.price)}%
                  </span>
                  <span className="text-3xl sm:text-4xl font-bold text-primary">₹{offer.price.toLocaleString()}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  M.R.P.: ₹{offer.originalPrice.toLocaleString()} (₹{(offer.originalPrice / 1000).toFixed(2)} / millilitre)
                </div>
              </div>

              {/* In Stock */}
              <div className="text-green-600 font-bold text-sm sm:text-base">
                In Stock
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="text-sm sm:text-base font-semibold">Quantity:</label>
                <div className="flex items-center gap-3 justify-start">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 flex-shrink-0"
                  >
                    <MinusIcon />
                  </Button>
                  <span className="text-base sm:text-lg font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 flex-shrink-0"
                  >
                    <PlusIcon />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Add to Cart Button */}
                  <Button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`flex-1 hover:opacity-90 text-white font-semibold text-base sm:text-lg transition-all duration-200 h-14 px-4 ${
                      isAdding ? 'scale-95 opacity-80' : 'scale-100'
                    }`}
                    style={{ backgroundColor: '#d02928' }}
                  >
                    {isAdding ? 'Adding...' : 'Add to Cart'}
                  </Button>
                  
                  {/* Buy Now Button */}
                  <Button
                    onClick={() => {
                      handleAddToCart()
                      // Navigate to checkout or cart after adding
                      setTimeout(() => {
                        setShowCart(true)
                      }, 500)
                    }}
                    variant="outline"
                    className="flex-1 border-2 border-red-600 bg-white text-red-600 hover:bg-red-50 font-semibold text-base sm:text-lg transition-all duration-200 h-14 px-4"
                  >
                    Buy Now
                  </Button>
                </div>
                
                {/* Success Message */}
                {showSuccess && (
                  <div className="flex items-center justify-center gap-2 text-green-600 font-semibold text-sm animate-fade-in">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Added to your cart</span>
                  </div>
                )}
              </div>

              {/* What's Included */}
              <Card className="p-3 sm:p-4 w-full">
                <h2 className="text-base sm:text-lg font-bold">What's Included:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-2">
                  {offer.includes.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      {feature.available ? (
                        <CheckIcon />
                      ) : (
                        <CrossIcon />
                      )}
                      <span className={feature.available ? "" : "line-through text-muted-foreground"}>
                        {feature.item}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Specifications */}
              <Card className="p-3 sm:p-4 w-full">
                <h2 className="text-base sm:text-lg font-bold">Specifications:</h2>
                <div className="space-y-2 mt-2">
                  {Object.entries(offer.specifications).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:justify-between border-b border-border pb-2 gap-1 sm:gap-0">
                      <span className="font-semibold text-muted-foreground text-sm sm:text-base">{key}:</span>
                      <span className="font-semibold text-sm sm:text-base">{value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

