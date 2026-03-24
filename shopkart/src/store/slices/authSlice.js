import { createSlice } from '@reduxjs/toolkit'

// ── JWT payload decoder (no library needed) ───────────────────────────────────
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch { return null }
}

function loadFromStorage() {
  const token = localStorage.getItem('token')
  if (!token) return { token: null, user: null }
  const payload = parseJwt(token)
  if (!payload || Date.now() / 1000 > payload.exp) {
    localStorage.clear()
    return { token: null, user: null }
  }
  const stored = JSON.parse(localStorage.getItem('user') || 'null')
  return { token, user: stored }
}

const initial = loadFromStorage()

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initial.token,
    user:  initial.user,       // { id, name, email, role }
    loading: false,
  },
  reducers: {
    loginSuccess(state, { payload }) {
    state.token = payload.token
    state.user  = payload.user
    console.log('User saved:', payload.user) // ← id hai?
    localStorage.setItem('token', payload.token)
    localStorage.setItem('user', JSON.stringify(payload.user))
},
    logout(state) {
      state.token = null
      state.user  = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    setLoading(state, { payload }) { state.loading = payload },
  },
})

export const { loginSuccess, logout, setLoading } = authSlice.actions

// Selectors
export const selectUser       = (s) => s.auth.user
export const selectToken      = (s) => s.auth.token
export const selectIsLoggedIn = (s) => !!s.auth.token
export const selectIsAdmin    = (s) => s.auth.user?.role === 'ROLE_ADMIN'

export default authSlice.reducer
