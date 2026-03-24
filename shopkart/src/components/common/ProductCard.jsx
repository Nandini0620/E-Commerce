import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart } from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../store/slices/authSlice'
import { selectWishlist } from '../../store/slices/cartSlice'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/helpers'

const EMOJI_MAP = {
  electronics: '📱', fashion: '👕', footwear: '👟',
  accessories: '⌚', furniture: '🛋️', books: '📚',
  sports: '⚽', default: '🛍️'
}

export default function ProductCard({ product }) {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const wishlist = useSelector(selectWishlist)
  const { addToCart, handleWishlist } = useCart()
  const isWishlisted = wishlist.some(p => p.id === product.id)
  const emoji = EMOJI_MAP[(product.categoryName || '').toLowerCase()] || EMOJI_MAP.default
  const inStock = product.stockQuantity > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="card group overflow-hidden flex flex-col"
    >
      {/* Image area */}
      <Link to={`/products/${product.id}`} className="relative block bg-gray-50 dark:bg-gray-800 h-40 flex items-center justify-center text-5xl overflow-hidden">
        <span className="group-hover:scale-110 transition-transform duration-300 inline-block">{emoji}</span>
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-sm bg-black/60 px-3 py-1 rounded-full">Out of Stock</span>
          </div>
        )}
        {inStock && product.stockQuantity <= 5 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Only {product.stockQuantity} left</span>
        )}
        {/* Wishlist button */}
        {isLoggedIn && (
          <button
            onClick={e => { e.preventDefault(); handleWishlist(product) }}
            className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-500 hover:text-red-500'}`}>
            <Heart size={14} fill={isWishlisted ? 'white' : 'none'} />
          </button>
        )}
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[11px] font-bold text-brand-500 uppercase tracking-wider mb-1">{product.categoryName}</span>
        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white leading-tight mb-1 hover:text-brand-500 transition-colors line-clamp-2">{product.name}</h3>
        </Link>
        {product.description && (
          <p className="text-xs text-gray-400 mb-2 line-clamp-1">{product.description}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
          {isLoggedIn && inStock ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => addToCart(product.id, 1)}
              className="w-8 h-8 bg-brand-500 hover:bg-brand-600 text-white rounded-xl flex items-center justify-center transition-colors">
              <ShoppingCart size={14} />
            </motion.button>
          ) : !isLoggedIn ? (
            <Link to="/login" className="text-xs text-brand-500 font-semibold hover:underline">Login to buy</Link>
          ) : null}
        </div>
      </div>
    </motion.div>
  )
}
