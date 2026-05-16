const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

console.log('Finance Pane HTML length:', $('.tab-pane[data-tab-pane="finance"]').html()?.length);
console.log('Finance Pane contains payroll-area?', $('.tab-pane[data-tab-pane="finance"]').find('#payroll-area').length);
console.log('Recruiting Pane HTML length:', $('.tab-pane[data-tab-pane="recruiting"]').html()?.length);
console.log('Recruiting Pane contains hiring-funnel?', $('.tab-pane[data-tab-pane="recruiting"]').find('#hiring-funnel').length);

const peoplePane = $('.tab-pane[data-tab-pane="people"]');
console.log('People Pane HTML length:', peoplePane.html()?.length);
console.log('People Pane contains emp-dept-bar?', peoplePane.find('#emp-dept-bar').length);

const opsPane = $('.tab-pane[data-tab-pane="operations"]');
console.log('Ops Pane HTML length:', opsPane.html()?.length);
console.log('Ops Pane contains att-weekly-chart?', opsPane.find('#att-weekly-chart').length);
