const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const ejs = require('ejs');
const path = require('path');

let browser;

/* jshint ignore:start */
const compile = async function (templateName, data) {
    const filePath = path.join(__dirname, 'template', `${templateName}.ejs`);
    const html = await fs.readFile(filePath, 'utf-8');
    return ejs.render(html, data);
};

const generatePDF = async function generatePDF(templateName, data, locales){
    try{
        browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});

        const page = await browser.newPage();
    
        const content = await compile(templateName, {
            locales,
            data
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

    }catch(err){
        console.log(err);
        if(typeof browser !== 'undefined' ){
            await browser.close();
        }

        throw err;
    }
}

module.exports = generatePDF;


/* jshint ignore:end */