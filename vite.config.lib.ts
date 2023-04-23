import { join } from 'path'

import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import cssInjection from 'vite-plugin-css-injected-by-js'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    dts({
      entryRoot: 'src/lib',
      tsConfigFilePath: join(__dirname, 'tsconfig.json'),
      skipDiagnostics: true,
    }),
    cssInjection(),
  ],

  build: {
    outDir: './dist/lib',
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/lib/index.ts',
      name: 'types',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [
        // framework
        'react',
        'react-dom',
        'react/jsx-runtime',

        // third parties
        'zustand',
        'framer-motion',
        'react-webcam',
      ],
    },
  },
})
