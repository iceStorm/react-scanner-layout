import { join } from 'path'

import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/main.tsx',
      name: 'lib',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      input: {
        demo: 'index.html',
      },
    },
  },
})
