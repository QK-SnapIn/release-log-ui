import { test, expect } from '@playwright/test';

test.describe('Mobile Responsive', () => {
  test.use({ viewport: { width: 375, height: 812 } }); // iPhone viewport

  test('landing page renders on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Releaslyy/);
    // Hero text should still be visible
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('login page renders on mobile', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('text=Welcome!')).toBeVisible();
    await expect(page.locator('input[placeholder="you@example.com"]')).toBeVisible();
    // Right side feature showcase should be hidden
    await expect(page.locator('.login-right')).not.toBeVisible();
  });

  test('signup page renders on mobile', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.locator('text=Create your account')).toBeVisible();
    await expect(page.locator('input[placeholder="Your name"]')).toBeVisible();
  });

  test('pricing page renders on mobile', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page).toHaveTitle(/Pricing/);
  });

  test('integrations page renders on mobile', async ({ page }) => {
    await page.goto('/integrations');
    await expect(page.locator('h1').first()).toBeVisible();
  });
});

test.describe('Tablet Responsive', () => {
  test.use({ viewport: { width: 768, height: 1024 } }); // iPad viewport

  test('landing page renders on tablet', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Releaslyy/);
  });

  test('pricing page renders on tablet', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page).toHaveTitle(/Pricing/);
  });
});
