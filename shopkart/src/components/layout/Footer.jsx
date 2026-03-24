import { Link } from 'react-router-dom'
import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag size={22} className="text-brand-500" />
            <span className="text-xl font-extrabold text-white">Shop<span className="text-brand-500">Kart</span></span>
          </div>
          <p className="text-sm leading-relaxed">Your one-stop shop for everything. Quality products at the best prices.</p>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[['/', 'Home'], ['/products', 'Products'], ['/cart', 'Cart'], ['/orders', 'Orders']].map(([to, label]) => (
              <li key={to}><Link to={to} className="hover:text-brand-400 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        {/* Account */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Account</h4>
          <ul className="space-y-2 text-sm">
            {[['/login', 'Login'], ['/register', 'Register'], ['/profile', 'Profile'], ['/wishlist', 'Wishlist']].map(([to, label]) => (
              <li key={to}><Link to={to} className="hover:text-brand-400 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Mail size={14} className="text-brand-500" /> support@shopkart.com</li>
            <li className="flex items-center gap-2"><Phone size={14} className="text-brand-500" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><MapPin size={14} className="text-brand-500" /> Indore, Madhya Pradesh</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 dark:border-gray-900 py-5 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} ShopKart. Built with React + Spring Boot.
      </div>
    </footer>
  )
}
