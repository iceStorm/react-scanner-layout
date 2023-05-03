import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import basicSsl from '@vitejs/plugin-basic-ssl'
import wasm from 'vite-plugin-wasm'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    //
    wasm(),
    basicSsl(),
  ],

  server: {
    port: 7502,
    host: true,
  },
  preview: {
    port: 7501,
  },

  build: {
    outDir: './dist/demo',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        demo: 'index.html',
      },
    },
  },
})
