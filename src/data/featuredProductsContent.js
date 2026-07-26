import productAC from '@/assets/images/hero/featuredProducts/1.5tonAC.jpg'
import productArmor from '@/assets/images/hero/featuredProducts/armor.jpg'
import productBlocks from '@/assets/images/hero/featuredProducts/building-blocks.jpg'
import productKit from '@/assets/images/hero/featuredProducts/kit.jpg'
import productNova from '@/assets/images/hero/featuredProducts/nova.jpg'
import productSerum from '@/assets/images/hero/featuredProducts/serum.jpg'
import productSpray from '@/assets/images/hero/featuredProducts/spray.jpg'
import productYogaMat from '@/assets/images/hero/featuredProducts/yoga-mat.jpg'

// Static "Featured Products" row — bypasses Supabase entirely so this
// section always shows exactly these curated items, unaffected by
// database seed/test data, storage cleanup, or category-diversify caps.
export const FEATURED_PRODUCTS = [
  {
    id: 'featured-ac',
    name: '1.5 Ton Inverter Split AC',
    price: 32999,
    compare_at_price: 42999,
    stock: 18,
    category: { name: 'Appliances' },
    average_rating: 4.6,
    review_count: 128,
    images: [{ id: 'img-ac', url: productAC, is_primary: true }],
  },
  {
    id: 'featured-armor',
    name: 'Riding Jacket with Armor',
    price: 3499,
    compare_at_price: 4499,
    stock: 25,
    category: { name: 'Two Wheelers' },
    average_rating: 4.5,
    review_count: 64,
    images: [{ id: 'img-armor', url: productArmor, is_primary: true }],
  },
  {
    id: 'featured-blocks',
    name: 'Building Blocks Set — 500 Pieces',
    price: 999,
    compare_at_price: 1399,
    stock: 40,
    category: { name: 'Toys & Games' },
    average_rating: 4.7,
    review_count: 210,
    images: [{ id: 'img-blocks', url: productBlocks, is_primary: true }],
  },
  {
    id: 'featured-kit',
    name: 'Microfiber Car Cleaning Kit',
    price: 899,
    compare_at_price: 1199,
    stock: 32,
    category: { name: 'Auto Accessories' },
    average_rating: 4.4,
    review_count: 89,
    images: [{ id: 'img-kit', url: productKit, is_primary: true }],
  },
  {
    id: 'featured-nova',
    name: 'Nova X12 5G Smartphone',
    price: 17999,
    compare_at_price: 21999,
    stock: 45,
    category: { name: 'Mobiles' },
    average_rating: 4.5,
    review_count: 312,
    images: [{ id: 'img-nova', url: productNova, is_primary: true }],
  },
  {
    id: 'featured-serum',
    name: 'Vitamin C Brightening Serum',
    price: 599,
    compare_at_price: 799,
    stock: 60,
    category: { name: 'Beauty' },
    average_rating: 4.6,
    review_count: 175,
    images: [{ id: 'img-serum', url: productSerum, is_primary: true }],
  },
  {
    id: 'featured-spray',
    name: 'Multi-Surface Cleaning Spray, 3 Pack',
    price: 349,
    compare_at_price: 449,
    stock: 70,
    category: { name: 'Food & Household' },
    average_rating: 4.3,
    review_count: 52,
    images: [{ id: 'img-spray', url: productSpray, is_primary: true }],
  },
  {
    id: 'featured-yoga',
    name: 'Non-Slip Yoga Mat, 6mm',
    price: 799,
    compare_at_price: 999,
    stock: 38,
    category: { name: 'Sports & Outdoors' },
    average_rating: 4.7,
    review_count: 143,
    images: [{ id: 'img-yoga', url: productYogaMat, is_primary: true }],
  },
]