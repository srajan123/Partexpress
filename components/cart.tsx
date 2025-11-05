"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface CartProps {
  items: CartItem[]
  onRemove: (productId: number) => void
  onUpdateQuantity: (productId: number, quantity: number) => void
  onClose: () => void
}

export default function Cart({ items, onRemove, onUpdateQuantity, onClose }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = items.reduce((sum, item) => {
    const originalPrice = item.price * 1.25
    return sum + (originalPrice - item.price) * item.quantity
  }, 0)

  const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )

  const MinusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )

  const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )

  const TrashIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  )

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex justify-end">
      <Card className="w-full max-w-md h-full rounded-none flex flex-col bg-white border-l-2 border-accent">
        <div className="flex items-center justify-between p-4 border-b border-border bg-accent">
          <h2 className="text-lg font-bold text-foreground">Shopping Cart</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-primary/10 text-foreground">
            <CloseIcon />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8 font-semibold">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 pb-4 border-b border-border">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded border border-border"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-foreground line-clamp-2">{item.name}</h3>
                  <p className="text-sm font-bold text-primary mt-1">₹{item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="h-10 w-10 p-0 border-2 border-gray-500 hover:bg-secondary text-foreground font-bold"
                    >
                      <MinusIcon />
                    </Button>
                    <span className="w-12 text-center text-lg font-bold">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="h-10 w-10 p-0 border-2 border-gray-500 hover:bg-secondary text-foreground font-bold"
                    >
                      <PlusIcon />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemove(item.id)}
                      className="ml-auto hover:bg-destructive/10 text-destructive"
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-3 bg-secondary">
            {savings > 0 && (
              <div className="text-sm text-primary font-semibold">You save: ₹{savings.toLocaleString()}</div>
            )}
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary">₹{total.toLocaleString()}</span>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" size="lg">
              Proceed to Checkout
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
