import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Star, Clock, Heart } from 'lucide-react'
import { ROUTES } from '@/constants'
import { productService } from '@/services/productService'
import { useCountdown } from '@/hooks/useCountdown'
import Button from '@/components/ui/Button'
import SlideCarousel from '@/components/layout/SlideCarousel'
import ScrollRow from '@/components/layout/ScrollRow'
import CategoryTrustSection from '@/components/layout/CategoryTrustSection'
import TrustBadges from '@/components/layout/TrustBadges'
import ScrollableTileRow from '@/components/layout/ScrollableTileRow'
import ProductCard from '@/components/product/ProductCard'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'

import { getDefinitionForCategory } from '@/data/categoryContent'

// Fallback brand pool — only used for categories that don't yet define
// their own `brands` list in categoryContent.js (e.g. the generic
// DEFAULT_DEFINITION for an unrecognized category name). Deliberately
// invented names, not references to any real company, to avoid implying
// an affiliation with any actual brand when we have no real brand data
// to show for that category.
const PLACEHOLDER_BRANDS = [
  'Lumio', 'Northwind', 'Aurelle', 'Cascade Co.', 'Verde & Co', 'Halcyon',
  'Driftwood', 'Solace', 'Meridian', 'Birchline', 'Amberlight', 'Stonewell',
  'Fernway', 'Cobalt & Co', 'Wildgrove', 'Tidemark',
]

// Builds an image array aligned 1:1 with `tiles`, preferring a named image
// map (e.g. { Sofas: sofaImg, Beds: bedImg }) when the category definition
// provides one for this section, falling back to the shared image pool
// (cycled by index) for categories that don't have per-section images yet.
function getSectionImages(definition, tiles, mapKey) {
  const map = definition[mapKey]
  return tiles.map((tile, i) => {
    if (map && map[tile]) return map[tile]
    return definition.images[i % definition.images.length]
  })
}

// Builds the "Featured Brands" row. Each category now supplies its own
// realistic, category-appropriate `brands` list in categoryContent.js
// (e.g. mobiles → OPPO/Realme/OnePlus, two wheelers → Hero Splendor/Royal
// Enfield Hunter). Categories without a `brands` list yet fall back to the
// shared placeholder pool so the row is never empty.
function buildBrandRow(definition) {
  const brandNames = definition.brands || PLACEHOLDER_BRANDS
  return definition.tiles.map((tile, i) => {
    const brandName = brandNames[i % brandNames.length]
    const image = (definition.brandImages && definition.brandImages[brandName]) || definition.images[i % definition.images.length]
    return {
      label: brandName,
      image,
    }
  })
}

// "Furnish Your Home Deals"-style fallback row. If the category provides a
// curated `dealsItems` list (specific named deal items, e.g. "3-Seater
// Fabric Sofa"), use that directly. Otherwise fall back to cycling through
// the generic sub-category tiles, matched to images by tile name.
function buildProductRow(definition, tiles) {
  if (definition.dealsItems?.length) {
    return definition.dealsItems.map((item, i) => ({
      title: item.label,
      tag: `${definition.discounts[i % definition.discounts.length]}% off`,
      image: item.image,
    }))
  }
  const dealsImages = getSectionImages(definition, tiles, 'dealsImages')
  return tiles.map((tile, i) => ({
    title: tile,
    tag: `${definition.discounts[i % definition.discounts.length]}% off`,
    image: dealsImages[i],
  }))
}

// Expands a compact category definition into full slide objects for SlideCarousel.
function expandSlides(definition, category) {
  const count = definition.headlines.length
  const categoryUrl = `${ROUTES.PRODUCTS}?category=${category.id}`
  const slideImages = definition.sliderImages || definition.images
  return Array.from({ length: count }, (_, i) => ({
    badge: i === 0 ? 'Featured' : 'In ' + category.name,
    heading: definition.headlines[i],
    // Prefer a per-slide description (definition.descriptions[i]) so each
    // slide reads differently; fall back to the single shared
    // `description` for categories that haven't defined per-slide copy yet.
    description: definition.descriptions?.[i % definition.descriptions.length] ?? definition.description,
    discount: definition.discounts[i] ?? definition.discounts[0],
    image: slideImages[i % slideImages.length],
    primaryCta: { label: 'Shop now', to: categoryUrl },
    secondaryCta: { label: `View all ${category.name}`, to: categoryUrl },
  }))
}

