import { expect, test } from '@playwright/test';

const paths = [
  '/',
  '/tools/',
  '/tools/url-tracking-remover/',
  '/tools/sha256-file-hash/',
  '/guides/'
];

test.describe('static page smoke tests', () => {
  for (const path of paths) {
    test(`${path} renders`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('text=Privacy Toolbox').first()).toBeVisible();
    });
  }

  test('URL tracking remover works in the browser', async ({ page }) => {
    await page.goto('/tools/url-tracking-remover/');
    await page.locator('[data-url-input]').fill('https://example.com/?utm_source=test&id=42&fbclid=abc');
    await page.locator('[data-process]').click();
    await expect(page.locator('[data-result]')).toContainText('https://example.com/?id=42');
    await expect(page.locator('[data-result]')).toContainText('utm_source');
  });
});
