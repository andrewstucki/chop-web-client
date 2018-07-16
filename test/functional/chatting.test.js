// flow
const puppeteer = require('puppeteer');

let browser;
let page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();

  page.emulate(
    {
      viewport: {
        width: 500,
        height: 800,
      },
      userAgent: '',
    }
  );
});

afterEach(() => {
  browser.close();
});

describe('Chat Functional', () => {
  test('Hello', async () => {
    await page.goto('http://0.0.0.0:8080/');
    await page.waitForSelector('#chat');

    // wait for channel to be added
    await page.waitForSelector('#nav-public');

    await page.click('#chat');
    await page.type('#chat', 'Hello');
    await page.click('#chat-button');

    await page.waitForSelector('[data-component="messageContainer"]');

    const top = await page.$eval('[data-component=messageContainer]', element => element.getBoundingClientRect().top);

    const text = await page.$eval('[data-component=messageContainer] [data-node="text"]', element => element.innerText);
    expect(text).toBe('Hello');

    await page.click('#chat');
    await page.type('#chat', 'Goodbye');
    await page.click('#chat-button');

    const top2 = await page.$eval('[data-component=messageContainer]:first-child', element => element.getBoundingClientRect().top);
    expect(top > top2).toBe(true);
  }, 16000);
});
