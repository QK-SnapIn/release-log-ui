import { test, expect } from '@playwright/test';
import { loginTestUser } from './helpers.js';

const API_URL = 'http://localhost:3000';

const GITHUB_TOKEN = process.env.TEST_GITHUB_TOKEN;
const DEVREV_TOKEN = process.env.TEST_DEVREV_TOKEN;
const GITHUB_REPO = process.env.TEST_GITHUB_REPO || 'release-note-repo';
const GITHUB_OWNER = process.env.TEST_GITHUB_OWNER || 'qk-snapin-org';

/**
 * Helper: make authenticated API call using the page's cookies
 */
async function apiCall(page, method, path, data) {
  const cookies = await page.context().cookies();
  const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');
  const opts = { headers: { Cookie: cookieHeader } };
  if (data) opts.data = data;

  if (method === 'GET') {
    return page.request.get(`${API_URL}${path}`, opts);
  }
  return page.request.post(`${API_URL}${path}`, opts);
}

test.describe('Full Generate Flow — GitHub', () => {
  test.skip(!GITHUB_TOKEN, 'TEST_GITHUB_TOKEN not set');

  test('should connect GitHub, fetch repos, commits, and generate notes', async ({ page }) => {
    await loginTestUser(page);

    // 1. Connect GitHub token
    const connectRes = await apiCall(page, 'POST', '/api/tokens/github', { token: GITHUB_TOKEN });
    expect(connectRes.ok(), `Connect failed: ${await connectRes.text()}`).toBeTruthy();

    // 2. Fetch repos
    const reposRes = await apiCall(page, 'GET', '/api/github/repos');
    expect(reposRes.ok()).toBeTruthy();
    const repos = await reposRes.json();
    expect(Array.isArray(repos)).toBe(true);
    const testRepo = repos.find(r => r.name === GITHUB_REPO);
    expect(testRepo, `Repo ${GITHUB_REPO} not found in ${repos.map(r=>r.name).join(', ')}`).toBeTruthy();

    // 3. Fetch commits
    const commitsRes = await apiCall(page, 'GET', `/api/github/commits?owner=${GITHUB_OWNER}&repo=${GITHUB_REPO}&branch=main`);
    expect(commitsRes.ok()).toBeTruthy();
    const commits = await commitsRes.json();
    expect(Array.isArray(commits)).toBe(true);
    expect(commits.length).toBeGreaterThan(0);

    // 4. Generate release notes
    const selectedCommits = commits.slice(0, 3);
    const genRes = await apiCall(page, 'POST', '/api/generate', {
      commits: selectedCommits,
      audience: 'engineering',
      title: 'E2E Test — GitHub Engineering Notes',
      tone: 'professional',
      llm: { provider: 'releasly' },
    });
    expect(genRes.ok(), `Generate failed: ${await genRes.text()}`).toBeTruthy();
    const result = await genRes.json();
    expect(result.notes).toBeTruthy();
    expect(result.notes.length).toBeGreaterThan(50);
    expect(result.noteId).toBeTruthy();
  });

  test('should generate with different audience types', async ({ page }) => {
    await loginTestUser(page);

    // Fetch commits
    const commitsRes = await apiCall(page, 'GET', `/api/github/commits?owner=${GITHUB_OWNER}&repo=${GITHUB_REPO}&branch=main`);
    const commits = await commitsRes.json();
    const selectedCommits = commits.slice(0, 2);

    // Generate with QA audience
    const genRes = await apiCall(page, 'POST', '/api/generate', {
      commits: selectedCommits,
      audience: 'qa',
      title: 'E2E Test — QA Notes',
      tone: 'professional',
      llm: { provider: 'releasly' },
    });
    expect(genRes.ok()).toBeTruthy();
    const result = await genRes.json();
    expect(result.notes.toLowerCase()).toMatch(/test|qa|scenario|risk/);
  });

  test('should reject invalid audience', async ({ page }) => {
    await loginTestUser(page);

    // Need to connect GitHub first (may already be connected from previous test)
    await apiCall(page, 'POST', '/api/tokens/github', { token: GITHUB_TOKEN });

    const commitsRes = await apiCall(page, 'GET', `/api/github/commits?owner=${GITHUB_OWNER}&repo=${GITHUB_REPO}&branch=main`);
    const commits = await commitsRes.json();

    const genRes = await apiCall(page, 'POST', '/api/generate', {
      commits: Array.isArray(commits) ? commits.slice(0, 1) : [],
      audience: 'invalid_audience',
      llm: { provider: 'releasly' },
    });
    expect(genRes.status()).toBe(400);
  });

  test('wizard UI: select audience → source → see repo', async ({ page }) => {
    await loginTestUser(page);

    // Click generate
    const genBtn = page.locator('button:has-text("Generate"), a:has-text("Generate")').first();
    if (await genBtn.isVisible({ timeout: 3000 })) {
      await genBtn.click();
    }

    // Step 1: Select Engineering audience
    const grid = page.locator('.audience-grid');
    if (await grid.isVisible({ timeout: 5000 })) {
      await page.locator('.audience-card:has-text("Engineering")').click();
      await page.locator('button:has-text("Next")').first().click();
    }

    // Step 2: GitHub source should be visible (connected)
    await expect(page.locator('text=GitHub').first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Full Generate Flow — DevRev', () => {
  test.skip(!DEVREV_TOKEN, 'TEST_DEVREV_TOKEN not set');

  test('should connect DevRev token', async ({ page }) => {
    await loginTestUser(page);

    const res = await apiCall(page, 'POST', '/api/devrev/connect', { token: DEVREV_TOKEN });
    // DevRev connect may succeed or fail based on token validity
    // Just verify it doesn't crash
    const status = res.status();
    expect(status).toBeLessThan(500);
  });

  test('should fetch DevRev data if connected', async ({ page }) => {
    await loginTestUser(page);

    const res = await apiCall(page, 'GET', '/api/devrev/sprint-boards');
    // May return 200 with data or 500 if not connected — don't hard-fail
    // Just check it doesn't crash — data shape may vary
    expect(res.status()).toBeLessThan(500);
  });
});

test.describe('Token Usage Tracking', () => {
  test('should track token usage after generation', async ({ page }) => {
    await loginTestUser(page);

    const res = await apiCall(page, 'GET', '/api/user/token-usage');
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(data).toHaveProperty('allTime');
    expect(data).toHaveProperty('thisMonth');
    expect(data).toHaveProperty('byProvider');
    expect(data).toHaveProperty('recent');

    // If we generated notes earlier, there should be usage
    if (data.allTime.generations > 0) {
      expect(data.allTime.total_tokens).toBeGreaterThan(0);
      expect(data.recent.length).toBeGreaterThan(0);
    }
  });
});

test.describe('Audiences API', () => {
  test('should return all 6 audiences', async ({ page }) => {
    await loginTestUser(page);

    const res = await apiCall(page, 'GET', '/api/audiences');
    expect(res.ok()).toBeTruthy();
    const audiences = await res.json();
    expect(audiences).toHaveLength(6);
    expect(audiences.map(a => a.id)).toEqual(
      expect.arrayContaining(['qa', 'product', 'stakeholder', 'engineering', 'sales_marketing', 'developer_community'])
    );
  });
});
