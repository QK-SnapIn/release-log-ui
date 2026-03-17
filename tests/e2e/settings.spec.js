import { test, expect } from '@playwright/test';
import { loginTestUser } from './helpers.js';

test.describe('Settings — Authenticated', () => {
  test.beforeEach(async ({ page }) => {
    await loginTestUser(page);
    await page.goto('http://localhost:5173/settings');
    await expect(page.locator('h1:has-text("Settings")')).toBeVisible({ timeout: 10000 });
  });

  test('should show all tabs', async ({ page }) => {
    await expect(page.locator('button:has-text("Basic Info")')).toBeVisible();
    await expect(page.locator('button:has-text("Projects")')).toBeVisible();
    await expect(page.locator('button:has-text("Plans & Billing")')).toBeVisible();
    await expect(page.locator('button:has-text("Usage Metrics")')).toBeVisible();
    await expect(page.locator('button:has-text("LLM Keys")')).toBeVisible();
  });

  test('should switch to Plans & Billing tab', async ({ page }) => {
    await page.click('button:has-text("Plans & Billing")');
    await expect(page.locator('text=Choose a Plan')).toBeVisible({ timeout: 5000 });
  });

  test('should show billing toggles in Plans & Billing', async ({ page }) => {
    await page.click('button:has-text("Plans & Billing")');
    await expect(page.locator('button:has-text("Monthly")')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('button:has-text("Annual")')).toBeVisible();
  });

  test('should switch to Usage Metrics tab', async ({ page }) => {
    await page.click('button:has-text("Usage Metrics")');
    await expect(page.locator('text=Total Tokens Used').or(page.locator('text=Generations')).first()).toBeVisible({ timeout: 5000 });
  });

  test('should switch to LLM Keys tab', async ({ page }) => {
    await page.click('button:has-text("LLM Keys")');
    await expect(page.locator('text=OpenAI').or(page.locator('text=Anthropic')).first()).toBeVisible({ timeout: 5000 });
  });

  test('should switch to Projects tab', async ({ page }) => {
    await page.click('button:has-text("Projects")');
    await expect(page.locator('text=My Project').first()).toBeVisible({ timeout: 5000 });
  });
});
