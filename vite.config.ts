
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [
      react()
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
        include: ['**/lib/**'],
        exclude: [
          '**/theme/**',
          '**/utils/**',
          '**/lib/components/DataTable/**',
          '**/lib/main.ts',
          '**/*.stories.tsx',
          '**/*.styles.ts',
          '**/*.d.ts'
        ],
      },
    }
})
