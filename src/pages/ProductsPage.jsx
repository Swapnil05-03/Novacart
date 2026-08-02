import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { productService } from '@/services/productService'
import { getBrandsForCategory, getRandomMixBrands } from '@/constants/featuredBrands'
import { useDebounce } from '@/hooks/useDebounce'
import { PRODUCTS_PER_PAGE, SORT_OPTIONS } from '@/constants'
import ProductGrid from '@/components/product/ProductGrid'
import ProductFilters from '@/components/product/ProductFilters'
import CategoryBanner from '@/components/layout/CategoryBanner'
import SubcategoryRow from '@/components/layout/SubcategoryRow'
import TrustBadges from '@/components/layout/TrustBadges'
import Select from '@/components/ui/Select'
import Pagination from '@/components/ui/Pagination'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [categoryCounts, setCategoryCounts] = useState({})
  const [brands, setBrands] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const page = Number(searchParams.get('page')) || 1
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
  const filterPreset = searchParams.get('filter')

  const activeCategory = useMemo(
    () => categories.find((c) => c.id === categoryId) || null,
    [categories, categoryId]
  )

  const [searchInput, setSearchInput] = useState(search)
  const debouncedSearch = useDebounce(searchInput, 400)

  useEffect(() => {
    productService.getCategories().then(setCategories).catch(console.error)
    productService.getCategoryProductCounts().then(setCategoryCounts).catch(console.error)
  }, [])

  // Static "Featured Brands" list (hardcoded per category in
  // src/constants/featuredBrands.js) — no DB call here anymore.
  // - A specific category selected -> that category's dedicated brand list.
  // - "All categories" (no category selected) -> a random mix pulled from
  //   every category's list, so the Brand filter isn't empty/single-category
  //   when browsing everything.
  useEffect(() => {
    if (activeCategory) {
      setBrands(getBrandsForCategory(activeCategory.name))
    } else {
      setBrands(getRandomMixBrands(10))
    }
  }, [activeCategory])

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams({ search: debouncedSearch || null, page: null })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

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
    let isMounted = true
    setLoading(true)

    const queryFilters = {
      page,
      perPage: PRODUCTS_PER_PAGE,
      search,
      subcategory,
      gender,
      categoryId,
      minPrice,
      maxPrice,
      minRating,
      minDiscount,
      // NOTE: selectedBrands is intentionally NOT passed here. The Brand
      // filter's options come from curated display names in
      // src/data/categoryContent.js (used for the Featured Brands
      // carousel), which don't match the products.brand column in the
      // DB — filtering by them would always return zero results. Brand
      // selection still drives the image preview in ProductFilters and
      // updates the URL; it just doesn't narrow this query yet. Wire
      // this back up once products are tagged with real, matching brand
      // values.
      sortBy,
    }

    if (filterPreset === 'featured') queryFilters.isFeatured = true
    if (filterPreset === 'trending') queryFilters.isTrending = true
    if (filterPreset === 'best-sellers') queryFilters.isBestSeller = true

    productService
      .getProducts(queryFilters)
      .then(({ data, count }) => {
        if (!isMounted) return
        setProducts(data)
        setTotalCount(count)
      })
      .catch(console.error)
      .finally(() => isMounted && setLoading(false))

    return () => {
      isMounted = false
    }
  }, [page, search, subcategory, gender, categoryId, minPrice, maxPrice, minRating, minDiscount, selectedBrands, sortBy, filterPreset])

  const totalPages = Math.max(1, Math.ceil(totalCount / PRODUCTS_PER_PAGE))

  const handleFilterChange = (updates) => {
    const mapped = {}
    if ('categoryId' in updates) {
      mapped.category = updates.categoryId
      // Switching category should drop any subcategory filter, any
      // "featured/trending/best-sellers" preset, AND any leftover free-text
      // search — all three are easy to carry over from wherever the user
      // arrived from (a subcategory chip, a "Today's Deals" link, or simply
      // typing a search term earlier) and silently AND with the new
      // category. If the new category has no matches for that leftover
      // term, the page falsely shows "no products found" even though the
      // category itself has products.
      mapped.subcategory = null
      mapped.gender = null
      mapped.filter = null
      mapped.search = null
      // Selected brands are scoped to the previous category's brand list.
      // If we don't clear them here, a brand chosen under the old category
      // stays applied as a hidden filter after switching category, even
      // though it no longer appears as a checked option anywhere in the UI
      // — silently ANDing with a brand that doesn't exist in the new
      // category and producing a false "no products found".
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
    updateParams({ ...mapped, page: null })
  }

  const handleSelectSubcategory = (label) => {
    updateParams({ subcategory: label, page: null })
  }

  const handleSelectGender = (value) => {
    // Switching gender can change which subcategories exist, so drop any
    // subcategory selection that might not apply under the new gender.
    updateParams({ gender: value, subcategory: null, page: null })
  }

  const handleClearFilters = () => {
    setSearchInput('')
    setSearchParams({})
  }

  const filters = { categoryId, minPrice, maxPrice, minRating, minDiscount, selectedBrands }

  // Full { name, image } objects for whichever brands are currently
  // checked, so ProductGrid can render each one as a real card (image +
  // label) inline with the products, instead of a small sidebar preview.
  const selectedBrandDetails = brands.filter((b) => selectedBrands.includes(b.name))

  const handleRemoveBrand = (brandName) => {
    handleFilterChange({ selectedBrands: selectedBrands.filter((b) => b !== brandName) })
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
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-medium text-ink-700 dark:text-ink-200">
            <span className="text-brand-600 dark:text-brand-400 font-semibold">{totalCount}</span> products found
          </p>
        </div>

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
              onChange={(e) => updateParams({ sort: e.target.value, page: null })}
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
              products={products}
              loading={loading}
              selectedBrands={selectedBrandDetails}
              onRemoveBrand={handleRemoveBrand}
              emptyMessage={
                activeCategory
                  ? `We're still stocking up on ${activeCategory.name.toLowerCase()} — check back soon, or browse other categories in the meantime.`
                  : 'Try adjusting your filters or search terms.'
              }
            />
            {!loading && totalPages > 1 && (
              <div className="mt-10">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(p) => updateParams({ page: p })}
                />
              </div>
            )}
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