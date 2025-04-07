import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Frontend port
    proxy: {
      // Proxy API requests to the backend
      '/api': {
        target: 'http://localhost:5000', // Backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
