import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080',
      '/user': 'http://localhost:8080',
      '/categories': 'http://localhost:8080',
    }
  }
})
