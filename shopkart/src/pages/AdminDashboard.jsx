import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { LayoutDashboard, Package, Tag, ShoppingBag, LogOut, Plus, Trash2, Edit3, X, CheckCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { selectUser } from '../store/slices/authSlice'
import { productService, categoryService } from '../services/endpoints'
import { formatPrice } from '../utils/helpers'
import toast from 'react-hot-toast'

const NAV = [
  { id: 'dashboard', label: 'Dashboard',  icon: LayoutDashboard },
  { id: 'products',  label: 'Products',   icon: Package },
  { id: 'categories',label: 'Categories', icon: Tag },
]

export default function AdminDashboard() {
  const navigate   = useNavigate()
  const user       = useSelector(selectUser)
  const [tab, setTab] = useState('dashboard')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  // Product form
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [pForm, setPForm] = useState({ name: '', description: '', price: '', stockQuantity: '', categoryId: '' })

  // Category form
  const [catName, setCatName] = useState('')
  const [catLoading, setCatLoading] = useState(false)

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [pRes, cRes] = await Promise.all([productService.getAll(0, 50), categoryService.getAll()])
      setProducts(pRes.data.content || [])
      setCategories(cRes.data || [])
    } catch {}
    setLoading(false)
  }

  useEffect(() => { fetchAll() }, [])

  const handleSaveProduct = async (e) => {
    e.preventDefault()
    const payload = { ...pForm, price: parseFloat(pForm.price), stockQuantity: parseInt(pForm.stockQuantity), categoryId: parseInt(pForm.categoryId) }
    try {
      if (editProduct) {
        await productService.update(editProduct.id, payload)
        toast.success('Product updated!')
      } else {
        await productService.create(payload)
        toast.success('Product added!')
      }
      setShowForm(false); setEditProduct(null); setPForm({ name: '', description: '', price: '', stockQuantity: '', categoryId: '' })
      fetchAll()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save product')
    }
  }

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return
    try {
      await productService.delete(id)
      toast.success('Product deleted')
      fetchAll()
    } catch { toast.error('Failed to delete') }
  }

  const openEdit = (p) => {
    setEditProduct(p)
    setPForm({ name: p.name, description: p.description || '', price: p.price, stockQuantity: p.stockQuantity, categoryId: categories.find(c => c.name === p.categoryName)?.id || '' })
    setShowForm(true)
  }

  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (!catName.trim()) return
    setCatLoading(true)
    try {
      await categoryService.create({ name: catName })
      toast.success('Category added!')
      setCatName('')
      fetchAll()
    } catch { toast.error('Failed to add category') }
    setCatLoading(false)
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-900 dark:bg-black flex-shrink-0 flex flex-col py-6 px-3">
        <Link to="/" className="flex items-center gap-2 px-2 mb-8">
          <ShoppingBag size={20} className="text-brand-500" />
          <span className="text-white font-bold text-lg">ShopKart</span>
          <span className="text-[10px] bg-brand-500 text-white px-1.5 py-0.5 rounded font-bold">ADMIN</span>
        </Link>

        <nav className="flex-1 space-y-1">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === id ? 'bg-brand-500 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>

        <div className="border-t border-gray-800 pt-4 mt-4 px-2">
          <p className="text-xs text-gray-500 mb-2 truncate">{user?.email}</p>
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors py-1.5">
            <LogOut size={14} /> Exit Admin
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-6">

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Products', value: products.length, color: 'text-brand-500' },
                { label: 'Categories', value: categories.length, color: 'text-blue-500' },
                { label: 'In Stock', value: products.filter(p => p.stockQuantity > 0).length, color: 'text-green-500' },
                { label: 'Out of Stock', value: products.filter(p => p.stockQuantity === 0).length, color: 'text-red-500' },
              ].map(({ label, value, color }) => (
                <div key={label} className="card p-5">
                  <p className="text-xs text-gray-400 font-medium mb-1">{label}</p>
                  <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
                </div>
              ))}
            </div>

            <div className="card p-5">
              <h2 className="font-bold text-gray-800 dark:text-white mb-4">Recent Products</h2>
              <div className="space-y-3">
                {products.slice(0, 5).map(p => (
                  <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.categoryName} · Stock: {p.stockQuantity}</p>
                    </div>
                    <span className="font-bold text-brand-500 text-sm">{formatPrice(p.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* PRODUCTS */}
        {tab === 'products' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Products</h1>
              <button onClick={() => { setShowForm(true); setEditProduct(null); setPForm({ name: '', description: '', price: '', stockQuantity: '', categoryId: '' }) }}
                className="btn-primary flex items-center gap-2 text-sm">
                <Plus size={15} /> Add Product
              </button>
            </div>

            {/* Product Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-bold text-gray-900 dark:text-white">{editProduct ? 'Edit Product' : 'Add Product'}</h2>
                    <button onClick={() => setShowForm(false)}><X size={18} className="text-gray-400" /></button>
                  </div>
                  <form onSubmit={handleSaveProduct} className="space-y-4">
                    {[['name', 'Product Name', 'text'], ['description', 'Description', 'text'], ['price', 'Price (₹)', 'number'], ['stockQuantity', 'Stock Quantity', 'number']].map(([field, label, type]) => (
                      <div key={field}>
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">{label}</label>
                        <input type={type} placeholder={label} value={pForm[field]}
                          onChange={e => setPForm(f => ({ ...f, [field]: e.target.value }))}
                          className="input" required />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Category</label>
                      <select value={pForm.categoryId} onChange={e => setPForm(f => ({ ...f, categoryId: e.target.value }))} className="input" required>
                        <option value="">Select category</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
                        <CheckCircle size={15} /> {editProduct ? 'Update' : 'Add Product'}
                      </button>
                      <button type="button" onClick={() => setShowForm(false)} className="btn-outline flex-1">Cancel</button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}

            <div className="card overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                  <tr>
                    {['ID', 'Name', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-3 text-gray-400 text-xs">#{p.id}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800 dark:text-white">{p.name}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{p.categoryName}</td>
                      <td className="px-4 py-3 font-bold text-brand-500">{formatPrice(p.price)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.stockQuantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {p.stockQuantity}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => openEdit(p)}
                            className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors">
                            <Edit3 size={13} />
                          </button>
                          <button onClick={() => handleDeleteProduct(p.id)}
                            className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {products.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Package size={40} className="mx-auto mb-3 opacity-40" />
                  <p>No products yet. Add your first product!</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* CATEGORIES */}
        {tab === 'categories' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Categories</h1>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-5">
                <h2 className="font-bold text-gray-800 dark:text-white mb-4">Add Category</h2>
                <form onSubmit={handleAddCategory} className="flex gap-3">
                  <input value={catName} onChange={e => setCatName(e.target.value)}
                    placeholder="Category name" className="input flex-1" required />
                  <button type="submit" disabled={catLoading} className="btn-primary flex items-center gap-2 whitespace-nowrap">
                    {catLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Plus size={15} />}
                    Add
                  </button>
                </form>
              </div>
              <div className="card p-5">
                <h2 className="font-bold text-gray-800 dark:text-white mb-4">All Categories ({categories.length})</h2>
                <div className="space-y-2">
                  {categories.map(c => (
                    <div key={c.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">{c.name}</span>
                      <span className="text-xs text-gray-400">ID: {c.id}</span>
                    </div>
                  ))}
                  {categories.length === 0 && <p className="text-sm text-gray-400">No categories yet.</p>}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
