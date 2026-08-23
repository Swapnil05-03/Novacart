import { useState, useEffect } from 'react'
import Modal from '@/components/ui/Modal'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { ORDER_STATUS, ORDER_STATUS_LABELS } from '@/constants'
import { PAYMENT_METHODS } from '@/services/paymentService'

const STATUS_OPTIONS = [
  { value: '', label: 'Any status' },
  ...Object.values(ORDER_STATUS).map((s) => ({ value: s, label: ORDER_STATUS_LABELS[s] })),
]

const PAYMENT_OPTIONS = [{ value: '', label: 'Any payment method' }, ...PAYMENT_METHODS.map((m) => ({ value: m.id, label: m.label }))]

export const EMPTY_FILTERS = {
  dateFrom: '',
  dateTo: '',
  status: '',
  paymentMethod: '',
  minPrice: '',
  maxPrice: '',
}

export default function FilterModal({ isOpen, onClose, filters, onApply }) {
  const [draft, setDraft] = useState(filters)

  useEffect(() => {
    if (isOpen) setDraft(filters)
  }, [isOpen, filters])

  const update = (key, value) => setDraft((prev) => ({ ...prev, [key]: value }))

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Filter orders"
      size="md"
      footer={
        <>
          <Button
            variant="ghost"
            onClick={() => {
              setDraft(EMPTY_FILTERS)
              onApply(EMPTY_FILTERS)
              onClose()
            }}
          >
            Clear filters
          </Button>
          <Button
            variant="brand"
            onClick={() => {
              onApply(draft)
              onClose()
            }}
          >
            Apply filters
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <p className="mb-1.5 text-sm font-medium text-ink-700 dark:text-ink-300">Date range</p>
          <div className="grid grid-cols-2 gap-3">
            <Input type="date" aria-label="From date" value={draft.dateFrom} onChange={(e) => update('dateFrom', e.target.value)} />
            <Input type="date" aria-label="To date" value={draft.dateTo} onChange={(e) => update('dateTo', e.target.value)} />
          </div>
        </div>

        <Select
          label="Order status"
          options={STATUS_OPTIONS}
          value={draft.status}
          onChange={(e) => update('status', e.target.value)}
        />

        <Select
          label="Payment method"
          options={PAYMENT_OPTIONS}
          value={draft.paymentMethod}
          onChange={(e) => update('paymentMethod', e.target.value)}
        />

        <div>
          <p className="mb-1.5 text-sm font-medium text-ink-700 dark:text-ink-300">Price range (₹)</p>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              min="0"
              placeholder="Min"
              value={draft.minPrice}
              onChange={(e) => update('minPrice', e.target.value)}
            />
            <Input
              type="number"
              min="0"
              placeholder="Max"
              value={draft.maxPrice}
              onChange={(e) => update('maxPrice', e.target.value)}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}