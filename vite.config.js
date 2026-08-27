import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
    // Local dev only: forwards /api/* calls to `vercel dev` (which serves
    // api/nova-ai.js) running on port 3001, so `npm run dev` can be used for
    // the frontend as usual without vercel.json's SPA rewrite rule
    // interfering with Vite's own dev-server files (main.jsx, @react-refresh,
    // etc). Start the two together with: vercel dev --listen 3001  (in one
    // terminal) and  npm run dev  (in another).
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})