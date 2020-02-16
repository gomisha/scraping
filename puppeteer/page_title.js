const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('https://google.com');
  let title = await page.title();
  console.log(`title of page: ${title}`)
  
  let url = await page.url()
  console.log(`url of page is ${url}`)

  await browser.close();
})();