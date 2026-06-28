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

// Module-level cache (lives outside the component, persists for the page
// session). Prevents the category tabs / product rows from flashing empty
// every time HomePage remounts (e.g. navigating to a category and back).
// Cleared only on a full page reload — not a database cache, just avoids
// re-showing empty state for data we already fetched seconds ago.
const homeDataCache = {
  categories: [],
  featured: [],
  trending: [],
  bestSellers: [],
  hasLoadedOnce: false,
}

export default function HomePage() {
  const [categories, setCategories] = useState(homeDataCache.categories)
  const [featured, setFeatured] = useState(homeDataCache.featured)
  const [trending, setTrending] = useState(homeDataCache.trending)
  const [bestSellers, setBestSellers] = useState(homeDataCache.bestSellers)
  const [loading, setLoading] = useState(!homeDataCache.hasLoadedOnce)
  const [activeCategoryId, setActiveCategoryId] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadHomeData() {
      try {
        const [cats, featuredRes, trendingRes, bestSellersRes] = await Promise.all([
          productService.getCategories(),
          productService.getProducts({ isFeatured: true, perPage: 8 }),
          productService.getProducts({ isTrending: true, perPage: 8 }),
          productService.getProducts({ isBestSeller: true, perPage: 8 }),
        ])
        if (!isMounted) return

        homeDataCache.categories = cats
        homeDataCache.featured = featuredRes.data
        homeDataCache.trending = trendingRes.data
        homeDataCache.bestSellers = bestSellersRes.data
        homeDataCache.hasLoadedOnce = true

        setCategories(cats)
        setFeatured(featuredRes.data)
        setTrending(trendingRes.data)
        setBestSellers(bestSellersRes.data)
      } catch (err) {
        console.error('Failed to load homepage data', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadHomeData()
    return () => {
      isMounted = false
    }
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
          <div className="container-page pt-4">
            <Hero />
          </div>
          <DealsGrid />
          <TrustBadges />
          <CategoryGrid categories={categories} />
          <ProductSection
            title="Featured products"
            subtitle="Hand-picked picks our team can't stop recommending"
            products={featured}
            loading={loading}
            viewAllLink={`${ROUTES.PRODUCTS}?filter=featured`}
          />
          <PromoBanner />
          <ProductSection
            title="Trending now"
            subtitle="What everyone's adding to cart this week"
            products={trending}
            loading={loading}
            viewAllLink={`${ROUTES.PRODUCTS}?filter=trending`}
          />
          <ProductSection
            title="Best sellers"
            subtitle="Proven favorites, ordered again and again"
            products={bestSellers}
            loading={loading}
            viewAllLink={`${ROUTES.PRODUCTS}?filter=best-sellers`}
          />
        </>
      )}
    </div>
  )
}