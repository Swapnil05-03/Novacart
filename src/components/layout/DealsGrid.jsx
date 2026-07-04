import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Truck,
  Sofa,
  Briefcase,
  Headphones,
  ArrowRight,
} from 'lucide-react'
import { ROUTES } from '@/constants'
import { productService } from '@/services/productService'
import acImg from '@/assets/images/deals/Air Conditioners.jpg'
import refrigeratorsImg from '@/assets/images/deals/Refrigerator.jpg'
import microwavesImg from '@/assets/images/deals/Microwave.jpg'
import washingMachinesImg from '@/assets/images/deals/Washing Machines.webp'
import cushionCoversImg from '@/assets/images/deals/Cushion Covers.jpg'
import figurinesVasesImg from '@/assets/images/deals/Figurines Vases.jpg'
import homeStorageImg from '@/assets/images/deals/Home Storage.webp'
import lightingSolutionsImg from '@/assets/images/deals/Lighting Solutions.jpg'
import cleaningSuppliesImg from '@/assets/images/deals/Cleaning Supplies.jpg'
import bathroomEssentialsImg from '@/assets/images/deals/Bathroom Essentials.webp'
import homeToolsImg from '@/assets/images/deals/Home Tools.jpg'
import officeSuppliesImg from '@/assets/images/deals/Office Supplies.jpg'
import wirelessEarbudsImg from '@/assets/images/deals/Wireless Earbuds.jpg'
import overEarHeadphonesImg from '@/assets/images/deals/OverEar Headphones.jpg'
import neckbandAudioImg from '@/assets/images/deals/Neckband Audio.webp'
import trueWirelessImg from '@/assets/images/deals/True Wireless.jpg'

// Static promo content — purely visual deal tiles. Each item/card is tagged
// with the real category NAME it belongs to (matching the `categories`
// table), which we resolve to an actual category id at render time. Prices
// shown ("From ₹X") are decorative starting-price hints, not live DB values
// — same spirit as the rest of this static promo content.
const DEALS = [
  {
    title: 'Appliances for your home',
    subtitle: 'Up to 55% off',
    cta: 'Shop now',
    icon: Truck,
    categoryName: 'Appliances',
    items: [
      { label: 'Air conditioners', price: '₹24,999', image: acImg },
      { label: 'Refrigerators', price: '₹18,999', image: refrigeratorsImg },
      { label: 'Microwaves', price: '₹6,499', image: microwavesImg },
      { label: 'Washing machines', price: '₹14,999', image: washingMachinesImg },
    ],
  },
  {
    title: 'Revamp your home in style',
    subtitle: 'New collection',
    cta: 'Explore all',
    icon: Sofa,
    categoryName: 'Home & Living',
    items: [
      { label: 'Cushion covers & more', price: '₹399', image: cushionCoversImg },
      { label: 'Figurines & vases', price: '₹599', image: figurinesVasesImg },
      { label: 'Home storage', price: '₹1,999', image: homeStorageImg },
      { label: 'Lighting solutions', price: '₹799', image: lightingSolutionsImg },
    ],
  },
  {
    title: 'Starting at ₹199',
    subtitle: 'Deals on home essentials',
    cta: 'See all',
    icon: Briefcase,
    categoryName: 'Food & Household',
    items: [
      { label: 'Cleaning supplies', price: '₹199', image: cleaningSuppliesImg },
      { label: 'Bathroom essentials', price: '₹499', image: bathroomEssentialsImg, categoryName: 'Home & Living' },
      { label: 'Home tools', price: '₹349', image: homeToolsImg, categoryName: 'Appliances' },
      { label: 'Office supplies', price: '₹249', image: officeSuppliesImg, categoryName: 'Office' },
    ],
  },
  {
    title: 'Up to 75% off',
    subtitle: 'Deals on headphones',
    cta: 'View deals',
    icon: Headphones,
    categoryName: 'Electronics',
    items: [
      { label: 'Wireless earbuds', price: '₹1,499', image: wirelessEarbudsImg },
      { label: 'Over-ear headphones', price: '₹2,999', image: overEarHeadphonesImg },
      { label: 'Neckband audio', price: '₹899', image: neckbandAudioImg },
      { label: 'True wireless', price: '₹1,299', image: trueWirelessImg },
    ],
  },
]

export default function DealsGrid() {
  // categoryName (lowercased) -> real category id, resolved once on mount.
  const [categoryMap, setCategoryMap] = useState({})

  useEffect(() => {
    productService
      .getCategories()
      .then((cats) => {
        const map = {}
        cats.forEach((c) => {
          map[c.name.toLowerCase()] = c.id
        })
        setCategoryMap(map)
      })
      .catch(console.error)
  }, [])

  // Resolves a tile/card to a real category link. Falls back to a loose
  // text search only if categories haven't loaded yet or no category name
  // matches — so the link is never completely dead, but the common case
  // (matching category found) always links by id, avoiding the old
  // "search term matches nothing" failure mode.
  function hrefFor(categoryName, fallbackLabel) {
    const id = categoryMap[categoryName?.toLowerCase()]
    if (id) return `${ROUTES.PRODUCTS}?category=${id}`
    return `${ROUTES.PRODUCTS}?search=${encodeURIComponent(fallbackLabel)}`
  }

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
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500/15">
                <deal.icon className="h-5 w-5 text-brand-500 dark:text-brand-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-ink-900 dark:text-white leading-snug">
                  {deal.title}
                </h3>
                <p className="text-xs text-ink-500 dark:text-ink-400">{deal.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {deal.items.map((item) => (
                <Link
                  key={item.label}
                  to={hrefFor(item.categoryName || deal.categoryName, item.label)}
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
                  <p className="text-[11px] text-ink-500 dark:text-ink-400">From {item.price}</p>
                </Link>
              ))}
            </div>

            <Link
              to={hrefFor(deal.categoryName, deal.title)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-brand-500/30 bg-brand-500/10 py-2.5 text-sm font-semibold text-brand-600 dark:text-brand-400 transition-colors hover:bg-brand-500/20"
            >
              {deal.cta}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}