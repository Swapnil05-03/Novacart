import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import { cartService } from '@/services/cartService'
import { useAuth } from '@/context/AuthContext'

const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const { user, isAuthenticated } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [coupon, setCoupon] = useState(null)

  const refreshCart = useCallback(async () => {
    if (!user) {
      setItems([])
      return
    }
    setLoading(true)
    try {
      const data = await cartService.getCartItems(user.id)
      setItems(data)
    } catch (err) {
      console.error('Failed to load cart', err)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  const addToCart = useCallback(
    async (product, quantity = 1) => {
      if (!isAuthenticated) {
        toast.error('Please sign in to add items to your cart')
        return
      }
      // Optimistic update
      const existingIndex = items.findIndex((i) => i.product.id === product.id)
      const optimisticItems = [...items]
      if (existingIndex > -1) {
        optimisticItems[existingIndex] = {
          ...optimisticItems[existingIndex],
          quantity: optimisticItems[existingIndex].quantity + quantity,
        }
      } else {
        optimisticItems.unshift({
          id: `temp-${Date.now()}`,
          quantity,
          product,
        })
      }
      setItems(optimisticItems)

      try {
        await cartService.addToCart(user.id, product.id, quantity)
        toast.success(`${product.name} added to cart`)
        refreshCart()
      } catch (err) {
        setItems(items)
        toast.error('Could not add item to cart')
        console.error(err)
      }
    },
    [items, isAuthenticated, user, refreshCart]
  )

  const updateQuantity = useCallback(
    async (cartItemId, quantity) => {
      const previous = items
      setItems((prev) =>
        prev.map((i) => (i.id === cartItemId ? { ...i, quantity } : i)).filter((i) => i.quantity > 0)
      )
      try {
        await cartService.updateQuantity(cartItemId, quantity)
      } catch (err) {
        setItems(previous)
        toast.error('Could not update quantity')
        console.error(err)
      }
    },
    [items]
  )

  const removeFromCart = useCallback(
    async (cartItemId, productName) => {
      const previous = items
      setItems((prev) => prev.filter((i) => i.id !== cartItemId))
      try {
        await cartService.removeFromCart(cartItemId)
        toast.success(productName ? `${productName} removed from cart` : 'Item removed')
      } catch (err) {
        setItems(previous)
        toast.error('Could not remove item')
        console.error(err)
      }
    },
    [items]
  )

  const clearCart = useCallback(async () => {
    if (!user) return
    setItems([])
    try {
      await cartService.clearCart(user.id)
    } catch (err) {
      console.error('Failed to clear cart', err)
    }
  }, [user])

  const applyCoupon = useCallback((code) => {
    const validCoupons = {
      NOVA10: { code: 'NOVA10', percent: 10 },
      WELCOME20: { code: 'WELCOME20', percent: 20 },
    }
    const found = validCoupons[code?.toUpperCase()]
    if (found) {
      setCoupon(found)
      toast.success(`Coupon "${found.code}" applied — ${found.percent}% off`)
      return true
    }
    toast.error('Invalid coupon code')
    return false
  }, [])

  const removeCoupon = useCallback(() => setCoupon(null), [])

  const { subtotal, itemCount } = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + (i.product?.price || 0) * i.quantity, 0)
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
    return { subtotal, itemCount }
  }, [items])

  const discount = coupon ? (subtotal * coupon.percent) / 100 : 0
  const shippingFee = subtotal > 100 || subtotal === 0 ? 0 : 9.99
  const tax = Math.max(0, (subtotal - discount) * 0.08)
  const total = Math.max(0, subtotal - discount + shippingFee + tax)

  const value = {
    items,
    loading,
    itemCount,
    subtotal,
    discount,
    shippingFee,
    tax,
    total,
    coupon,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    refreshCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
