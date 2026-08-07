import { useState, useEffect, useMemo } from 'react'
import { PackageSearch } from 'lucide-react'
import BrandCard from '@/components/product/BrandCard'
import SubcategoryCard from '@/components/product/SubcategoryCard'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'
import EmptyState from '@/components/ui/EmptyState'
import Pagination from '@/components/ui/Pagination'

// The single-category browse gallery (subcategory tiles + brand cards) is
// paginated on its own. 12 is a multiple of 2/3/4 so the last row never
// looks half-empty at any breakpoint.
const GALLERY_PAGE_SIZE = 12

// This grid shows one of two things:
//  - A single category's full browse gallery (every subcategory tile +
//    every brand card for that category), paginated — when `categoryPreviews`
//    is not provided.
//  - The "all categories" landing view — a short, curated preview per
//    category (a handful of tiles + brands each) with a "View all" action
//    — when `categoryPreviews` IS provided. No pagination here; each
//    category's full gallery is one click away via "View all".
//
// Every tile/brand item may carry a `linkedProduct` (a real Supabase
// product actually tagged with that subcategory/brand — see
// ProductsPage.jsx's productLinks). When present, SubcategoryCard/BrandCard
// render it as a genuine shoppable product: click opens its detail page,
// with working Add to Cart / Wishlist buttons — while still showing the
// card's own curated local image, never the product's own (possibly
// broken) image. Items with no linked product keep the plain discovery
// behavior (click applies that subcategory/brand as a filter).
export default function ProductGrid({
  loading,
  emptyMessage,
  allBrands = [],
  allSubcategoryTiles = [],
  // Present only on the "all categories" landing view (see
  // ProductsPage.jsx's categoryPreviews memo). Each entry is
  // { category, tiles, brands } — a small curated slice per category.
  categoryPreviews = null,
  onViewCategory,
  onSelectBrand,
  onSelectSubcategory,
  // Active filter state — when either is set, the grid shows ONLY the
  // selected card(s), nothing else.
  selectedBrands = [],
  onRemoveBrand,
  selectedSubcategory,
  onRemoveSubcategory,
}) {
  const [galleryPage, setGalleryPage] = useState(1)

  // Combine subcategory tiles + brand cards into one list so a single
  // Pagination control (reused from the products page) covers both. Only
  // relevant for the single-category gallery (categoryPreviews null).
  const galleryItems = useMemo(
    () => [
      ...allSubcategoryTiles.map((tile) => ({
        type: 'subcategory',
        key: `sub-${tile.name}`,
        tile,
      })),
      ...allBrands.map((brand) => ({
        type: 'brand',
        key: `brand-${brand.name}`,
        brand,
      })),
    ],
    [allSubcategoryTiles, allBrands]
  )

  // Reset to page 1 whenever the gallery contents change (e.g. switching
  // category) so we never land on a page number that no longer has items.
  useEffect(() => {
    setGalleryPage(1)
  }, [galleryItems])

  const galleryTotalPages = Math.max(1, Math.ceil(galleryItems.length / GALLERY_PAGE_SIZE))
  const pagedGalleryItems = galleryItems.slice(
    (galleryPage - 1) * GALLERY_PAGE_SIZE,
    galleryPage * GALLERY_PAGE_SIZE
  )

  if (loading) return <ProductGridSkeleton />

  const hasActiveFilter = selectedBrands.length > 0 || !!selectedSubcategory

  if (hasActiveFilter) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {selectedSubcategory && (
          <SubcategoryCard
            name={selectedSubcategory.name}
            image={selectedSubcategory.image}
            mode="selected"
            onRemove={onRemoveSubcategory}
            linkedProduct={selectedSubcategory.linkedProduct || null}
          />
        )}
        {selectedBrands.map((brand) => (
          <BrandCard
            key={`brand-${brand.name}`}
            brand={brand}
            mode="selected"
            onRemove={onRemoveBrand}
            linkedProduct={brand.linkedProduct || null}
          />
        ))}
      </div>
    )
  }

  // "All categories" landing view — curated preview rows, no pagination.
  if (categoryPreviews) {
    if (!categoryPreviews.length) {
      return (
        <EmptyState
          icon={PackageSearch}
          title="No categories found"
          description={emptyMessage || 'Try adjusting your filters or search terms.'}
        />
      )
    }

    return (
      <div className="space-y-10">
        {categoryPreviews.map((preview) => (
          <div key={preview.category.id}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-50">
                {preview.category.name}
              </h2>
              <button
                type="button"
                onClick={() => onViewCategory?.(preview.category.id)}
                className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline whitespace-nowrap"
              >
                View all →
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
              {preview.tiles.map((tile) => (
                <SubcategoryCard
                  key={`sub-${preview.category.id}-${tile.name}`}
                  name={tile.name}
                  image={tile.image}
                  mode="browse"
                  onSelect={() => onSelectSubcategory?.(tile.name, tile.categoryId)}
                  linkedProduct={tile.linkedProduct || null}
                />
              ))}
              {preview.brands.map((brand) => (
                <BrandCard
                  key={`brand-${preview.category.id}-${brand.name}`}
                  brand={brand}
                  mode="browse"
                  onSelect={() => onSelectBrand?.(brand.name, brand.categoryId)}
                  linkedProduct={brand.linkedProduct || null}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Single-category full gallery, paginated.
  if (!galleryItems.length) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="No products found"
        description={emptyMessage || 'Try adjusting your filters or search terms.'}
      />
    )
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {pagedGalleryItems.map((item) =>
          item.type === 'subcategory' ? (
            <SubcategoryCard
              key={item.key}
              name={item.tile.name}
              image={item.tile.image}
              mode="browse"
              onSelect={() => onSelectSubcategory?.(item.tile.name)}
              linkedProduct={item.tile.linkedProduct || null}
            />
          ) : (
            <BrandCard
              key={item.key}
              brand={item.brand}
              mode="browse"
              onSelect={() => onSelectBrand?.(item.brand.name)}
              linkedProduct={item.brand.linkedProduct || null}
            />
          )
        )}
      </div>

      {galleryTotalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={galleryPage}
            totalPages={galleryTotalPages}
            onPageChange={setGalleryPage}
          />
        </div>
      )}
    </div>
  )
}