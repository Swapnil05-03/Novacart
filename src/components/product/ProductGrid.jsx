import { PackageSearch } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import BrandCard from '@/components/product/BrandCard'
import SubcategoryCard from '@/components/product/SubcategoryCard'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'
import EmptyState from '@/components/ui/EmptyState'

export default function ProductGrid({
  products,
  loading,
  emptyMessage,
  page = 1,
  // Full per-category galleries shown only when no brand/subcategory
  // filter is active — every brand image + every subcategory tile image,
  // alongside the real products.
  allBrands = [],
  allSubcategoryTiles = [],
  onSelectBrand,
  onSelectSubcategory,
  // Active filter state — when either is set, the grid shows ONLY the
  // selected card(s), nothing else (no products, no browse gallery).
  selectedBrands = [],
  onRemoveBrand,
  selectedSubcategory,
  onRemoveSubcategory,
}) {
  if (loading) return <ProductGridSkeleton />

  const hasActiveFilter = selectedBrands.length > 0 || !!selectedSubcategory
  const linkedProduct = products?.[0] || null

  if (hasActiveFilter) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {selectedSubcategory && (
          <SubcategoryCard
            name={selectedSubcategory.name}
            image={selectedSubcategory.image}
            mode="selected"
            onRemove={onRemoveSubcategory}
            linkedProduct={linkedProduct}
          />
        )}
        {selectedBrands.map((brand) => (
          <BrandCard
            key={`brand-${brand.name}`}
            brand={brand}
            mode="selected"
            onRemove={onRemoveBrand}
            linkedProduct={linkedProduct}
          />
        ))}
      </div>
    )
  }

  if (!products?.length && !allBrands.length && !allSubcategoryTiles.length) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="No products found"
        description={emptyMessage || 'Try adjusting your filters or search terms.'}
      />
    )
  }

  // The browse gallery (every brand + every subcategory tile) only makes
  // sense as a "discover" strip on the first page — repeating it on every
  // paginated page would re-render the same 20-30 cards each time and make
  // the real, paginated product results look like they never change.
  const showGallery = page === 1

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
      {showGallery &&
        allSubcategoryTiles.map((tile) => (
          <SubcategoryCard
            key={`sub-${tile.name}`}
            name={tile.name}
            image={tile.image}
            mode="browse"
            onSelect={onSelectSubcategory}
          />
        ))}
      {showGallery &&
        allBrands.map((brand) => (
          <BrandCard key={`brand-${brand.name}`} brand={brand} mode="browse" onSelect={onSelectBrand} />
        ))}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}