/**
 * Captures execution evidence screenshots for submission.
 * Run from Playwright Framework + Report/: node scripts/capture-screenshots.js
 */
const path = require('path');
const { chromium } = require('playwright');

const OUT_DIR = path.join(__dirname, '..', 'execution-reports', 'screenshots');
const REPORT_HTML = path.join(__dirname, '..', 'execution-reports', 'mochawesome', 'index.html');
const UI_BASE = process.env.UI_BASE_URL || 'https://practicesoftwaretesting.com';

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  await page.goto(UI_BASE, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.screenshot({ path: path.join(OUT_DIR, '01-home-catalog.png'), fullPage: false });

  await page.locator('[data-test="product-name"]').first().click();
  await page.waitForURL(/product/, { timeout: 30_000 });
  await page.screenshot({ path: path.join(OUT_DIR, '02-product-detail.png'), fullPage: false });

  await page.goto(`${UI_BASE}/auth/login`, { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: path.join(OUT_DIR, '03-login-page.png'), fullPage: false });

  const reportUrl = `file:///${REPORT_HTML.replace(/\\/g, '/')}`;
  await page.goto(reportUrl, { waitUntil: 'networkidle', timeout: 30_000 });
  await page.screenshot({ path: path.join(OUT_DIR, '04-mochawesome-report.png'), fullPage: true });

  await browser.close();
  console.log(`Screenshots saved to ${OUT_DIR}`);
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
