import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import { configDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [react(), svgr()],
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
        functions: 60,
        branches: 61,
        statements: 0,
      },
    },
  },
})
