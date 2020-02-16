const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    //have to have headless set to true to generate pdf
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('https://google.com');
  //https://github.com/puppeteer/puppeteer/blob/v2.1.0/docs/api.md#pagepdfoptions
  await page.pdf({
    path: './google.pdf'
  })
  await browser.close();
})();