import faker from "faker";
import puppeteer from "puppeteer";

const APP = "https://www.spacetest.com/contacts/contact-form/";

const lead = {
    name: faker.name.firstName(),
    company: faker.company.companyName(),
    address: faker.address.streetAddress(),
    zip: faker.address.zipCode(),
    city: faker.address.city(),
    country: faker.address.country(),
    phone: '88005553535',
    email: faker.internet.email(),
    message: faker.random.words()
};

let page;
let browser;
const width = 1920;
const height = 1080;

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
});

afterAll(() => {
    browser.close();
});

describe("Contact form", () => {
    test("lead can submit a contact request", async () => {
        await page.goto(APP);
        await page.waitForSelector("form");
        await page.click("input[name=name]");
        await page.type("input[name=name]", lead.name);
        await page.click("input[name=company]");
        await page.type("input[name=company]", lead.company);
        await page.click("input[name=city]");
        await page.type("input[name=city]", lead.city);
        await page.click("input[name=country]");
        await page.type("input[name=country]", lead.country);
        await page.click("input[name=telephone]");
        await page.type("input[name=telephone]", lead.phone);
        await page.click("input[name=email]");
        await page.type("input[name=email]", lead.email);
        await page.click("input[name=customer]");
        await page.click("textarea[name=message]");
        await page.type("textarea[name=message]", lead.message);
        await page.click("input[type=checkbox]");
        await page.click("input[type=submit]");
        await page.waitForSelector(".wpcf7-mail-sent-ok");
    }, 1600000);
});

