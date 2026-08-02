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

// Same icon-mapping convention used elsewhere — falls back to a generic
// grid icon for any tile label we don't have a specific icon for.
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

// Maps a tileGroups label ('Men' / 'Women') to the gender value stored on
// products, so a click can filter by the real DB column.
function labelToGender(label = '') {
  const lower = label.toLowerCase()
  if (lower === 'men') return 'men'
  if (lower === 'women') return 'women'
  return null
}

export default function SubcategoryRow({ category, activeSubcategory, onSelectSubcategory, activeGender, onSelectGender }) {
  if (!category) return null

  // Full curated tile list for this category — this is the same
  // "shopByCategory" data already used for the homepage carousels and the
  // /products banner, so what you see here always matches what's been
  // designed for the category, not just whatever happens to have real
  // stock today. Clicking a tile still filters against the real
  // `subcategory` column on products, so results are accurate even if a
  // given tile currently has zero matching products.
  const definition = getDefinitionForCategory(category.name)
  const hasGenderTabs = Array.isArray(definition.tileGroups) && definition.tileGroups.length > 0

  const activeGroup = hasGenderTabs
    ? definition.tileGroups.find((g) => labelToGender(g.label) === activeGender)
    : null

  const tiles = activeGroup ? activeGroup.tiles : definition.tiles || []

  return (
    <div className="container-page mb-6">
      {hasGenderTabs && (
        <div className="flex items-center gap-2 mb-3">
          {definition.tileGroups.map((group) => {
            const genderValue = labelToGender(group.label)
            const active = activeGender === genderValue
            return (
              <button
                key={group.label}
                type="button"
                onClick={() => onSelectGender(active ? null : genderValue)}
                className={classNames(
                  'rounded-full px-4 py-1.5 text-sm font-medium border transition-colors',
                  active
                    ? 'border-brand-400 bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-300'
                    : 'border-ink-200 dark:border-ink-800 text-ink-600 dark:text-ink-300'
                )}
              >
                {group.label}
              </button>
            )
          })}
        </div>
      )}

      <div className="flex items-center gap-3 overflow-x-auto pb-1" style={{ overscrollBehaviorX: 'contain', overscrollBehaviorY: 'contain' }}>
        {tiles.map((label) => {
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