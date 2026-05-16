const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

function printPath(selector) {
  const el = $(selector);
  if (!el.length) {
    console.log(selector, 'NOT FOUND');
    return;
  }
  let path = '';
  let curr = el;
  while(curr.length && curr[0].name !== 'body') {
    path = curr[0].name + (curr.attr('class') ? '.' + curr.attr('class').split(' ').join('.') : '') + (curr.attr('id') ? '#' + curr.attr('id') : '') + ' > ' + path;
    curr = curr.parent();
  }
  console.log(selector, 'Path:', path);
}

printPath('#payroll-area');
printPath('#hiring-funnel');
printPath('#emp-dept-bar');
printPath('#att-weekly-chart');

