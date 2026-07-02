import { useEffect, useState, useMemo } from 'react'
import { productService } from '@/services/productService'
import { ROUTES } from '@/constants'
import Hero from '@/components/layout/Hero'
import CategoryTabs from '@/components/layout/CategoryTabs'
import CategoryShowcase from '@/components/layout/CategoryShowcase'
import DealsGrid from '@/components/layout/DealsGrid'
import TrustBadges from '@/components/layout/TrustBadges'
import CategoryGrid from '@/components/layout/CategoryGrid'
import PromoBanner from '@/components/layout/PromoBanner'
import ProductSection from '@/components/layout/ProductSection'

// Module-level cache — persists across remounts within the same page session.
const homeDataCache = {
  categories: [],
  featured: [],
  trending: [],
  bestSellers: [],
  categoriesLoaded: false,
  productsLoaded: false,
}

// localStorage key + max age (24 hours) for the category list cache.
// Categories rarely change, so 24-hour persistence is safe.
const CATEGORY_CACHE_KEY = 'novacart-categories-cache'
const CATEGORY_CACHE_MAX_AGE = 24 * 60 * 60 * 1000

function readCachedCategories() {
  try {
    const raw = localStorage.getItem(CATEGORY_CACHE_KEY)
    if (!raw) return null
    const { data, timestamp } = JSON.parse(raw)
    if (Date.now() - timestamp > CATEGORY_CACHE_MAX_AGE) {
      localStorage.removeItem(CATEGORY_CACHE_KEY)
      return null
    }
    return data
  } catch {
    return null
  }
}

function writeCachedCategories(categories) {
  try {
    localStorage.setItem(CATEGORY_CACHE_KEY, JSON.stringify({ data: categories, timestamp: Date.now() }))
  } catch {
    // localStorage full or unavailable — not critical
  }
}

// Pre-seed module cache from localStorage on first import so categories are
// available synchronously before any React render or network call fires.
const localCats = readCachedCategories()
if (localCats && localCats.length > 0) {
  homeDataCache.categories = localCats
  homeDataCache.categoriesLoaded = true
}

export default function HomePage() {
  const [categories, setCategories] = useState(homeDataCache.categories)
  const [featured, setFeatured] = useState(homeDataCache.featured)
  const [trending, setTrending] = useState(homeDataCache.trending)
  const [bestSellers, setBestSellers] = useState(homeDataCache.bestSellers)
  const [categoriesLoading, setCategoriesLoading] = useState(!homeDataCache.categoriesLoaded)
  const [productsLoading, setProductsLoading] = useState(!homeDataCache.productsLoaded)
  const [activeCategoryId, setActiveCategoryId] = useState(null)

  useEffect(() => {
    let isMounted = true

    // Load categories first — these power CategoryTabs and CategoryGrid.
    // On first visit: fetched from DB then cached in localStorage.
    // On return visits: already pre-seeded from localStorage above (instant).
    if (!homeDataCache.categoriesLoaded) {
      productService.getCategories()
        .then((cats) => {
          if (!isMounted) return
          homeDataCache.categories = cats
          homeDataCache.categoriesLoaded = true
          writeCachedCategories(cats)
          setCategories(cats)
        })
        .catch((err) => console.error('Failed to load categories', err))
        .finally(() => { if (isMounted) setCategoriesLoading(false) })
    }

    // Load products separately — these appear below the fold so a slightly
    // later arrival is less noticeable and doesn't block the above-fold UI.
    if (!homeDataCache.productsLoaded) {
      Promise.all([
        productService.getProducts({ isFeatured: true, perPage: 8 }),
        productService.getProducts({ isTrending: true, perPage: 8 }),
        productService.getProducts({ isBestSeller: true, perPage: 8 }),
      ])
        .then(([featuredRes, trendingRes, bestSellersRes]) => {
          if (!isMounted) return
          homeDataCache.featured = featuredRes.data
          homeDataCache.trending = trendingRes.data
          homeDataCache.bestSellers = bestSellersRes.data
          homeDataCache.productsLoaded = true
          setFeatured(featuredRes.data)
          setTrending(trendingRes.data)
          setBestSellers(bestSellersRes.data)
        })
        .catch((err) => console.error('Failed to load homepage products', err))
        .finally(() => { if (isMounted) setProductsLoading(false) })
    }

    return () => { isMounted = false }
  }, [])

  const activeCategory = useMemo(
    () => categories.find((cat) => cat.id === activeCategoryId) || null,
    [categories, activeCategoryId]
  )

  return (
    <div>
      <CategoryTabs
        categories={categories}
        activeCategoryId={activeCategoryId}
        onSelectCategory={setActiveCategoryId}
      />

      {activeCategory ? (
        <CategoryShowcase activeCategory={activeCategory} />
      ) : (
        <>
          {/* Hero is always visible immediately — no data dependency */}
          <div className="container-page pt-4">
            <Hero />
          </div>

          <DealsGrid />
          <TrustBadges />

          {/* CategoryGrid shows skeleton tiles while categories load */}
          {categoriesLoading ? (
            <div className="container-page py-8">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl bg-ink-100 dark:bg-ink-800 animate-pulse aspect-square" />
                ))}
              </div>
            </div>
          ) : (
            <CategoryGrid categories={categories} />
          )}

          <ProductSection
            title="Featured products"
            subtitle="Hand-picked picks our team can't stop recommending"
            products={featured}
            loading={productsLoading}
            viewAllLink={`${ROUTES.PRODUCTS}?filter=featured`}
          />

          <PromoBanner />

          <ProductSection
            title="Trending now"
            subtitle="What everyone's adding to cart this week"
            products={trending}
            loading={productsLoading}
            viewAllLink={`${ROUTES.PRODUCTS}?filter=trending`}
          />

          <ProductSection
            title="Best sellers"
            subtitle="Proven favorites, ordered again and again"
            products={bestSellers}
            loading={productsLoading}
            viewAllLink={`${ROUTES.PRODUCTS}?filter=best-sellers`}
          />
        </>
      )}
    </div>
  )
}