import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, ShoppingBag, Share2, Truck, ShieldCheck, RotateCcw, Minus, Plus, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { productService } from '@/services/productService'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import { formatCurrency, calculateDiscount, classNames } from '@/utils/helpers'
import { ROUTES } from '@/constants'
import ProductGallery from '@/components/product/ProductGallery'
import { ReviewList, ReviewForm } from '@/components/product/Reviews'
import ProductCard from '@/components/product/ProductCard'
import Rating from '@/components/ui/Rating'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { PageLoader } from '@/components/ui/Loader'
import EmptyState from '@/components/ui/EmptyState'
import { PackageX } from 'lucide-react'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { addProduct } = useRecentlyViewed()

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    setQuantity(1)

    productService
      .getProductById(id)
      .then((data) => {
        if (!isMounted) return
        setProduct(data)
        addProduct(data.id)
        return productService.getRelatedProducts(data.category_id, data.id)
      })
      .then((rel) => isMounted && setRelated(rel || []))
      .catch((err) => console.error('Failed to load product', err))
      .finally(() => isMounted && setLoading(false))

    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url })
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url)
      toast.success('Link copied to clipboard')
    }
  }

  const refreshReviews = () => {
    productService.getProductById(id).then(setProduct).catch(console.error)
  }

  if (loading) return <PageLoader />

  if (!product) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={PackageX}
          title="Product not found"
          description="This product may have been removed or the link is incorrect."
          action={
            <Link to={ROUTES.PRODUCTS}>
              <Button variant="brand">Browse products</Button>
            </Link>
          }
        />
      </div>
    )
  }

  const discount = calculateDiscount(product.price, product.compare_at_price)
  const wishlisted = isWishlisted(product.id)
  const outOfStock = product.stock <= 0

  return (
    <div className="container-page py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-ink-400 mb-6 flex items-center gap-1.5">
        <Link to={ROUTES.HOME} className="hover:text-ink-700 dark:hover:text-ink-200">Home</Link>
        <span>/</span>
        <Link to={ROUTES.PRODUCTS} className="hover:text-ink-700 dark:hover:text-ink-200">Products</Link>
        {product.category && (
          <>
            <span>/</span>
            <Link to={`${ROUTES.PRODUCTS}?category=${product.category.id}`} className="hover:text-ink-700 dark:hover:text-ink-200">
              {product.category.name}
            </Link>
          </>
        )}
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        <ProductGallery images={product.images} productName={product.name} />

        <div>
          {product.category && (
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400 mb-2">
              {product.category.name}
            </p>
          )}
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mt-3">
            <Rating value={product.average_rating} size="md" showValue />
            <span className="text-sm text-ink-400">{product.review_count} reviews</span>
          </div>

          <div className="flex items-baseline gap-3 mt-5">
            <span className="price-mono text-3xl font-bold text-ink-900 dark:text-white">
              {formatCurrency(product.price)}
            </span>
            {discount > 0 && (
              <>
                <span className="price-mono text-lg text-ink-400 line-through">
                  {formatCurrency(product.compare_at_price)}
                </span>
                <Badge variant="amber">Save {discount}%</Badge>
              </>
            )}
          </div>

          <p className="mt-5 text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mt-5">
            {outOfStock ? (
              <Badge variant="danger">Out of stock</Badge>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm text-success-600">
                <Check className="h-4 w-4" /> In stock — {product.stock} available
              </span>
            )}
          </div>

          {!outOfStock && (
            <div className="flex items-center gap-4 mt-6">
              <div className="inline-flex items-center rounded-xl border border-ink-200 dark:border-ink-700">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-11 w-11 items-center justify-center text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 rounded-l-xl transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-sm font-semibold tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="flex h-11 w-11 items-center justify-center text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 rounded-r-xl transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                variant="brand"
                size="lg"
                className="flex-1"
                leftIcon={<ShoppingBag className="h-4 w-4" />}
                onClick={() => addToCart(product, quantity)}
              >
                Add to cart
              </Button>
            </div>
          )}

          <div className="flex items-center gap-3 mt-4">
            <Button
              variant="outline"
              className="flex-1"
              leftIcon={
                <Heart className={classNames('h-4 w-4', wishlisted && 'fill-brand-500 text-brand-500')} />
              }
              onClick={() => toggleWishlist(product)}
            >
              {wishlisted ? 'Saved' : 'Save for later'}
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare} aria-label="Share product">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-ink-200 dark:border-ink-800">
            <Feature icon={Truck} text="Free shipping over $100" />
            <Feature icon={RotateCcw} text="30-day easy returns" />
            <Feature icon={ShieldCheck} text="Secure checkout" />
          </div>
        </div>
      </div>

      {/* Tabs: Description / Specs / Reviews */}
      <div className="mt-16">
        <div className="flex gap-1 border-b border-ink-200 dark:border-ink-800">
          {[
            { key: 'description', label: 'Description' },
            { key: 'specifications', label: 'Specifications' },
            { key: 'reviews', label: `Reviews (${product.review_count})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={classNames(
                'px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px',
                activeTab === tab.key
                  ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-ink-500 hover:text-ink-800 dark:hover:text-ink-200'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-8 max-w-3xl">
          {activeTab === 'description' && (
            <p className="text-sm text-ink-600 dark:text-ink-300 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          )}
          {activeTab === 'specifications' && (
            <dl className="divide-y divide-ink-100 dark:divide-ink-800">
              {[
                ['SKU', product.sku || '—'],
                ['Category', product.category?.name || '—'],
                ['Stock', `${product.stock} units`],
              ].map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 text-sm">
                  <dt className="text-ink-500">{key}</dt>
                  <dd className="font-medium text-ink-900 dark:text-white">{value}</dd>
                </div>
              ))}
            </dl>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <ReviewForm productId={product.id} onSubmitted={refreshReviews} />
              <ReviewList reviews={product.reviews} />
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold tracking-tight text-ink-900 dark:text-white mb-6">
            You might also like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Feature({ icon: Icon, text }) {
  return (
    <div className="flex flex-col items-center text-center gap-1.5">
      <Icon className="h-5 w-5 text-ink-400" strokeWidth={1.5} />
      <span className="text-xs text-ink-500 dark:text-ink-400">{text}</span>
    </div>
  )
}
