import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Mail, Phone, MapPin } from 'lucide-react'
import { contactService } from '@/services/contactService'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      await contactService.sendMessage(values)
      toast.success('Message sent — we\u2019ll get back to you within 24 hours.')
      reset()
    } catch {
      toast.error('Couldn\u2019t send your message right now. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container-page py-14">
      <div className="grid md:grid-cols-5 gap-10 max-w-4xl mx-auto">
        <div className="md:col-span-2">
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
            Contact Us
          </h1>
          <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">
            Have a question about an order, a product, or anything else? Send us a message.
          </p>

          <div className="mt-8 space-y-4 text-sm text-ink-600 dark:text-ink-300">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-brand-500 shrink-0" />
              <span>support@novacart.example</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-brand-500 shrink-0" />
              <span>+91 1800-123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-brand-500 shrink-0" />
              <span>Prayagraj, Uttar Pradesh, India</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-3 space-y-4">
          <Input
            label="Your name"
            required
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
          />
          <Input
            label="Email"
            type="email"
            required
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
            })}
            error={errors.email?.message}
          />
          <Input label="Subject" {...register('subject')} />
          <Textarea
            label="Message"
            rows={5}
            required
            {...register('message', { required: 'Please add a message' })}
            error={errors.message?.message}
          />
          <Button type="submit" variant="brand" isLoading={submitting} className="w-full sm:w-auto">
            Send message
          </Button>
        </form>
      </div>
    </div>
  )
}