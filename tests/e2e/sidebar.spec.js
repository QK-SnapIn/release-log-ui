import { test, expect } from '@playwright/test';
import { loginTestUser } from './helpers.js';

test.describe('Sidebar Navigation — Authenticated', () => {
  test.beforeEach(async ({ page }) => {
    await loginTestUser(page);
  });

  test('should show sidebar links', async ({ page }) => {
    await expect(page.locator('.sidebar-btn').first()).toBeVisible();
    await expect(page.locator('a.sidebar-btn[href="/integration"]')).toBeVisible();
    await expect(page.locator('a.sidebar-btn[href="/settings"]')).toBeVisible();
  });

  test('should navigate to integration page', async ({ page }) => {
    await page.click('a.sidebar-btn[href="/integration"]');
    await page.waitForURL(/integration/);
    await expect(page.locator('span:has-text("GitHub")').first()).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to settings page', async ({ page }) => {
    await page.click('a.sidebar-btn[href="/settings"]');
    await page.waitForURL(/settings/);
    await expect(page.locator('h1:has-text("Settings")')).toBeVisible({ timeout: 10000 });
  });

  test('should navigate back to dashboard', async ({ page }) => {
    await page.click('a.sidebar-btn[href="/settings"]');
    await page.waitForURL(/settings/);
    await page.click('a.sidebar-btn[href="/dashboard"]');
    await page.waitForURL(/dashboard/);
    await expect(page.locator('h1:has-text("Good")')).toBeVisible({ timeout: 10000 });
  });
});
