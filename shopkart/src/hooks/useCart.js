import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../store/slices/authSlice'
import { fetchCart, addToCartAsync, toggleWishlist, selectCartItems, selectCartCount, selectCartTotal, selectWishlist, selectCartLoading } from '../store/slices/cartSlice'
import { useEffect } from 'react'

export function useCart() {
  const dispatch = useDispatch()
  const user     = useSelector(selectUser)
  const items    = useSelector(selectCartItems)
  const count    = useSelector(selectCartCount)
  const total    = useSelector(selectCartTotal)
  const wishlist = useSelector(selectWishlist)
  const loading  = useSelector(selectCartLoading)

  useEffect(() => {
    if (user?.id) dispatch(fetchCart(user.id))
  }, [user?.id])

  const addToCart = (productId, quantity = 1) => {
    if (!user?.id) {
      toast.error('Please login again!')
      return
    }
    dispatch(addToCartAsync({ userId: user.id, productId, quantity }))
}

  const refreshCart = () => {
    if (user?.id) dispatch(fetchCart(user.id))
  }

  const handleWishlist = (product) => dispatch(toggleWishlist(product))

  const isInWishlist = (productId) => wishlist.some(p => p.id === productId)

  return { items, count, total, wishlist, loading, addToCart, refreshCart, handleWishlist, isInWishlist }
}
