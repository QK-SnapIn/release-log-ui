import { test, expect } from '@playwright/test';

const PUBLIC_PAGES = [
  { path: '/', titleContains: 'Releaslyy', hasCanonical: true },
  { path: '/login', titleContains: 'Sign In', hasCanonical: true },
  { path: '/signup', titleContains: 'Sign Up', hasCanonical: true },
  { path: '/pricing', titleContains: 'Pricing', hasCanonical: true },
  { path: '/docs', titleContains: 'Documentation', hasCanonical: true },
  { path: '/terms', titleContains: 'Terms', hasCanonical: true },
  { path: '/privacy', titleContains: 'Privacy', hasCanonical: true },
  { path: '/support', titleContains: 'Support', hasCanonical: true },
  { path: '/integrations', titleContains: 'Integrations', hasCanonical: true },
  { path: '/integrations/github', titleContains: 'GitHub', hasCanonical: true },
  { path: '/integrations/jira', titleContains: 'Jira', hasCanonical: true },
  { path: '/integrations/devrev', titleContains: 'DevRev', hasCanonical: true },
  { path: '/integrations/slack', titleContains: 'Slack', hasCanonical: true },
];

test.describe('SEO Meta Tags', () => {
  for (const pg of PUBLIC_PAGES) {
    test(`${pg.path} should have proper meta tags`, async ({ page }) => {
      await page.goto(pg.path);

      // Title
      await expect(page).toHaveTitle(new RegExp(pg.titleContains));

      // Description meta tag
      const description = await page.getAttribute('meta[name="description"]', 'content');
      expect(description).toBeTruthy();
      expect(description.length).toBeGreaterThan(20);

      // OG tags
      const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
      expect(ogTitle).toBeTruthy();

      const ogDesc = await page.getAttribute('meta[property="og:description"]', 'content');
      expect(ogDesc).toBeTruthy();
    });
  }
});
