import InfoPage from './InfoPage'
import { APP_NAME } from '@/constants'

export default function PrivacyPage() {
  return (
    <InfoPage
      title="Privacy Policy"
      lastUpdated="August 2026"
      intro={`This explains what data ${APP_NAME} collects and how it's used.`}
      sections={[
        {
          heading: 'Information we collect',
          list: [
            'Account details — name, email, and password (encrypted).',
            'Order & shipping information you provide at checkout.',
            'Usage data — pages visited and products viewed, to improve recommendations.',
          ],
        },
        {
          heading: 'How we use it',
          body: 'We use your information to process orders, provide customer support, and — with your consent — send product updates and offers. We never sell your personal data to third parties.',
        },
        {
          heading: 'Your choices',
          body: 'You can update or delete your account information from Settings at any time, and unsubscribe from marketing emails using the link in any email we send.',
        },
        {
          heading: 'Contact us',
          body: 'Questions about this policy can be sent through our Contact page.',
        },
      ]}
    />
  )
}