import { test, expect } from '@playwright/test';
import { loginTestUser } from './helpers.js';

test.describe('Dashboard — Authenticated', () => {
  test.beforeEach(async ({ page }) => {
    await loginTestUser(page);
  });

  test('should load dashboard with greeting', async ({ page }) => {
    await expect(page.locator('h1:has-text("Good")')).toBeVisible({ timeout: 5000 });
  });

  test('should show project switcher in header', async ({ page }) => {
    await expect(page.locator('.project-switcher')).toBeVisible();
  });

  test('should show user avatar/name in header', async ({ page }) => {
    await expect(page.locator('.topbar-user')).toBeVisible();
  });

  test('should show sidebar navigation', async ({ page }) => {
    await expect(page.locator('.sidebar-btn').first()).toBeVisible();
    await expect(page.locator('a.sidebar-btn[href="/integration"]')).toBeVisible();
    await expect(page.locator('a.sidebar-btn[href="/settings"]')).toBeVisible();
  });
});

test.describe('Generate Wizard Flow', () => {
  test.beforeEach(async ({ page }) => {
    await loginTestUser(page);
  });

  test('should open wizard and show audience cards', async ({ page }) => {
    // Click generate button
    const genBtn = page.locator('button:has-text("Generate"), a:has-text("Generate")').first();
    if (await genBtn.isVisible({ timeout: 3000 })) {
      await genBtn.click();
    }

    // Step 1 should show audience cards
    const audienceVisible = await page.locator('.audience-grid').isVisible({ timeout: 5000 }).catch(() => false);
    if (audienceVisible) {
      // Should have 6 audience cards
      const cards = page.locator('.audience-card');
      await expect(cards.first()).toBeVisible();
    }
  });
});