function renderCategorySlide(slide) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 lg:gap-14">
      {/* Copy column */}
      <div className="max-w-lg">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-ink-300 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
          {slide.badge}
        </span>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
          <span className="block truncate pb-1">{slide.heading[0]}</span>
          <span className="block truncate pb-1 text-brand-400">{slide.heading[1]}</span>
        </h2>

        <p className="mt-3 text-lg text-ink-300 max-w-md line-clamp-2">{slide.description}</p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link to={slide.primaryCta.to}>
            <Button variant="brand" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
              {slide.primaryCta.label}
            </Button>
          </Link>
          <Link to={slide.secondaryCta.to}>
            <Button variant="outline" size="md" className="border-white/20 text-white hover:bg-white/10">
              {slide.secondaryCta.label}
            </Button>
          </Link>
        </div>
      </div>

      {/* Product visual + floating badges */}
      <div className="relative hidden sm:block w-80 lg:w-[26rem] xl:w-[30rem] shrink-0">
        <div className="absolute inset-0 scale-90 rounded-[2rem] bg-brand-500/30 blur-3xl" />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 overflow-hidden rounded-2xl h-64 lg:h-72 bg-ink-900 shadow-glass"
        >
          <img
            src={slide.image}
            alt={slide.heading.join(' ')}
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="glass absolute -right-3 -top-3 z-20 flex flex-col items-center justify-center rounded-full h-16 w-16 shadow-glass"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-500 mb-0.5" />
          <span className="text-[11px] font-bold text-ink-900 dark:text-white leading-none">Up to</span>
          <span className="text-sm font-bold text-ink-900 dark:text-white leading-none">{slide.discount}%</span>
          <span className="text-[9px] text-ink-500 dark:text-ink-400 leading-none">off</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          className="glass absolute -bottom-5 -left-4 z-20 flex items-center gap-1.5 rounded-2xl px-3.5 py-2.5 shadow-glass"
        >
          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
          <span className="text-sm font-semibold text-ink-900 dark:text-white">4.8</span>
          <span className="text-xs text-ink-500 dark:text-ink-400">/ 5</span>
        </motion.div>
      </div>
    </div>
  )
}

function PromoBannerPair({ definition, categoryId }) {
  if (!definition.promos?.length) return null
  const promoImages = definition.promoImages || definition.images

  return (
    <section className="grid sm:grid-cols-2 gap-4 mb-8">
      {definition.promos.map((promo, i) => (
        <Link
          key={promo.title}
          to={`${ROUTES.PRODUCTS}?category=${categoryId}`}
          className="group relative overflow-hidden rounded-2xl min-h-[220px] sm:min-h-[260px] flex items-center p-6"
        >
          <img
            src={promoImages[i % promoImages.length]}
            alt={promo.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/40 to-transparent" />
          <div className="relative z-10 max-w-[60%]">
            <p className="text-lg font-bold text-white leading-snug">{promo.title}</p>
            <p className="text-sm text-ink-200 mt-1">{promo.subtitle}</p>
            <span className="inline-flex items-center gap-1.5 mt-3 rounded-lg bg-brand-500 px-3.5 py-2 text-xs font-semibold text-white">
              {promo.ctaLabel}
            </span>
          </div>
        </Link>
      ))}
    </section>
  )
}

// Bigger grid-style card for curated deal items (e.g. "Furnish Your Home
// Deals"), visually matching the ProductCard grid layout — image, discount
// badge, wishlist heart, category label, and title — since curated
// dealsItems only carry title/tag/image (no live price data).
function CuratedDealCard({ item, categoryName, categoryId }) {
  return (
    <Link
      to={`${ROUTES.PRODUCTS}?category=${categoryId}&search=${encodeURIComponent(item.title)}`}
      className="group block rounded-2xl overflow-hidden border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900"
    >
      <div className="relative aspect-square overflow-hidden bg-ink-100 dark:bg-ink-800">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {item.tag && (
          <span className="absolute top-3 left-3 rounded-md bg-ink-950/70 backdrop-blur px-2 py-1 text-xs font-bold text-amber-400">
            {item.tag}
          </span>
        )}
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 flex items-center justify-center h-8 w-8 rounded-full bg-ink-950/50 text-white hover:bg-ink-950/70 transition-colors"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>
      <div className="px-3.5 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400 dark:text-ink-500 mb-1">
          {categoryName}
        </p>
        <p className="text-sm font-bold text-ink-900 dark:text-white truncate">{item.title}</p>
      </div>
    </Link>
  )
}

function FlashSaleCountdown() {
  const { hours, minutes, seconds } = useCountdown(8)
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-50 dark:bg-danger-500/10 px-2.5 py-1 text-xs font-semibold text-danger-600 dark:text-danger-500">
      <Clock className="h-3 w-3" />
      Flash Sale ends in {hours}h {minutes}m {seconds}s
    </span>
  )
}

