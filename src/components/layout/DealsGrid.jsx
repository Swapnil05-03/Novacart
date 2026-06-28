import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ROUTES } from '@/constants'

// Static promo content — purely visual deal tiles, not tied to live product/category
// data, since the goal here is the dense "packed" homepage layout. Each tile links
// to the product listing with a relevant search term pre-filled.
const DEALS = [
  {
    title: 'Appliances for your home',
    subtitle: 'Up to 55% off',
    cta: 'Shop now',
    searchTerm: 'home appliances',
    items: [
      { label: 'Air conditioners', image: 'https://images.unsplash.com/photo-1581275299192-3c47b0c89e26?w=300&q=80' },
      { label: 'Refrigerators', image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&q=80' },
      { label: 'Microwaves', image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=300&q=80' },
      { label: 'Washing machines', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=300&q=80' },
    ],
  },
  {
    title: 'Revamp your home in style',
    subtitle: 'New collection',
    cta: 'Explore',
    searchTerm: 'home decor',
    items: [
      { label: 'Cushion covers & more', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=300&q=80' },
      { label: 'Figurines & vases', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&q=80' },
      { label: 'Home storage', image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=300&q=80' },
      { label: 'Lighting solutions', image: 'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=300&q=80' },
    ],
  },
  {
    title: 'Starting at $9',
    subtitle: 'Deals on home essentials',
    cta: 'See all',
    searchTerm: 'home essentials',
    items: [
      { label: 'Cleaning supplies', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&q=80' },
      { label: 'Bathroom accessories', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=300&q=80' },
      { label: 'Home tools', image: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8e2b?w=300&q=80' },
      { label: 'Office supplies', image: 'https://images.unsplash.com/photo-1568205612837-017257d2310a?w=300&q=80' },
    ],
  },
  {
    title: 'Up to 75% off',
    subtitle: 'Deals on headphones',
    cta: 'View deals',
    searchTerm: 'headphones',
    items: [
      { label: 'Wireless earbuds', image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&q=80' },
      { label: 'Over-ear headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80' },
      { label: 'Neckband audio', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&q=80' },
      { label: 'True wireless', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&q=80' },
    ],
  },
]

export default function DealsGrid() {
  return (
    <section className="container-page py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DEALS.map((deal, i) => (
          <motion.div
            key={deal.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="rounded-2xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark p-4"
          >
            <h3 className="text-sm font-bold text-ink-900 dark:text-white leading-snug">
              {deal.title}
            </h3>
            <p className="text-sm text-ink-500 dark:text-ink-400 mb-3">{deal.subtitle}</p>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {deal.items.map((item) => (
                <Link
                  key={item.label}
                  to={`${ROUTES.PRODUCTS}?search=${encodeURIComponent(deal.searchTerm)}`}
                  className="group block"
                >
                  <div className="aspect-square overflow-hidden rounded-lg bg-ink-100 dark:bg-ink-800">
                    <img
                      src={item.image}
                      alt={item.label}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-1 text-xs text-ink-600 dark:text-ink-300 leading-tight line-clamp-1">
                    {item.label}
                  </p>
                </Link>
              ))}
            </div>

            <Link
              to={`${ROUTES.PRODUCTS}?search=${encodeURIComponent(deal.searchTerm)}`}
              className="text-sm font-medium text-brand-600 dark:text-brand-400 link-underline"
            >
              {deal.cta}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}