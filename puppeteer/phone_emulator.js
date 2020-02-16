const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  //full device list: https://github.com/puppeteer/puppeteer/blob/master/lib/DeviceDescriptors.js
  const iPhone = puppeteer.devices['iPhone X'];

  await page.emulate(iPhone);

  await page.goto('https://google.com');
  //await browser.close();
})();