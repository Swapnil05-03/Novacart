import InfoPage from './InfoPage'
import { APP_NAME } from '@/constants'

export default function AboutPage() {
  return (
    <InfoPage
      title={`About ${APP_NAME}`}
      intro="We started NovaCart with a simple idea: online shopping should feel effortless, honest, and fast — no clutter, no dark patterns, just products you actually want, found quickly and delivered reliably."
      sections={[
        {
          heading: 'What we do',
          body: `${APP_NAME} is a curated marketplace spanning electronics, fashion, home & living, beauty, appliances, books, and more. Every category is organized around real buying decisions, not just endless scrolling.`,
        },
        {
          heading: 'What we care about',
          list: [
            'Speed — a storefront that feels instant, on any device.',
            'Trust — transparent pricing, secure checkout, and honest reviews.',
            'Details — thoughtful design in every corner of the experience.',
          ],
        },
        {
          heading: 'Where we\u2019re headed',
          body: 'We\u2019re a small, product-obsessed team building in the open. New categories, better recommendations, and a faster checkout are always in the works.',
        },
      ]}
    />
  )
}