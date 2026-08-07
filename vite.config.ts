import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY ?? 'http://localhost:4000',
        changeOrigin: true,
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // If proxying to a remote backend, spoof the Origin to bypass remote CORS restrictions
            if (process.env.VITE_API_PROXY?.includes('http')) {
              proxyReq.setHeader('Origin', process.env.VITE_API_PROXY);
            }
          });
        },
      },
    },
  },
  build: {
    target: 'es2022',
    cssTarget: 'chrome100',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion-vendor': ['framer-motion', 'gsap'],
          'query-vendor': ['@tanstack/react-query', 'axios', 'zustand'],
        },
      },
    },
  },
});
