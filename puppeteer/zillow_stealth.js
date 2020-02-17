const userAgent = require('user-agents');
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

puppeteer.launch({ headless: false }).then(async browser => {

//   const userAgent = new UserAgent();
//   console.log(userAgent.toString());
//   console.log(JSON.stringify(userAgent.data, null, 2));

//   console.log(`userAgent1: ${userAgent.toString()}`);
//   console.log(`userAgent2: ${userAgent.toString()}`);
//   console.log(`userAgent3: ${userAgent.toString()}`);
//   console.log(JSON.stringify(userAgent.data, null, 2));


  const page = await browser.newPage()
  await page.setUserAgent(userAgent.toString())

  await page.setViewport({ width: 800, height: 600 })

  console.log(`Testing the stealth plugin..`)
  await page.goto('https://zillow.com')
  await page.waitFor(5000)
  await page.screenshot({ path: 'zillow-stealth.png', fullPage: true })

  console.log(`All done, check the screenshots. ✨`)
  await browser.close()
})