import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { cartService } from '../../services/endpoints'
import toast from 'react-hot-toast'

// Fetch cart from backend
export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
  const res = await cartService.getCart(userId)
  return res.data  // [{id, user, product:{id,name,price,...}, quantity}, ...]
})

// Add to cart (backend)
export const addToCartAsync = createAsyncThunk(
  'cart/add',
  async ({ userId, productId, quantity }, { dispatch }) => {
    await cartService.add(userId, productId, quantity)
    dispatch(fetchCart(userId))
    toast.success('Added to cart!')
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],      // backend cart items
    loading: false,
    // local wishlist (persisted in localStorage)
    wishlist: JSON.parse(localStorage.getItem('wishlist') || '[]'),
  },
  reducers: {
    // Local-only quantity adjust (optimistic)
    updateLocalQty(state, { payload: { id, qty } }) {
      const item = state.items.find(i => i.id === id)
      if (item) item.quantity = qty
    },
    toggleWishlist(state, { payload: product }) {
      const idx = state.wishlist.findIndex(p => p.id === product.id)
      if (idx >= 0) {
        state.wishlist.splice(idx, 1)
        toast('Removed from wishlist', { icon: '💔' })
      } else {
        state.wishlist.push(product)
        toast.success('Added to wishlist!')
      }
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist))
    },
    clearCart(state) { state.items = [] },
  },
  extraReducers: (b) => {
    b.addCase(fetchCart.pending,  (s) => { s.loading = true })
    b.addCase(fetchCart.fulfilled,(s, { payload }) => { 
    s.loading = false
    s.items = Array.isArray(payload) ? payload : []
})
    b.addCase(fetchCart.rejected, (s) => { s.loading = false })
  },
})

export const { updateLocalQty, toggleWishlist, clearCart } = cartSlice.actions

export const selectCartItems    = (s) => s.cart.items
export const selectCartCount = (s) => Array.isArray(s.cart.items) ? s.cart.items.reduce((a, i) => a + i.quantity, 0) : 0
export const selectCartTotal = (s) => Array.isArray(s.cart.items) 
    ? s.cart.items.reduce((a, i) => a + i.price * i.quantity, 0) : 0
export const selectWishlist     = (s) => s.cart.wishlist
export const selectCartLoading  = (s) => s.cart.loading

export default cartSlice.reducer
