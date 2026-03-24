import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { User, Mail, ShieldCheck, Calendar } from 'lucide-react'
import { selectUser } from '../store/slices/authSlice'
import { getInitials } from '../utils/helpers'

export default function ProfilePage() {
  const user = useSelector(selectUser)
  const initials = getInitials(user?.name || user?.email || 'U')
  const isAdmin = user?.role === 'ROLE_ADMIN'

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 page-enter">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-7">My Profile</h1>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-brand-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
          {initials}
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name || 'User'}</h2>
        <p className="text-gray-400 text-sm mt-1">{user?.email}</p>
        <span className={`inline-block mt-3 text-xs font-bold px-3 py-1 rounded-full ${isAdmin ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
          {isAdmin ? '⚡ Admin' : '👤 Customer'}
        </span>
      </motion.div>

      <div className="card p-6 mt-5 space-y-4">
        {[
          { icon: User, label: 'Full Name', value: user?.name || '—' },
          { icon: Mail, label: 'Email Address', value: user?.email },
          { icon: ShieldCheck, label: 'Role', value: user?.role?.replace('ROLE_', '') || 'USER' },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center flex-shrink-0">
              <Icon size={16} className="text-brand-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">{label}</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
