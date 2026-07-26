import trendingBag from '@/assets/images/hero/trendingNow/bag.jpg'
import trendingBand from '@/assets/images/hero/trendingNow/band.png'
import trendingCandle from '@/assets/images/hero/trendingNow/candle.webp'
import trendingEarbuds from '@/assets/images/hero/trendingNow/earbuds.webp'
import trendingHoodie from '@/assets/images/hero/trendingNow/hoodie.webp'
import trendingLamp from '@/assets/images/hero/trendingNow/lamp.jpg'
import trendingMug from '@/assets/images/hero/trendingNow/mug.webp'
import trendingPuzzle from '@/assets/images/hero/trendingNow/puzzle.jpg'

// Static "Trending Now" row — bypasses Supabase entirely so this section
// always shows exactly these curated items, unaffected by database
// seed/test data or category-diversify caps.
export const TRENDING_PRODUCTS = [
  {
    id: 'trending-earbuds',
    name: 'Wireless Bluetooth Earbuds',
    price: 1499,
    compare_at_price: 2199,
    stock: 55,
    category: { name: 'Electronics' },
    is_trending: true,
    average_rating: 4.5,
    review_count: 201,
    images: [{ id: 'img-earbuds', url: trendingEarbuds, is_primary: true }],
  },
  {
    id: 'trending-hoodie',
    name: 'Oversized Cotton Hoodie',
    price: 899,
    compare_at_price: 1299,
    stock: 40,
    category: { name: 'Apparel' },
    is_trending: true,
    average_rating: 4.4,
    review_count: 87,
    images: [{ id: 'img-hoodie', url: trendingHoodie, is_primary: true }],
  },
  {
    id: 'trending-band',
    name: 'Smart Fitness Band',
    price: 1999,
    compare_at_price: 2599,
    stock: 30,
    category: { name: 'Fitness' },
    is_trending: true,
    average_rating: 4.3,
    review_count: 156,
    images: [{ id: 'img-band', url: trendingBand, is_primary: true }],
  },
  {
    id: 'trending-mug',
    name: 'Ceramic Coffee Mug Set',
    price: 449,
    compare_at_price: 599,
    stock: 65,
    category: { name: 'Home & Living' },
    is_trending: true,
    average_rating: 4.6,
    review_count: 92,
    images: [{ id: 'img-mug', url: trendingMug, is_primary: true }],
  },
  {
    id: 'trending-bag',
    name: 'Leather Crossbody Sling Bag',
    price: 1299,
    compare_at_price: 1799,
    stock: 22,
    category: { name: 'Accessories' },
    is_trending: true,
    average_rating: 4.5,
    review_count: 74,
    images: [{ id: 'img-bag', url: trendingBag, is_primary: true }],
  },
  {
    id: 'trending-lamp',
    name: 'LED Desk Lamp',
    price: 799,
    compare_at_price: 1099,
    stock: 48,
    category: { name: 'Office' },
    is_trending: true,
    average_rating: 4.4,
    review_count: 61,
    images: [{ id: 'img-lamp', url: trendingLamp, is_primary: true }],
  },
  {
    id: 'trending-candle',
    name: 'Scented Candle Gift Set',
    price: 649,
    compare_at_price: 899,
    stock: 50,
    category: { name: 'Home & Living' },
    is_trending: true,
    average_rating: 4.7,
    review_count: 108,
    images: [{ id: 'img-candle', url: trendingCandle, is_primary: true }],
  },
  {
    id: 'trending-puzzle',
    name: 'Kids Puzzle Game Set',
    price: 549,
    compare_at_price: 749,
    stock: 60,
    category: { name: 'Toys & Games' },
    is_trending: true,
    average_rating: 4.6,
    review_count: 135,
    images: [{ id: 'img-puzzle', url: trendingPuzzle, is_primary: true }],
  },
]