import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  Camera,
  Pencil,
  Trash2,
  Plus,
  Package,
  Heart,
  MapPin,
  ShoppingCart,
  Mail,
  MessageSquare,
  Settings as SettingsIcon,
  ShoppingBag,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { profileService } from '@/services/profileService'
import { orderService } from '@/services/orderService'
import { getAddresses, saveAddresses, getCommPrefs, saveCommPrefs } from '@/utils/localProfileData'
import { formatCurrency, formatDate } from '@/utils/helpers'
import { ROUTES } from '@/constants'
import Avatar from '@/components/ui/Avatar'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Switch from '@/components/ui/Switch'
import EmptyState from '@/components/ui/EmptyState'
import OrderStatusBadge from '@/components/admin/OrderStatusBadge'
import AddressFormModal from '@/components/profile/AddressFormModal'

function StatCard({ icon, iconClass, label, value, actionLabel, to }) {
  return (
    <Card className="flex items-center gap-4">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>{icon}</div>
      <div>
        <p className="text-sm text-ink-500 dark:text-ink-400">{label}</p>
        <p className="text-xl font-bold text-ink-900 dark:text-white">{value}</p>
        {to && (
          <Link to={to} className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline">
            {actionLabel} →
          </Link>
        )}
      </div>
    </Card>
  )
}

