const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const ejs = require('ejs');
const path = require('path');

const compile = async function (templateName, data) {
    const filePath = path.join(__dirname, 'template', `${templateName}.ejs`);
    const html = await fs.readFile(filePath, 'utf-8');
    return ejs.render(html, data);
};

let browser;

module.exports = (async function (controller, id, locals) {
    try {
        browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        await page.setRequestInterception(true);

        let data = await controller.getResult(id);

        const content = await compile('DiMS48ReportTemplate', {
            locales: locals,
            data: data
        });

        page.on('request', request => {
            request.continue()
        });

        await page.goto(`data:text/html,${content}`, {
            waitUntil: 'networkidle0'
        });

        const file = await page.pdf({
            format: 'A4',
            printBackground: true,
        });

        await browser.close();

        return file;
    } catch (e) {
        console.log(e);
        if(typeof browser !== 'undefined' ){
            await browser.close();
        }

        throw e;
    }
});

