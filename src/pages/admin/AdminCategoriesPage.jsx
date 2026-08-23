import { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, Tags } from 'lucide-react'
import { productService } from '@/services/productService'
import { slugify } from '@/utils/helpers'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import EmptyState from '@/components/ui/EmptyState'
import { TableRowSkeleton } from '@/components/ui/Skeleton'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', slug: '', description: '' } })

  const load = useCallback(() => {
    setLoading(true)
    productService.getCategoriesWithCounts().then(setCategories).catch(console.error).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const openCreate = () => {
    setEditing(null)
    reset({ name: '', slug: '', description: '' })
    setModalOpen(true)
  }

  const openEdit = (category) => {
    setEditing(category)
    reset({ name: category.name, slug: category.slug, description: category.description || '' })
    setModalOpen(true)
  }

  const onNameChange = (e) => {
    if (!editing) setValue('slug', slugify(e.target.value))
  }

  const onSubmit = async (values) => {
    setSaving(true)
    try {
      if (editing) {
        await productService.updateCategory(editing.id, values)
        toast.success('Category updated')
      } else {
        await productService.createCategory(values)
        toast.success('Category created')
      }
      setModalOpen(false)
      load()
    } catch (err) {
      toast.error(err.message || 'Could not save category')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await productService.deleteCategory(deleteTarget.id)
      toast.success('Category deleted')
      setDeleteTarget(null)
      load()
    } catch (err) {
      toast.error(err.message || 'Could not delete category')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white">Categories</h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">{categories.length} categories</p>
        </div>
        <Button variant="brand" leftIcon={<Plus className="h-4 w-4" />} onClick={openCreate}>
          New Category
        </Button>
      </div>

      <div className="rounded-2xl border border-ink-200 dark:border-ink-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-200 dark:border-ink-800 bg-ink-50 dark:bg-ink-900/40 text-left text-xs uppercase tracking-wide text-ink-400">
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Slug</th>
              <th className="px-4 py-3 font-semibold">Products</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100 dark:divide-ink-800">
            {loading ? (
              [...Array(4)].map((_, i) => <TableRowSkeleton key={i} columns={4} />)
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <EmptyState
                    icon={Tags}
                    title="No categories yet"
                    description="Create your first category to start organizing products."
                    action={
                      <Button variant="brand" onClick={openCreate}>
                        New Category
                      </Button>
                    }
                  />
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-4 py-3.5 font-medium text-ink-900 dark:text-white">{category.name}</td>
                  <td className="px-4 py-3.5 text-ink-500 dark:text-ink-400">{category.slug}</td>
                  <td className="px-4 py-3.5 text-ink-500 dark:text-ink-400">{category.productCount}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => openEdit(category)}
                        className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700 dark:hover:bg-ink-800 dark:hover:text-ink-200"
                        aria-label="Edit category"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(category)}
                        className="rounded-lg p-1.5 text-ink-400 hover:bg-danger-50 hover:text-danger-600 dark:hover:bg-danger-500/10"
                        aria-label="Delete category"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit category' : 'New category'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="brand" type="submit" form="category-form" isLoading={saving}>
              {editing ? 'Save changes' : 'Create category'}
            </Button>
          </>
        }
      >
        <form id="category-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Name"
            required
            {...register('name', { required: 'Name is required', onChange: onNameChange })}
            error={errors.name?.message}
          />
          <Input label="Slug" required {...register('slug', { required: 'Slug is required' })} error={errors.slug?.message} />
          <Textarea label="Description (optional)" {...register('description')} />
        </form>
      </Modal>

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete category?"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} isLoading={deleting}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-ink-600 dark:text-ink-300">
          Products in <strong>{deleteTarget?.name}</strong> will become uncategorized. This can&apos;t be undone.
        </p>
      </Modal>
    </div>
  )
}