import InfoPage from './InfoPage'

export default function ShippingInfoPage() {
  return (
    <InfoPage
      title="Shipping Information"
      intro="Everything you need to know about how and when your order arrives."
      sections={[
        {
          heading: 'Delivery times',
          list: [
            'Metro cities: 2\u20134 business days',
            'Other cities & towns: 4\u20137 business days',
            'Remote areas: 7\u201310 business days',
          ],
        },
        {
          heading: 'Shipping charges',
          body: 'Shipping is free on orders above \u20b9499. Orders below that threshold carry a flat \u20b949 shipping fee, calculated automatically at checkout.',
        },
        {
          heading: 'Order tracking',
          body: 'Once your order ships, you can track its status anytime from your Order History page.',
        },
      ]}
    />
  )
}