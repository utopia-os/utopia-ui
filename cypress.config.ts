import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { defineConfig } from 'cypress'

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config)

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    }),
  )

  return config
}

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: ['**/**/*.cy.{ts,tsx}'],
  },
  e2e: {
    baseUrl: 'http://localhost:5173',
    chromeWebSecurity: false,
    retries: 0,
    specPattern: 'features/**/*.feature',
    supportFile: false,
    video: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents,
  },
})
