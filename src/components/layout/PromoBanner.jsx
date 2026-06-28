import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ROUTES } from '@/constants'

export default function PromoBanner() {
  return (
    <section className="container-page py-4">
      <div className="grid sm:grid-cols-2 gap-5">
        {/* Brand gradient card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.4 }}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 p-8 sm:p-10 min-h-[220px] flex flex-col justify-between shadow-card"
        >
          <motion.div
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-4 -bottom-16 h-48 w-48 rounded-full bg-white/10"
            animate={{ scale: [1, 1.1, 1], y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Limited time</p>
            <h3 className="font-display text-2xl font-bold text-white">20% off your first order</h3>
            <p className="text-sm text-white/80 mt-1">Use code WELCOME20 at checkout</p>
          </div>
          <Link
            to={ROUTES.PRODUCTS}
            className="relative z-10 inline-flex items-center gap-1.5 text-sm font-semibold text-white mt-4"
          >
            Shop now
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Dark gradient card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-8 sm:p-10 min-h-[220px] flex flex-col justify-between shadow-card"
        >
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px]" />
          <motion.div
            className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-amber-500/10"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">Free shipping</p>
            <h3 className="font-display text-2xl font-bold text-white">On every order over $100</h3>
            <p className="text-sm text-ink-300 mt-1">No fine print, no surprise fees</p>
          </div>
          <Link
            to={ROUTES.PRODUCTS}
            className="relative z-10 inline-flex items-center gap-1.5 text-sm font-semibold text-white mt-4"
          >
            Start shopping
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}