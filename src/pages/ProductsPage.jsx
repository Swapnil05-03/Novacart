import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { productService } from '@/services/productService'
import { getBrandsForCategory, getRandomMixBrands } from '@/constants/featuredBrands'
import { getDefinitionForCategory } from '@/data/categoryContent'
import { useDebounce } from '@/hooks/useDebounce'
import { SORT_OPTIONS } from '@/constants'
import ProductGrid from '@/components/product/ProductGrid'
import ProductFilters from '@/components/product/ProductFilters'
import CategoryBanner from '@/components/layout/CategoryBanner'
import SubcategoryRow from '@/components/layout/SubcategoryRow'
import TrustBadges from '@/components/layout/TrustBadges'
import Select from '@/components/ui/Select'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'

// NOTE ON SCOPE (intentional, by request):
// This page still doesn't render a real, separately-paginated product
// grid from Supabase — every card here is a curated subcategory/brand
// discovery tile, always showing its local, always-valid image (never a
// Supabase image_url, so the earlier broken-image problem can't return).
// What's added now: each tile/brand card additionally looks up ONE real
// product actually tagged with that subcategory or brand (see
// `productLinks` below). When a match exists, that card becomes a genuine
// shoppable product card — click opens the product's detail page, with
// working Add to Cart / Wishlist buttons — while still using its curated
// local image. Tiles with no matching real product yet keep the original
// discovery behavior (click applies that subcategory/brand as a filter).
export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState([])
  const [categoryCounts, setCategoryCounts] = useState({})
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [productLinks, setProductLinks] = useState({ bySubcategory: {}, byBrand: {} })

  const search = searchParams.get('search') || ''
  const subcategory = searchParams.get('subcategory') || null
  const gender = searchParams.get('gender') || null
  const sortBy = searchParams.get('sort') || 'newest'
  const categoryId = searchParams.get('category') || null
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null
  const minRating = searchParams.get('minRating') ? Number(searchParams.get('minRating')) : null
  const minDiscount = searchParams.get('minDiscount') ? Number(searchParams.get('minDiscount')) : null
  const selectedBrands = useMemo(
    () => (searchParams.get('brands') ? searchParams.get('brands').split(',') : []),
    [searchParams]
  )

  const activeCategory = useMemo(
    () => categories.find((c) => c.id === categoryId) || null,
    [categories, categoryId]
  )

  const [searchInput, setSearchInput] = useState(search)
  const debouncedSearch = useDebounce(searchInput, 400)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    Promise.all([
      productService.getCategories(),
      productService.getCategoryProductCounts(),
    ])
      .then(([categoriesData, counts]) => {
        if (!isMounted) return
        setCategories(categoriesData)
        setCategoryCounts(counts)
      })
      .catch(console.error)
      .finally(() => isMounted && setLoading(false))

    return () => {
      isMounted = false
    }
  }, [])

  // Static "Featured Brands" list (hardcoded per category in
  // src/constants/featuredBrands.js) — no DB call here.
  // - A specific category selected -> that category's dedicated brand list.
  // - "All categories" (no category selected) -> a random mix pulled from
  //   every category's list, so the sidebar Brand filter isn't empty when
  //   browsing everything. This `brands` state feeds the sidebar filter +
  //   selectedBrandDetails only; the gallery uses the separate
  //   `galleryBrands` memo below (every category's brands merged), so the
  //   sidebar never has to render 150+ checkboxes.
  useEffect(() => {
    if (activeCategory) {
      setBrands(getBrandsForCategory(activeCategory.name))
    } else {
      setBrands(getRandomMixBrands(10))
    }
  }, [activeCategory])

  const updateParams = useCallback(
    (updates) => {
      const next = new URLSearchParams(searchParams)
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          next.delete(key)
        } else {
          next.set(key, value)
        }
      })
      setSearchParams(next)
    },
    [searchParams, setSearchParams]
  )

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams({ search: debouncedSearch || null })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  // Real products, used ONLY to power Add to Cart / Wishlist / "view
  // product" on the discovery cards above — never as their visual image.
  // Builds two lookup maps keyed by `${categoryId}::${label}` (category id
  // included because the same subcategory/brand name can exist under more
  // than one category with a different real product behind it, e.g.
  // "Philips" in both Beauty and Appliances). Only the first matching
  // product per key is kept — one linked product per tile is enough to
  // make the card shoppable.
  //
  // With a single category active, this fetches that category's products
  // (perPage covers realistic per-category catalog sizes). On "all
  // categories" it fetches one broader, unscoped batch instead of firing a
  // separate query per category (16 requests) — if the catalog grows past
  // this batch size, raise ALL_CATEGORIES_PRODUCT_SAMPLE_SIZE.
  const SINGLE_CATEGORY_PRODUCT_SAMPLE_SIZE = 100
  const ALL_CATEGORIES_PRODUCT_SAMPLE_SIZE = 500

  useEffect(() => {
    let isMounted = true

    const buildLinkMaps = (products) => {
      const bySubcategory = {}
      const byBrand = {}
      for (const product of products) {
        const catId = product.category_id ?? product.category?.id
        if (product.subcategory) {
          const key = `${catId}::${product.subcategory}`
          if (!bySubcategory[key]) bySubcategory[key] = product
        }
        if (product.brand) {
          const key = `${catId}::${product.brand}`
          if (!byBrand[key]) byBrand[key] = product
        }
      }
      return { bySubcategory, byBrand }
    }

    const fetchParams = activeCategory
      ? { categoryId: activeCategory.id, perPage: SINGLE_CATEGORY_PRODUCT_SAMPLE_SIZE, sortBy: 'newest' }
      : { perPage: ALL_CATEGORIES_PRODUCT_SAMPLE_SIZE, sortBy: 'newest' }

    productService
      .getProducts(fetchParams)
      .then(({ data }) => {
        if (isMounted) setProductLinks(buildLinkMaps(data))
      })
      .catch(console.error)

    return () => {
      isMounted = false
    }
  }, [activeCategory])

  const handleFilterChange = (updates) => {
    const mapped = {}
    if ('categoryId' in updates) {
      mapped.category = updates.categoryId
      // Switching category should drop any subcategory filter, any
      // "featured/trending/best-sellers" preset, AND any leftover free-text
      // search — all three are easy to carry over from wherever the user
      // arrived from (a subcategory chip, a "Today's Deals" link, or simply
      // typing a search term earlier) and silently AND with the new
      // category.
      mapped.subcategory = null
      mapped.gender = null
      mapped.filter = null
      mapped.search = null
      // Selected brands are scoped to the previous category's brand list.
      // If we don't clear them here, a brand chosen under the old category
      // stays applied as a hidden filter after switching category, even
      // though it no longer appears as a checked option anywhere in the UI.
      mapped.brands = null
      setSearchInput('')
    }
    if ('minPrice' in updates) mapped.minPrice = updates.minPrice
    if ('maxPrice' in updates) mapped.maxPrice = updates.maxPrice
    if ('minRating' in updates) mapped.minRating = updates.minRating
    if ('minDiscount' in updates) mapped.minDiscount = updates.minDiscount
    if ('selectedBrands' in updates) {
      mapped.brands = updates.selectedBrands.length ? updates.selectedBrands.join(',') : null
    }
    // Lets a caller set `category` AND `subcategory` in one atomic URL
    // update — needed when selecting a tile from the merged "all
    // categories" gallery, where the category wasn't chosen yet. Must run
    // after the categoryId branch above so it overrides that branch's
    // `mapped.subcategory = null` reset.
    if ('subcategory' in updates) mapped.subcategory = updates.subcategory
    updateParams(mapped)
  }

  const handleSelectSubcategory = (label, categoryId) => {
    if (categoryId) {
      // Clicked from the merged "all categories" gallery — this tile
      // belongs to a category we weren't browsing yet, so switch into
      // that category AND apply the subcategory filter together.
      handleFilterChange({ categoryId, subcategory: label })
    } else {
      updateParams({ subcategory: label })
    }
  }

  const handleSelectGender = (value) => {
    // Switching gender can change which subcategories exist, so drop any
    // subcategory selection that might not apply under the new gender.
    updateParams({ gender: value, subcategory: null })
  }

  const handleClearFilters = () => {
    setSearchInput('')
    setSearchParams({})
  }

  const filters = { categoryId, minPrice, maxPrice, minRating, minDiscount, selectedBrands }

  // `brands` (sidebar filter list) + linkedProduct per brand, scoped to
  // the active category so cart/wishlist/detail-link act on the right
  // product when the same brand name exists under more than one category.
  const brandsWithLinks = useMemo(() => {
    if (!activeCategory) return brands
    return brands.map((b) => ({
      ...b,
      linkedProduct: productLinks.byBrand[`${activeCategory.id}::${b.name}`] || null,
    }))
  }, [brands, activeCategory, productLinks])

  // Full { name, image, linkedProduct } objects for whichever brands are
  // currently checked, so ProductGrid can render each one as a real card
  // (image + label, plus a working Add to Cart/Wishlist/detail-link when a
  // real product is linked) inline, instead of a small sidebar preview.
  const selectedBrandDetails = brandsWithLinks.filter((b) => selectedBrands.includes(b.name))

  const handleRemoveBrand = (brandName) => {
    handleFilterChange({ selectedBrands: selectedBrands.filter((b) => b !== brandName) })
  }

  // Real curated image for the currently-selected subcategory (same
  // shopByCategoryImages data used by SubcategoryRow's tiles), so
  // ProductGrid can render it as a real card — mirrors selectedBrandDetails.
  const selectedSubcategory = useMemo(() => {
    if (!subcategory || !activeCategory) return null
    const definition = getDefinitionForCategory(activeCategory.name)
    const image = definition.shopByCategoryImages?.[subcategory]
    if (!image) return null
    return {
      name: subcategory,
      image,
      linkedProduct: productLinks.bySubcategory[`${activeCategory.id}::${subcategory}`] || null,
    }
  }, [subcategory, activeCategory, productLinks])

  const handleRemoveSubcategory = () => {
    updateParams({ subcategory: null })
  }

  // Applying a filter by clicking a browse-mode card in the gallery — same
  // effect as checking the brand in the sidebar / clicking the pill above.
  const handleSelectBrandFromGrid = (brandName, categoryId) => {
    if (categoryId) {
      // Clicked from the merged "all categories" gallery — switch into
      // that brand's category and select just this brand (replacing any
      // prior selection, since a brand chosen under a different category
      // wouldn't be valid here anyway).
      handleFilterChange({ categoryId, selectedBrands: [brandName] })
    } else {
      handleFilterChange({ selectedBrands: [...selectedBrands, brandName] })
    }
  }

  // Every subcategory tile for the given category definition that has a
  // curated image. Shared by the single-category gallery and the
  // per-category preview rows below.
  //
  // Categories with a men's/women's split (Beauty, Accessories, Apparel)
  // define `tileGroups` — a men list AND a women list, 15 each, with their
  // own correctly-keyed images in shopByCategoryImages. The flat `tiles`
  // list on those same categories is a deduped, single 15-item list kept
  // around for other sections (e.g. Featured Brands trending strip) and
  // must NOT be used here: collapsing both genders into one list drops
  // half the tiles and, worse, silently picks only one gender's image for
  // any shared label (e.g. "Blazers"). When `tileGroups` exists, flatten
  // BOTH groups so the full-category gallery shows the full men+women set
  // (30 tiles). Categories without a men's/women's split have no
  // `tileGroups` and fall back to the flat `tiles` list as before.
  const getGalleryTilesForDefinition = (definition) => {
    const images = definition.shopByCategoryImages || {}
    const labels = definition.tileGroups
      ? definition.tileGroups.flatMap((group) => group.tiles || [])
      : definition.tiles || []
    return labels
      .filter((label) => images[label])
      .map((label) => ({ name: label, image: images[label] }))
  }

  // Full gallery for the ACTIVE category only (used once a category is
  // selected). On "all categories" there's no single category to build
  // this for — that view uses categoryPreviews instead (below), not a
  // flat merge of every category's full gallery.
  const allSubcategoryTiles = useMemo(() => {
    if (!activeCategory) return []
    return getGalleryTilesForDefinition(getDefinitionForCategory(activeCategory.name)).map((tile) => ({
      ...tile,
      linkedProduct: productLinks.bySubcategory[`${activeCategory.id}::${tile.name}`] || null,
    }))
  }, [activeCategory, productLinks])

  const PREVIEW_TILES_PER_CATEGORY = 4
  const PREVIEW_BRANDS_PER_CATEGORY = 2

  // "All categories" landing view — instead of dumping every category's
  // full gallery into one long paginated list (285 tiles + 240 brands =
  // 525 items, ~44 pages — nobody pages that deep), show a short, curated
  // preview per category: its first few subcategory tiles + brands (the
  // ones each category lists first, i.e. its most representative items)
  // under a heading, with a "View all in [Category]" action that opens
  // that category's own full, paginated gallery. Each preview item is
  // tagged with its owning category id so clicking a tile/brand directly
  // (not just "View all") still jumps into the right category.
  const categoryPreviews = useMemo(() => {
    if (activeCategory) return null
    return categories
      .map((cat) => {
        const definition = getDefinitionForCategory(cat.name)
        const tiles = getGalleryTilesForDefinition(definition)
          .slice(0, PREVIEW_TILES_PER_CATEGORY)
          .map((tile) => ({
            ...tile,
            categoryId: cat.id,
            linkedProduct: productLinks.bySubcategory[`${cat.id}::${tile.name}`] || null,
          }))
        const previewBrands = getBrandsForCategory(cat.name)
          .slice(0, PREVIEW_BRANDS_PER_CATEGORY)
          .map((brand) => ({
            ...brand,
            categoryId: cat.id,
            linkedProduct: productLinks.byBrand[`${cat.id}::${brand.name}`] || null,
          }))
        return { category: cat, tiles, brands: previewBrands }
      })
      .filter((preview) => preview.tiles.length || preview.brands.length)
  }, [activeCategory, categories, productLinks])

  const handleViewCategory = (catId) => {
    handleFilterChange({ categoryId: catId })
  }

  return (
    <div className="pb-12">
      <CategoryBanner category={activeCategory} />

      <SubcategoryRow
        category={activeCategory}
        activeSubcategory={subcategory}
        onSelectSubcategory={handleSelectSubcategory}
        activeGender={gender}
        onSelectGender={handleSelectGender}
      />

      <div className="container-page">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products..."
            className="h-11 flex-1 rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-4 text-sm focus:border-brand-500"
          />
          <div className="flex gap-3">
            <Select
              value={sortBy}
              onChange={(e) => updateParams({ sort: e.target.value })}
              options={SORT_OPTIONS}
              className="min-w-[180px]"
            />
            <Button
              variant="outline"
              className="lg:hidden"
              leftIcon={<SlidersHorizontal className="h-4 w-4" />}
              onClick={() => setMobileFiltersOpen(true)}
            >
              Filters
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          <div className="hidden lg:block">
            <ProductFilters
              categories={categories}
              categoryCounts={categoryCounts}
              brands={brands}
              filters={filters}
              onChange={handleFilterChange}
              onClear={handleClearFilters}
            />
          </div>

          <div>
            <ProductGrid
              loading={loading}
              allBrands={brandsWithLinks}
              allSubcategoryTiles={allSubcategoryTiles}
              categoryPreviews={categoryPreviews}
              onViewCategory={handleViewCategory}
              onSelectBrand={handleSelectBrandFromGrid}
              onSelectSubcategory={handleSelectSubcategory}
              selectedBrands={selectedBrandDetails}
              onRemoveBrand={handleRemoveBrand}
              selectedSubcategory={selectedSubcategory}
              onRemoveSubcategory={handleRemoveSubcategory}
              emptyMessage={
                activeCategory
                  ? `We're still stocking up on ${activeCategory.name.toLowerCase()} — check back soon, or browse other categories in the meantime.`
                  : 'Try adjusting your filters or search terms.'
              }
            />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <TrustBadges />
      </div>

      <Modal isOpen={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} title="Filters" size="md">
        <ProductFilters
          categories={categories}
          categoryCounts={categoryCounts}
          brands={brands}
          filters={filters}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
        />
        <Button variant="brand" className="w-full mt-4" onClick={() => setMobileFiltersOpen(false)}>
          Show results
        </Button>
      </Modal>
    </div>
  )
}