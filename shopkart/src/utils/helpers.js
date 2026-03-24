// Format currency in INR
export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

// Truncate text
export const truncate = (str, n = 60) => str?.length > n ? str.slice(0, n) + '…' : str

// Generate random placeholder product image by category
const categoryImages = {
  electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80',
  fashion:     'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80',
  default:     'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
}
export const getProductImage = (category) =>
  categoryImages[category?.toLowerCase()] || categoryImages.default

// Delay helper
export const delay = (ms) => new Promise(r => setTimeout(r, ms))

// Get initials from name
export const getInitials = (name = '') =>
  name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
