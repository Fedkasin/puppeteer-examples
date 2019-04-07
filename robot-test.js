const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 1000 });
    const page = await browser.newPage();
  
    page.setViewport({ width: 1000, height: 800 });
  
    await page.goto('https://patrickhlauke.github.io/recaptcha/', {waitUntil: 'networkidle2'});
    // await page.mouse.move(0, 0);
    //  await page.mouse.down();
    // await page.mouse.move(0, 191);
    await page.mouse.move(35, 191);
    await page.mouse.click(35, 191);
  
    // await browser.close();
  })()