// 临时视觉验证脚本 v3 — 用完即删
import { chromium } from 'playwright-core';

const BASE = 'http://localhost:5175/lc';
const OUT = 'C:/Users/ourchem/AppData/Local/Temp/uishots';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

async function gotoLoopsAndScrollToCode(theme) {
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.evaluate((t) => {
    if (t === 'light') localStorage.setItem('theme', 'light');
    else localStorage.removeItem('theme');
  }, theme);
  await page.reload({ waitUntil: 'networkidle' });
  await page.click('text=返回首页');
  await page.waitForSelector('nav', { timeout: 30000 });
  await page.evaluate(() => {
    history.pushState({}, '', '/unit/unit-1/03-loops');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  await page.waitForSelector('main [class*="bg-slate-9"]', { timeout: 30000 });
  await page.waitForTimeout(1500);
  await page.evaluate(() => {
    document.querySelector('main [class*="bg-slate-9"]')?.scrollIntoView({ block: 'center' });
  });
  await page.waitForTimeout(1200); // fade-block 过渡
}

await gotoLoopsAndScrollToCode('light');
await page.screenshot({ path: `${OUT}/5-code-light.png` });

await gotoLoopsAndScrollToCode('dark');
await page.screenshot({ path: `${OUT}/6-code-dark.png` });

console.log(errors.length ? 'CONSOLE_ERRORS:\n' + errors.join('\n') : 'no console errors');
await browser.close();
