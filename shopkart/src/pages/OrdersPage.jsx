import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Package, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { selectUser } from '../store/slices/authSlice'
import { orderService } from '../services/endpoints'
import { formatPrice } from '../utils/helpers'
import { OrderCardSkeleton } from '../components/common/Skeletons'

const STATUS_STYLES = {
  PLACED:    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  DELIVERED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  CANCELLED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

export default function OrdersPage() {
  const user = useSelector(selectUser)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) return
    orderService.getOrders(user.id)
      .then(res => setOrders(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user?.id])

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 page-enter">
      <div className="flex items-center gap-3 mb-7">
        <Package size={22} className="text-brand-500" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Orders</h1>
          <p className="text-sm text-gray-400">Track all your orders here</p>
        </div>
      </div>

      {loading && (
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => <OrderCardSkeleton key={i} />)}
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className="text-center py-20">
          <div className="text-7xl mb-5">📦</div>
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No orders yet</h2>
          <p className="text-gray-400 mb-7">Place your first order today!</p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2">
            <ShoppingBag size={15} /> Start Shopping
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {orders.map((order, i) => (
          <motion.div key={order.id}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-gray-400 font-medium">Order ID</p>
                <p className="font-bold text-gray-900 dark:text-white text-lg">#{order.id}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${STATUS_STYLES[order.status] || STATUS_STYLES.PLACED}`}>
                {order.status}
              </span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total Amount
              </div>
              <div className="text-xl font-extrabold text-brand-500">
                {formatPrice(order.totalAmount)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
