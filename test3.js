const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

console.log('Who has payroll-area?', $('#payroll-area').parents('.page').attr('data-page') || 'None');
console.log('Who has hiring-funnel?', $('#hiring-funnel').parents('.page').attr('data-page') || 'None');
console.log('Who has emp-dept-bar?', $('#emp-dept-bar').parents('.page').attr('data-page') || 'None');
console.log('Who has att-weekly-chart?', $('#att-weekly-chart').parents('.page').attr('data-page') || 'None');
console.log('Wait, do they exist in the DOM at all?');
console.log('payroll-area:', $('#payroll-area').length);
console.log('hiring-funnel:', $('#hiring-funnel').length);
console.log('emp-dept-bar:', $('#emp-dept-bar').length);
console.log('att-weekly-chart:', $('#att-weekly-chart').length);

const tabpanes = $('.tab-pane');
console.log('Total tab panes:', tabpanes.length);
tabpanes.each((i, el) => {
  console.log('Tab pane:', $(el).attr('data-tab-pane'), 'length:', $(el).html()?.length);
});
