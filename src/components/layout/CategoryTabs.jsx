import {
  Sparkles,
  Headphones,
  Shirt,
  Home,
  Dumbbell,
  BookOpen,
  Gamepad2,
  Car,
  Smartphone,
  Droplet,
  Refrigerator,
  Utensils,
  Bike,
  Sofa,
  LayoutGrid,
} from 'lucide-react'
import { classNames } from '@/utils/helpers'

// Same icon-mapping convention as before, extended to cover the full
// 14-tab category set. Falls back to a generic icon for any category name
// not listed here, so adding new categories in Supabase never breaks the UI.
const ICON_MAP = {
  electronics: Headphones,
  apparel: Shirt,
  fashion: Shirt,
  mobiles: Smartphone,
  beauty: Droplet,
  'home & living': Home,
  'home-living': Home,
  'home & kitchen': Home,
  home: Home,
  appliances: Refrigerator,
  accessories: Sparkles,
  'beauty & personal care': Droplet,
  fitness: Dumbbell,
  'sports & outdoors': Dumbbell,
  office: BookOpen,
  'books & stationery': BookOpen,
  'toys & games': Gamepad2,
  'food & household': Utensils,
  'auto accessories': Car,
  automotive: Car,
  'two wheelers': Bike,
  furniture: Sofa,
}

function getIconForCategory(name = '') {
  return ICON_MAP[name.toLowerCase()] || LayoutGrid
}

export default function CategoryTabs({ categories = [], activeCategoryId, onSelectCategory }) {
  return (
    <nav className="sticky top-16 z-30 w-full bg-surface dark:bg-surface-dark border-b border-ink-200 dark:border-ink-800">
      <div className="container-page">
        <div className="flex items-center gap-6 overflow-x-auto pb-px">
          <Tab
            icon={Sparkles}
            label="For You"
            active={!activeCategoryId}
            onClick={() => onSelectCategory(null)}
          />
          {categories.map((cat) => (
            <Tab
              key={cat.id}
              icon={getIconForCategory(cat.name)}
              label={cat.name}
              active={activeCategoryId === cat.id}
              onClick={() => onSelectCategory(cat.id)}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}

function Tab({ icon: Icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'true' : undefined}
      className={classNames(
        'group flex flex-col items-center gap-1.5 shrink-0 pt-3 pb-2.5 border-b-2 transition-colors',
        active ? 'border-brand-500' : 'border-transparent'
      )}
    >
      <div
        className={classNames(
          'flex h-9 w-9 items-center justify-center rounded-xl transition-colors',
          active
            ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400'
            : 'bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400 group-hover:text-ink-700 dark:group-hover:text-ink-200'
        )}
      >
        <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
      </div>
      <span
        className={classNames(
          'text-xs font-medium whitespace-nowrap',
          active ? 'text-ink-900 dark:text-white' : 'text-ink-500 dark:text-ink-400'
        )}
      >
        {label}
      </span>
    </button>
  )
}