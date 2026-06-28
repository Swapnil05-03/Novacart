import { motion } from 'framer-motion'
import { Truck, RotateCcw, ShieldCheck, Tag, Headset } from 'lucide-react'

const BADGES = [
  { icon: Truck, title: 'Free Shipping', subtitle: 'On orders over $100' },
  { icon: RotateCcw, title: '30-Day Returns', subtitle: 'Hassle-free returns' },
  { icon: ShieldCheck, title: 'Secure Checkout', subtitle: '100% protected' },
  { icon: Tag, title: 'Best Prices', subtitle: 'Guaranteed deals' },
  { icon: Headset, title: '24/7 Support', subtitle: "We're here to help" },
]

export default function TrustBadges() {
  return (
    <section className="container-page py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {BADGES.map((badge, i) => (
          <motion.div
            key={badge.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex items-center gap-3 rounded-2xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark px-4 py-3.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 shrink-0">
              <badge.icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink-900 dark:text-white leading-tight truncate">
                {badge.title}
              </p>
              <p className="text-xs text-ink-500 dark:text-ink-400 leading-tight truncate">
                {badge.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}