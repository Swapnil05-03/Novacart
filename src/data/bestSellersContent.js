import bestBedsheet from '@/assets/images/hero/bestSellers/bedsheet.webp'
import bestBottle from '@/assets/images/hero/bestSellers/bottle.jpg'
import bestFacewash from '@/assets/images/hero/bestSellers/facewash.avif'
import bestFreshener from '@/assets/images/hero/bestSellers/freshener.jpg'
import bestMouse from '@/assets/images/hero/bestSellers/mouse.jpg'
import bestNotebook from '@/assets/images/hero/bestSellers/notebook.webp'
import bestRacket from '@/assets/images/hero/bestSellers/racket.jpg'
import bestShirt from '@/assets/images/hero/bestSellers/shirt.webp'

// Static "Best Sellers" row — bypasses Supabase entirely so this section
// always shows exactly these curated items, unaffected by database
// seed/test data or category-diversify caps.
export const BEST_SELLER_PRODUCTS = [
  {
    id: 'best-bottle',
    name: 'Stainless Steel Water Bottle',
    price: 399,
    compare_at_price: 599,
    stock: 80,
    category: { name: 'Fitness' },
    is_best_seller: true,
    average_rating: 4.7,
    review_count: 245,
    images: [{ id: 'img-bottle', url: bestBottle, is_primary: true }],
  },
  {
    id: 'best-mouse',
    name: 'Wireless Mouse',
    price: 599,
    compare_at_price: 899,
    stock: 70,
    category: { name: 'Electronics' },
    is_best_seller: true,
    average_rating: 4.5,
    review_count: 189,
    images: [{ id: 'img-mouse', url: bestMouse, is_primary: true }],
  },
  {
    id: 'best-bedsheet',
    name: 'Cotton Bedsheet Set',
    price: 899,
    compare_at_price: 1299,
    stock: 45,
    category: { name: 'Home & Living' },
    is_best_seller: true,
    average_rating: 4.6,
    review_count: 132,
    images: [{ id: 'img-bedsheet', url: bestBedsheet, is_primary: true }],
  },
  {
    id: 'best-shirt',
    name: "Men's Formal Shirt",
    price: 999,
    compare_at_price: 1499,
    stock: 55,
    category: { name: 'Apparel' },
    is_best_seller: true,
    average_rating: 4.4,
    review_count: 98,
    images: [{ id: 'img-shirt', url: bestShirt, is_primary: true }],
  },
  {
    id: 'best-facewash',
    name: 'Face Wash for Oily Skin',
    price: 249,
    compare_at_price: 349,
    stock: 90,
    category: { name: 'Beauty' },
    is_best_seller: true,
    average_rating: 4.5,
    review_count: 210,
    images: [{ id: 'img-facewash', url: bestFacewash, is_primary: true }],
  },
  {
    id: 'best-notebook',
    name: 'Notebook & Pen Combo',
    price: 199,
    compare_at_price: 299,
    stock: 100,
    category: { name: 'Books & Stationery' },
    is_best_seller: true,
    average_rating: 4.6,
    review_count: 76,
    images: [{ id: 'img-notebook', url: bestNotebook, is_primary: true }],
  },
  {
    id: 'best-freshener',
    name: 'Car Air Freshener',
    price: 149,
    compare_at_price: 249,
    stock: 120,
    category: { name: 'Auto Accessories' },
    is_best_seller: true,
    average_rating: 4.3,
    review_count: 58,
    images: [{ id: 'img-freshener', url: bestFreshener, is_primary: true }],
  },
  {
    id: 'best-racket',
    name: 'Badminton Racket Set',
    price: 799,
    compare_at_price: 1099,
    stock: 35,
    category: { name: 'Sports & Outdoors' },
    is_best_seller: true,
    average_rating: 4.7,
    review_count: 121,
    images: [{ id: 'img-racket', url: bestRacket, is_primary: true }],
  },
]