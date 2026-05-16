const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

console.log('Finance Pane HTML length:', $('.tab-pane[data-tab-pane="finance"]').html()?.length);
console.log('Recruiting Pane HTML length:', $('.tab-pane[data-tab-pane="recruiting"]').html()?.length);
console.log('People Pane HTML length:', $('.tab-pane[data-tab-pane="people"]').html()?.length);
console.log('Operations Pane HTML length:', $('.tab-pane[data-tab-pane="operations"]').html()?.length);

console.log('Finance Pane contains #payroll-area:', $('.tab-pane[data-tab-pane="finance"]').find('#payroll-area').length);
