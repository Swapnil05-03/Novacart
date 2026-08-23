import InfoPage from './InfoPage'
import { APP_NAME } from '@/constants'

export default function CareersPage() {
  return (
    <InfoPage
      title="Careers"
      intro={`We're a small team building ${APP_NAME} for people who care about the details. We're not actively hiring right now, but we're always happy to hear from people who love building great products.`}
      sections={[
        {
          heading: 'How we work',
          list: [
            'Small, focused team — everyone owns outcomes, not just tasks.',
            'Remote-friendly, async by default.',
            'We ship fast and iterate in the open.',
          ],
        },
        {
          heading: 'Get in touch',
          body: 'If you\u2019d like to introduce yourself for future openings, reach out through our Contact page and mention the role you\u2019re interested in — we keep every message on file.',
        },
      ]}
    />
  )
}