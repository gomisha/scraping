const userAgent = require('user-agents');
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

//replace with credentials
const username = 'testuser'
const password = 'secretpassword'

puppeteer.launch({ headless: false }).then(async browser => {
    let myUserAgent = userAgent.random();

    console.log(`userAgent: ${myUserAgent.toString()}`);

    const page = await browser.newPage()
    await page.setUserAgent(myUserAgent.toString())

    await page.goto('https://www.instagram.com/accounts/login/')
    await page.waitForSelector("input[name='username']")

    //username and password with delay to simulate human
    await page.type("input[name='username']", username, {delay: 100})
    await page.type("input[name='password']", password, {delay: 100})
    await page.click("button[type='submit']")

    //pop up dialgo asking if want notifications
    await page.waitForSelector("div[role='dialog'] > div > div:nth-child(3) > button:nth-child(2)")

    //click "Now Now" for turning on notifications
    await page.click("div[role='dialog'] > div > div:nth-child(3) > button:nth-child(2)")

    await page.waitFor(1000)
    //go to a specific profile
    await page.goto('https://www.instagram.com/therock/')

    //click on followers link
    await page.waitForSelector("a[href$='followers/']")
    await page.click("a[href$='followers/']")

    //wait for dialog popup of followers
    await page.waitForSelector("div[role='dialog']")

    //select all followers
    const followerList = await page.$$("div[role='dialog'] > div:nth-child(2) > ul > div > li")

    //await browser.close()
})


//a[contains(@href, 'followers')]