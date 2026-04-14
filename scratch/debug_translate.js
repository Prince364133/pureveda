const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto('http://127.0.0.1:3000/offer.html', { waitUntil: 'networkidle' });
  
  // Wait a little bit for translation
  await page.waitForTimeout(2000);
  
  // Take a screenshot to literally see if it translated
  await page.screenshot({ path: 'offer_screenshot.png' });
  
  await browser.close();
})();
