import InfoPage from './InfoPage'
import { APP_NAME } from '@/constants'

export default function PressPage() {
  return (
    <InfoPage
      title="Press"
      intro={`Resources and contact details for journalists and media covering ${APP_NAME}.`}
      sections={[
        {
          heading: 'Media inquiries',
          body: 'For interviews, quotes, or product information, please reach out through our Contact page with "Press" in your message — we typically respond within two business days.',
        },
        {
          heading: 'Brand assets',
          body: `Logo files and brand guidelines are available on request. Please don't modify the ${APP_NAME} wordmark or logo without prior approval.`,
        },
      ]}
    />
  )
}