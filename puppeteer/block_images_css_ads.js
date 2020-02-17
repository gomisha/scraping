//https://github.com/puppeteer/puppeteer/blob/v2.1.0/docs/api.md#pagesetrequestinterceptionvalue

const puppeteer = require('puppeteer-extra')

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

puppeteer.launch({ headless: false, devtools: true }).then(async browser => {
  const page = await browser.newPage()
  await page.setRequestInterception(true);

  page.on('request', (request) => {
    if(['image', 'stylesheet', 'font', 'other'].includes(request.resourceType())) {
      request.abort();
    }
    //filter out all requests to other domains (ad trackers, analytics, CDNs etc)
    else if (!request.url().includes("vanityfair.com")) {
      request.abort();
    } 
    else {
      request.continue();
    }
  })
  //https://stackoverflow.com/questions/55910981/puppeteer-dont-return-all-requests-from-a-particular-website
  //https://github.com/puppeteer/puppeteer/blob/v2.1.0/docs/api.md#pagegotourl-options
  await page.goto('https://vanityfair.com', { waitUntil: 'networkidle0' });
})