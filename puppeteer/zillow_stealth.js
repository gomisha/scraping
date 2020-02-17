const userAgent = require('user-agents');
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

puppeteer.launch({ headless: false }).then(async browser => {
    let myUserAgent = userAgent.random();

    console.log(`userAgent: ${myUserAgent.toString()}`);

    const page = await browser.newPage()
    await page.setUserAgent(myUserAgent.toString())

    console.log(`Testing the stealth plugin..`)
    await page.goto('https://zillow.com')

    await page.screenshot({ path: 'zillow-stealth.png' })

    console.log(`All done, check the screenshots. ✨`)
    await browser.close()
})