function QuickAction({ icon, iconClass, title, subtitle, to }) {
  return (
    <Link
      to={to}
      className="flex items-start gap-3 rounded-xl border border-ink-200 dark:border-ink-800 p-4 transition-colors hover:bg-ink-50 dark:hover:bg-ink-800/60"
    >
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClass}`}>{icon}</div>
      <div>
        <p className="text-sm font-semibold text-ink-900 dark:text-white">{title}</p>
        <p className="text-xs text-ink-500 dark:text-ink-400">{subtitle}</p>
      </div>
    </Link>
  )
}

export default function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth()
  const { itemCount } = useCart()
  const { items: wishlistItems } = useWishlist()

  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editingInfo, setEditingInfo] = useState(false)

  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)

  const [addresses, setAddresses] = useState(() => getAddresses(user?.id))
  const [addressModalOpen, setAddressModalOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)

  const [prefs, setPrefs] = useState(() => getCommPrefs(user?.id))

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: profile?.full_name || '',
      phone: profile?.phone || '',
    },
  })

  useEffect(() => {
    reset({ fullName: profile?.full_name || '', phone: profile?.phone || '' })
  }, [profile, reset])

  useEffect(() => {
    if (!user?.id) return
    orderService
      .getUserOrders(user.id)
      .then(setOrders)
      .catch(console.error)
      .finally(() => setOrdersLoading(false))
  }, [user?.id])

  useEffect(() => {
    setAddresses(getAddresses(user?.id))
    setPrefs(getCommPrefs(user?.id))
  }, [user?.id])

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      await profileService.uploadAvatar(user.id, file)
      await refreshProfile()
      toast.success('Profile photo updated')
    } catch (err) {
      toast.error('Could not upload photo')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (values) => {
    setSaving(true)
    try {
      await profileService.updateProfile(user.id, {
        full_name: values.fullName,
        phone: values.phone,
      })
      await refreshProfile()
      toast.success('Profile updated')
      setEditingInfo(false)
    } catch (err) {
      toast.error('Could not update profile')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const { completion, missing } = useMemo(() => {
    const checks = [
      { done: !!profile?.full_name, label: 'name' },
      { done: !!profile?.phone, label: 'phone number' },
      { done: !!profile?.avatar_url, label: 'profile photo' },
      { done: addresses.length > 0, label: 'address' },
    ]
    const done = checks.filter((c) => c.done).length
    const missingLabels = checks.filter((c) => !c.done).map((c) => c.label)
    return {
      completion: Math.round((done / checks.length) * 100),
      missing: missingLabels,
    }
  }, [profile, addresses])

  const upsertAddress = (values) => {
    let next
    if (editingAddress?.id) {
      next = addresses.map((a) => (a.id === editingAddress.id ? { ...values, id: a.id } : a))
    } else {
      next = [...addresses, { ...values, id: `addr-${Date.now()}` }]
    }
    setAddresses(next)
    saveAddresses(user.id, next)
    toast.success(editingAddress?.id ? 'Address updated' : 'Address added')
    setEditingAddress(null)
  }

  const removeAddress = (id) => {
    const next = addresses.filter((a) => a.id !== id)
    setAddresses(next)
    saveAddresses(user.id, next)
    toast.success('Address removed')
  }

  const updatePref = (key, value) => {
    const next = { ...prefs, [key]: value }
    setPrefs(next)
    saveCommPrefs(user.id, next)
  }

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : null

  const recentOrders = orders.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar src={profile?.avatar_url} name={profile?.full_name || user.email} size="xl" />
              <label className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 dark:bg-white text-white dark:text-ink-900 cursor-pointer shadow-soft">
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} disabled={uploading} />
                <Camera className="h-3.5 w-3.5" />
              </label>
            </div>
            <div>
              <p className="text-lg font-semibold text-ink-900 dark:text-white">{profile?.full_name || 'Add your name'}</p>
              <p className="text-sm text-ink-500 dark:text-ink-400">{user.email}</p>
              {memberSince && <p className="text-xs text-ink-400 mt-1">Member since {memberSince}</p>}
            </div>
          </div>

          <div className="sm:w-64">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm text-ink-500 dark:text-ink-400">Profile completion</p>
              <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">{completion}% Complete</p>
            </div>
            <div className="h-2 w-full rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
              <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${completion}%` }} />
            </div>
            {missing.length > 0 && (
              <p className="mt-1.5 text-xs text-ink-400">
                Add {missing.join(' and ')} to complete your profile
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Package className="h-5 w-5 text-brand-600 dark:text-brand-300" />}
          iconClass="bg-brand-50 dark:bg-brand-900/30"
          label="Orders"
          value={orders.length}
          actionLabel="View all orders"
          to={ROUTES.ORDERS}
        />
        <StatCard
          icon={<Heart className="h-5 w-5 text-danger-500" />}
          iconClass="bg-danger-50 dark:bg-danger-500/10"
          label="Wishlist"
          value={wishlistItems.length}
          actionLabel="View wishlist"
          to={ROUTES.WISHLIST}
        />
        <StatCard
          icon={<MapPin className="h-5 w-5 text-success-600 dark:text-success-500" />}
          iconClass="bg-success-50 dark:bg-success-500/10"
          label="Saved Addresses"
          value={addresses.length}
          actionLabel="Manage addresses"
          to="#addresses"
        />
        <StatCard
          icon={<ShoppingCart className="h-5 w-5 text-amber-600 dark:text-amber-400" />}
          iconClass="bg-amber-50 dark:bg-amber-500/10"
          label="Cart Items"
          value={itemCount}
          actionLabel="View cart"
          to={ROUTES.CART}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personal information */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-ink-900 dark:text-white">Personal Information</h2>
            {!editingInfo && (
              <Button variant="outline" size="sm" leftIcon={<Pencil className="h-3.5 w-3.5" />} onClick={() => setEditingInfo(true)}>
                Edit
              </Button>
            )}
          </div>

          {editingInfo ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Full name"
                required
                {...register('fullName', { required: 'Full name is required' })}
                error={errors.fullName?.message}
              />
              <Input label="Phone number" {...register('phone')} placeholder="+91 98765 43210" />
              <Input label="Email" value={user.email} disabled hint="Contact support to change your email" />
              <div className="flex gap-3">
                <Button type="submit" variant="brand" isLoading={saving}>
                  Save changes
                </Button>
                <Button type="button" variant="ghost" onClick={() => setEditingInfo(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-ink-500 dark:text-ink-400">Full name</span>
                <span className="font-medium text-ink-900 dark:text-white text-right">{profile?.full_name || '—'}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-ink-500 dark:text-ink-400">Phone number</span>
                <span className="font-medium text-ink-900 dark:text-white text-right">{profile?.phone || '—'}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-ink-500 dark:text-ink-400">Email</span>
                <span className="font-medium text-ink-900 dark:text-white text-right">{user.email}</span>
              </div>
            </div>
          )}
        </Card>

        {/* Saved addresses */}
        <Card id="addresses">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-ink-900 dark:text-white">Saved Addresses</h2>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Plus className="h-3.5 w-3.5" />}
              onClick={() => {
                setEditingAddress(null)
                setAddressModalOpen(true)
              }}
            >
              Add New Address
            </Button>
          </div>

          {addresses.length === 0 ? (
            <p className="text-sm text-ink-500 dark:text-ink-400">
              You haven&apos;t saved any addresses yet. Add one to speed up checkout.
            </p>
          ) : (
            <div className="space-y-3">
              {addresses.map((addr, idx) => (
                <div
                  key={addr.id}
                  className="rounded-xl border border-ink-200 dark:border-ink-800 bg-ink-50 dark:bg-ink-900/40 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      {idx === 0 && (
                        <Badge variant="brand" className="mb-2">
                          Default
                        </Badge>
                      )}
                      <p className="text-sm font-semibold text-ink-900 dark:text-white">{addr.label}</p>
                      <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">
                        {addr.line1}, {addr.city}, {addr.state}, {addr.postalCode}
                        <br />
                        {addr.country}
                      </p>
                      {addr.phone && <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">{addr.phone}</p>}
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setEditingAddress(addr)
                          setAddressModalOpen(true)
                        }}
                        className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700 dark:hover:bg-ink-800 dark:hover:text-ink-200"
                        aria-label="Edit address"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeAddress(addr.id)}
                        className="rounded-lg p-1.5 text-ink-400 hover:bg-danger-50 hover:text-danger-600 dark:hover:bg-danger-500/10"
                        aria-label="Delete address"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-ink-900 dark:text-white">Recent Orders</h2>
            <Link to={ROUTES.ORDERS} className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline">
              View all orders →
            </Link>
          </div>

          {ordersLoading ? (
            <p className="text-sm text-ink-400">Loading orders…</p>
          ) : recentOrders.length === 0 ? (
            <EmptyState
              icon={ShoppingBag}
              title="No orders yet"
              description="Your recent orders will appear here."
              action={
                <Link to={ROUTES.PRODUCTS}>
                  <Button variant="brand">Start shopping</Button>
                </Link>
              }
            />
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-ink-200 dark:border-ink-800 p-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-ink-900 dark:text-white">{order.order_number}</p>
                    <p className="text-xs text-ink-400">{formatDate(order.created_at)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="price-mono text-sm font-semibold text-ink-900 dark:text-white">
                      {formatCurrency(order.total)}
                    </span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Quick actions */}
        <Card>
          <h2 className="text-base font-semibold text-ink-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <QuickAction
              icon={<Package className="h-4.5 w-4.5 text-brand-600 dark:text-brand-300" />}
              iconClass="bg-brand-50 dark:bg-brand-900/30"
              title="View Orders"
              subtitle="Track & view your orders"
              to={ROUTES.ORDERS}
            />
            <QuickAction
              icon={<Heart className="h-4.5 w-4.5 text-danger-500" />}
              iconClass="bg-danger-50 dark:bg-danger-500/10"
              title="Wishlist"
              subtitle="View your favorite items"
              to={ROUTES.WISHLIST}
            />
            <QuickAction
              icon={<SettingsIcon className="h-4.5 w-4.5 text-success-600 dark:text-success-500" />}
              iconClass="bg-success-50 dark:bg-success-500/10"
              title="Account Settings"
              subtitle="Manage your account"
              to={ROUTES.SETTINGS}
            />
            <QuickAction
              icon={<MapPin className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400" />}
              iconClass="bg-amber-50 dark:bg-amber-500/10"
              title="Manage Addresses"
              subtitle="Add or edit addresses"
              to="#addresses"
            />
          </div>
        </Card>
      </div>

      {/* Communication preferences */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-ink-900 dark:text-white">Communication Preferences</h2>
            <p className="text-sm text-ink-500 dark:text-ink-400">Choose how we reach you</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/30">
                <Mail className="h-4.5 w-4.5 text-brand-600 dark:text-brand-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink-900 dark:text-white">Email Notifications</p>
                <p className="text-xs text-ink-500 dark:text-ink-400">Receive order updates and offers</p>
              </div>
              <Switch checked={prefs.email} onChange={(v) => updatePref('email', v)} id="email-notifications" />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success-50 dark:bg-success-500/10">
                <MessageSquare className="h-4.5 w-4.5 text-success-600 dark:text-success-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink-900 dark:text-white">SMS Notifications</p>
                <p className="text-xs text-ink-500 dark:text-ink-400">Receive order updates on SMS</p>
              </div>
              <Switch checked={prefs.sms} onChange={(v) => updatePref('sms', v)} id="sms-notifications" />
            </div>
          </div>
        </div>
      </Card>

      <AddressFormModal
        isOpen={addressModalOpen}
        onClose={() => {
          setAddressModalOpen(false)
          setEditingAddress(null)
        }}
        onSave={upsertAddress}
        initialValue={
          editingAddress || { label: '', line1: '', city: '', state: '', postalCode: '', country: '', phone: '' }
        }
      />
    </div>
  )
}