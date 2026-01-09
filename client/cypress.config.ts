import { defineConfig } from 'cypress';
import { mergeConfig } from 'vite';
import viteConfig from './vite.config';

export default defineConfig({
  retries: {
    runMode: 2,
    openMode: 0
  },
  fixturesFolder: 'cypress/fixtures',
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  downloadsFolder: 'cypress/downloads',
  e2e: {
    baseUrl: 'http://localhost:5181',
    supportFile: 'cypress/support/e2e.ts',
    supportFolder: 'cypress/support',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push('--disable-gpu');
          return launchOptions;
        }
      });
    },
    env: {
      apiUrl: 'http://localhost:3001',
      NODE_ENV: 'test'
    }
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: () => mergeConfig(viteConfig, { server: { port: 5181 } })
    },
    supportFile: 'cypress/support/component.ts',
    supportFolder: 'cypress/support'
  }
});
