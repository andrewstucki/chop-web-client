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
 
describe('Change Channel Functional', () => {
  test('underline', async () => {
    await page.goto('http://0.0.0.0:8080/');
    await page.waitForSelector('#nav-underline');

    const left = await page.$eval('#nav-underline', element => element.getBoundingClientRect().left);
    const width = await page.$eval('#nav-underline', element => element.getBoundingClientRect().width);
    expect(left).toBe(69);
    expect(width).toBe(35);

    await page.click('#nav-host');

    await page.waitFor(2000);

    const left2 = await page.$eval('#nav-underline', element => element.getBoundingClientRect().left);
    const width2 = await page.$eval('#nav-underline', element => element.getBoundingClientRect().width);
    expect(Math.round(left2)).toBe(143);
    expect(Math.round(width2)).toBe(28);
  }, 16000); 
});
