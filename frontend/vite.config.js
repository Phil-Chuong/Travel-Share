import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Local development port
    proxy: {
      // '/api': 'http://localhost:4000', // Development API endpoint
      '/api': 'https://travel-share-backend-11c4.onrender.com'
    },
  },
  // Set base URL depending on environment (useful in production)
  build: {
    outDir: 'dist',
  },
  define: {
    'process.env': {
      VITE_API_URL: process.env.VITE_API_URL || 'https://travel-share-backend-11c4.onrender.com', // Set backend URL for production
    },
  },
})

