import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal } from 'lucide-react'
import { fetchProducts, searchProducts, selectProducts, selectProductLoading, selectTotalPages, selectCurrentPage } from '../store/slices/productSlice'
import ProductCard from '../components/common/ProductCard'
import { ProductCardSkeleton } from '../components/common/Skeletons'

export default function ProductsPage() {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const products = useSelector(selectProducts)
  const loading  = useSelector(selectProductLoading)
  const totalPages = useSelector(selectTotalPages)
  const currentPage = useSelector(selectCurrentPage)

  const [query, setQuery] = useState(searchParams.get('search') || '')
  const [inputVal, setInputVal] = useState(searchParams.get('search') || '')
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (query.trim()) {
      dispatch(searchProducts({ name: query, page, size: 12 }))
    } else {
      dispatch(fetchProducts({ page, size: 12 }))
    }
  }, [query, page])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(0)
    setQuery(inputVal)
  }

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Products</h1>
          <p className="text-sm text-gray-400 mt-0.5">Browse our entire collection</p>
        </div>
        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Search products..."
              className="input pl-9 py-2 text-sm"
            />
          </div>
          <button type="submit" className="btn-primary py-2 px-4 text-sm">
            Search
          </button>
        </form>
      </div>

      {/* Results info */}
      {query && (
        <div className="mb-5 flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Results for <span className="font-semibold text-gray-800 dark:text-white">"{query}"</span>
          </span>
          <button onClick={() => { setQuery(''); setInputVal(''); setPage(0) }}
            className="text-xs text-brand-500 font-semibold hover:underline ml-1">Clear</button>
        </div>
      )}

      {/* Products grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
        {loading
          ? Array(12).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
          : products.map(p => <ProductCard key={p.id} product={p} />)
        }
      </div>

      {!loading && products.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <div className="text-6xl mb-4">🔍</div>
          <p className="font-semibold text-lg text-gray-600 dark:text-gray-300">No products found</p>
          <p className="text-sm mt-1">Try a different search term</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i)}
              className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${i === currentPage
                ? 'bg-brand-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-brand-400'}`}>
              {i + 1}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  )
}
