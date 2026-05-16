const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

$('summary:contains("Settings")').parent().replaceWith(`
  <div class="sub-item" data-go="settings" style="margin-top:10px;"><i class="ti ti-settings"></i> Settings & Audits</div>
`);

fs.writeFileSync('index.html', $.html());
console.log('Fixed Sidebar Settings Tab!');
