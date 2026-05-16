const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

console.log('Payroll:', $('#payroll-area').closest('.card').length);
console.log('Hiring:', $('#hiring-funnel').closest('.card').length);
console.log('Dept:', $('#emp-dept-bar').closest('.card').length);
console.log('Att:', $('#att-weekly-chart').closest('.card').length);

const testCard = $('#payroll-area').closest('.card');
console.log('Test card class:', testCard.attr('class'));
console.log('Test card text snippet:', testCard.text().substring(0, 50));
