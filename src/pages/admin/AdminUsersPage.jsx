import { useEffect, useState, useCallback } from 'react'
import { Users as UsersIcon } from 'lucide-react'
import { profileService } from '@/services/profileService'
import { useDebounce } from '@/hooks/useDebounce'
import { formatDate } from '@/utils/helpers'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import EmptyState from '@/components/ui/EmptyState'
import { TableRowSkeleton } from '@/components/ui/Skeleton'

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebounce(searchInput, 400)

  const loadUsers = useCallback(() => {
    setLoading(true)
    const request = debouncedSearch
      ? profileService.searchUsers(debouncedSearch)
      : profileService.getAllUsers({ perPage: 50 }).then((res) => res.data)

    request
      .then(setUsers)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [debouncedSearch])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white">
            Users
          </h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">{users.length} registered users</p>
        </div>
      </div>

      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search by name or email..."
        className="h-11 w-full max-w-sm rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-4 text-sm focus:border-brand-500 mb-6"
      />

      <div className="rounded-2xl border border-ink-200 dark:border-ink-800 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-200 dark:border-ink-800 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100 dark:divide-ink-800">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <TableRowSkeleton key={i} columns={4} />)
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <EmptyState icon={UsersIcon} title="No users found" description="Try a different search term." />
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-ink-50 dark:hover:bg-ink-900/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar src={user.avatar_url} name={user.full_name || user.email} size="sm" />
                      <span className="font-medium text-ink-900 dark:text-white">{user.full_name || 'Unnamed user'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-500 dark:text-ink-400">{user.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant={user.role === 'admin' ? 'brand' : 'default'}>{user.role || 'customer'}</Badge>
                  </td>
                  <td className="px-4 py-3 text-ink-500 dark:text-ink-400">{formatDate(user.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
