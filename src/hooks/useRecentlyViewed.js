import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'novacart-recently-viewed'
const MAX_ITEMS = 8

export function useRecentlyViewed() {
  const [productIds, setProductIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productIds))
  }, [productIds])

  const addProduct = useCallback((productId) => {
    setProductIds((prev) => {
      const filtered = prev.filter((id) => id !== productId)
      return [productId, ...filtered].slice(0, MAX_ITEMS)
    })
  }, [])

  return { productIds, addProduct }
}
