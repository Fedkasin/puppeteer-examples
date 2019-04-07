const puppeteer = require('puppeteer');


/** Scrapping **/
(async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
    const page = await browser.newPage();
    page.setViewport({ width: 1000, height: 800 });

    await page.goto('https://av.by', {waitUntil: 'networkidle2'});
    await page.select('select[name="brand_id[]"]', '1181');
    await page.select('select#model_id', '1196');
    await page.click('div.dropselect-head.js-dropselect-head.dropselect-head-year');
    await page.select('select.main_year_list_from', '2007');
    await page.select('select.main_year_list_to', '2013');
    await page.click('div.dropselect-head.js-dropselect-head.dropselect-head-price');
    await page.select('select.main_price_list_from', '7000');
    await page.select('select.main_price_list_to', '10000');
    await page.click('button#submit_presearch');

    
    const refs = await page.$$eval('div.listing a', as => as.map(a => a.href));
    const links = new Set(refs);
    console.log(links);

    await browser.close();
  })();