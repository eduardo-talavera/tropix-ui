/// <reference types="vitest" />
import { coverageConfigDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import dts from 'vite-plugin-dts'


const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    dts({ rollupTypes: true })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
        exclude: [
          '**/storybook-static/**',
          '**/theme/**',
          '**/*.stories.tsx',
          '**/*.styles.ts',
           ...coverageConfigDefaults.exclude
        ]
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'tropix-ui',
      fileName: 'tropix-ui',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDom',
          'react/jsx-runtime': 'react/jsx-runtime'
        }
      }
    },
  },
})
