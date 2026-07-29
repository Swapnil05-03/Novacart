import { PackageSearch } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import BrandCard from '@/components/product/BrandCard'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'
import EmptyState from '@/components/ui/EmptyState'

export default function ProductGrid({
  products,
  loading,
  emptyMessage,
  selectedBrands = [],
  onRemoveBrand,
}) {
  if (loading) return <ProductGridSkeleton />

  // Selected brands still render even if the product list is empty, so
  // picking a brand always shows its image — the brand filter doesn't
  // narrow `products`, so an empty product list is independent of it.
  if (!products?.length && selectedBrands.length === 0) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="No products found"
        description={emptyMessage || 'Try adjusting your filters or search terms.'}
      />
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
      {selectedBrands.map((brand) => (
        <BrandCard key={`brand-${brand.name}`} brand={brand} onRemove={onRemoveBrand} />
      ))}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}