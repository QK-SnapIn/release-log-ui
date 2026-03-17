import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60000,
  retries: 1,
  workers: 1,
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 10000,
  },
  projects: [
    {
      name: 'tests',
      use: { browserName: 'chromium' },
      testIgnore: /global-(setup|teardown)\.spec\.js/,
    },
    {
      name: 'cleanup',
      testMatch: /global-teardown\.spec\.js/,
      dependencies: ['tests'],
    },
  ],
});
