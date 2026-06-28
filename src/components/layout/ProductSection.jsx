import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function ProductSection({ title, subtitle, products, loading, viewAllLink }) {
  if (!loading && !products?.length) return null

  return (
    <section className="container-page py-14">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="h-1 w-8 rounded-full bg-brand-500 mb-3" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
            {title}
          </h2>
          {subtitle && <p className="text-sm text-ink-500 dark:text-ink-400 mt-1.5">{subtitle}</p>}
        </div>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="group hidden sm:inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink-200 dark:border-ink-700 px-4 py-2 text-sm font-medium text-ink-700 dark:text-ink-200 transition-colors hover:border-brand-300 dark:hover:border-brand-700 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-600 dark:hover:text-brand-400"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {loading ? (
        <ProductGridSkeleton count={4} />
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {products.slice(0, 8).map((product) => (
            <motion.div key={product.id} variants={cardVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )
}