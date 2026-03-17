import { test, expect } from '@playwright/test';
import { loginTestUser, getTestUser } from './helpers.js';

test.describe('Password Change', () => {
  test('should show password fields in settings', async ({ page }) => {
    await loginTestUser(page);
    await page.goto('http://localhost:5173/settings');
    await expect(page.locator('h1:has-text("Settings")')).toBeVisible({ timeout: 10000 });

    // Password section should be visible
    await expect(page.locator('text=Password').first()).toBeVisible({ timeout: 5000 });
  });

  test('should show set/change password form', async ({ page }) => {
    await loginTestUser(page);
    await page.goto('http://localhost:5173/settings');
    await expect(page.locator('h1:has-text("Settings")')).toBeVisible({ timeout: 10000 });

    // Wait for the API to resolve hasPassword state and render the form fields
    await expect(page.locator('input[type="password"]').first()).toBeVisible({ timeout: 10000 });
    const passwordInputs = page.locator('input[type="password"]');
    const count = await passwordInputs.count();
    expect(count).toBeGreaterThan(0);
  });
});
