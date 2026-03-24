import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Heart, Sun, Moon, Menu, X, User, LogOut, Package, LayoutDashboard, Search } from 'lucide-react'
import { selectIsLoggedIn, selectIsAdmin, selectUser, logout } from '../../store/slices/authSlice'
import { selectCartCount } from '../../store/slices/cartSlice'
import { toggleDarkMode, selectDarkMode } from '../../store/slices/uiSlice'
import { clearCart } from '../../store/slices/cartSlice'
import toast from 'react-hot-toast'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const isAdmin = useSelector(selectIsAdmin)
  const user = useSelector(selectUser)
  const cartCount = useSelector(selectCartCount)
  const darkMode = useSelector(selectDarkMode)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [search, setSearch] = useState('')

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearCart())
    toast.success('Logged out!')
    navigate('/login')
    setDropOpen(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`)
      setSearch('')
    }
  }

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0 text-2xl font-extrabold tracking-tight">
          <span className="text-brand-500">Shop</span>
          <span className="text-gray-800 dark:text-white">Kart</span>
        </Link>

        {/* Search bar - desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 dark:text-white"
          />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </form>

        {/* Nav links - desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
          <Link to="/" className="hover:text-brand-500 transition-colors">Home</Link>
          <Link to="/products" className="hover:text-brand-500 transition-colors">Products</Link>
          {isLoggedIn && <Link to="/orders" className="hover:text-brand-500 transition-colors">Orders</Link>}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          {/* Dark mode */}
          <button onClick={() => dispatch(toggleDarkMode())}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Wishlist */}
          {isLoggedIn && (
            <Link to="/wishlist"
              className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400">
              <Heart size={18} />
            </Link>
          )}

          {/* Cart */}
          {isLoggedIn && (
            <Link to="/cart" className="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </motion.span>
              )}
            </Link>
          )}

          {/* User menu / Login */}
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={() => setDropOpen(p => !p)}
                className="w-9 h-9 rounded-xl bg-brand-500 text-white text-sm font-bold flex items-center justify-center hover:bg-brand-600 transition-colors">
                {initials}
              </button>
              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{user?.name || user?.email}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <div className="p-1">
                      <Link to="/profile" onClick={() => setDropOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <User size={15} /> Profile
                      </Link>
                      <Link to="/orders" onClick={() => setDropOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Package size={15} /> My Orders
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setDropOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-brand-600 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors">
                          <LayoutDashboard size={15} /> Admin Panel
                        </Link>
                      )}
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-800 transition-colors">
                        <LogOut size={15} /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="btn-primary text-sm py-2 px-4">Login</Link>
          )}

          {/* Mobile menu toggle */}
          <button onClick={() => setMenuOpen(p => !p)}
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            className="md:hidden overflow-hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="px-4 py-3 space-y-1">
              <form onSubmit={handleSearch} className="relative mb-3">
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 dark:text-white" />
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </form>
              {[['/', 'Home'], ['/products', 'Products'], ['/orders', 'Orders'], ['/wishlist', 'Wishlist']].map(([to, label]) => (
                <Link key={to} to={to} onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
