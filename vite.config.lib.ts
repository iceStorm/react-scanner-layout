import { join, resolve } from 'path'

import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'
import cssInjection from 'vite-plugin-css-injected-by-js'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { readFileSync, writeFileSync } from 'fs'

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
  console.log('Successfully incremented library version for PUBLISH mode.')
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    dts({
      entryRoot: 'src/lib',
      tsConfigFilePath: join(__dirname, 'tsconfig.json'),
      skipDiagnostics: true,
      include: ['src/lib/index.ts', 'src/lib/menu-items/index.ts'],
    }),
    cssInjection(),
    viteStaticCopy({
      targets: [
        {
          src: './package.json',
          dest: '.',
          transform: (content, _filename) => {
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
    emptyOutDir: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: {
        index: './src/lib/index.ts',
        menu: './src/lib/menu-items/index.ts',
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
})
