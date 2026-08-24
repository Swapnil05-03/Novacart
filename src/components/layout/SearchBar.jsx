import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, LayoutGrid, PackageSearch } from 'lucide-react'
import { productService } from '@/services/productService'
import { useDebounce } from '@/hooks/useDebounce'
import { useClickOutside } from '@/hooks/useClickOutside'
import { resolveCuratedMatch } from '@/utils/curatedSearch'
import { formatCurrency, classNames } from '@/utils/helpers'
import { ROUTES } from '@/constants'
import LazyImage from '@/components/ui/LazyImage'

const SUGGESTION_LIMIT = 5
const DEBOUNCE_MS = 300

function productThumbnail(product) {
  const images = product.images || []
  return images.find((img) => img.is_primary)?.url || images[0]?.url
}

export default function SearchBar({
  categories = [],
  autoFocus = false,
  inputClassName,
  onNavigate,
}) {
  const navigate = useNavigate()
  const containerRef = useRef(null)

  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState({ products: [], count: 0 })

  const debouncedValue = useDebounce(value, DEBOUNCE_MS)

  useClickOutside(containerRef, () => setOpen(false), open)

  useEffect(() => {
    const term = debouncedValue.trim()
    if (!term) {
      setResults({ products: [], count: 0 })
      setLoading(false)
      return
    }
    let active = true
    setLoading(true)
    productService
      .searchSuggestions(term, SUGGESTION_LIMIT)
      .then((data) => {
        if (active) setResults(data)
      })
      .catch(() => {
        if (active) setResults({ products: [], count: 0 })
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [debouncedValue])

  const matchingCategories = value.trim()
    ? categories.filter((c) => c.name.toLowerCase().includes(value.trim().toLowerCase())).slice(0, 3)
    : []

  // If the query matches a curated category/subcategory/brand tile (e.g.
  // "tv" -> Televisions in Appliances, same as "fridge" -> Refrigerators),
  // searching should land exactly where clicking that tile would — not on
  // a real-product search, which this catalog's seed data usually can't
  // satisfy for a browse-style term like that.
  const curatedMatch = value.trim() ? resolveCuratedMatch(value, categories) : null

  const buildTileUrl = (match) => {
    const params = new URLSearchParams({ category: match.categoryId })
    if (match.subcategory) params.set('subcategory', match.subcategory)
    if (match.brand) params.set('brands', match.brand)
    return `${ROUTES.PRODUCTS}?${params.toString()}`
  }

  const goToShop = (query) => {
    const q = query.trim()
    if (!q) return
    const match = resolveCuratedMatch(q, categories)
    navigate(match ? buildTileUrl(match) : `${ROUTES.PRODUCTS}?search=${encodeURIComponent(q)}`)
    setOpen(false)
    setValue('')
    onNavigate?.()
  }

  const goToProduct = (productId) => {
    navigate(ROUTES.PRODUCT_DETAIL(productId))
    setOpen(false)
    setValue('')
    onNavigate?.()
  }

  const goToCategory = (categoryId) => {
    navigate(`${ROUTES.PRODUCTS}?category=${categoryId}`)
    setOpen(false)
    setValue('')
    onNavigate?.()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    goToShop(value)
  }

  const hasQuery = value.trim().length > 0
  const showDropdown = open && hasQuery
  const hasSuggestions = results.products.length > 0 || matchingCategories.length > 0 || !!curatedMatch

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            autoFocus={autoFocus}
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search products..."
            autoComplete="off"
            role="combobox"
            aria-expanded={showDropdown}
            aria-autocomplete="list"
            className={classNames(
              'h-10 w-full rounded-xl border border-ink-200 dark:border-ink-700 bg-white/70 dark:bg-ink-900/70',
              'pl-10 pr-4 text-sm text-ink-900 dark:text-ink-50 focus:border-brand-500 transition-colors',
              inputClassName
            )}
          />
        </div>
      </form>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-[70vh] overflow-y-auto rounded-xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark shadow-glass p-2">
          {curatedMatch && (curatedMatch.subcategory || curatedMatch.brand) && (
            <button
              type="button"
              onClick={() => {
                navigate(buildTileUrl(curatedMatch))
                setOpen(false)
                setValue('')
                onNavigate?.()
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left bg-brand-50 dark:bg-brand-900/20 hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors mb-1"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-white">
                <LayoutGrid className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-ink-900 dark:text-white truncate">
                  {curatedMatch.subcategory || curatedMatch.brand}
                </span>
                <span className="block text-xs text-ink-500 dark:text-ink-400">
                  in {curatedMatch.categoryName}
                </span>
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => goToShop(value)}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
          >
            <Search className="h-4 w-4 text-ink-400 shrink-0" />
            <span>
              Search for <span className="font-semibold text-ink-900 dark:text-white">&quot;{value.trim()}&quot;</span>
            </span>
          </button>

          {loading && (
            <div className="px-3 py-4 text-xs text-ink-400">Searching…</div>
          )}

          {!loading && hasQuery && !hasSuggestions && (
            <div className="px-3 py-4 text-xs text-ink-400">No matches yet — press Enter to search anyway.</div>
          )}

          {!loading && results.products.length > 0 && (
            <div className="mt-1">
              <p className="px-3 pt-1.5 pb-1 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                Products
              </p>
              {results.products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => goToProduct(product.id)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
                >
                  <LazyImage
                    src={productThumbnail(product)}
                    alt={product.name}
                    containerClassName="h-9 w-9 shrink-0 rounded-lg"
                    className="h-full w-full object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-ink-800 dark:text-ink-100">{product.name}</span>
                  </span>
                  <span className="price-mono shrink-0 text-xs font-medium text-ink-500 dark:text-ink-400">
                    {formatCurrency(product.price)}
                  </span>
                </button>
              ))}
            </div>
          )}

          {!loading && matchingCategories.length > 0 && (
            <div className="mt-1 border-t border-ink-100 dark:border-ink-800 pt-1">
              <p className="px-3 pt-1.5 pb-1 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                Categories
              </p>
              {matchingCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => goToCategory(cat.id)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-100 dark:bg-ink-800">
                    <LayoutGrid className="h-4 w-4 text-ink-500" />
                  </span>
                  <span className="text-sm text-ink-800 dark:text-ink-100">{cat.name}</span>
                </button>
              ))}
            </div>
          )}

          {!loading && !hasSuggestions && !hasQuery && (
            <div className="flex items-center gap-2 px-3 py-4 text-xs text-ink-400">
              <PackageSearch className="h-4 w-4" />
              Start typing to search products
            </div>
          )}
        </div>
      )}
    </div>
  )
}