import { Outlet } from 'react-router-dom'
import ProfileSidebar from '@/components/layout/ProfileSidebar'

export default function ProfileLayout() {
  return (
    <div className="container-page py-8">
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white mb-6">
        My Account
      </h1>
      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        <ProfileSidebar />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
