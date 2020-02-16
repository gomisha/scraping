//udemy was blocking normal Puppeteer requests with CAPTCHA

const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

puppeteer.launch({ headless: false }).then(async browser => {
  const page = await browser.newPage(); 
  await page.goto('https://udemy.com');
})