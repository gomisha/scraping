const userAgent = require('user-agents');
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

puppeteer.launch({ headless: false }).then(async browser => {
    let myUserAgent = userAgent.random();

    console.log(`userAgent: ${myUserAgent.toString()}`);

    const page = await browser.newPage()
    await page.setUserAgent(myUserAgent.toString())

    await page.goto('https://www.instagram.com/accounts/login/')
    await page.waitForSelector("input[name='username']")

    //username and password with delay to simulate human
    await page.type("input[name='username']", "username-test", {delay: 100})
    await page.type("input[name='password']", "secret-password", {delay: 100})
    await page.click("button[type='submit']")

    //pop up dialgo asking if want notifications
    await page.waitForSelector("div[role='dialog'] > div > div:nth-child(3) > button:nth-child(2)")

    //click "Now Now" for turning on notifications
    await page.click("div[role='dialog'] > div > div:nth-child(3) > button:nth-child(2)")

    //await browser.close()
})
