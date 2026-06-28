import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { wishlistService } from '@/services/wishlistService'
import { useAuth } from '@/context/AuthContext'

const WishlistContext = createContext(undefined)

export function WishlistProvider({ children }) {
  const { user, isAuthenticated } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const refreshWishlist = useCallback(async () => {
    if (!user) {
      setItems([])
      return
    }
    setLoading(true)
    try {
      const data = await wishlistService.getWishlist(user.id)
      setItems(data)
    } catch (err) {
      console.error('Failed to load wishlist', err)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    refreshWishlist()
  }, [refreshWishlist])

  const isWishlisted = useCallback(
    (productId) => items.some((i) => i.product?.id === productId),
    [items]
  )

  const toggleWishlist = useCallback(
    async (product) => {
      if (!isAuthenticated) {
        toast.error('Please sign in to save items')
        return
      }
      const alreadyIn = isWishlisted(product.id)
      const previous = items

      if (alreadyIn) {
        setItems((prev) => prev.filter((i) => i.product.id !== product.id))
        try {
          await wishlistService.removeFromWishlist(user.id, product.id)
          toast.success(`Removed from wishlist`)
        } catch (err) {
          setItems(previous)
          toast.error('Could not update wishlist')
          console.error(err)
        }
      } else {
        setItems((prev) => [{ id: `temp-${Date.now()}`, product }, ...prev])
        try {
          await wishlistService.addToWishlist(user.id, product.id)
          toast.success(`Added to wishlist`)
        } catch (err) {
          setItems(previous)
          toast.error('Could not update wishlist')
          console.error(err)
        }
      }
    },
    [items, isWishlisted, isAuthenticated, user]
  )

  const value = {
    items,
    loading,
    isWishlisted,
    toggleWishlist,
    refreshWishlist,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
