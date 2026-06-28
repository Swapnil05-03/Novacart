import { useEffect, useState, useCallback } from 'react'
import { Plus, Pencil, Trash2, Package } from 'lucide-react'
import toast from 'react-hot-toast'
import { productService } from '@/services/productService'
import { formatCurrency } from '@/utils/helpers'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import ProductForm from '@/components/admin/ProductForm'
import EmptyState from '@/components/ui/EmptyState'
import { TableRowSkeleton } from '@/components/ui/Skeleton'

export default function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const loadProducts = useCallback(() => {
    setLoading(true)
    productService
      .getProducts({ perPage: 100 })
      .then(({ data }) => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    loadProducts()
    productService.getCategories().then(setCategories).catch(console.error)
  }, [loadProducts])

  const openCreateModal = () => {
    setEditingProduct(null)
    setModalOpen(true)
  }

  const openEditModal = (product) => {
    setEditingProduct(product)
    setModalOpen(true)
  }

  const handleFormSuccess = (created) => {
    loadProducts()
    if (created) {
      // Keep modal open for new product so admin can add images
      setEditingProduct(created)
    } else {
      setModalOpen(false)
    }
  }

  const handleDelete = async () => {
    try {
      await productService.deleteProduct(deleteTarget.id)
      toast.success('Product deleted')
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id))
    } catch (err) {
      toast.error('Could not delete product')
      console.error(err)
    } finally {
      setDeleteTarget(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white">
            Products
          </h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">{products.length} products in your catalog</p>
        </div>
        <Button variant="brand" leftIcon={<Plus className="h-4 w-4" />} onClick={openCreateModal}>
          Add product
        </Button>
      </div>

      <div className="rounded-2xl border border-ink-200 dark:border-ink-800 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-200 dark:border-ink-800 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100 dark:divide-ink-800">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} columns={5} />)
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <EmptyState icon={Package} title="No products yet" description="Add your first product to get started." />
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const image = product.images?.find((i) => i.is_primary)?.url || product.images?.[0]?.url
                return (
                  <tr key={product.id} className="hover:bg-ink-50 dark:hover:bg-ink-900/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-ink-100 dark:bg-ink-800 overflow-hidden shrink-0">
                          {image && <img src={image} alt="" className="h-full w-full object-cover" />}
                        </div>
                        <span className="font-medium text-ink-900 dark:text-white line-clamp-1">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink-500 dark:text-ink-400">{product.category?.name || '—'}</td>
                    <td className="px-4 py-3 price-mono text-ink-900 dark:text-white">{formatCurrency(product.price)}</td>
                    <td className="px-4 py-3">
                      <span className={product.stock <= 0 ? 'text-danger-500' : 'text-ink-700 dark:text-ink-300'}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => openEditModal(product)} className="p-1.5 text-ink-400 hover:text-brand-600 transition-colors" aria-label="Edit">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteTarget(product)} className="p-1.5 text-ink-400 hover:text-danger-500 transition-colors" aria-label="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProduct ? 'Edit product' : 'Add product'}
        size="xl"
      >
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSuccess={handleFormSuccess}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete product"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-ink-600 dark:text-ink-300">
          Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  )
}
