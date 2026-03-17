import pg from 'pg';

const API_URL = 'http://localhost:3000';
const DB_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/release_notes';

// Track all test emails for cleanup
const createdTestEmails = [];

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
    createdTestEmails.push(user.email);

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

/**
 * Track an email for cleanup (use in tests that create additional users)
 */
export function trackTestEmail(email) {
  createdTestEmails.push(email);
}

/**
 * Clean up all test data from the database.
 * Call this in globalTeardown or at the end of the test suite.
 */
export async function cleanupTestData() {
  const pool = new pg.Pool({ connectionString: DB_URL });
  try {
    // Delete all test users and their cascading data (tokens, release_notes, projects, etc.)
    // Users table has ON DELETE CASCADE on all related tables
    if (createdTestEmails.length > 0) {
      const placeholders = createdTestEmails.map((_, i) => `$${i + 1}`).join(', ');
      const result = await pool.query(
        `DELETE FROM users WHERE email IN (${placeholders}) RETURNING email`,
        createdTestEmails
      );
      console.log(`Cleaned up ${result.rowCount} test users: ${result.rows.map(r => r.email).join(', ')}`);
    }

    // Also clean up any leftover test emails matching the pattern
    const patternResult = await pool.query(
      `DELETE FROM users WHERE email LIKE '%@releaslyy-test.com' RETURNING email`
    );
    if (patternResult.rowCount > 0) {
      console.log(`Cleaned up ${patternResult.rowCount} additional test users by pattern`);
    }

    // Clean up OTPs for test emails
    await pool.query(`DELETE FROM email_otps WHERE email LIKE '%@releaslyy-test.com'`);
    await pool.query(`DELETE FROM email_otps WHERE email LIKE '%@test.com'`);

    // Clean up token usage from test users (already cascaded via user delete, but just in case)
    await pool.query(`DELETE FROM token_usage WHERE user_id NOT IN (SELECT id FROM users)`);

  } catch (err) {
    console.error('Cleanup failed:', err.message);
  } finally {
    await pool.end();
  }
}
