import { join, resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'

if (process.env.PUBLISH) {
  const packageJsonFile = JSON.parse(
    readFileSync(resolve(__dirname, 'package.json'), { encoding: 'utf8' }),
  )

  const getNewVersion = () => {
    function increment(value: number, remainder = 0) {
      return [Math.trunc((value + 1 + remainder) / 10), (value + 1 + remainder) % 10]
    }

    // major, minor, patch
    const versionSegments = packageJsonFile.version.split('.') as string[]
    const newVersionSegments = new Array<number>()

    for (let index = versionSegments.length - 1, remainder = 0; index >= 0; --index) {
      const element = parseInt(versionSegments[index])
      let finalValue = element

      // increment the patch version and the rest if possible
      if (index === versionSegments.length - 1 || remainder > 0) {
        const [_remainder, newValue] = increment(element, remainder)
        finalValue = newValue
        remainder = _remainder
      }

      newVersionSegments.unshift(finalValue)
    }

    return newVersionSegments.join('.')
  }

  const newVersion = getNewVersion()
  packageJsonFile.version = newVersion

  writeFileSync('./package.json', JSON.stringify(packageJsonFile, null, 2))
  console.log('Successfully incremented library version for PUBLISH mode:', newVersion)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: 'src/lib',
      tsConfigFilePath: join(__dirname, 'tsconfig.json'),
      skipDiagnostics: true,
      insertTypesEntry: true,
      // include: ['src/lib/components/**/*.{ts,tsx}', 'src/lib/menus/**/*.{ts,tsx}'],
      // exclude: ['./src/lib/store/**/*.{ts,tsx}'],
    }),
    // cssInjection(),
    viteStaticCopy({
      targets: [
        {
          src: './package.json',
          dest: '.',
          transform: (content) => {
            const json = JSON.parse(content)
            delete json['scripts']
            delete json['devDependencies']

            return JSON.stringify(json, null, 2)
          },
        },
      ],
    }),
  ],

  build: {
    outDir: './dist/lib',
    copyPublicDir: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: {
        index: './src/lib/components/ReactScannerLayout/index.ts',
        menu: './src/lib/menus/index.ts',
      },
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
        'immer',
        'lodash',
        'zustand',
        'react-webcam',
        'framer-motion',
        '@headlessui/react',
      ],
      output: {
        // preserveModules: true,
      },
    },
  },

  resolve: {
    alias: [
      {
        find: '~',
        replacement: fileURLToPath(new URL('./src/lib', import.meta.url)),
      },
      {
        find: '~store',
        replacement: fileURLToPath(new URL('./src/lib/store', import.meta.url)),
      },
      {
        find: '~utils',
        replacement: fileURLToPath(new URL('./src/lib/utils', import.meta.url)),
      },
      {
        find: '~menus',
        replacement: fileURLToPath(new URL('./src/lib/menus', import.meta.url)),
      },
      {
        find: '~models',
        replacement: fileURLToPath(new URL('./src/lib/models', import.meta.url)),
      },
      {
        find: '~assets',
        replacement: fileURLToPath(new URL('./src/lib/assets', import.meta.url)),
      },
    ],
  },
})
