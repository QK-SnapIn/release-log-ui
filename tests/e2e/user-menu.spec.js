import { test, expect } from '@playwright/test';
import { loginTestUser } from './helpers.js';

test.describe('User Menu — Authenticated', () => {
  test.beforeEach(async ({ page }) => {
    await loginTestUser(page);
  });

  test('should show user dropdown on click', async ({ page }) => {
    await expect(page.locator('.topbar-user')).toBeVisible();
    await page.click('.topbar-user');
    await expect(page.locator('.topbar-dropdown')).toBeVisible({ timeout: 3000 });
  });

  test('should show logout option', async ({ page }) => {
    await page.click('.topbar-user');
    await expect(page.locator('button:has-text("Logout")')).toBeVisible({ timeout: 3000 });
  });

  test('should show project switcher', async ({ page }) => {
    await expect(page.locator('.project-switcher-btn')).toBeVisible();
    await page.click('.project-switcher-btn');
    await expect(page.locator('.project-switcher-dropdown')).toBeVisible({ timeout: 3000 });
    await expect(page.locator('.project-switcher-opt-name').first()).toBeVisible();
  });

  test('should show new project option', async ({ page }) => {
    await page.click('.project-switcher-btn');
    await expect(page.locator('button:has-text("New Project")')).toBeVisible({ timeout: 3000 });
  });
});
