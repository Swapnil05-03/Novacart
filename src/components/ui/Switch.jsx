import { classNames } from '@/utils/helpers'

export default function Switch({ checked, onChange, label, id }) {
  return (
    <label htmlFor={id} className="inline-flex items-center gap-3 cursor-pointer select-none">
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        type="button"
        onClick={() => onChange(!checked)}
        className={classNames(
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200',
          checked ? 'bg-brand-500' : 'bg-ink-300 dark:bg-ink-700'
        )}
      >
        <span
          className={classNames(
            'inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200',
            checked ? 'translate-x-[22px]' : 'translate-x-0.5'
          )}
        />
      </button>
      {label && <span className="text-sm font-medium text-ink-700 dark:text-ink-300">{label}</span>}
    </label>
  )
}
