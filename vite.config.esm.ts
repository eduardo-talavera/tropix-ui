
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve, dirname, extname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Mapeamos todos los archivos de entrada
const entries = Object.fromEntries(
  glob.sync('lib/**/*.{ts,tsx}', {
    ignore: [
      '**/*.d.ts',
      '**/*.stories.tsx',
      '**/*.test.tsx',
      '**/components/DataTable/**',
    ],
  }).map(file => [
    relative('lib', file.slice(0, file.length - extname(file).length)),
    fileURLToPath(new URL(file, import.meta.url)),
  ])
)

export default defineConfig({
  // Build ESM
    plugins: [
      react(),
      dts({
        include: 'lib',
        exclude: [
          '**/*.stories.tsx', 
          '**/*.test.tsx', 
          '**/lib/components/DataTable/**'
        ],
        outDir: 'dist/types',
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'lib'),
      },
    },
    build: {
      outDir: 'dist/esm',
      lib: {
        entry: resolve(__dirname, 'lib/main.ts'),
        formats: ['es'],
      },
      rollupOptions: {
        input: entries,
        external: [
          'react', 
          'react-dom', 
          'react/jsx-runtime',
          '@emotion/react',
          '@emotion/styled'
        ],
        output: {
          entryFileNames: '[name].js',
        },
      },
    },
})
