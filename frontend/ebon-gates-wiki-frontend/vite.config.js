import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 2222,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
    hmr: {
      // Ensure HMR is enabled
      protocol: 'ws',
      host: 'localhost',
      port: 2222,
    },
  },
  optimizeDeps: {
    include: ['react-router-dom'],
  },
  define: {
    global: 'window',
  }
})
