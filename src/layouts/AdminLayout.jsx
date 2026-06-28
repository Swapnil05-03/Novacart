import { Outlet } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import AdminSidebar from '@/components/layout/AdminSidebar'
import AdminMobileNav from '@/components/layout/AdminMobileNav'

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AdminMobileNav />
      <div className="flex flex-1">
        <AdminSidebar />
        <div className="flex-1 min-w-0">
          <div className="container-page py-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
