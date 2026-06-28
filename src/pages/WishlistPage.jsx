import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import { useWishlist } from '@/context/WishlistContext'
import { ROUTES } from '@/constants'
import ProductCard from '@/components/product/ProductCard'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'

export default function WishlistPage() {
  const { items, loading } = useWishlist()

  return (
    <div className="container-page py-8">
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white mb-6">
        Your Wishlist
      </h1>

      {loading ? (
        <ProductGridSkeleton count={4} />
      ) : items.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save items you love so you can find them easily later."
          action={
            <Link to={ROUTES.PRODUCTS}>
              <Button variant="brand" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Discover products
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {items.map((item) => (
            <ProductCard key={item.id} product={item.product} />
          ))}
        </div>
      )}
    </div>
  )
}
