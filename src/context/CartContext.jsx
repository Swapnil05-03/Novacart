import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import { cartService } from '@/services/cartService'
import { useAuth } from '@/context/AuthContext'
import { getStaticProductById } from '@/data/staticProducts'

const CartContext = createContext(undefined)

// Static cart items (Featured/Trending/Best Sellers) live in localStorage
// instead of Supabase, keyed per-user so they survive page reloads.
const STATIC_CART_KEY_PREFIX = 'novacart-static-cart-'

function readStaticCart(userId) {
  if (!userId) return []
  try {
    const raw = localStorage.getItem(STATIC_CART_KEY_PREFIX + userId)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeStaticCart(userId, items) {
  if (!userId) return
  try {
    localStorage.setItem(STATIC_CART_KEY_PREFIX + userId, JSON.stringify(items))
  } catch {
    // localStorage full or unavailable — not critical
  }
}

export function CartProvider({ children }) {
  const { user, isAuthenticated } = useAuth()

  // Real, Supabase-backed cart items (fetched via cartService).
  const [dbItems, setDbItems] = useState([])

  // Static products (Featured/Trending/Best Sellers — fake IDs like
  // 'best-racket') can't be inserted into cart_items because product_id
  // is a foreign key into the real `products` table. These are kept
  // entirely client-side instead (persisted to localStorage), and merged
  // with dbItems for display.
  const [staticItems, setStaticItems] = useState(() => readStaticCart(user?.id))

  const [loading, setLoading] = useState(false)
  const [coupon, setCoupon] = useState(null)

  const refreshCart = useCallback(async () => {
    if (!user) {
      setDbItems([])
      return
    }
    setLoading(true)
    try {
      const data = await cartService.getCartItems(user.id)
      setDbItems(data)
    } catch (err) {
      console.error('Failed to load cart', err)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  // Load this user's static cart whenever the logged-in user changes.
  useEffect(() => {
    setStaticItems(readStaticCart(user?.id))
  }, [user?.id])

  // Persist static cart to localStorage on every change.
  useEffect(() => {
    if (user?.id) writeStaticCart(user.id, staticItems)
  }, [staticItems, user?.id])

  // Combined list shown everywhere in the app.
  const items = useMemo(() => [...staticItems, ...dbItems], [staticItems, dbItems])

  const addToCart = useCallback(
    async (product, quantity = 1) => {
      if (!isAuthenticated) {
        toast.error('Please sign in to add items to your cart')
        return
      }

      const isStatic = Boolean(getStaticProductById(product.id))

      if (isStatic) {
        setStaticItems((prev) => {
          const existingIndex = prev.findIndex((i) => i.product.id === product.id)
          if (existingIndex > -1) {
            const updated = [...prev]
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + quantity,
            }
            return updated
          }
          return [
            {
              id: `static-cart-${product.id}`,
              quantity,
              product,
              isStatic: true,
            },
            ...prev,
          ]
        })
        toast.success(`${product.name} added to cart`)
        return
      }

      // Optimistic update for real (Supabase-backed) products
      const existingIndex = dbItems.findIndex((i) => i.product.id === product.id)
      const optimisticItems = [...dbItems]
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
      setDbItems(optimisticItems)

      try {
        await cartService.addToCart(user.id, product.id, quantity)
        toast.success(`${product.name} added to cart`)
        refreshCart()
      } catch (err) {
        setDbItems(dbItems)
        toast.error('Could not add item to cart')
        console.error(err)
      }
    },
    [dbItems, isAuthenticated, user, refreshCart]
  )

  const updateQuantity = useCallback(
    async (cartItemId, quantity) => {
      const staticIndex = staticItems.findIndex((i) => i.id === cartItemId)
      if (staticIndex > -1) {
        setStaticItems((prev) =>
          prev.map((i) => (i.id === cartItemId ? { ...i, quantity } : i)).filter((i) => i.quantity > 0)
        )
        return
      }

      const previous = dbItems
      setDbItems((prev) =>
        prev.map((i) => (i.id === cartItemId ? { ...i, quantity } : i)).filter((i) => i.quantity > 0)
      )
      try {
        await cartService.updateQuantity(cartItemId, quantity)
      } catch (err) {
        setDbItems(previous)
        toast.error('Could not update quantity')
        console.error(err)
      }
    },
    [dbItems, staticItems]
  )

  const removeFromCart = useCallback(
    async (cartItemId, productName) => {
      const staticIndex = staticItems.findIndex((i) => i.id === cartItemId)
      if (staticIndex > -1) {
        setStaticItems((prev) => prev.filter((i) => i.id !== cartItemId))
        toast.success(productName ? `${productName} removed from cart` : 'Item removed')
        return
      }

      const previous = dbItems
      setDbItems((prev) => prev.filter((i) => i.id !== cartItemId))
      try {
        await cartService.removeFromCart(cartItemId)
        toast.success(productName ? `${productName} removed from cart` : 'Item removed')
      } catch (err) {
        setDbItems(previous)
        toast.error('Could not remove item')
        console.error(err)
      }
    },
    [dbItems, staticItems]
  )

  const clearCart = useCallback(async () => {
    setStaticItems([])
    if (user?.id) writeStaticCart(user.id, [])
    if (!user) return
    setDbItems([])
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