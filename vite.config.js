import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined

          if (id.includes('xlsx')) return 'xlsx'
          if (id.includes('@heroui') || id.includes('framer-motion')) return 'ui'
          if (id.includes('zustand')) return 'state'

          return 'vendor'
        },
      },
    },
  },
})
