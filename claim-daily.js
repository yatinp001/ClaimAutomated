const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Go to login page
    await page.goto('https://www.hpintfinance.com/index/login/index.html', {
      waitUntil: 'domcontentloaded'
    });

    // Fill login form
    await page.fill('#phone', process.env.USERNAME);
    await page.fill('#password', process.env.PASSWORD);

    // Click the login button
    await Promise.all([
      page.waitForNavigation(),
      page.click('.login a')
    ]);

    console.log('✅ Logged in successfully');

    // Navigate to earnings page
    await page.goto('https://www.hpintfinance.com/index/index/earnings.html', {
      waitUntil: 'domcontentloaded'
    });

    // Wait for the "Get it now" button and click
    await page.waitForSelector('#btna1', { timeout: 10000 });
    await page.click('#btna1');

    console.log('🎉 Claimed successfully!');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
})();
