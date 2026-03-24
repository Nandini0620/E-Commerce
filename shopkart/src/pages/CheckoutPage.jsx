import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { CheckCircle, ShoppingBag } from 'lucide-react'
import { selectUser } from '../store/slices/authSlice'
import { selectCartItems, selectCartTotal, clearCart } from '../store/slices/cartSlice'
import { orderService } from '../services/endpoints'
import { formatPrice } from '../utils/helpers'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const navigate  = useNavigate()
  const dispatch  = useDispatch()
  const user      = useSelector(selectUser)
  const items     = useSelector(selectCartItems)
  const total     = useSelector(selectCartTotal)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const tax = total * 0.18
  const grandTotal = total + tax

  const handlePlaceOrder = async () => {
    if (!user?.id) { toast.error('User info missing. Please re-login.'); return }
    try {
      setLoading(true)
      await orderService.place(user.id)
      dispatch(clearCart())
      setDone(true)
      toast.success('Order placed successfully! 🎉')
    } catch (e) {
      toast.error('Failed to place order. Try again.')
    } finally {
      setLoading(false)
    }
  }

  if (done) return (
    <div className="max-w-md mx-auto px-4 py-20 text-center page-enter">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
      </motion.div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order Placed! 🎉</h2>
      <p className="text-gray-400 mb-8">Your order has been placed successfully and will be delivered soon.</p>
      <div className="flex gap-3 justify-center">
        <button onClick={() => navigate('/orders')} className="btn-primary flex items-center gap-2">
          <ShoppingBag size={15} /> View Orders
        </button>
        <button onClick={() => navigate('/products')} className="btn-outline">Continue Shopping</button>
      </div>
    </div>
  )

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 page-enter">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-7">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Items */}
        <div className="card p-5">
          <h2 className="font-bold text-gray-800 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
            Order Items ({items.length})
          </h2>
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{item.product?.name}</p>
                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {formatPrice(item.product?.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary + CTA */}
        <div className="card p-5 h-fit">
          <h2 className="font-bold text-gray-800 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
            Payment Summary
          </h2>
          <div className="space-y-3 text-sm mb-5">
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
            <div className="flex justify-between font-bold text-base text-gray-900 dark:text-white pt-3 border-t border-gray-100 dark:border-gray-800">
              <span>Grand Total</span>
              <span className="text-brand-500">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 mb-5 text-xs text-orange-700 dark:text-orange-400">
            <strong>Demo Mode:</strong> No real payment. Order will be placed directly.
          </div>

          <motion.button whileTap={{ scale: 0.97 }}
            onClick={handlePlaceOrder}
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2">
            {loading ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Placing Order...</>
            ) : (
              <><CheckCircle size={16} /> Place Order — {formatPrice(grandTotal)}</>
            )}
          </motion.button>
          <p className="text-center text-xs text-gray-400 mt-3">🔒 Secured by ShopKart</p>
        </div>
      </div>
    </div>
  )
}
