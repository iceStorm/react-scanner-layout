import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    //
    basicSsl(),
  ],

  server: {
    port: 7502,
    host: true,
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
