const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

console.log('Pages:', $('.page').length);
console.log('Settings page length:', $('.page[data-page="settings"]').length);
console.log('Sub-items settings length:', $('.sub-item[data-go="settings"]').length);
console.log('Dashboard active sub-items length:', $('.sub-item.active').length);
