const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.type('input[name="q"]', 'hello world', {delay: 100});
  page.keyboard.press("Enter")
  await page.waitForNavigation()
  await page.screenshot({path: 'google.png'});
})();