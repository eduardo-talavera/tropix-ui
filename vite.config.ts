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
      'lib/**/*.d.ts',
      'lib/**/*.stories.tsx',
      'lib/**/*.test.tsx',
      '**/lib/components/DataTable/**',
    ],
  }).map((file) => [
    relative('lib', file.slice(0, file.length - extname(file).length)),
    fileURLToPath(new URL(file, import.meta.url)),
  ])
)

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: 'lib',
      exclude: [
        'lib/**/*.stories.tsx',
        'lib/**/*.test.tsx',
        '**/lib/components/DataTable/**',
      ],
      outDir: 'dist/types',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'lib'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      exclude: [
        '**/storybook-static/**',
        '**/theme/**',
        '**/utils/**',
        '**/lib/components/DataTable/**',
        '**/*.stories.tsx',
        '**/*.styles.ts',
      ],
    },
  },
  build: {
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      input: entries,
      output: [
        {
          format: 'es',
          dir: 'dist/esm',
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name][extname]',
        },
        {
          format: 'cjs',
          dir: 'dist/cjs',
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name][extname]',
          exports: 'named',
        },
      ],
    },
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true,
  },
})
