import { createSlice } from '@reduxjs/toolkit'

const darkMode = localStorage.getItem('darkMode') === 'true'
if (darkMode) document.documentElement.classList.add('dark')

const uiSlice = createSlice({
  name: 'ui',
  initialState: { darkMode },
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
      localStorage.setItem('darkMode', state.darkMode)
      document.documentElement.classList.toggle('dark', state.darkMode)
    },
  },
})

export const { toggleDarkMode } = uiSlice.actions
export const selectDarkMode = (s) => s.ui.darkMode
export default uiSlice.reducer
