import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Truck, RefreshCcw, Headphones } from 'lucide-react'
import { fetchProducts, selectProducts, selectProductLoading } from '../store/slices/productSlice'
import ProductCard from '../components/common/ProductCard'
import { ProductCardSkeleton } from '../components/common/Skeletons'

const FEATURES = [
  { icon: Truck,        title: 'Free Delivery',     desc: 'On orders above ₹499' },
  { icon: ShieldCheck,  title: 'Secure Payment',    desc: '100% protected' },
  { icon: RefreshCcw,   title: 'Easy Returns',      desc: '7-day return policy' },
  { icon: Headphones,   title: '24/7 Support',      desc: 'Always here to help' },
]

export default function HomePage() {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const loading  = useSelector(selectProductLoading)

  useEffect(() => { dispatch(fetchProducts({ page: 0, size: 8 })) }, [])

  return (
    <div className="page-enter">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <motion.div className="flex-1"
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block bg-brand-100 text-brand-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              🔥 New Arrivals Every Week
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
              Discover <span className="text-brand-500 font-display italic">Premium</span><br />
              Products Online
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-md">
              Thousands of quality products at the best prices. Fast delivery, easy returns.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/products" className="btn-primary flex items-center gap-2">
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link to="/register" className="btn-outline flex items-center gap-2">
                Join Free
              </Link>
            </div>
          </motion.div>

          <motion.div className="flex gap-4"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            {[
              { emoji: '📱', name: 'Smartphone X12', price: '₹14,999', cat: 'Electronics' },
              { emoji: '⌚', name: 'Smart Watch Pro', price: '₹4,999',  cat: 'Accessories' },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}
                className="card p-5 w-36 flex flex-col items-center text-center shadow-md">
                <div className="text-5xl mb-3">{item.emoji}</div>
                <div className="text-[10px] font-bold text-brand-500 uppercase mb-1">{item.cat}</div>
                <div className="text-sm font-semibold text-gray-800 dark:text-white mb-1">{item.name}</div>
                <div className="text-base font-bold text-brand-500">{item.price}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-brand-500" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800 dark:text-white">{title}</div>
                <div className="text-xs text-gray-400">{desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Products</h2>
            <p className="text-sm text-gray-400 mt-0.5">Handpicked just for you</p>
          </div>
          <Link to="/products" className="flex items-center gap-1 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors">
            View All <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {loading
            ? Array(8).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)
          }
        </div>

        {!loading && products.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">🛍️</div>
            <p className="font-medium">No products yet. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  )
}
