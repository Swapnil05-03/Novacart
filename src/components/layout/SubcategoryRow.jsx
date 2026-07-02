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
import { getDefinitionForCategory } from '@/data/categoryContent'
import { classNames } from '@/utils/helpers'

// Same icon-mapping convention used by CategoryTabs/CategoryShowcase, kept
// local here since sub-category tile names are more granular (e.g. "Skin
// Care" rather than "Beauty") and map to a slightly different icon set.
const ICON_MAP = {
  skincare: Droplet,
  'skin care': Droplet,
  makeup: Sparkles,
  haircare: Sparkles,
  'hair care': Sparkles,
  fragrance: Sparkles,
  "men's grooming": Shirt,
  wellness: Dumbbell,
  'bath & body': Droplet,
  'tools & brushes': LayoutGrid,
  't-shirts': Shirt,
  jeans: Shirt,
  'sports shoes': Dumbbell,
  watches: Sparkles,
  laptops: Headphones,
  headphones: Headphones,
  smartwatches: Smartphone,
  speakers: Headphones,
  cameras: Headphones,
  furniture: Sofa,
  appliances: Refrigerator,
  groceries: Utensils,
  automotive: Car,
  books: BookOpen,
  toys: Gamepad2,
  bikes: Bike,
  home: Home,
}

function getIconForTile(label = '') {
  return ICON_MAP[label.toLowerCase()] || LayoutGrid
}

export default function SubcategoryRow({ category, activeSubcategory, onSelectSubcategory }) {
  if (!category) return null

  const definition = getDefinitionForCategory(category.name)
  // First 9 sub-tiles, matching the density of the reference image's row.
  const subcategories = definition.tiles.slice(0, 9)

  return (
    <div className="container-page mb-6">
      <div className="flex items-center gap-3 overflow-x-auto pb-1" style={{ overscrollBehaviorX: 'contain', overscrollBehaviorY: 'contain' }}>
        {subcategories.map((label) => {
          const Icon = getIconForTile(label)
          const active = activeSubcategory === label
          return (
            <button
              key={label}
              type="button"
              onClick={() => onSelectSubcategory(active ? null : label)}
              className={classNames(
                'flex shrink-0 flex-col items-center gap-2 rounded-2xl border px-4 py-3 transition-colors min-w-[88px]',
                active
                  ? 'border-brand-400 bg-brand-50 dark:bg-brand-900/20'
                  : 'border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark hover:border-ink-300 dark:hover:border-ink-700'
              )}
            >
              <Icon
                className={classNames(
                  'h-5 w-5',
                  active ? 'text-brand-600 dark:text-brand-400' : 'text-ink-500 dark:text-ink-400'
                )}
                strokeWidth={1.75}
              />
              <span
                className={classNames(
                  'text-xs font-medium text-center leading-tight',
                  active ? 'text-brand-700 dark:text-brand-300' : 'text-ink-700 dark:text-ink-200'
                )}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}