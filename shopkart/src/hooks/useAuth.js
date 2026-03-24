import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginSuccess, logout, selectUser, selectIsLoggedIn, selectIsAdmin } from '../store/slices/authSlice'
import { clearCart } from '../store/slices/cartSlice'
import { authService } from '../services/endpoints'
import toast from 'react-hot-toast'

export function useAuth() {
  const dispatch   = useDispatch()
  const navigate   = useNavigate()
  const user       = useSelector(selectUser)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const isAdmin    = useSelector(selectIsAdmin)

  const register = async (formData) => {
    const res = await authService.register(formData)
    toast.success('Registered successfully! Please login.')
    navigate('/login')
    return res.data
  }

  const login = async ({ email, password }) => {
    const res = await authService.login({ email, password })
    
    // ✅ Backend ab { token, id, name, email, role } return karega
    const { token, ...userData } = res.data

    dispatch(loginSuccess({ token, user: userData }))
    toast.success(`Welcome back, ${userData.name}!`)

    // ✅ Role database se aayega — sahi redirect hoga
    if (userData.role === 'ROLE_ADMIN') navigate('/admin')
    else navigate('/')
}

  const logoutUser = () => {
    dispatch(logout())
    dispatch(clearCart())
    toast.success('Logged out successfully')
    navigate('/login')
  }

  return { user, isLoggedIn, isAdmin, register, login, logoutUser }
}
