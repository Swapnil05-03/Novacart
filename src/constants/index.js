export const STORAGE_BUCKETS = {
  PRODUCT_IMAGES: 'product-images',
  AVATARS: 'avatars',
}

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURN_REQUESTED: 'return_requested',
  RETURNED: 'returned',
}

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.PROCESSING]: 'Processing',
  [ORDER_STATUS.SHIPPED]: 'Shipped',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
  [ORDER_STATUS.RETURN_REQUESTED]: 'Return Requested',
  [ORDER_STATUS.RETURNED]: 'Returned',
}

// Orders in these statuses can still be cancelled by the customer.
export const CANCELLABLE_STATUSES = [ORDER_STATUS.PENDING, ORDER_STATUS.PROCESSING]

// Orders in these statuses are eligible for a return/refund request.
export const RETURNABLE_STATUSES = [ORDER_STATUS.DELIVERED]

// Orders in these statuses can be removed from the customer's visible history.
export const REMOVABLE_FROM_HISTORY_STATUSES = [ORDER_STATUS.CANCELLED, ORDER_STATUS.RETURNED]

export const ORDER_STATUS_FLOW = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.PROCESSING,
  ORDER_STATUS.SHIPPED,
  ORDER_STATUS.DELIVERED,
]

export const PRODUCTS_PER_PAGE = 12

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name_asc', label: 'Name: A to Z' },
]

export const RATING_FILTERS = [4, 3, 2, 1]

export const APP_NAME = 'NovaCart'

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id) => `/products/${id}`,
  CART: '/cart',
  WISHLIST: '/wishlist',
  CHECKOUT: '/checkout',
  ORDER_CONFIRMATION: (id) => `/order-confirmation/${id}`,
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROFILE: '/profile',
  ORDERS: '/profile/orders',
  SETTINGS: '/profile/settings',
  ADMIN: '/admin',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_USERS: '/admin/users',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_REVIEWS: '/admin/reviews',
}