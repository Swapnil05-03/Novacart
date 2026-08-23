import { Link } from 'react-router-dom'
import InfoPage from './InfoPage'
import { ROUTES } from '@/constants'

export default function ReturnsRefundsPage() {
  return (
    <>
      <InfoPage
        title="Returns & Refunds"
        intro="Not the right fit? Most items are eligible for a hassle-free return within 14 days of delivery."
        sections={[
          {
            heading: 'How to return an item',
            body: 'Go to Order History, select the delivered order, and choose "Return item". Pick a reason, and we\u2019ll arrange a pickup — no need to print anything.',
          },
          {
            heading: 'Refund timeline',
            body: 'Once we receive and inspect the item, refunds are issued to your original payment method within 5\u20137 business days.',
          },
          {
            heading: 'What can\u2019t be returned',
            list: [
              'Personal care and hygiene items once opened',
              'Items marked "Final Sale" at checkout',
              'Products returned without original packaging',
            ],
          },
        ]}
      />
      <div className="container-page -mt-8 pb-14 max-w-3xl">
        <Link to={ROUTES.ORDERS} className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline">
          Go to my orders &rarr;
        </Link>
      </div>
    </>
  )
}