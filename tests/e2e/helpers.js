import pg from 'pg';

const API_URL = 'http://localhost:3000';
const DB_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/release_notes';

// Reusable test credentials — created once, reused across tests
let testUser = null;

export async function getTestUser() {
  if (testUser) return testUser;

  testUser = {
    name: 'E2E Test User',
    email: `e2e-${Date.now()}@releaslyy-test.com`,
    password: 'TestPass123!',
  };
  return testUser;
}

/**
 * Sign up and verify a test user via API, then login via browser.
 * Call this in test.beforeAll or the first test of a describe block.
 */
export async function loginTestUser(page) {
  const user = await getTestUser();

  // Check if already on dashboard (already logged in)
  const currentUrl = page.url();
  if (currentUrl.includes('/dashboard')) return user;

  // Try to signup (may already exist from a previous run)
  const signupRes = await page.request.post(`${API_URL}/auth/signup`, {
    data: { name: user.name, email: user.email, password: user.password },
  });

  if (signupRes.ok()) {
    // Get OTP and verify
    const pool = new pg.Pool({ connectionString: DB_URL });
    try {
      const { rows } = await pool.query(
        'SELECT otp_code FROM email_otps WHERE email = $1 AND used = false ORDER BY created_at DESC LIMIT 1',
        [user.email]
      );
      if (rows.length > 0) {
        await page.request.post(`${API_URL}/auth/verify-otp`, {
          data: { email: user.email, otp: rows[0].otp_code },
        });
      }
    } finally {
      await pool.end();
    }
  }

  // Login via browser
  await page.goto('http://localhost:5173/login');
  await page.fill('input[placeholder="you@example.com"]', user.email);
  await page.fill('input[placeholder="Your password"]', user.password);
  await page.click('button:has-text("Sign in")');
  await page.waitForURL(/dashboard/, { timeout: 15000 });

  return user;
}
