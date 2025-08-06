/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve, dirname, extname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'
import fs from 'fs';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url))

const entries = Object.fromEntries(
  glob.sync('lib/**/*.{ts,tsx}', {
    ignore: [
      '**/*.d.ts',
      '**/*.stories.tsx',
      '**/*.test.tsx',
      '**/components/DataTable/**',
      '**/utils/**'
    ],
  }).map(file => [
    relative('lib', file.slice(0, file.length - extname(file).length)),
    fileURLToPath(new URL(file, import.meta.url)),
  ])
)

function postInjectUseClient() {
  return {
    name: 'post-inject-use-client',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist/esm');

      const processFile = (filePath: string) => {
        const code = fs.readFileSync(filePath, 'utf-8');
        if (!code.startsWith('"use client"') && code.includes('useState')) {
          const newCode = `"use client";\n${code}`;
          fs.writeFileSync(filePath, newCode, 'utf-8');
          console.log(`✅ Injected "use client" into ${filePath}`);
        }
      };

      const walk = (dir: string) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const fullPath = path.join(dir, file);
          if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
          } else if (file.endsWith('.js')) {
            processFile(fullPath);
          }
        }
      };

      walk(distDir);
    }
  };
}

export default defineConfig({
  // Build CJS
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
    postInjectUseClient()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'lib'),
    },
  },
  build: {
    outDir: 'dist/cjs',
     lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['cjs'],
    },
    rollupOptions: {
      //preserveEntrySignatures: 'exports-only',
      input: entries,
      external: [
          'react', 
          'react-dom', 
          'react/jsx-runtime',
          '@emotion/react',
          '@emotion/styled',
          '@emotion/react/jsx-runtime'
      ],
      output: {
        //format: 'cjs',
        // preserveModules: true,
        // preserveModulesRoot: 'lib',
        entryFileNames: '[name].cjs',
        exports: 'named',
      },
    },
  },
})

