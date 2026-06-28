import { PackageSearch } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'
import EmptyState from '@/components/ui/EmptyState'

export default function ProductGrid({ products, loading, emptyMessage }) {
  if (loading) return <ProductGridSkeleton />

  if (!products?.length) {
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
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