export default function CategoryShowcase({ activeCategory }) {
  const [categoryProducts, setCategoryProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)

  useEffect(() => {
    if (!activeCategory) return
    let isMounted = true
    setProductsLoading(true)

    productService
      .getProducts({ categoryId: activeCategory.id, perPage: 16 })
      .then(({ data }) => {
        if (isMounted) setCategoryProducts(data)
      })
      .catch((err) => console.error('Failed to load category products', err))
      .finally(() => isMounted && setProductsLoading(false))

    return () => {
      isMounted = false
    }
  }, [activeCategory])

  // "For You" (activeCategory === null) shows nothing extra here — the rest
  // of the homepage (Hero, DealsGrid, ProductSections, etc.) already covers
  // that default view.
  if (!activeCategory) return null

  const definition = getDefinitionForCategory(activeCategory.name)
  const slides = expandSlides(definition, activeCategory)

  const brandItems = buildBrandRow(definition)

  // Real products for this category, split into two rows so "Today's Best
  // Deals" and "Trending in X" show different items rather than duplicates.
  const dealsProducts = categoryProducts.slice(0, 8)
  const trendingProducts = categoryProducts.slice(8, 16)
  const hasRealProducts = categoryProducts.length > 0

  // If this category has a curated `dealsItems` list (specific named deal
  // items with hand-picked images, e.g. Furniture's "Furnish Your Home
  // Deals"), that curated row always takes priority over real DB products
  // in this particular section — otherwise the curated images we uploaded
  // would never actually show up whenever the category also has real
  // products in the database.
  const hasCuratedDeals = Boolean(definition.dealsItems?.length)
  const showRealDealsProducts = hasRealProducts && !hasCuratedDeals

  // "Shop by Category" images, aligned with definition.tiles
  const shopByCategoryImages = getSectionImages(definition, definition.tiles, 'shopByCategoryImages')

  // Fall back to placeholder tile rows only when this category genuinely
  // has no products yet in the database, so the page is never empty.
  const trendingTiles = [...definition.tiles].reverse()
  const spotlightImagesAll = getSectionImages(definition, definition.tiles, 'spotlightImages')
  const trendingImages = [...spotlightImagesAll].reverse()

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={activeCategory.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="container-page py-6"
      >
        <SlideCarousel
          slides={slides}
          renderSlide={renderCategorySlide}
          className="mb-6"
          contentClassName="px-14 sm:px-16 py-10 sm:py-14"
        />

        <TrustBadges />

        {definition.tileGroups?.length ? (
          definition.tileGroups.map((group) => (
            <ScrollableTileRow
              key={group.label}
              title={`Shop by Category — ${group.label}`}
              tiles={group.tiles}
              images={getSectionImages(definition, group.tiles, 'shopByCategoryImages')}
              categoryId={activeCategory.id}
              variant="card"
            />
          ))
        ) : (
          <ScrollableTileRow
            title="Shop by Category"
            tiles={definition.tiles}
            images={shopByCategoryImages}
            categoryId={activeCategory.id}
            variant="card"
          />
        )}

        <PromoBannerPair definition={definition} categoryId={activeCategory.id} />

        {/* Today's Best Deals — real products from this category, unless a
            curated dealsItems row (e.g. "Furnish Your Home Deals") exists,
            in which case that curated content always wins here. */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-bold text-ink-900 dark:text-white">{definition.dealsLabel}</h3>
              <FlashSaleCountdown />
            </div>
            <Link
              to={`${ROUTES.PRODUCTS}?category=${activeCategory.id}`}
              className="text-xs font-medium text-brand-600 dark:text-brand-400 link-underline shrink-0"
            >
              View all
            </Link>
          </div>

          {productsLoading && !hasCuratedDeals ? (
            <ProductGridSkeleton count={4} />
          ) : showRealDealsProducts ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {dealsProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : hasCuratedDeals ? (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
              {buildProductRow(definition, definition.tiles).map((item) => (
                <div key={item.title} className="w-56 sm:w-64 shrink-0 snap-start">
                  <CuratedDealCard
                    item={item}
                    categoryName={activeCategory.name}
                    categoryId={activeCategory.id}
                  />
                </div>
              ))}
            </div>
          ) : (
            <ScrollRow
              title=""
              variant="product"
              items={buildProductRow(definition, definition.tiles)}
              categoryId={activeCategory.id}
            />
          )}
        </section>

        {/* Trending in [Category] — more real products, or placeholder tiles if none exist yet */}
        {hasRealProducts && trendingProducts.length > 0 ? (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-ink-900 dark:text-white">
                {definition.spotlightLabel}
              </h3>
              <Link
                to={`${ROUTES.PRODUCTS}?category=${activeCategory.id}`}
                className="text-xs font-medium text-brand-600 dark:text-brand-400 link-underline shrink-0"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ) : (
          <ScrollableTileRow
            title={definition.spotlightLabel}
            tiles={trendingTiles}
            images={trendingImages}
            categoryId={activeCategory.id}
            variant="circle"
          />
        )}

        <ScrollableTileRow
          title="Featured Brands"
          items={brandItems}
          categoryId={activeCategory.id}
          variant="card"
          tagLabel="Visit store"
        />

        <CategoryTrustSection categoryName={activeCategory.name} />

        <div className="flex justify-center">
          <Link to={`${ROUTES.PRODUCTS}?category=${activeCategory.id}`}>
            <Button variant="outline">View all {activeCategory.name} products</Button>
          </Link>
        </div>

        <p className="sr-only">Showing results related to {activeCategory.name}</p>
      </motion.section>
    </AnimatePresence>
  )
}