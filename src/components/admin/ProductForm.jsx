import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Upload, X, Star } from 'lucide-react'
import { productService } from '@/services/productService'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Switch from '@/components/ui/Switch'
import { classNames } from '@/utils/helpers'

export default function ProductForm({ product, categories, onSuccess, onCancel }) {
  const isEditing = !!product
  const [images, setImages] = useState(product?.images || [])
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || '',
      compare_at_price: product?.compare_at_price || '',
      stock: product?.stock ?? 0,
      category_id: product?.category_id || categories?.[0]?.id || '',
      sku: product?.sku || '',
      is_featured: product?.is_featured || false,
      is_trending: product?.is_trending || false,
      is_best_seller: product?.is_best_seller || false,
    },
  })

  const isFeatured = watch('is_featured')
  const isTrending = watch('is_trending')
  const isBestSeller = watch('is_best_seller')

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    if (!isEditing) {
      toast.error('Save the product first, then add images')
      return
    }

    setUploading(true)
    try {
      for (const file of files) {
        const img = await productService.uploadProductImage(product.id, file, images.length === 0)
        setImages((prev) => [...prev, img])
      }
      toast.success('Image uploaded')
    } catch (err) {
      toast.error('Image upload failed')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteImage = async (imageId) => {
    try {
      await productService.deleteProductImage(imageId)
      setImages((prev) => prev.filter((i) => i.id !== imageId))
    } catch (err) {
      toast.error('Could not delete image')
      console.error(err)
    }
  }

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const payload = {
        ...values,
        price: Number(values.price),
        compare_at_price: values.compare_at_price ? Number(values.compare_at_price) : null,
        stock: Number(values.stock),
      }

      if (isEditing) {
        await productService.updateProduct(product.id, payload)
        toast.success('Product updated')
        onSuccess?.()
      } else {
        const created = await productService.createProduct(payload)
        toast.success('Product created — now add some images')
        onSuccess?.(created)
      }
    } catch (err) {
      toast.error('Could not save product')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="Product name"
          required
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message}
        />
        <Input label="SKU" {...register('sku')} placeholder="NC-00123" />
      </div>

      <Textarea
        label="Description"
        rows={4}
        {...register('description', { required: 'Description is required' })}
        error={errors.description?.message}
      />

      <div className="grid sm:grid-cols-3 gap-4">
        <Input
          label="Price (USD)"
          type="number"
          step="0.01"
          required
          {...register('price', { required: 'Price is required', min: 0 })}
          error={errors.price?.message}
        />
        <Input label="Compare-at price" type="number" step="0.01" {...register('compare_at_price')} hint="Optional, for showing a discount" />
        <Input
          label="Stock quantity"
          type="number"
          required
          {...register('stock', { required: 'Stock is required', min: 0 })}
          error={errors.stock?.message}
        />
      </div>

      <Select
        label="Category"
        {...register('category_id', { required: true })}
        options={categories.map((c) => ({ value: c.id, label: c.name }))}
      />

      <div className="grid sm:grid-cols-3 gap-4 rounded-xl bg-ink-50 dark:bg-ink-900 p-4">
        <Switch checked={isFeatured} onChange={(v) => setValue('is_featured', v)} label="Featured" id="is_featured" />
        <Switch checked={isTrending} onChange={(v) => setValue('is_trending', v)} label="Trending" id="is_trending" />
        <Switch checked={isBestSeller} onChange={(v) => setValue('is_best_seller', v)} label="Best seller" id="is_best_seller" />
      </div>

      <div>
        <p className="text-sm font-medium text-ink-700 dark:text-ink-300 mb-2">Product images</p>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-3">
          {images.map((img) => (
            <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden border border-ink-200 dark:border-ink-700 group">
              <img src={img.url} alt="" className="h-full w-full object-cover" />
              {img.is_primary && (
                <span className="absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500">
                  <Star className="h-3 w-3 text-white fill-white" />
                </span>
              )}
              <button
                type="button"
                onClick={() => handleDeleteImage(img.id)}
                className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink-950/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <label
            className={classNames(
              'aspect-square rounded-lg border-2 border-dashed border-ink-300 dark:border-ink-700 flex items-center justify-center cursor-pointer hover:border-brand-500 transition-colors',
              uploading && 'opacity-50 pointer-events-none'
            )}
          >
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} disabled={uploading} />
            <Upload className="h-5 w-5 text-ink-400" />
          </label>
        </div>
        {!isEditing && <p className="text-xs text-ink-400">Save the product to enable image uploads.</p>}
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="brand" isLoading={submitting}>
          {isEditing ? 'Save changes' : 'Create product'}
        </Button>
      </div>
    </form>
  )
}
