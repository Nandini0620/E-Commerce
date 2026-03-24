import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal, selectCartLoading } from '../store/slices/cartSlice'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/helpers'
import { PageLoader } from '../components/common/Skeletons'

const EMOJI_MAP = { electronics: '📱', fashion: '👕', footwear: '👟', accessories: '⌚', default: '🛍️' }

export default function CartPage() {
  const items   = useSelector(selectCartItems)
  const total   = useSelector(selectCartTotal)
  const loading = useSelector(selectCartLoading)
  const { refreshCart } = useCart()

  if (loading) return <PageLoader />

  if (items.length === 0) return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center page-enter">
      <div className="text-7xl mb-6">🛒</div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Your cart is empty</h2>
      <p className="text-gray-400 mb-8">Add some products to get started</p>
      <Link to="/products" className="btn-primary inline-flex items-center gap-2">
        <ShoppingBag size={16} /> Browse Products
      </Link>
    </div>
  )

  const tax = total * 0.18
  const grandTotal = total + tax

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 page-enter">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Shopping Cart</h1>
      <p className="text-sm text-gray-400 mb-7">{items.length} item{items.length > 1 ? 's' : ''} in your cart</p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map(item => {
              const emoji = EMOJI_MAP[(item.product?.categoryName || '').toLowerCase()] || EMOJI_MAP.default
              return (
                <motion.div key={item.id}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                  className="card p-4 flex gap-4 items-center">
                  {/* Emoji */}
                  <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                    {emoji}
                  </div>
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 dark:text-white text-sm truncate">{item.productName}</h3>
                    <p className="text-xs text-brand-500 font-bold mt-0.5">{item.categoryName}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                      {formatPrice(item.product?.price)} × {item.quantity}
                    </p>
                  </div>
                  {/* Total */}
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-gray-900 dark:text-white">{formatPrice(item.price * item.quantity)}</p>
                    <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          <button onClick={refreshCart} className="text-xs text-brand-500 font-semibold hover:underline flex items-center gap-1 mt-2">
            ↻ Refresh cart
          </button>
        </div>

        {/* Summary */}
        <div className="card p-6 h-fit">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 pb-4 border-b border-gray-100 dark:border-gray-800">
            Order Summary
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-500 dark:text-gray-400">
              <span>Subtotal</span><span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-gray-500 dark:text-gray-400">
              <span>Shipping</span>
              <span className="text-green-600 font-semibold">{total > 499 ? 'Free' : formatPrice(49)}</span>
            </div>
            <div className="flex justify-between text-gray-500 dark:text-gray-400">
              <span>Tax (18%)</span><span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base pt-3 border-t border-gray-100 dark:border-gray-800">
              <span>Total</span>
              <span className="text-brand-500">{formatPrice(grandTotal)}</span>
            </div>
          </div>
          <Link to="/checkout">
            <motion.button whileTap={{ scale: 0.98 }}
              className="btn-primary w-full mt-6 flex items-center justify-center gap-2">
              Proceed to Checkout <ArrowRight size={15} />
            </motion.button>
          </Link>
          <p className="text-center text-xs text-gray-400 mt-3">🔒 Secure checkout</p>
        </div>
      </div>
    </div>
  )
}
