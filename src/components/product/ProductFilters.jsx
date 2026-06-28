import { useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { RATING_FILTERS } from '@/constants'
import { classNames } from '@/utils/helpers'
import Rating from '@/components/ui/Rating'
import Button from '@/components/ui/Button'

const DISCOUNT_TIERS = [10, 20, 30, 40, 50]

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-ink-200 dark:border-ink-800 py-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-sm font-semibold text-ink-900 dark:text-white"
      >
        {title}
        <ChevronDown className={classNames('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  )
}

export default function ProductFilters({ categories, categoryCounts = {}, brands = [], filters, onChange, onClear }) {
  const { categoryId, minPrice, maxPrice, minRating, minDiscount, selectedBrands = [] } = filters
  const [brandSearch, setBrandSearch] = useState('')
  const [showAllCategories, setShowAllCategories] = useState(false)

  const totalCount = Object.values(categoryCounts).reduce((sum, n) => sum + n, 0)
  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(brandSearch.toLowerCase())
  )

  const VISIBLE_CATEGORY_LIMIT = 6
  const visibleCategories = showAllCategories ? categories : categories.slice(0, VISIBLE_CATEGORY_LIMIT)
  const hiddenCategoryCount = categories.length - VISIBLE_CATEGORY_LIMIT

  const toggleBrand = (brandName) => {
    const next = selectedBrands.includes(brandName)
      ? selectedBrands.filter((b) => b !== brandName)
      : [...selectedBrands, brandName]
    onChange({ selectedBrands: next })
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-4">
        <h3 className="text-base font-semibold text-ink-900 dark:text-white">Filters</h3>
        <Button variant="link" size="sm" onClick={onClear}>
          Clear all
        </Button>
      </div>

      <FilterSection title="Category">
        <div className="space-y-2.5">
          <label className="flex items-center justify-between gap-2.5 text-sm text-ink-600 dark:text-ink-300 cursor-pointer">
            <span className="flex items-center gap-2.5">
              <input
                type="radio"
                checked={!categoryId}
                onChange={() => onChange({ categoryId: null })}
                className="h-4 w-4 accent-brand-500"
              />
              All categories
            </span>
            {totalCount > 0 && <span className="text-xs text-ink-400">{totalCount}</span>}
          </label>
          {visibleCategories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center justify-between gap-2.5 text-sm text-ink-600 dark:text-ink-300 cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <input
                  type="radio"
                  checked={categoryId === cat.id}
                  onChange={() => onChange({ categoryId: cat.id })}
                  className="h-4 w-4 accent-brand-500"
                />
                {cat.name}
              </span>
              {categoryCounts[cat.id] !== undefined && (
                <span className="text-xs text-ink-400">{categoryCounts[cat.id]}</span>
              )}
            </label>
          ))}
          {hiddenCategoryCount > 0 && (
            <button
              type="button"
              onClick={() => setShowAllCategories((v) => !v)}
              className="flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400 pt-1"
            >
              {showAllCategories ? 'Show less' : `View all (${hiddenCategoryCount} more)`}
              <ChevronDown
                className={classNames('h-3.5 w-3.5 transition-transform', showAllCategories && 'rotate-180')}
              />
            </button>
          )}
        </div>
      </FilterSection>

      <FilterSection title="Price range">
        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="Min"
            min="0"
            value={minPrice ?? ''}
            onChange={(e) => onChange({ minPrice: e.target.value ? Number(e.target.value) : null })}
            className="h-10 w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-3 text-sm focus:border-brand-500"
          />
          <span className="text-ink-400">–</span>
          <input
            type="number"
            placeholder="Max"
            min="0"
            value={maxPrice ?? ''}
            onChange={(e) => onChange({ maxPrice: e.target.value ? Number(e.target.value) : null })}
            className="h-10 w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-3 text-sm focus:border-brand-500"
          />
        </div>
      </FilterSection>

      {brands.length > 0 && (
        <FilterSection title="Brand">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              placeholder="Search brands..."
              className="h-9 w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 pl-8 pr-3 text-sm focus:border-brand-500"
            />
          </div>
          <div className="space-y-2.5 max-h-48 overflow-y-auto">
            {filteredBrands.map((brand) => (
              <label
                key={brand.name}
                className="flex items-center justify-between gap-2.5 text-sm text-ink-600 dark:text-ink-300 cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.name)}
                    onChange={() => toggleBrand(brand.name)}
                    className="h-4 w-4 rounded accent-brand-500"
                  />
                  {brand.name}
                </span>
                <span className="text-xs text-ink-400">{brand.count}</span>
              </label>
            ))}
            {filteredBrands.length === 0 && (
              <p className="text-sm text-ink-400">No brands match &ldquo;{brandSearch}&rdquo;</p>
            )}
          </div>
        </FilterSection>
      )}

      <FilterSection title="Discount">
        <div className="space-y-2.5">
          <label className="flex items-center gap-2.5 text-sm text-ink-600 dark:text-ink-300 cursor-pointer">
            <input
              type="radio"
              checked={!minDiscount}
              onChange={() => onChange({ minDiscount: null })}
              className="h-4 w-4 accent-brand-500"
            />
            Any discount
          </label>
          {DISCOUNT_TIERS.map((tier) => (
            <label key={tier} className="flex items-center gap-2.5 text-sm text-ink-600 dark:text-ink-300 cursor-pointer">
              <input
                type="radio"
                checked={minDiscount === tier}
                onChange={() => onChange({ minDiscount: tier })}
                className="h-4 w-4 accent-brand-500"
              />
              {tier}% and above
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Rating">
        <div className="space-y-2.5">
          <label className="flex items-center gap-2.5 text-sm text-ink-600 dark:text-ink-300 cursor-pointer">
            <input
              type="radio"
              checked={!minRating}
              onChange={() => onChange({ minRating: null })}
              className="h-4 w-4 accent-brand-500"
            />
            Any rating
          </label>
          {RATING_FILTERS.map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <input
                type="radio"
                checked={minRating === rating}
                onChange={() => onChange({ minRating: rating })}
                className="h-4 w-4 accent-brand-500"
              />
              <Rating value={rating} size="sm" />
              <span className="text-sm text-ink-500">& up</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  )
}