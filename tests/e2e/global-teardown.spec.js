import { test } from '@playwright/test';
import pg from 'pg';

const DB_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/release_notes';

test('cleanup: delete all test data', async () => {
  const pool = new pg.Pool({ connectionString: DB_URL });
  try {
    // Delete all test users (CASCADE deletes tokens, release_notes, projects, subscriptions, etc.)
    const userResult = await pool.query(
      `DELETE FROM users WHERE email LIKE '%@releaslyy-test.com' OR email LIKE 'e2e-%' OR email LIKE 'signup-flow-%@test.com' OR email LIKE 'unverified-%@test.com' RETURNING email`
    );
    console.log(`Deleted ${userResult.rowCount} test users`);

    // Delete orphaned OTPs from test runs
    const otpResult = await pool.query(
      `DELETE FROM email_otps WHERE email LIKE '%@releaslyy-test.com' OR email LIKE '%@test.com' OR email LIKE 'e2e-%'`
    );
    console.log(`Deleted ${otpResult.rowCount} test OTPs`);

    // Delete orphaned token_usage records
    await pool.query(`DELETE FROM token_usage WHERE user_id NOT IN (SELECT id FROM users)`);

    // Delete test release notes
    await pool.query(`DELETE FROM release_notes WHERE title LIKE 'E2E Test%'`);

    console.log('Test data cleanup complete');
  } catch (err) {
    console.error('Cleanup error:', err.message);
  } finally {
    await pool.end();
  }
});
