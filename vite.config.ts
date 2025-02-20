import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['setupTest.ts'],
    coverage: {
      all: true,
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [...configDefaults.exclude],
      thresholds: {
        lines: 0,
        functions: 65,
        branches: 66,
        statements: 0,
      },
    },
  },
})
