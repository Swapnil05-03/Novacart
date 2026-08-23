import InfoPage from './InfoPage'
import { APP_NAME } from '@/constants'

export default function TermsPage() {
  return (
    <InfoPage
      title="Terms & Conditions"
      lastUpdated="August 2026"
      intro={`These terms govern your use of ${APP_NAME}. By creating an account or placing an order, you agree to them.`}
      sections={[
        {
          heading: 'Using our platform',
          body: `You must be able to form a legally binding contract to use ${APP_NAME}. You're responsible for keeping your account credentials secure and for all activity under your account.`,
        },
        {
          heading: 'Orders & pricing',
          body: 'Prices are shown in INR and include applicable taxes unless stated otherwise. We reserve the right to cancel orders placed at an incorrectly displayed price due to a technical error.',
        },
        {
          heading: 'Cancellations',
          body: 'Orders can be cancelled before they\u2019re shipped from the Order History page. Once an order ships, please refer to our Returns & Refunds policy.',
        },
        {
          heading: 'Limitation of liability',
          body: `${APP_NAME} is provided "as is". We aren't liable for indirect or incidental damages arising from use of the platform, to the extent permitted by law.`,
        },
        {
          heading: 'Changes to these terms',
          body: 'We may update these terms from time to time. Continued use of the platform after changes means you accept the revised terms.',
        },
      ]}
    />
  )
}