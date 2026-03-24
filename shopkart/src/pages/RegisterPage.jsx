import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, ShoppingBag } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'USER' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { toast.error('Fill all fields'); return }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    try {
      setLoading(true)
      await register(form)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <ShoppingBag size={28} className="text-brand-500" />
          <span className="text-2xl font-extrabold"><span className="text-brand-500">Shop</span><span className="text-gray-800 dark:text-white">Kart</span></span>
        </Link>
        <div className="card p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Create Account</h1>
          <p className="text-gray-400 text-sm mb-7">Join thousands of happy shoppers</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Rahul Sharma" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="input pl-9" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" placeholder="rahul@example.com" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="input pl-9" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="password" placeholder="Min. 6 characters" value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="input pl-9" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Account Type</label>
              <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="input">
                <option value="USER">User (Customer)</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
              {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Creating account...</> : 'Create Account →'}
            </motion.button>
          </form>
          <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800 text-center text-sm text-gray-400">
            Already have an account? <Link to="/login" className="text-brand-500 font-semibold hover:underline">Sign in</Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
