import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { store } from './store'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: { fontFamily: 'Outfit, sans-serif', borderRadius: '12px', fontSize: '14px' },
        success: { iconTheme: { primary: '#f97316', secondary: '#fff' } },
      }}
    />
  </Provider>
)
