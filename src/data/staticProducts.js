import { FEATURED_PRODUCTS } from './featuredProductsContent'
import { TRENDING_PRODUCTS } from './trendingNowContent'
import { BEST_SELLER_PRODUCTS } from './bestSellersContent'

const ALL_STATIC_PRODUCTS = [
  ...FEATURED_PRODUCTS,
  ...TRENDING_PRODUCTS,
  ...BEST_SELLER_PRODUCTS,
]

export function getStaticProductById(id) {
  return ALL_STATIC_PRODUCTS.find((p) => p.id === id) || null
}