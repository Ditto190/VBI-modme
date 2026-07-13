import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: `assets/entry.js`,
        chunkFileNames: `assets/chunk-[name]-[hash].js`,
        assetFileNames: `assets/index.[ext]`,
      },
    },
  },
})
