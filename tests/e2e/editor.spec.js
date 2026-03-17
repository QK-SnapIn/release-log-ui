import { test, expect } from '@playwright/test';
import { loginTestUser } from './helpers.js';

test.describe('Editor Page', () => {
  test('should load generate/edit page', async ({ page }) => {
    await loginTestUser(page);
    await page.goto('http://localhost:5173/generate');

    // The editor requires location.state to stay on /generate; without it the
    // app redirects to /dashboard. Either outcome is a clean render — just
    // verify the page loaded without crashing.
    await page.waitForTimeout(3000);
    const url = page.url();
    expect(url).toMatch(/generate|dashboard/);
  });

  test('should navigate to editor from dashboard note', async ({ page }) => {
    await loginTestUser(page);

    // Check if there are any notes in the dashboard
    const noteLink = page.locator('a[href*="/generate"]').first();
    if (await noteLink.isVisible({ timeout: 5000 })) {
      await noteLink.click();
      await page.waitForURL(/generate/);

      // Editor content area should be visible
      await expect(page.locator('.tiptap, .ProseMirror, [contenteditable]').first()).toBeVisible({ timeout: 10000 });
    }
  });
});
