import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [
    react(),
    // Compile-time image pipeline: emits resized WebP/AVIF variants and lets us
    // import ready-made `srcset` strings (see src/types/imagetools.d.ts).
    imagetools({
      removeMetadata: true,
    }),
  ],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Split vendor code so app changes don't bust the vendor cache.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (
            id.includes('framer-motion') ||
            id.includes('motion-dom') ||
            id.includes('motion-utils')
          ) {
            return 'motion'
          }
          if (id.includes('lucide-react')) return 'icons'
          if (id.includes('react-dom') || id.includes('scheduler') || id.includes('/react/')) {
            return 'react-vendor'
          }
        },
      },
    },
  },
})
