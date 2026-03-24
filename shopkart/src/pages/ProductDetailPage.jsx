import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, ArrowLeft, Package, CheckCircle } from 'lucide-react'
import { fetchProductById, selectCurrentProduct, selectProductLoading } from '../store/slices/productSlice'
import { selectIsLoggedIn } from '../store/slices/authSlice'
import { selectWishlist } from '../store/slices/cartSlice'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/helpers'
import { PageLoader } from '../components/common/Skeletons'

const EMOJI_MAP = { electronics: '📱', fashion: '👕', footwear: '👟', accessories: '⌚', default: '🛍️' }

export default function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const product = useSelector(selectCurrentProduct)
  const loading = useSelector(selectProductLoading)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const wishlist = useSelector(selectWishlist)
  const { addToCart, handleWishlist } = useCart()
  const [qty, setQty] = useState(1)

  useEffect(() => { dispatch(fetchProductById(id)) }, [id])

  if (loading) return <PageLoader />
  if (!product) return (
    <div className="text-center py-20 text-gray-400">
      <p className="text-2xl mb-2">🔍</p>
      <p>Product not found</p>
      <Link to="/products" className="text-brand-500 font-semibold mt-4 inline-block">← Back to Products</Link>
    </div>
  )

  const isWishlisted = wishlist.some(p => p.id === product.id)
  const inStock = product.stockQuantity > 0
  const emoji = EMOJI_MAP[(product.categoryName || '').toLowerCase()] || EMOJI_MAP.default

  return (
    <div className="page-enter max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-500 mb-6 transition-colors">
        <ArrowLeft size={15} /> Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="card bg-gray-50 dark:bg-gray-800 h-72 md:h-80 flex items-center justify-center text-8xl rounded-2xl">
          {emoji}
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
          <div>
            <span className="text-xs font-bold text-brand-500 uppercase tracking-wider">{product.categoryName}</span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{product.name}</h1>
          </div>

          {product.description && (
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{product.description}</p>
          )}

          <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {formatPrice(product.price)}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            {inStock ? (
              <>
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-sm text-green-600 font-semibold">In Stock ({product.stockQuantity} available)</span>
              </>
            ) : (
              <>
                <Package size={16} className="text-red-500" />
                <span className="text-sm text-red-600 font-semibold">Out of Stock</span>
              </>
            )}
          </div>

          {/* Qty + Add to cart */}
          {isLoggedIn && inStock && (
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-brand-500 font-bold text-lg">−</button>
                <span className="w-8 text-center font-semibold text-gray-800 dark:text-white">{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stockQuantity, q + 1))}
                  className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-brand-500 font-bold text-lg">+</button>
              </div>
              <motion.button whileTap={{ scale: 0.95 }}
                onClick={() => addToCart(product.id, qty)}
                className="btn-primary flex items-center gap-2 flex-1 justify-center">
                <ShoppingCart size={16} /> Add to Cart
              </motion.button>
              <button onClick={() => handleWishlist(product)}
                className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center transition-all ${isWishlisted ? 'border-red-400 bg-red-50 text-red-500' : 'border-gray-200 dark:border-gray-700 text-gray-400 hover:border-red-400 hover:text-red-500'}`}>
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
          )}

          {!isLoggedIn && (
            <Link to="/login" className="btn-primary text-center mt-2">Login to Purchase</Link>
          )}

          {/* Meta */}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-4 text-xs text-gray-400 space-y-1">
            <p>Product ID: #{product.id}</p>
            <p>Added: {product.createdAt ? new Date(product.createdAt).toLocaleDateString('en-IN') : 'N/A'}</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
