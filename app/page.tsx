"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Header from "@/components/header"
import Cart from "@/components/cart"
import CarouselBanner from "@/components/carousel-banner"
import SplashScreen from "@/components/splash-screen"

// Lazy load Footer for better initial load performance
const Footer = dynamic(() => import("@/components/footer"), {
  loading: () => <div className="h-64 bg-black" />
})

interface Product {
  id: number
  name: string
  category?: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  badge?: string
  description?: string
  items?: string[]
}

interface CartItem extends Product {
  quantity: number
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)

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

  // Save cart to localStorage whenever it changes (optimized)
  useEffect(() => {
    if (cartItems.length > 0 || localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems])

  const categories = [
    { id: "all", label: "All Parts" },
    { id: "engine-oil", label: "Engine Oil" },
    { id: "air-filter", label: "Air Filter" },
    { id: "oil-filter", label: "Oil Filter" },
    { id: "spark-plugs", label: "Spark Plugs" },
    { id: "coolant", label: "Coolant" },
    { id: "suspension", label: "Suspension" },
    { id: "lights", label: "Lights" },
    { id: "exhaust", label: "Exhaust" },
    { id: "interior", label: "Interior" },
  ]

  const brands = [
    { name: "Mercedes-Benz", logo: "/Mercedes_Benz_Logo.png" },
    { name: "Porsche", logo: "/Porsche_Logo.png" },
    { name: "Audi", logo: "/Audi_Logo.png" },
    { name: "BMW", logo: "/BMW_Logo.png" },
    { name: "Volkswagen", logo: "/volkswagon_logo.png" },
    { name: "Land Rover", logo: "/Land_Rover_Logo.png" },
    { name: "Ferrari", logo: "/Ferrari_Logo.png" },
    { name: "Lamborghini", logo: "/Lamborghini_Logo.png" },
    { name: "Jaguar", logo: "/Jaguar_Logo.png" },
    { name: "Bentley", logo: "/Beltley_Logo.png" },
    { name: "Aston Martin", logo: "/Aston_Martin_Logo.png" },
    { name: "Rolls Royce", logo: "/Rolls_Royce_Logo.png" },
    { name: "Maserati", logo: "/Maserati_Logo.png" },
    { name: "McLaren", logo: "/mclaren_logo.png" },
    { name: "Volvo", logo: "/Volvo_Logo.png" },
    { name: "Mini", logo: "/Mini_Logo.png" },
    { name: "Lexus", logo: "/lexus_logo.png" },
    { name: "Kia", logo: "/Kia_logo.png" },
    { name: "Mahindra", logo: "/Mahindra-Logo.png" },
    { name: "MG", logo: "/MG-logo.png" },
  ]

  const deliveryImages = [
    {
      id: 1,
      src: "/hero-quality-speed.jpg",
      alt: "Trusted for Quality, Chosen for Speed",
    },
    {
      id: 2,
      src: "/hero-delivery-fast.jpg",
      alt: "Fast Delivery in Delhi NCR",
    },
    {
      id: 3,
      src: "/hero-financing.jpg",
      alt: "Flexible Financing for Parts",
    },
  ]

  const allProducts = [
    {
      id: 1,
      name: "Premium Synthetic Engine Oil 5W-30",
      category: "engine-oil",
      price: 1299,
      originalPrice: 1699,
      rating: 4.8,
      reviews: 456,
      image: "/premium-synthetic-engine-oil.jpg",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "High Performance Air Filter",
      category: "air-filter",
      price: 599,
      originalPrice: 899,
      rating: 4.7,
      reviews: 234,
      image: "/air-filter.png",
      badge: "Best Seller",
    },
    {
      id: 3,
      name: "Engine Oil Filter Premium",
      category: "oil-filter",
      price: 399,
      originalPrice: 599,
      rating: 4.6,
      reviews: 334,
      image: "/oil-filter.png",
      badge: "Best Seller",
    },
    {
      id: 4,
      name: "Iridium Spark Plugs Set (4pcs)",
      category: "spark-plugs",
      price: 1899,
      originalPrice: 2499,
      rating: 4.9,
      reviews: 423,
      image: "/chrome-exhaust-pipe.png",
      badge: "Top Rated",
    },
    {
      id: 5,
      name: "Coolant Concentrate 1L",
      category: "coolant",
      price: 499,
      originalPrice: 799,
      rating: 4.5,
      reviews: 189,
      image: "/premium-synthetic-engine-oil.jpg",
    },
    {
      id: 6,
      name: "Cabin Air Filter Replacement",
      category: "air-filter",
      price: 399,
      originalPrice: 599,
      rating: 4.3,
      reviews: 145,
      image: "/cabin-air-filter.jpg",
      badge: "Best Seller",
    },
    {
      id: 7,
      name: "LED Headlight Upgrade Kit",
      category: "lights",
      price: 2799,
      originalPrice: 3499,
      rating: 4.8,
      reviews: 512,
      image: "/led-headlights.png",
      badge: "Limited Deal",
    },
    {
      id: 8,
      name: "Lowering Springs Set",
      category: "suspension",
      price: 4499,
      originalPrice: 5999,
      rating: 4.6,
      reviews: 189,
      image: "/lowering-springs.jpg",
    },
    {
      id: 9,
      name: "Stainless Steel Exhaust Pipe",
      category: "exhaust",
      price: 3299,
      originalPrice: 4299,
      rating: 4.7,
      reviews: 156,
      image: "/stainless-steel-exhaust-pipe.jpg",
      badge: "Flash Sale",
    },
    {
      id: 10,
      name: "Premium Leather Seat Covers",
      category: "interior",
      price: 2299,
      originalPrice: 2999,
      rating: 4.4,
      reviews: 298,
      image: "/seat-covers.jpg",
    },
    {
      id: 11,
      name: "Fog Light Assembly",
      category: "lights",
      price: 1499,
      originalPrice: 1899,
      rating: 4.5,
      reviews: 267,
      image: "/car-fog-lights.png",
    },
    {
      id: 12,
      name: "Performance Brake Pads",
      category: "suspension",
      price: 1899,
      originalPrice: 2499,
      rating: 4.9,
      reviews: 423,
      image: "/brake-pads-close-up.png",
      badge: "Top Rated",
    },
  ]

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
        "Service Duration": "30-45 minutes",
        "Warranty": "3 months",
        "Oil Type": "Conventional",
        "Compatibility": "Most vehicles",
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
        "Service Duration": "45-60 minutes",
        "Warranty": "6 months",
        "Oil Type": "Semi-Synthetic",
        "Compatibility": "All vehicle types",
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
        "Service Duration": "60-90 minutes",
        "Warranty": "12 months",
        "Oil Type": "Full Synthetic",
        "Compatibility": "All vehicle types",
      },
    },
  ]

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
      image: "/oil-filter.png",
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
      image: "/led-headlights.png",
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
      image: "/lowering-springs.jpg",
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
      image: "/seat-covers.jpg",
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
      image: "/brake-pads-close-up.png",
      badge: "Popular",
      items: ["Iridium Spark Plugs Set (4pcs)", "Stainless Steel Exhaust Pipe", "Lowering Springs Set"],
    },
  ]

  const displayedCombos = comboDealProducts.slice(0, 5)
  const hasMoreCombos = comboDealProducts.length > 5

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [searchQuery, selectedCategory])

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      // Only include the properties needed for CartItem
      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        rating: product.rating,
        reviews: product.reviews,
        image: product.image,
        category: product.category,
        badge: product.badge,
        description: product.description,
        items: product.items,
        quantity: 1,
      }
      return [...prev, cartItem]
    })
  }

  const handleRemoveFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId)
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash")
    if (hasSeenSplash) {
      setShowSplash(false)
    }
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
    sessionStorage.setItem("hasSeenSplash", "true")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <>
          <Header cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)} onCartClick={() => setShowCart(!showCart)} onSearch={setSearchQuery} />

          {showCart && (
            <Cart
              items={cartItems}
              onRemove={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
              onClose={() => setShowCart(false)}
            />
          )}

          <main className="w-full flex-1">
            <CarouselBanner images={deliveryImages} />

            <div className="px-3 sm:px-4 md:px-6 lg:px-8">
              <div className="w-full py-3 md:py-6">
                <div className="mb-4 md:mb-6 bg-brand-red text-white p-2 md:p-4 rounded text-center font-semibold text-sm md:text-base">
                  🎉 Limited Time Deals - Save up to 40% on selected parts!
                </div>

                <div className="mb-4 md:mb-6 overflow-x-auto pb-2 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 px-3 sm:px-4 md:px-6 lg:px-8">
                  <div className="flex gap-2">
                    {categories.map((cat) => (
                      <Button
                        key={cat.id}
                        variant={selectedCategory === cat.id ? "default" : "outline"}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`whitespace-nowrap font-semibold transition-all ${
                          selectedCategory === cat.id
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-white border border-border text-foreground"
                        }`}
                      >
                        {cat.label}
                      </Button>
                    ))}
                </div>
              </div>

                {/* Special Offers Section */}
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg md:text-2xl font-bold flex items-center gap-1">
                      <svg className="w-6 h-6 md:w-7 md:h-7 text-brand-red" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-brand-red">Special Offers</span>
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 mb-12 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 px-3 sm:px-4 md:px-6 lg:px-8">
                  <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 w-max md:w-full">
                    {specialOffers.map((offer) => (
                      <a key={offer.id} href={`/special-offer/${offer.id}`}>
                        <Card className="bg-white border border-border overflow-hidden flex flex-col w-64 md:w-auto flex-shrink-0 md:flex-shrink hover:shadow-lg transition-shadow cursor-pointer">
                          <div className="relative">
                            <img
                              src={offer.image || "/placeholder.svg"}
                              alt={offer.name}
                              className="w-full h-40 object-cover"
                            />
                            {offer.badge && (
                              <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                                {offer.badge}
                              </div>
                            )}
                          </div>
                          <div className="p-3 flex-1 flex flex-col">
                            <h3 className="font-bold text-sm text-foreground mb-1 line-clamp-2">{offer.name}</h3>
                            <p className="text-xs text-muted-foreground mb-2">{offer.description}</p>
                            <div className="flex items-center gap-1 mb-2">
                              <span className="text-xs text-yellow-500">★</span>
                              <span className="text-xs font-semibold text-foreground">{offer.rating}</span>
                              <span className="text-xs text-muted-foreground">({offer.reviews})</span>
                            </div>
                            <div className="flex items-baseline gap-2 mb-3">
                              <span className="text-lg font-bold text-primary">₹{offer.price.toLocaleString()}</span>
                              <span className="text-xs text-muted-foreground line-through">
                                ₹{offer.originalPrice.toLocaleString()}
                              </span>
                              <span className="text-xs font-bold text-green-600">
                                {Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100)}% OFF
                              </span>
                            </div>
                                    <div className="mt-auto pt-2 text-brand-red text-sm font-bold text-center">
                                      View Details →
                                    </div>
                          </div>
                        </Card>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Combo Deals Section */}
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg md:text-2xl font-bold flex items-center gap-1">
                      <svg className="w-6 h-6 md:w-7 md:h-7 text-brand-red" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                      <span className="text-brand-red">Combo Deals</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm text-muted-foreground font-semibold hidden md:inline">
                      Sort by:
                    </span>
                    <select className="px-2 sm:px-3 py-1 sm:py-2 border border-border rounded bg-white text-foreground text-xs sm:text-sm font-semibold transition-colors">
                      <option>Relevance</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Highest Rated</option>
                      <option>Most Reviews</option>
                    </select>
                  </div>
                </div>

                {hasMoreCombos && (
                  <div className="mb-3 flex justify-end">
                    <a href="/combo-deals" className="text-brand-red font-semibold text-xs sm:text-sm">
                      Show All
                    </a>
                  </div>
                )}

                <div className="overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 mb-12 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 px-3 sm:px-4 md:px-6 lg:px-8">
                  <div className="flex md:grid md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-4 w-max md:w-full">
                    {displayedCombos.map((combo) => (
                      <Card
                        key={combo.id}
                        className="bg-white border border-border overflow-hidden flex flex-col w-64 md:w-auto flex-shrink-0 md:flex-shrink"
                      >
                        <div className="relative">
                          <img
                            src={combo.image || "/placeholder.svg"}
                            alt={combo.name}
                            className="w-full h-40 object-cover"
                          />
                          {combo.badge && (
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                              {combo.badge}
                            </div>
                          )}
                        </div>
                        <div className="p-3 flex-1 flex flex-col">
                          <h3 className="font-bold text-sm text-foreground mb-1 line-clamp-2">{combo.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{combo.description}</p>
                          <div className="flex items-center gap-1 mb-2">
                            <span className="text-xs text-yellow-500">★</span>
                            <span className="text-xs font-semibold text-foreground">{combo.rating}</span>
                            <span className="text-xs text-muted-foreground">({combo.reviews})</span>
                          </div>
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-lg font-bold text-primary">₹{combo.price.toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground line-through">
                              ₹{combo.originalPrice.toLocaleString()}
                            </span>
                            <span className="text-xs font-bold text-green-600">
                              {Math.round(((combo.originalPrice - combo.price) / combo.originalPrice) * 100)}% OFF
                            </span>
                          </div>
                          <Button
                            onClick={() => handleAddToCart(combo)}
                            className="w-full bg-primary text-primary-foreground font-semibold text-sm py-2"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="mb-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Quality & Speed Banner */}
                    <div className="relative rounded-lg overflow-hidden h-48 md:h-64 flex items-end">
                      <img
                        src="/hero-quality-speed.jpg"
                        alt="Quality and Speed"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="relative z-10 w-full p-4 md:p-6 flex flex-col justify-between h-full">
                        <div className="flex items-center gap-2 mb-auto">
                          <img src="/partexpress-logo.png" alt="PartExpress" className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg md:text-xl mb-3">Trusted for Quality</h3>
                          <Button className="bg-primary text-primary-foreground font-semibold text-sm">
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Fast Delivery Banner */}
                    <div className="relative rounded-lg overflow-hidden h-48 md:h-64 flex items-end">
                      <img
                        src="/hero-delivery-fast.jpg"
                        alt="Fast Delivery"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="relative z-10 w-full p-4 md:p-6 flex flex-col justify-between h-full">
                        <div className="flex items-center gap-2 mb-auto">
                          <img src="/partexpress-logo.png" alt="PartExpress" className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg md:text-xl mb-3">Fast Delivery</h3>
                          <Button className="bg-primary text-primary-foreground font-semibold text-sm">
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Financing Banner */}
                    <div className="relative rounded-lg overflow-hidden h-48 md:h-64 flex items-end">
                      <img
                        src="/hero-financing.jpg"
                        alt="Flexible Financing"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="relative z-10 w-full p-4 md:p-6 flex flex-col justify-between h-full">
                        <div className="flex items-center gap-2 mb-auto">
                          <img src="/partexpress-logo.png" alt="PartExpress" className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg md:text-xl mb-3">Flexible Financing</h3>
                          <Button className="bg-primary text-primary-foreground font-semibold text-sm">
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-center text-lg sm:text-xl font-bold text-foreground mb-4">Parts Available For</h3>
              <div className="bg-white py-8 flex justify-center">
                <div className="brand-slider h-full">
                  <div className="brand-slider-track h-full flex items-center">
                    {[...brands, ...brands].map((brand, idx) => (
                      <div
                        key={idx}
                        className="brand-slide flex flex-col items-center justify-center gap-2 flex-shrink-0"
                      >
                        <img
                          src={brand.logo || "/placeholder.svg"}
                          alt={brand.name}
                          className="h-20 w-24 sm:h-24 sm:w-32 md:h-28 md:w-40 object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </>
      )}
    </div>
  )
}
