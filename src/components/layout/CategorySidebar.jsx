import { Link } from 'react-router-dom'
import {
  LayoutGrid,
  Headphones,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
  BookOpen,
  Gamepad2,
  Car,
  ChevronRight,
} from 'lucide-react'
import { ROUTES } from '@/constants'

// Maps a category name to an icon + approximate item-count label.
// Falls back to a generic icon for categories not in this list, so adding
// new categories in Supabase never breaks the UI.
const ICON_MAP = {
  electronics: Headphones,
  apparel: Shirt,
  fashion: Shirt,
  'home & living': Home,
  'home-living': Home,
  'home & kitchen': Home,
  accessories: Sparkles,
  'beauty & personal care': Sparkles,
  fitness: Dumbbell,
  'sports & outdoors': Dumbbell,
  office: BookOpen,
  'books & stationery': BookOpen,
  'toys & games': Gamepad2,
  automotive: Car,
}

function getIconForCategory(name = '') {
  return ICON_MAP[name.toLowerCase()] || LayoutGrid
}

export default function CategorySidebar({ categories = [] }) {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 rounded-2xl border border-ink-800 bg-ink-900/60 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3.5 border-b border-ink-800">
        <LayoutGrid className="h-4 w-4 text-brand-400" />
        <span className="text-sm font-semibold text-white">All Categories</span>
      </div>

      <nav className="flex-1 py-1.5">
        {categories.slice(0, 9).map((cat) => {
          const Icon = getIconForCategory(cat.name)
          return (
            <Link
              key={cat.id}
              to={`${ROUTES.PRODUCTS}?category=${cat.id}`}
              className="group flex items-center gap-3 px-4 py-2.5 text-sm text-ink-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Icon className="h-4 w-4 text-ink-500 group-hover:text-brand-400 transition-colors shrink-0" />
              <span className="flex-1 truncate">{cat.name}</span>
              <ChevronRight className="h-3.5 w-3.5 text-ink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          )
        })}
      </nav>

      <Link
        to={ROUTES.PRODUCTS}
        className="border-t border-ink-800 px-4 py-3 text-center text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors"
      >
        View All
      </Link>
    </aside>
  )
}