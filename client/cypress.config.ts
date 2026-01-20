import { defineConfig } from 'cypress';
import { mergeConfig } from 'vite';
import viteConfig from './vite.config';
import jwt from 'jsonwebtoken';

export default defineConfig({
  reporter: 'spec',
  retries: {
    runMode: 2,
    openMode: 0
  },
  fixturesFolder: 'cypress/fixtures',
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  downloadsFolder: 'cypress/downloads',
  e2e: {
    baseUrl: 'http://localhost:5174',
    supportFile: 'cypress/support/e2e.ts',
    supportFolder: 'cypress/support',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    experimentalInteractiveRunEvents: true,
    setupNodeEvents(on, config) {
      // Disable problematic shell spawning on Windows
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--no-sandbox');
          return launchOptions;
        }
        if (browser.name === 'electron') {
          launchOptions.preferences.webPreferences = {
            ...launchOptions.preferences.webPreferences,
            sandbox: false
          };
          return launchOptions;
        }
      });

      on('task', {
        signJwt({ payload, secret }: { payload: Record<string, unknown>; secret: string }) {
          return jwt.sign(payload, secret, { expiresIn: '1h' });
        },
      });

      return config;
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
