import { test, expect } from '@playwright/test';
import { loginTestUser } from './helpers.js';

test.describe('Integration Page — Authenticated', () => {
  test.beforeEach(async ({ page }) => {
    await loginTestUser(page);
    await page.goto('http://localhost:5173/integration');
  });

  test('should load integration page', async ({ page }) => {
    await expect(page.locator('text=GitHub').first()).toBeVisible({ timeout: 10000 });
  });

  test('should show GitHub connection option', async ({ page }) => {
    await expect(page.locator('span:has-text("GitHub")').first()).toBeVisible({ timeout: 10000 });
  });

  test('should show Jira connection option', async ({ page }) => {
    await expect(page.locator('span:has-text("Jira")').first()).toBeVisible({ timeout: 10000 });
  });

  test('should show DevRev connection option', async ({ page }) => {
    await expect(page.locator('span:has-text("DevRev")').first()).toBeVisible({ timeout: 10000 });
  });
});
