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
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: [
        'react', 
        'react-dom', 
        'react/jsx-runtime',
        /node_modules/
      ],
      preserveEntrySignatures: 'allow-extension',
      input: entries,
      output: [
        {
          format: 'esm',
          dir: 'dist/esm',
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name][extname]',
          preserveModules: true,
          preserveModulesRoot: 'lib',
          exports: 'named',
        },
        {
          format: 'commonjs',
          dir: 'dist/cjs',
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name][extname]',
          preserveModules: true,
          preserveModulesRoot: 'lib',
          exports: 'named'
        },
      ],
    }
  },
})
