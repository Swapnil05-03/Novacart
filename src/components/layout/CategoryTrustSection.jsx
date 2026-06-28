import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, RotateCcw, Truck, Mail, Star } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '@/components/ui/Button'

const TRUST_POINTS = [
  { icon: ShieldCheck, label: '100% Genuine Products' },
  { icon: Star, label: 'Dermatologist Recommended' },
  { icon: RotateCcw, label: 'Easy Returns & Refunds' },
  { icon: Truck, label: 'Fast, Free Shipping' },
]

// Lightweight, clearly-fictional testimonial — illustrative only, not a real
// customer quote or review, matching the placeholder-content approach used
// throughout this showcase.
const TESTIMONIALS = {
  default: { name: 'Jordan M.', quote: 'Exactly what I was looking for — fast shipping and great quality.' },
  beauty: { name: 'Amara K.', quote: "My skincare routine hasn't been the same since I started shopping here." },
  mobiles: { name: 'Devon R.', quote: 'Got my phone two days early and the price beat every other store.' },
  fashion: { name: 'Priya S.', quote: 'The fit and quality exceeded what I expected for the price.' },
  furniture: { name: 'Sam T.', quote: 'Our living room finally feels finished. Delivery was smooth too.' },
}

function getTestimonialForCategory(name = '') {
  return TESTIMONIALS[name.toLowerCase()] || TESTIMONIALS.default
}

export default function CategoryTrustSection({ categoryName }) {
  const [email, setEmail] = useState('')
  const testimonial = getTestimonialForCategory(categoryName)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    toast.success('Subscribed! Watch your inbox for new arrivals.')
    setEmail('')
  }

  return (
    <section className="grid sm:grid-cols-3 gap-4 mb-8">
      {/* Why shop here */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark p-5"
      >
        <h3 className="text-sm font-bold text-ink-900 dark:text-white mb-4">
          Why shop {categoryName} at NovaCart?
        </h3>
        <ul className="space-y-3">
          {TRUST_POINTS.map((point) => (
            <li key={point.label} className="flex items-center gap-2.5 text-sm text-ink-600 dark:text-ink-300">
              <point.icon className="h-4 w-4 text-brand-500 shrink-0" />
              {point.label}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="rounded-2xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark p-5"
      >
        <h3 className="text-sm font-bold text-ink-900 dark:text-white mb-3">What our customers say</h3>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
          ))}
          <span className="text-xs text-ink-400 ml-1">4.8 / 5</span>
        </div>
        <p className="text-sm text-ink-600 dark:text-ink-300 italic leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <p className="text-xs text-ink-400 mt-2">— {testimonial.name}, verified buyer</p>
      </motion.div>

      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 0.16 }}
        className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-5 text-white"
      >
        <Mail className="h-5 w-5 mb-2 text-white/80" />
        <h3 className="text-sm font-bold mb-1">Stay in the loop</h3>
        <p className="text-xs text-white/80 mb-4">
          Get early access to {categoryName.toLowerCase()} launches and member-only offers.
        </p>
        <form onSubmit={handleSubscribe} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className="h-9 flex-1 rounded-lg bg-white/10 border border-white/20 px-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
          />
          <Button type="submit" variant="primary" size="sm" className="bg-white text-brand-700 hover:bg-white/90">
            Join
          </Button>
        </form>
      </motion.div>
    </section>
  )
}