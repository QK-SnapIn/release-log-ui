import { test as setup, expect } from '@playwright/test';
import pg from 'pg';

const TEST_USER = {
  name: 'E2E Test User',
  email: `e2e-test-${Date.now()}@releaslyy-test.com`,
  password: 'TestPass123!',
};

const API_URL = 'http://localhost:3000';
const DB_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/release_notes';

setup('create test account and authenticate', async ({ page, context }) => {
  // Step 1: Sign up via API
  const signupRes = await page.request.post(`${API_URL}/auth/signup`, {
    data: {
      name: TEST_USER.name,
      email: TEST_USER.email,
      password: TEST_USER.password,
    },
  });
  expect(signupRes.ok(), `Signup failed: ${await signupRes.text()}`).toBeTruthy();

  // Step 2: Get OTP from database using node-postgres
  const pool = new pg.Pool({ connectionString: DB_URL });
  const { rows } = await pool.query(
    'SELECT otp_code FROM email_otps WHERE email = $1 AND used = false ORDER BY created_at DESC LIMIT 1',
    [TEST_USER.email]
  );
  expect(rows.length, 'OTP not found in database').toBeGreaterThan(0);
  const otp = rows[0].otp_code;
  await pool.end();

  // Step 3: Verify OTP via API
  const verifyRes = await page.request.post(`${API_URL}/auth/verify-otp`, {
    data: { email: TEST_USER.email, otp },
  });
  expect(verifyRes.ok(), `Verify OTP failed: ${await verifyRes.text()}`).toBeTruthy();

  // Step 4: Login via browser to get session cookies
  await page.goto('http://localhost:5173/login');
  await page.fill('input[placeholder="you@example.com"]', TEST_USER.email);
  await page.fill('input[placeholder="Your password"]', TEST_USER.password);
  await page.click('button:has-text("Sign in")');

  // Wait for redirect to dashboard
  await page.waitForURL(/dashboard/, { timeout: 15000 });
  await expect(page.locator('text=Good')).toBeVisible({ timeout: 10000 });

  // Step 5: Save auth state
  await context.storageState({ path: 'tests/e2e/.auth/user.json' });

  console.log(`Test user created and authenticated: ${TEST_USER.email}`);
});
