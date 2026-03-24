import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { selectWishlist } from '../store/slices/cartSlice'
import ProductCard from '../components/common/ProductCard'

export default function WishlistPage() {
  const wishlist = useSelector(selectWishlist)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 page-enter">
      <div className="flex items-center gap-3 mb-7">
        <Heart size={22} className="text-red-500" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
          <p className="text-sm text-gray-400">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-7xl mb-5">💔</div>
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-400 mb-7">Save products you love by clicking the heart icon</p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2">
            <ShoppingBag size={15} /> Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {wishlist.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
