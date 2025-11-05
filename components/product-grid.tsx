"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  badge?: string
}

interface ProductGridProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

export default function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  const ShoppingCartIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )

  const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
    >
      <polygon points="12 2 15.09 10.26 23.77 10.36 17.13 16.01 19.09 24.29 12 18.54 4.91 24.29 6.87 16.01 0.23 10.36 8.91 10.26 12 2" />
    </svg>
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => {
        const discount = product.originalPrice
          ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
          : 0

        return (
          <Card
            key={product.id}
            className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-border bg-card hover:border-primary/50"
          >
            <div className="aspect-square bg-secondary overflow-hidden relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              {product.badge && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-bold rounded">
                  {product.badge}
                </div>
              )}
              {discount > 0 && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-bold rounded">
                  -{discount}%
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-sans text-sm font-semibold text-foreground line-clamp-2 mb-2 leading-snug">
                {product.name}
              </h3>

              <div className="flex items-center gap-1 mb-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={i < Math.floor(product.rating) ? "text-primary" : "text-muted-foreground/30"}
                    >
                      <StarIcon filled={i < Math.floor(product.rating)} />
                    </div>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground font-sans">({product.reviews})</span>
              </div>

              <div className="mb-4 pb-3 border-b border-border">
                <div className="flex items-baseline gap-2">
                  <p className="text-lg font-bold text-primary">₹{product.price.toLocaleString()}</p>
                  {product.originalPrice && (
                    <p className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              <Button
                onClick={() => onAddToCart(product)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold transition-colors flex items-center justify-center gap-2"
                size="sm"
              >
                <ShoppingCartIcon />
                Add to Cart
              </Button>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
