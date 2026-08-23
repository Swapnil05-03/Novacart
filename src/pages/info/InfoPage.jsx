export default function InfoPage({ title, intro, sections = [], lastUpdated }) {
  return (
    <div className="container-page py-14 max-w-3xl">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
        {title}
      </h1>
      {lastUpdated && (
        <p className="mt-2 text-xs text-ink-400">Last updated: {lastUpdated}</p>
      )}
      {intro && (
        <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{intro}</p>
      )}

      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-lg font-semibold text-ink-900 dark:text-white">
              {section.heading}
            </h2>
            {section.body && (
              <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300 whitespace-pre-line">
                {section.body}
              </p>
            )}
            {section.list && (
              <ul className="mt-2 space-y-1.5 text-sm text-ink-600 dark:text-ink-300 list-disc pl-5">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}