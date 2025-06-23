/// <reference types="vitest" />
import { coverageConfigDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { dirname, extname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'
import dts from 'vite-plugin-dts'


const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    dts({ 
      include: 'lib',
      exclude: [
        'lib/**/*.stories.tsx', 
        'lib/**/*.test.tsx', 
        '**/lib/components/DataTable/**'
      ],
      //rollupTypes: true
    })
  ],
  resolve: {
      alias: {
      '@': fileURLToPath(new URL('./lib', import.meta.url)),
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
           ...coverageConfigDefaults.exclude
        ]
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es', 'cjs'],
      name: 'tropix-ui',
      fileName: 'tropix-ui',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      input: Object.fromEntries(
        glob
          .sync('lib/**/*.{ts,tsx}', {
            ignore: [
              'lib/**/*.d.ts', 
              'lib/**/*.stories.tsx', 
              'lib/**/*.test.tsx',
              '**/lib/components/DataTable/**'
            ],
          })
          .map(file => [
            relative('lib', file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
      ]),
    ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
        globals: {
          react: 'React',
          'react-dom': 'ReactDom',
          'react/jsx-runtime': 'react/jsx-runtime'
        }
      }
    },
  },
})
