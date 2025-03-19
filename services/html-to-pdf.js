const puppeteer = require('puppeteer');

let browserInstance;

const getBrowser = async () => {
    if (!browserInstance) {
        browserInstance = await puppeteer.launch({ headless: true });
    }
    return browserInstance;
};

const htmlToPdf = async (html, options = { format: "A4", printBackground: true }) => {
    const browser = await getBrowser(); 
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    const pdfBuffer = await page.pdf(options);
    await page.close();  

    return pdfBuffer;
};

module.exports = htmlToPdf;
